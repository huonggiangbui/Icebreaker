export enum GameTypes {
  TRUTHORDARE = 'truth_or_dare',
  CARDDRAWING = 'card_drawing',
  HAVEYOUEVER = 'have_you_ever',
  WOULDYOURATHER = 'would_you_rather',
  MOODGUESS = 'mood_guess',
  LOVEBOMB = 'love_bomb'
}

export type Metadata = {
  createdAt: Date;
  updatedAt: Date;
};

export interface User {
  id: string;
  name: string;
}

export interface Session {
  players: User[];
  questions: Question[];
}

export interface Question {
  id: string;
  type: GameTypes;
  content: string;
  choices?: string[];
  answers: Answer[];
  metadata: Metadata;
}

export interface Answer {
  owner: User;
  question: Question;
  content: string;
  metadata: Metadata;
}