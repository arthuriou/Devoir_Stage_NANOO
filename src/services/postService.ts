import { PostRepository } from "../repositories/postRepositories";



export class PostService {
    static async createPost(userId: string, content: string, image_url?: string): Promise<void> {
        if(!content || content.trim() === '') {
            throw new Error("Le contenu ne peut etre vide.");
        }
        await PostRepository.createPost(userId, content, image_url);
    }
}


