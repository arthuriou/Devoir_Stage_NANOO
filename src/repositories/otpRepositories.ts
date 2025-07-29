import pool from "../utils/database";
import { otp } from '../models/otp';

export class OtpRepository {
    static async create(otp: otp): Promise<otp> {
        const result = await pool.query(
            `INSERT INTO otp (user_id, code, expires_at, used)
             VALUES ($1, $2, $3, $4)
             RETURNING id, user_id, code, expires_at, used`,
            [otp.user_id, otp.code, otp.expires_at, otp.used]
        );
        return result.rows[0];
    }
}
