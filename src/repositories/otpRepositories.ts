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
}
