import { UserRepository } from '../repositories/userRepository';
import { User } from '../models/user';
import { hashPassword } from '../utils/hashUtils';
import { createOTP} from '../utils/otpService';
import { sendOtpEmail } from '../utils/mailService';
import { OtpRepository } from '../repositories/otpRepositories';
import { comparePassword } from '../utils/hashUtils';


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
     
    await OtpRepository.create(newUser.email ,code, expires_at , 'email_verification');

  await sendOtpEmail(newUser.email, code);
  
    return newUser;
  }

  static async login(email: string, password: any): Promise<User> {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('Email non trouvé');
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Mot de passe incorrect');
    }
    return user;
  }


 static async verifyEmail(email: string, code: string): Promise<boolean> {
    // 1. Récupérer le dernier OTP non expiré
    const otp = await OtpRepository.findValidOTP(email , 'email_verification');

    if (!otp) return false;
    if (otp.code !== code) return false;

    // 2. Marquer l’OTP comme utilisé
    await OtpRepository.markAsUsed(otp.id!);
    

    // 3. Mettre à jour l'utilisateur : is_verified = true
    await UserRepository.verifyEmail(email);

    return true;
  }

  static async sendPasswordResetOTP(email: string): Promise<void> {
    const { code, expires_at } = await createOTP(); 
  
    // Supprimer les anciens OTP pour cet email et ce type
    await OtpRepository.deleteMany(email , 'password_reset');
  
    // Créer et sauvegarder un nouveau OTP
    await OtpRepository.create(email ,code, expires_at , 'password_reset');
  
    // Envoyer l'email
    await sendOtpEmail(email, code);
  }
  
  static async resetPassword(email: string, code: string, password: string): Promise<void> {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('Email non trouvé');
    }
   
    const otp = await OtpRepository.findValidOTP(email , 'password_reset');
    if (!otp )
       throw new Error('OTP invalide ou expiré');
    if (otp.code !== code) 
      throw new Error('OTP invalide ou expiré');

    await OtpRepository.markAsUsed(otp.id!);
    const hashedPassword = await hashPassword(password);
    
    await UserRepository.updatePassword(email, hashedPassword);
    
  }


static async resendEmailVerificationOTP(email: string): Promise<void> {
    await OtpRepository.deleteMany(email , 'email_verification');
    const { code, expires_at } = await createOTP();
    await  OtpRepository.create(email, code, expires_at, 'email_verification');
    await sendOtpEmail(email , code);
  }

  static async resendResetPasswordOTP(email: string): Promise<void> {
    await OtpRepository.deleteMany(email , 'password_reset');
    const { code, expires_at } = await createOTP();
    await  OtpRepository.create(email, code, expires_at, 'password_reset');
    await sendOtpEmail(email , code);
  }


}
