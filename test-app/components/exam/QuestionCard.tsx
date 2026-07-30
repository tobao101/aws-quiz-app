"use client";

import type { ShuffledQuestion } from "@/types/quiz";

type QuestionCardProps = {
  question: ShuffledQuestion;
  selected: string | null;
  onSelect: (text: string) => void;
};

export default function QuestionCard({
  question,
  selected,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
      <p className="whitespace-pre-wrap text-zinc-900 dark:text-zinc-50">
        {question.question}
      </p>
      <div className="mt-6 flex flex-col gap-3">
        {question.shuffledOptions.map((option) => {
          const isSelected = selected === option.text;
          return (
            <label
              key={option.key}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                isSelected
                  ? "border-foreground bg-zinc-100 dark:bg-zinc-800"
                  : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800/50"
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={isSelected}
                onChange={() => onSelect(option.text)}
                className="mt-1"
              />
              <span className="text-zinc-800 dark:text-zinc-100">
                {option.text}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
