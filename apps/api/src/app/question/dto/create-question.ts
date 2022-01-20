import { GameTypes } from "@icebreaker/shared-types";

export class CreateQuestionDto {
  type: GameTypes;
  content: string;
  session_code?: string;
  choices?: string[];
}