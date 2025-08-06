import pool from '../utils/database'

export  class UserNotesRepository{
    static async linkUserToNote(user_id :string , note_id:string){
        await pool.query(
            `INSERT INTO users_notes (user_id , note_id) 
            values ($1,$2)
            RETURNING user_id , note_id `,
            [user_id , note_id]
        );
    }
}

