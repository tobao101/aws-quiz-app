import quizData from "../data/quiz_data.json";
import { selectQuestions } from "../lib/quiz/selectQuestions";
import { shuffleOptions } from "../lib/quiz/shuffleOptions";
import type { Question } from "../types/quiz";

const pool = quizData as Question[];

// 65問が重複なく選ばれること
const selected = selectQuestions(pool);
const uniqueIds = new Set(selected.map((q) => q.id));
console.log(`selected: ${selected.length}件 (unique: ${uniqueIds.size})`);
console.assert(selected.length === 65, "65問選ばれること");
console.assert(uniqueIds.size === 65, "重複がないこと");

// 呼び出すたびに異なる組み合わせを返すこと
const selectedAgain = selectQuestions(pool);
const idsA = selected.map((q) => q.id).join(",");
const idsB = selectedAgain.map((q) => q.id).join(",");
console.assert(idsA !== idsB, "呼び出すたびに異なる65問が選ばれること");

// プールが65問未満の場合は全問返すこと
const smallPool = pool.slice(0, 10);
const smallSelected = selectQuestions(smallPool);
console.assert(smallSelected.length === 10, "プールが65問未満なら全問返す");

// 選択肢の順序が問題ごとに異なり、正誤判定情報が保持されていること
const shuffledOne = shuffleOptions(pool[0]);
const shuffledTwo = shuffleOptions(pool[0]);
console.log(
  "shuffled order 1:",
  shuffledOne.shuffledOptions.map((o) => o.key).join("")
);
console.log(
  "shuffled order 2:",
  shuffledTwo.shuffledOptions.map((o) => o.key).join("")
);
console.assert(
  shuffledOne.shuffledOptions.length === 4,
  "選択肢は4件のまま"
);
console.assert(
  shuffledOne.correctOptionText === pool[0].options[pool[0].correct_answer],
  "正解テキストが元の正解と一致する"
);
const correctInShuffled = shuffledOne.shuffledOptions.some(
  (o) => o.text === shuffledOne.correctOptionText
);
console.assert(correctInShuffled, "シャッフル後も正解の選択肢が含まれる");

console.log("すべての検証が完了しました");
