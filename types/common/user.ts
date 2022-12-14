export type typedUser = {
  name: string;
  email: string;
  password?: string;
  active: boolean;
  scope: Array<{ name: string }>;
  passwordResetToken:string;
  passwordResetExpires: string;
  createdAt: string;
}
