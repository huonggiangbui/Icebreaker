export enum GameTypes {
  TRUTHORDARE,
  CARDDRAWING,
  HAVEYOUEVER,
  WOULDYOURATHER,
  MOODGUESS,
}

export type Metadata = {
  createdAt: Date;
  updatedAt: Date;
};

export interface Player {
  // id: string;
  name: string;
  session: Session;
  // answers: Answer[];
}

export interface Session {
  id: string;
  host: Player;
  players: Player[];
  games: Game[];
  metadata: Metadata
}

export interface Game {
  // id: string;
  type: GameTypes;
  timer?: Date;
  // sessions: Session[];
  questions: Question[];
  metadata: Metadata;
}

export interface Question {
  // id: string;
  // creator: Player;
  // game: Game;
  content: string;
  // answers?: Answer[];
  metadata: Metadata;
}

export interface Answer {
  // id: string;
  owner: Player;
  content: string;
  // question: Question;
}