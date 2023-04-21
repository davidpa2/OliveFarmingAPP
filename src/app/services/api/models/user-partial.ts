/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Partial<User>, schemaOptions: { partial: true })
 */
export interface UserPartial {
  email?: string;
  emailVerified?: boolean;
  id?: string;
  realm?: string;
  username?: string;
  verificationToken?: string;

  [key: string]: any;
}
