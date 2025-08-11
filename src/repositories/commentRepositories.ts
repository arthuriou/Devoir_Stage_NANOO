import { Comment } from "../models/comments";
import pool from '../utils/database'


export class CommentRepositorty {
    static async create(comment: Comment): Promise<Comment> {
        const result = await pool.query(
            `INSERT INTO Comments (user_id, post_id, content)
             VALUES ($1, $2, $3) RETURNING *`,
             [comment.user_id, comment.post_id, comment.content]
        );
        return result.rows[0];
    }
}

