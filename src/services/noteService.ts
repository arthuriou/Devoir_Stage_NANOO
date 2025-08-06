import { NoteRepository } from '../repositories/noteRepositories';
import { UserNotesRepository } from '../repositories/userNoteRepositories';

export class NoteServices{
  static async createNoteWithUser(texte: string , user_id:string) {
      const newNote = await NoteRepository.create({texte});
      await UserNotesRepository.linkUserToNote(user_id, newNote.id);
      return newNote;
    }
}
