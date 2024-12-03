export interface IRegister {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: "USER" | "VENDOR" | "ADMIN";
}
export interface ILogin {
  email: string;
  name: string | null;
  image: string | null;
  password?: string;
  provider?: string;
  providerAccountId?: string;
  type: string;
}
