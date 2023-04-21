/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: User, schemaOptions: { title: 'NewUser' })
 */
export interface NewUser {
  email: string;
  emailVerified?: boolean;
  id?: string;
  realm?: string;
  username?: string;
  verificationToken?: string;

  [key: string]: any;
}
