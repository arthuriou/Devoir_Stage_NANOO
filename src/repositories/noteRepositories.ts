import pool from "../utils/database";
import { Notes } from '../models/notes';


export class NoteRepository{
     static async create(note: Partial<Notes>): Promise<Notes> {
       const result = await pool.query(
        `INSERT INTO notes (texte)
         VALUES ($1)
         RETURNING id , texte`,
        [note.texte]
       );
       return result.rows[0];
     }

     static async findById(id: string): Promise<Notes[]> {
      const result = await pool.query(
        `SELECT * FROM notes WHERE id = $1`,
        [id]
      );
      return result.rows;
    }

    static async deleteNote(noteId: string): Promise<void> {
      await pool.query(`DELETE FROM notes WHERE id = $1`, 
     [noteId]);
    }

    static async updateNote(noteId: string, note: Notes): Promise<Notes> {
      const result = await pool.query(
        `UPDATE notes SET texte = $2 WHERE id = $1 RETURNING *`,
        [noteId, note.texte]
      );
      return result.rows[0];
    }


}