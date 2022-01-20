export enum GameTypes {
  TRUTHORDARE = 'truth_or_dare',
  CARDDRAWING = 'card_drawing',
  HAVEYOUEVER = 'have_you_ever',
  WOULDYOURATHER = 'would_you_rather',
  MOODGUESS = 'mood_guess',
}

export type Metadata = {
  createdAt: Date;
  updatedAt: Date;
};

export interface User {
  // id: string;
  name: string;
  session: Session;
  // questions: Question[];
  // answers: Answer[];
}

export interface Session {
  code: string;
  players: User[];
  questions: Question[];
  metadata: Metadata
}

export interface Question {
  id: string;
  type: GameTypes;
  // owner: User;
  content: string;
  // sessions: Session[];
  choices?: string[];
  answers: Answer[];
  metadata: Metadata;
}

export interface Answer {
  // id: string;
  owner: User;
  question: Question;
  content: string;
  metadata: Metadata;
}