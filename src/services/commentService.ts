import { CommentRepositorty } from "../repositories/commentRepositories";
import { Comment } from "../models/comments";

export class CommentService {
  static async createComment(comment: Comment): Promise<Comment> {
    return await CommentRepositorty.create(comment);
  }
}
