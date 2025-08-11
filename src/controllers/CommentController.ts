import { CommentService } from "../services/commentService";
import { Request, Response } from 'express';
import { HTTP_STATUS } from '../utils/error_message';


export class CommentControllers {
    static async createComment(req : Request, res : Response) {
        try {
            const comment = await CommentService.createComment(req.body);
            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                message: "Comment created successfully",
                comment
            });
        } catch (error) {
            console.error("Error creating comment:", error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Failed to create comment"
            }); 
        }
    }
}