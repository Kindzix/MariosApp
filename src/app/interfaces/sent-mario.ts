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
}

export interface SentMarioPayload {
  mario: Mario;
  theme: string;
  comment: string;
  sender: User;
  recipients: User[];
}
