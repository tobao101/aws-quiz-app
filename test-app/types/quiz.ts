export type OptionKey = "A" | "B" | "C" | "D";

export type Question = {
  id: number;
  question: string;
  options: Record<OptionKey, string>;
  correct_answer: OptionKey;
  explanation: string;
};

export type ShuffledOption = {
  key: OptionKey;
  text: string;
};

export type ShuffledQuestion = Question & {
  shuffledOptions: ShuffledOption[];
  correctOptionText: string;
};

export type UserAnswer = {
  questionId: number;
  selectedText: string | null;
  isCorrect: boolean;
};

export type QuestionResult = {
  question: ShuffledQuestion;
  selectedText: string | null;
  isCorrect: boolean;
};
