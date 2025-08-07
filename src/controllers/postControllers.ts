import { Request, Response } from "express";
import { PostRepository } from "../repositories/postRepositories";
import { PostService } from "../services/postService";
import { HTTP_STATUS } from "../utils/error_message";


export class PostController {
static async createPost(req: Request, res: Response) {
try {
    const { content, image_url } = req.body;
    const userId = (req as any).user.id;

    if (!content || content.trim() === '') {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Le contenu du post est requis",
      });
    }

    await PostService.createPost(userId, content, image_url);
    return res.status(201).json({
      success: true,
      message: "Post créé avec succès",
    });
  } catch (error: any) {
    console.error('Erreur lors de la création du post:', error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création du post",
    });
  }

}
}