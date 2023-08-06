import { Mario } from './mario';
import { User } from './user';

export interface SentMario {
  id: number;
  uuid: string;
  mario: Mario;
  theme: string;
  comment: string;
  sender: User;
  recipients: User[];
  recipientFirstNamesList: string[];
  recipientLastNamesList: string[];
  recipientLastName: string;
  recipientFirstName: string;
}

export interface SentMarioPayload {
  mario: Mario;
  theme: string;
  comment: string;
  sender: string;
  recipients: string[];
}
