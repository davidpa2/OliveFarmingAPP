/* tslint:disable */
/* eslint-disable */
export interface User {
  email: string;
  emailVerified?: boolean;
  id?: string;
  realm?: string;
  username?: string;
  verificationToken?: string;

  [key: string]: any;
}
