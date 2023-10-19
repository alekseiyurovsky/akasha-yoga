export interface CreateUserDto {
  email: string;
  name: string;
  surname: string;
  password_hash: string;
  date_of_birth: string;
  gender: string;
}
