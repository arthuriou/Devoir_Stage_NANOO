import { Request, Response } from "express";
import { Post } from "../models/post";
import { PostService } from "../services/postService";
import { HTTP_STATUS } from "../utils/error_message";


export class PostController {
static async createPost(req: Request, res: Response) {
try {
    const { content, image_url } = req.body;
    const userId = (req as any).user.id;

    if (!content || content.trim() === '') {
       return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Le contenu du post est requis",
      });
    }

    await PostService.createPost(userId, content, image_url);
  return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Post créé avec succès",
    });
  } catch (error: any) {
    console.error('Erreur lors de la création du post:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Erreur lors de la création du post",
    });
  }

}

 static async editPost(req: Request, res: Response) {
  try{
    const {id} = req.params;
    const { content, image_url } = req.body;
    const userId = (req as any).user.id;

    if (!content || content.trim() === '') {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Le contenu du post est requis",
      });
    }

    const updatedPost = await PostService.editPost( id , content, image_url,);
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Post mis à jour avec succès",
      post: updatedPost,
    });
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour du post:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Erreur lors de la mise à jour du post",
    });
  }
 }

 static async deletePost(req: Request, res: Response) {
  try{
    const { id } = req.params;
    await PostService.deletePost(id);
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Post supprimé avec succès",
    });
  } catch (error: any) {
    console.error('Erreur lors de la suppression du post:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Erreur lors de la suppression du post",
    });
  }
 }

 static async getPostById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const post = await PostService.getPostById(id);
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Post récupéré avec succès",
      post,
    });
  } catch (error: any) {
    console.error('Erreur lors de la récupération du post:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Erreur lors de la récupération du post",
    });
  }
 }

}