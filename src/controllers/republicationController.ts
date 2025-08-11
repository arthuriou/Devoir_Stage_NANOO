import { RepublicationService } from "../services/republicationService";
import { Request, Response } from 'express';
import { HTTP_STATUS } from '../utils/error_message';


export class RepublicationController {
    static async createRepublication(req: Request, res: Response) {
        try {
            const { post_id } = req.body;
            const user_id = (req as any).user.id;

            if (!post_id) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "L'ID du post est requis",
                });
            }

            const republication = await RepublicationService.createRepublication({
                user_id,
                post_id,
                created_at: new Date(),
            });

            return res.status(HTTP_STATUS.CREATED).json({
                success: true,
                message: "Republication créée avec succès",
                republication,
            });
        } catch (error) {
            console.error('Erreur lors de la création de la republication:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Erreur lors de la création de la republication",
            });
        }
    }

    static async getRepublicationById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const republication = await RepublicationService.getRepublicationById(id);
            return res.status(HTTP_STATUS.OK).json({
                success: true,
                republication,
            });
          } catch(error){
            console.log(error);
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Erreur lors de la récupération de la republication",
            });
          }
    }

    static async getAllRepublications(req: Request, res: Response) {
        try {
            const { user_id} = req.params;
            const republication = await RepublicationService.getRepublicationsByUserId(user_id);
            return res.status(HTTP_STATUS.OK).json({
                success: true,
                republication,
            });
          } catch(error){
            console.log(error);
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Erreur lors de la récupération des republications",
            });
          }
    }
}