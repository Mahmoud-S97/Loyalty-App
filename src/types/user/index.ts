export type Gender = "male" | "female" | "other" | "prefer_not_to_say";
export interface UserDto {
  uid: string;
  email: string;
  displayName: string;
  avatar?: string;
  birthDate?: string;
  gender?: Gender;
  createdAt: string;
}