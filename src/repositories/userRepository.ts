import pool from "../utils/database";
import { User } from '../models/user';


export class UserRepository {
static async create(user: User): Promise<User> {
    const { email, username, bio, password ,profile_picture } = user;
    const result = await pool.query(
      `INSERT INTO users (email, username, bio, password , profile_picture )
       VALUES ($1, $2, $3, $4 , $5 )
       RETURNING id, email, username, bio , profile_picture `,
      [email, username, bio, password , profile_picture]
    );
    return result.rows[0];
  }
 static async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }
  
  static async verifyEmail(email: string): Promise<void> {
    await pool.query(
      `UPDATE users SET is_verified = TRUE WHERE email = $1`,
      [email]
    );
  }
  static async updatePassword(email: string, password: string): Promise<void> {
    await pool.query(
      `UPDATE users SET password = $2 WHERE email = $1`,
      [email, password]
    );
  }

   static async updateUserProfile(id: string , ProfileData: Partial<User>): Promise<void> {
    const { email, username, bio, profile_picture } = ProfileData;
    await pool.query(
      `UPDATE users SET  email = COALESCE($1, email), username = COALESCE($2, username), bio = COALESCE($3, bio), profile_picture = COALESCE($4, profile_picture) WHERE id = $5`,
      [email, username, bio, profile_picture, id]
    );
   }

   static async setActiveStatus(userId: string, isActive: boolean): Promise<void> {
  await pool.query(
    'UPDATE users SET is_active = $1 WHERE id = $2',
    [isActive, userId]
  );
}


  static async findById(id: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  }
