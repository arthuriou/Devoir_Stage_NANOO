import e, { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { HTTP_STATUS, RESPONSE_MESSAGE } from '../utils/error_message';
import { UserRepository } from '../repositories/userRepository';
import { generateToken } from '../utils/jwtutils';

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
            prifile_picture: user.profile_picture,
            createdAt: user.created_at,
            verified: user.verified,
          }
        });
    } catch (error: any) {
      console.log(error);
      res.status(HTTP_STATUS.BAD_REQUEST).json(
        { success: false, 
          message: RESPONSE_MESSAGE.BAD_REQUEST 
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
  
 static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email , password);
      const token = generateToken({ id: user.id, email: user.email });
      res.status(HTTP_STATUS.OK).json({ 
        success: true,
        message: RESPONSE_MESSAGE.OK,
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          bio: user.bio,
          createdAt: user.created_at,
          verified: user.verified,
          is_active: user.is_active,
        },
      });
    } catch (error: any) {
      console.log(error)
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: error.message || RESPONSE_MESSAGE.BAD_REQUEST,
        
      })
      
    }
  }

  static async forgotPassword(req:Request , res:Response){
    try {
      const {email} = req.body;
      const users = await UserRepository.findByEmail(email);
      if (!users) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Aucun utilisateur avec cet email",
        });
      }

      await UserService.sendPasswordResetOTP(email);

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Un code a été envoyé à votre email pour réinitialiser votre mot de passe",
        });
      } 
      catch (error) {
        console.error("Erreur forgotPassword:", error);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Erreur serveur",
        });
    }
  }

  static async resetPassword(req:Request , res:Response){
    try {
      const {email , code , password} = req.body;
      const users = await UserRepository.findByEmail(email);
      if (!users) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Aucun utilisateur avec cet email",
        });
      }

      await UserService.resetPassword(email , code , password);

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Mot de passe réinitialisé avec succès",
        });
      } 
      catch (error) {
        console.error("Erreur resetPassword:", error);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Erreur serveur",
        });
    }
  }

  static async resendEmailVerificationOTP(req:Request , res:Response){
    await UserService.resendEmailVerificationOTP(req.body.email);
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Un  nouveau code a été envoyé à votre email pour vérifier votre compte",
      });
  }

  static async resendResetPasswordOTP(req:Request , res:Response){
    await UserService.resendResetPasswordOTP(req.body.email);
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Un  nouveau code a été envoyé à votre email pour réinitialiser votre mot de passe",
      });
  }

  static async updateUserProfile(req:Request , res:Response){
    try {
      const ProfileData = req.body;
      const userId = (req as any).user.id;

      await UserService.updateUserProfile(userId, ProfileData);
      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Profil mis à jour avec succès",
      });
      
    } catch (error) {
      console.error("Erreur mise à jour du profile :", error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Erreur serveur",
      });
    }
  }
  static async getUser(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const user = await UserRepository.findById(userId);
      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }
      return res.status(HTTP_STATUS.OK).json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          bio: user.bio,
          profile_picture: user.profile_picture,
          created_at: user.created_at,
          verified: user.verified,
          is_active: user.is_active,
        },
      });
    } catch (error) {
      console.error("Erreur récupération utilisateur:", error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Erreur serveur",
      });
    }
  }

}

