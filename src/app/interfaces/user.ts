import {SentMario, SentMarioPayload} from './sent-mario';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: number;
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  sentMarios: SentMario[];
  receivedMarios: SentMario[];
}

export interface UserPayload {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  sentMarios: SentMario[];
  receivedMarios: SentMario[];
}
