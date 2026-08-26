export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  gender: Gender;
  dateOfBirth: string;
  photoURL: string | null;
  createdAt?: unknown;
  updatedAt?: unknown;
}
