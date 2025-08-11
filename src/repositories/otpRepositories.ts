import pool from "../utils/database";
import { Otp } from "../models/otp";

export class OtpRepository {
  static async create(
    email: string,
    code: string,
    expires_at: Date,
    type: "email_verification" | "password_reset"
  ): Promise<Otp> {
    const result = await pool.query(
      `INSERT INTO otps (email, code, expires_at, used , type)
             VALUES ($1, $2, $3, false , $4) 
             RETURNING *`,
      [email, code, expires_at, type]
    );
    return result.rows[0];
  }

  static async findValidOTP(
    email: string,
    type: "email_verification" | "password_reset"
  ): Promise<Otp | null> {
    const result = await pool.query(
      `SELECT * FROM otps 
           WHERE email = $1 AND used = FALSE AND expires_at > NOW() AND type = $2
           ORDER BY created_at DESC LIMIT 1`,
      [email, type]
    );
    return result.rows[0] || null;
  }

  // Marquer un OTP comme utilisé
  static async markAsUsed(id: string): Promise<void> {
    await pool.query(`UPDATE otps SET used = TRUE WHERE id = $1`, [id]);
  }

  static async findByEmail(
    email: string,
    type: "email_verification" | "password_reset"
  ): Promise<Otp | null> {
    const result = await pool.query(
      `SELECT * FROM otps WHERE email = $1 AND type = $2 ORDER BY created_at DESC LIMIT 1`,
      [email, type]
    );
    return result.rows[0] || null;
  }

  static async deleteMany(
    email: string,
    type: "email_verification" | "password_reset"
  ): Promise<void> {
    await pool.query(`DELETE FROM otps WHERE email = $1 AND type = $2`, [
      email,
      type,
    ]);
  }

  static async update(
    email: string,
    code: string,
    expires_at: Date,
    used: boolean,
    type: "email_verification" | "password_reset"
  ): Promise<Otp> {
    const result = await pool.query(
      `UPDATE otps SET code = $2, expires_at = $3, used = $4 WHERE email = $1 AND type = $5 RETURNING *`,
      [email, code, expires_at, used, type]
    );
    return result.rows[0];
  }
}
