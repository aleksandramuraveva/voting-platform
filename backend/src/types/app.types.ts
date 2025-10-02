//types
import { RowDataPacket } from 'mysql2';

export interface Idea {
  id: number;
  title: string;
  description: string | null;
  created_at: Date;
}

export interface IdeaWithVote extends Idea {
  hasVoted: boolean;
}

export interface IdeaDbRow extends RowDataPacket {
  id: number;
  title: string;
  description: string | null;
  created_at: Date;
  voted: number; // 0 or 1
  votesCount: number;
}

export interface IdeaWithVoteAndCount extends IdeaWithVote {
  votesCount: number;
}
