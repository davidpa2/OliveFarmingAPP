/* tslint:disable */
/* eslint-disable */
import { UserCredentialsWithRelations } from './user-credentials-with-relations';

/**
 * (tsType: UserWithRelations, schemaOptions: { includeRelations: true })
 */
export interface UserWithRelations {
  email: string;
  emailVerified?: boolean;
  id?: string;
  realm?: string;
  userCredentials?: UserCredentialsWithRelations;
  username?: string;
  verificationToken?: string;

  [key: string]: any;
}
