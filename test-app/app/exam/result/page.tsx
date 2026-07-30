"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useExam } from "@/components/exam/ExamContext";
import QuestionResultCard from "@/components/exam/QuestionResultCard";

export default function ExamResultPage() {
  const router = useRouter();
  const exam = useExam();

  if (!exam.result) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-zinc-50 px-4 text-center dark:bg-black">
        <p className="text-zinc-600 dark:text-zinc-400">
          結果データがありません。模擬テストを開始してください。
        </p>
        <Link
          href="/exam"
          className="flex h-12 items-center justify-center rounded-full bg-foreground px-6 font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          模擬テストへ
        </Link>
      </div>
    );
  }

  const total = exam.result.length;
  const correctCount = exam.result.filter((r) => r.isCorrect).length;
  const scoreRate = Math.round((correctCount / total) * 1000) / 10;

  const handleRetry = () => {
    exam.startExam();
    router.push("/exam");
  };

  return (
    <div className="flex flex-1 flex-col items-center gap-6 bg-zinc-50 px-4 py-10 dark:bg-black">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 text-center shadow-sm dark:bg-zinc-900">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          結果: {correctCount} / {total}（正解率 {scoreRate}%）
        </h1>
        <button
          onClick={handleRetry}
          className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          もう一度挑戦
        </button>
      </div>

      <div className="flex w-full max-w-2xl flex-col gap-4">
        {exam.result.map((result, index) => (
          <QuestionResultCard
            key={result.question.id}
            index={index}
            result={result}
          />
        ))}
      </div>
    </div>
  );
}
