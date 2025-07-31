import pool from "../utils/database";
import { Otp } from '../models/otp';

export class OtpRepository {
    static async create(email: string, code: string, expires_at: Date): Promise<Otp> {
        const result = await pool.query(
            `INSERT INTO otps (email, code, expires_at, used)
             VALUES ($1, $2, $3, false) 
             RETURNING *`,
            [email, code, expires_at]
        );
        return result.rows[0];
    }

    static async findValidOTP(email: string): Promise<Otp | null> {
        const result = await pool.query(
          `SELECT * FROM otps 
           WHERE email = $1 AND used = FALSE AND expires_at > NOW()
           ORDER BY created_at DESC LIMIT 1`,
          [email]
        );
        return result.rows[0] || null;
      }
      
      // Marquer un OTP comme utilisé
      static async markAsUsed(id: string): Promise<void> {
        await pool.query(`UPDATE otps SET used = TRUE WHERE id = $1`, [id]);
      }

    static async findByEmail(email: string): Promise<Otp | null> {
        const result = await pool.query(
            `SELECT * FROM otps WHERE email = $1 ORDER BY created_at DESC LIMIT 1`,
            [email]
        );
        return result.rows[0] || null;
    }

    static async deleteMany(email: string): Promise<void> {
        await pool.query(`DELETE FROM otps WHERE email = $1`, [email]);
    }

    static async update(email: string, code: string, expires_at: Date, used: boolean): Promise<Otp> {
        const result = await pool.query(
            `UPDATE otps SET code = $2, expires_at = $3, used = $4 WHERE email = $1 RETURNING *`,
            [email, code, expires_at, used]
        );
        return result.rows[0];
    }
}
