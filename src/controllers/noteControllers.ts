import { Response , Request } from "express";
import { NoteServices } from "../services/noteService";
import { HTTP_STATUS } from "../utils/error_message";

export class NoteController{
    static async createNote(req:Request , res:Response){
    try{
           const {texte} = req.body;
           const user_id = (req as any).user.id; 
           
        if (!texte){
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: "Le texte de la note est requis",
            });
        }

        const note = await NoteServices.createNoteWithUser(texte , user_id);
        return res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: "La note a été cree avec success",
            data: note
        });
    }catch(error){
        console.log('Erreur de création de la note :',error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Erreur lors de la création de la note",
        });
    }
}
}
