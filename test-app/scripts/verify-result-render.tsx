import { renderToStaticMarkup } from "react-dom/server";
import QuestionResultCard from "../components/exam/QuestionResultCard";
import type { QuestionResult, ShuffledQuestion } from "../types/quiz";

const sampleQuestion: ShuffledQuestion = {
  id: 1,
  question: "サンプル問題文？",
  options: { A: "選択肢A", B: "選択肢B", C: "選択肢C", D: "選択肢D" },
  correct_answer: "B",
  explanation: "これはサンプルの解説文です。",
  shuffledOptions: [
    { key: "C", text: "選択肢C" },
    { key: "B", text: "選択肢B" },
    { key: "A", text: "選択肢A" },
    { key: "D", text: "選択肢D" },
  ],
  correctOptionText: "選択肢B",
};

function check(label: string, html: string, expected: string[]) {
  for (const text of expected) {
    const ok = html.includes(text);
    console.log(`[${ok ? "OK" : "NG"}] ${label}: "${text}"`);
    console.assert(ok, `${label} should contain "${text}"`);
  }
}

const correctResult: QuestionResult = {
  question: sampleQuestion,
  selectedText: "選択肢B",
  isCorrect: true,
};
check("正解を選んだ場合", renderToStaticMarkup(
  <QuestionResultCard index={0} result={correctResult} />
), ["正解", "正解・あなたの回答", "これはサンプルの解説文です。"]);

const wrongResult: QuestionResult = {
  question: sampleQuestion,
  selectedText: "選択肢A",
  isCorrect: false,
};
check("不正解を選んだ場合", renderToStaticMarkup(
  <QuestionResultCard index={1} result={wrongResult} />
), ["不正解", "あなたの回答", "正解", "これはサンプルの解説文です。"]);

const unansweredResult: QuestionResult = {
  question: sampleQuestion,
  selectedText: null,
  isCorrect: false,
};
check("未回答の場合", renderToStaticMarkup(
  <QuestionResultCard index={2} result={unansweredResult} />
), ["未回答（不正解扱い）", "正解", "これはサンプルの解説文です。"]);

console.log("レンダリング検証が完了しました");
