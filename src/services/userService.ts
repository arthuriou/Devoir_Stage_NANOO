import { UserRepository } from '../repositories/userRepository';
import { User } from '../models/user';
import { hashPassword } from '../utils/hashUtils';
import { createOTP} from '../utils/otpService';
import { sendOtpEmail } from '../utils/mailService';
import { OtpRepository } from '../repositories/otpRepositories';



export class UserService {
  static async register(userData: User): Promise<User> {
    const existing = await UserRepository.findByEmail(userData.email);
    if (existing) {
      throw new Error('Email déjà utilisé');
    }

    const hashedPassword = await hashPassword(userData.password);

    const newUser: User =  await UserRepository.create({
      ...userData,  
      password: hashedPassword,
      createdAt: new Date(),
      verified: false,
    });

    const { code, expires_at} =  await createOTP();
     
    await OtpRepository.create(newUser.email ,code, expires_at);

  await sendOtpEmail(newUser.email, code);
  
    return newUser;
  }


 static async verifyEmail(email: string, code: string): Promise<boolean> {
    // 1. Récupérer le dernier OTP non expiré
    const otp = await OtpRepository.findValidOTP(email);

    if (!otp) return false;
    if (otp.code !== code) return false;

    // 2. Marquer l’OTP comme utilisé
    await OtpRepository.markAsUsed(otp.id!);
    

    // 3. Mettre à jour l'utilisateur : is_verified = true
    await UserRepository.verifyEmail(email);

    return true;
  }


}
