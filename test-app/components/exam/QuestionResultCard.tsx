import type { QuestionResult } from "@/types/quiz";

type QuestionResultCardProps = {
  index: number;
  result: QuestionResult;
};

export default function QuestionResultCard({
  index,
  result,
}: QuestionResultCardProps) {
  const { question, selectedText, isCorrect } = result;
  const isUnanswered = selectedText === null;

  const badge = isUnanswered
    ? {
        label: "未回答（不正解扱い）",
        className:
          "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200",
      }
    : isCorrect
      ? {
          label: "正解",
          className:
            "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
        }
      : {
          label: "不正解",
          className: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
        };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          問題 {index + 1}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>

      <p className="mt-3 whitespace-pre-wrap text-zinc-900 dark:text-zinc-50">
        {question.question}
      </p>

      <div className="mt-4 flex flex-col gap-2">
        {question.shuffledOptions.map((option) => {
          const isCorrectOption = option.text === question.correctOptionText;
          const isUserChoice = !isUnanswered && option.text === selectedText;

          let optionClassName =
            "border-zinc-200 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300";
          let tag: string | null = null;

          if (isCorrectOption && isUserChoice) {
            optionClassName =
              "border-green-500 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-200";
            tag = "正解・あなたの回答";
          } else if (isCorrectOption) {
            optionClassName =
              "border-green-500 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-200";
            tag = "正解";
          } else if (isUserChoice) {
            optionClassName =
              "border-red-400 bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-200";
            tag = "あなたの回答";
          }

          return (
            <div
              key={option.key}
              className={`rounded-xl border p-3 ${optionClassName}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span>{option.text}</span>
                {tag && (
                  <span className="shrink-0 text-xs font-semibold">{tag}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
        <p className="mb-1 font-semibold text-zinc-500 dark:text-zinc-400">
          解説
        </p>
        <p className="whitespace-pre-wrap">{question.explanation}</p>
      </div>
    </div>
  );
}
