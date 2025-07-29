import { UserRepository } from '../repositories/userRepository';
import { User } from '../models/user';
import { hashPassword } from '../utils/hashUtils';

export class UserService {
  static async register(userData: User): Promise<User> {
    const existing = await UserRepository.findByEmail(userData.email);
    if (existing) {
      throw new Error('Email déjà utilisé');
    }

    
    const hashedPassword = await hashPassword(userData.password);
    const newUser: User = {
      ...userData,  
      password: hashedPassword,
    };

    return await UserRepository.create(newUser);
  }

}
