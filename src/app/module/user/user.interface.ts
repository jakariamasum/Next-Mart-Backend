export interface IUser {
  email: string;
  password: string;
  name: string;
  image?: string;
  contactNumber?: string;
  passwordChangedAt: string;
  isActive: boolean;
  address?: string;
  isDeleted: boolean;
}
