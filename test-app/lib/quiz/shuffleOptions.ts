import type { OptionKey, Question, ShuffledQuestion } from "@/types/quiz";

const OPTION_KEYS: OptionKey[] = ["A", "B", "C", "D"];

function shuffleArray<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function shuffleOptions(question: Question): ShuffledQuestion {
  const shuffledOptions = shuffleArray(OPTION_KEYS).map((key) => ({
    key,
    text: question.options[key],
  }));

  return {
    ...question,
    shuffledOptions,
    correctOptionText: question.options[question.correct_answer],
  };
}
