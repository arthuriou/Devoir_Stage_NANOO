import { Republication } from "../models/republication";
import pool from "../utils/database";

export class RepublicationRepository {
  static async createRepublication(
    republication: Republication
  ): Promise<Republication> {
    const result = await pool.query(
      `INSERT INTO republications (user_id, post_id)
             VALUES ($1, $2) RETURNING *`,
      [republication.user_id, republication.post_id]
    );
    return result.rows[0];
  }

  static async findById(id: string): Promise<Republication | null> {
    const result = await pool.query(
      `SELECT * FROM republications WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  static async getRepublicationsByUserId(
    userId: string
  ): Promise<Republication[]> {
     const result = await pool.query(
        `SELECT republications.*, users.username
         FROM republications
         JOIN users ON republications.user_id = users.id
         WHERE republications.user_id = $1
         ORDER BY republications.created_at DESC`,
        [userId]
    );
    return result.rows;
  }
}
