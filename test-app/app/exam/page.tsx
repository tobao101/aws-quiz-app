"use client";

import { useRouter } from "next/navigation";
import { useExam } from "@/components/exam/ExamContext";
import QuestionCard from "@/components/exam/QuestionCard";

export default function ExamPage() {
  const router = useRouter();
  const exam = useExam();

  if (exam.status === "idle") {
    return (
      <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 dark:bg-black">
        <main className="flex w-full max-w-xl flex-col items-center gap-6 rounded-2xl bg-white p-10 text-center shadow-sm dark:bg-zinc-900">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            模擬テスト
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            65問に1問ずつ回答します。
            <br />
            テスト中は正誤・解説は表示されません。
            <br />
            すべて回答し終えたら「採点する」で結果を確認できます。
          </p>
          <button
            onClick={exam.startExam}
            className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            模擬テスト開始
          </button>
        </main>
      </div>
    );
  }

  const currentQuestion = exam.questions[exam.currentIndex];
  const total = exam.questions.length;
  const answeredCount = Object.keys(exam.answers).length;
  const isFirst = exam.currentIndex === 0;
  const isLast = exam.currentIndex === total - 1;

  const handleSubmit = () => {
    const unansweredCount = total - answeredCount;
    const message =
      unansweredCount > 0
        ? `未回答が${unansweredCount}問あります。このまま採点しますか？（未回答は不正解として扱われます）`
        : "採点しますか？";
    if (!window.confirm(message)) {
      return;
    }
    exam.submitExam();
    router.push("/exam/result");
  };

  return (
    <div className="flex flex-1 flex-col items-center gap-6 bg-zinc-50 px-4 py-10 dark:bg-black">
      <div className="w-full max-w-2xl">
        <p className="mb-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {exam.currentIndex + 1} / {total}（回答済み {answeredCount}問）
        </p>

        <QuestionCard
          question={currentQuestion}
          selected={exam.answers[currentQuestion.id] ?? null}
          onSelect={(text) => exam.selectAnswer(currentQuestion.id, text)}
        />

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={exam.goPrev}
            disabled={isFirst}
            className="h-11 flex-1 rounded-full border border-zinc-300 font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            前へ
          </button>
          <button
            onClick={exam.goNext}
            disabled={isLast}
            className="h-11 flex-1 rounded-full border border-zinc-300 font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            次へ
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 h-12 w-full rounded-full bg-foreground px-5 font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          採点する
        </button>
      </div>
    </div>
  );
}
