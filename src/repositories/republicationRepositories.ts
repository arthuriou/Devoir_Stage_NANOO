import { Republication } from "../models/republication";
import pool from "../utils/database";



export class RepublicationRepository {
    static async createRepublication(republication: Republication): Promise<Republication> {
       const result = await pool.query(
            `INSERT INTO republications (user_id, post_id)
             VALUES ($1, $2) RETURNING *`,
            [republication.user_id, republication.post_id]
        );
        return result.rows[0];
    }
}
