import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { HTTP_STATUS, RESPONSE_MESSAGE } from '../utils/error_message';
import { verifyOTP } from '../utils/otpService';


export class AuthController {

  static async register(req: Request, res: Response) {
    try {
      const user = await UserService.register(req.body);
      res.status(HTTP_STATUS.CREATED).json(
        { success: true,
          message: "Utilisateur créé avec succès , veuillez vérifier votre email pour activer votre compte",
          user : {
            id: user.id,
            email: user.email,
            username: user.username,
            bio: user.bio,
            createdAt: user.createdAt,
            verified: user.verified,
          }

        });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(
        { success: false, 
          message: error.message || RESPONSE_MESSAGE.BAD_REQUEST 
        });
    }
  }

  static async verifyEmail(req: Request, res: Response) {
    try {
      const { email, code } = req.body;

      if (!email || !code) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Email et code requis",
        });
      }

      const verified = await UserService.verifyEmail(email, code);

      if (!verified) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: "OTP invalide ou expiré",
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Email vérifié avec succès",
      });

    } catch (error) {
      console.error("Erreur vérification email:", error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Erreur serveur",
      });
    }
  }
}

