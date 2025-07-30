import { UserRepository } from '../repositories/userRepository';
import { User } from '../models/user';
import { hashPassword } from '../utils/hashUtils';
import { createOTP } from '../utils/otpService';
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
    });


     const {code, expiresAt} =  await createOTP();
     

  await OtpRepository.create(newUser.email, code, expiresAt);
  
  await sendOtpEmail(newUser.email, code);

    return newUser;
  }

}
