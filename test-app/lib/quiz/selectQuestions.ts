import type { Question } from "@/types/quiz";

const MOCK_EXAM_SIZE = 65;

function shuffleArray<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function selectQuestions(
  pool: Question[],
  count: number = MOCK_EXAM_SIZE
): Question[] {
  const shuffled = shuffleArray(pool);
  return shuffled.slice(0, Math.min(count, pool.length));
}
