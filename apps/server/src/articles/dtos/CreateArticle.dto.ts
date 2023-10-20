export interface CreateArticleDto {
  title: string;
  text: string;
  image_url?: string;
  author_id: number;
}
