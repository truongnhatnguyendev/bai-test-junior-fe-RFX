export interface UserEntity {
  userName: string;
  userId: string;
  contact: ContactEntity;
  type: string;
  experience: string;
  status: string;
}

export interface ContactEntity {
  phone: string;
  email: string;
}
