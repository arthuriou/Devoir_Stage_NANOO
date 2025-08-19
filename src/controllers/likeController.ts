import { LikeService } from '../services/likeService';
import { Request, Response } from 'express';    
import { HTTP_STATUS } from '../utils/error_message';
import { isUUID } from 'validator';


export class LikeController {
  static async createLike(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id; // récupéré via middleware d'auth
      const postId = req.body.post_id;

      if (!postId || !isUUID(postId)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Valid Post ID is required"
        });
      }

      const like = await LikeService.createLike(userId, postId);

      return res.status(HTTP_STATUS.CREATED).json({
        success: true,
        data: like
      });
    } catch (error: any) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error?.message || "An unexpected error occurred"
      });
    }
  }
}
