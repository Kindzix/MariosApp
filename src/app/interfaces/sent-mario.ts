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
  recipientNames: string[];
  sentDateTime: Date;
  isSender: boolean;
}

export interface SentMarioPayload {
  marioUuid: string;
  theme: string;
  comment: string;
  senderUuid: string;
  recipientUuids: string[];
}
