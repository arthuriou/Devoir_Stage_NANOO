import { PostRepository } from "../repositories/postRepositories";
import { Post } from "../models/post";

export class PostService {
  static async createPost(
    userId: string,
    content: string,
    image_url?: string
  ): Promise<void> {
    if (!content || content.trim() === "") {
      throw new Error("Le contenu ne peut etre vide.");
    }
    await PostRepository.createPost(userId, content, image_url);
  }

  static async getPostById(id: string): Promise<Post | null> {
    const post = await PostRepository.findById(id);
    if (!post) {
      throw new Error("Post non trouvé.");
    }
    return post;
  }

  static async editPost(
    id: string,
    content: string,
    image_url?: string
  ): Promise<Post | null> {
    if (!content || content.trim() === "") {
      throw new Error("Le contenu ne peut etre vide.");
    }
    const updatedPost = await PostRepository.editPost(id, content, image_url);
    if (!updatedPost) {
      throw new Error("Post non trouvé ou mise à jour échouée.");
    }
    return updatedPost;
  }
  static async deletePost(id: string): Promise<void> {
    const post = await PostRepository.findById(id);
    if (!post) {
      throw new Error("Post non trouvé.");
    }
    await PostRepository.deletePost(id);
  }

  static async getPostsByUserId(userId: string): Promise<Post[]> {
    const posts = await PostRepository.getPostsByUserId(userId);
    if (!posts || posts.length === 0) {
      throw new Error("Aucun post trouvé pour cet utilisateur.");
    }
    return posts;
  }

  static async getAllPosts(user_id: string): Promise<Post[]> {
    const posts = await PostRepository.getPostsByUserId(user_id);
    if (!posts || posts.length === 0) {
      throw new Error("Aucun post trouvé pour cet utilisateur.");
    }
    return posts;
  }
}
