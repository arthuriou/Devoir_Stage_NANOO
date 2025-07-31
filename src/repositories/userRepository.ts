import pool from "../utils/database";
import { User } from '../models/user';


export class UserRepository {
  static async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }
  static async create(user: User): Promise<User> {
    const { email, username, bio, password } = user;
    const result = await pool.query(
      `INSERT INTO users (email, username, bio, password)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, username, bio, created_at`,
      [email, username, bio, password]
    );
    return result.rows[0];
  }

  static async verifyEmail(email: string): Promise<void> {
    await pool.query(
      `UPDATE users SET is_verified = TRUE WHERE email = $1`,
      [email]
    );
  }

  // static async findByEmail(email: string): Promise<User | null> {
  //   const result = await pool.query(
  //     'SELECT * FROM users WHERE email = $1',
  //     [email]
  //   );
  //   return result.rows[0] || null;
  // }
  // static async save(user: User): Promise<User> {
  //   const { id, email, username, bio, password } = user;
  //   const result = await pool.query(
  //     `UPDATE users SET email = $2, username = $3, bio = $4, password = $5
  //      WHERE id = $1 RETURNING id, email, username, bio, created_at`,
  //     [id, email, username, bio, password]
  //   );
  //   return result.rows[0];
  // }

}
