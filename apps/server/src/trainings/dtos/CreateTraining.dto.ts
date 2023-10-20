export interface CreateTrainingDto {
  name: string;
  description: string;
  image_url?: string;
  duration: number;
  max_count: number;
  author_id: number;
}
