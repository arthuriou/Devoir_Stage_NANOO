export interface Post {
  id?: string;
  user_id: string;
  content: string;
  image_url?: string;
  created_at: Date;
}
