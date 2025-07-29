import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const user = await UserService.register(req.body);
      res.status(201).json({ success: true, user });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

}
