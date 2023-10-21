export interface PatchScheduleDto {
  date: string;
  training_id: number;
  unapproved_entrants: number[];
  approved_entrants: number[];
}
