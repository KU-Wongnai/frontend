export type Pivot = {
  user_id: number;
  role_id: number;
}

export type Role = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export type UserProfile = {
  user_id: number;
  phone_number: string;
  birth_date: Date;
  address: null | string;
  avatar: string;
  student_id: null | string;
  faculty: null | string;
  major: null | string;
  favorite_food: null | string;
  allergy_food: null | string;
  point: number;
  created_at: string;
  updated_at: string;
}

export type UserRider = {
  user_id: number;
  phone_number: string;
  id_card: string;
  id_card_photo: string;
  birth_date: Date;
  bank_account_number: string;
  bank_account_name: string;
  bank_account_code: string;
  book_bank_photo: string;
  avatar: string | null;
  student_id: null | string;
  faculty: null | string;
  major: null | string;
  desire_location: string;
  score: number;
  status: string;
  rider_verified_at: null | string;
  created_at: string;
  updated_at: string;
}

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: null | string;
  two_factor_secret: null | string;
  two_factor_recovery_codes: null | string;
  two_factor_confirmed_at: null | string;
  provider: null | string;
  provider_id: null | string;
  created_at: string;
  updated_at: string;
  roles: Role[];
  user_profile: UserProfile;
  rider_profile: UserRider;
}
