import { Like } from "../models/likes";
import pool from "../utils/database";


export class LikeRepository {
  static async createLike(like: Like): Promise<Like> {
    const result = await pool.query(
      `INSERT INTO likes (user_id, post_id, date_like)
             VALUES ($1, $2, $3) RETURNING *`,
      [like.user_id, like.post_id, like.date_like]
    );
    return result.rows[0];
  }

  static async findUserIdAndPostId(user_id: string, post_id: string): Promise<Like | null> {
    const result = await pool.query(
      `SELECT * FROM likes WHERE user_id = $1 AND post_id = $2`,
      [user_id, post_id]
    );
    return result.rows[0] || null;
  }

  // static async getLikesByPostId(post_id: string): Promise<Like[]> {
  //   const result = await pool.query(
  //     `SELECT likes.*, users.username
  //        FROM likes
  //        JOIN users ON likes.user_id = users.id
  //        WHERE likes.post_id = $1
  //        ORDER BY likes.date_like DESC`,
  //     [post_id]
  //   );
  //   return result.rows;
  // }

    static async deleteLike(user_id: string, post_id: string) {
    await pool.query("DELETE FROM likes WHERE user_id = $1 AND post_id = $2", [
      user_id,
      post_id
    ]);
  }
}