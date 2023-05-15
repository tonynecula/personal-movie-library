export interface User {
  user: any;
  _id: string;
  email: string;
  password: string;
  username: string;
  isAdmin: boolean;
  forgotPasswordCode?: string;
  deleteCode?: string;
  deleteExpires?: Date;
  emailConfirmation: {
    code?: string;
    confirmed: boolean;
  };
}
