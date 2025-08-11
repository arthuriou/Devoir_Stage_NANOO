import { Post } from "../models/post";
import pool from "../utils/database";


export class PostRepository {
    
    static async createPost(userId: string, content: string, image_url?: string): Promise<void> {
  await pool.query(
    `INSERT INTO posts (user_id, content, image_url) VALUES ($1, $2, $3)`,
    [userId, content, image_url]
  );
}

    static async findById(id: string): Promise<Post | null> {
        const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    static async editPost(id: string , content : string , image_url?: string): Promise<Post | null> {
        const result = await pool.query(
            `UPDATE posts SET content = $2, image_url = $3 WHERE id = $1 RETURNING *`,
            [id, content, image_url]
        );
        return result.rows[0] || null;
    }

    static async deletePost(id: string): Promise<void> {
        await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    }

    static async getPostsByUserId(userId: string): Promise<Post[]> {
        const result = await pool.query('SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
        return result.rows;
    } 
}