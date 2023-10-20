export interface CreateAnnouncementDto {
  title: string;
  text: string;
  image_url?: string;
  priority: number;
  author_id: number;
}
