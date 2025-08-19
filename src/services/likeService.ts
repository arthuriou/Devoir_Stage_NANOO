import { LikeRepository } from "../repositories/likeRepositories";
import { Like } from "../models/likes";


export class LikeService {
    static async createLike(user_id: string, post_id: string): Promise<{ toggled: string, data?: Like }> {
        const existingLike = await LikeRepository.findUserIdAndPostId(user_id, post_id);
        if (existingLike) {
            await LikeRepository.deleteLike(user_id, post_id);
            return {toggled: "unliked", ...existingLike};
        }

        const newLike: Like = {
            id: "",
            user_id,
            post_id,
            date_like: new Date()
        };
        const like = await LikeRepository.createLike(newLike);

        return  { toggled: "liked", data: like };
    }
}

