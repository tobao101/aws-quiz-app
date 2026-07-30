"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import quizData from "@/data/quiz_data.json";
import { selectQuestions } from "@/lib/quiz/selectQuestions";
import { shuffleOptions } from "@/lib/quiz/shuffleOptions";
import type { Question, QuestionResult, ShuffledQuestion } from "@/types/quiz";

type ExamStatus = "idle" | "in-progress";

type ExamContextValue = {
  status: ExamStatus;
  questions: ShuffledQuestion[];
  currentIndex: number;
  answers: Record<number, string>;
  result: QuestionResult[] | null;
  startExam: () => void;
  selectAnswer: (questionId: number, text: string) => void;
  goNext: () => void;
  goPrev: () => void;
  submitExam: () => void;
};

const ExamContext = createContext<ExamContextValue | null>(null);

export function ExamProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ExamStatus>("idle");
  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<QuestionResult[] | null>(null);

  const startExam = () => {
    const pool = quizData as Question[];
    const selected = selectQuestions(pool).map(shuffleOptions);
    setQuestions(selected);
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
    setStatus("in-progress");
  };

  const selectAnswer = (questionId: number, text: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: text }));
  };

  const goNext = () => {
    setCurrentIndex((index) => Math.min(index + 1, questions.length - 1));
  };

  const goPrev = () => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  };

  const submitExam = () => {
    const computed: QuestionResult[] = questions.map((question) => {
      const selectedText = answers[question.id] ?? null;
      return {
        question,
        selectedText,
        isCorrect: selectedText === question.correctOptionText,
      };
    });
    setResult(computed);
    setStatus("idle");
  };

  const value: ExamContextValue = {
    status,
    questions,
    currentIndex,
    answers,
    result,
    startExam,
    selectAnswer,
    goNext,
    goPrev,
    submitExam,
  };

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
}

export function useExam() {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error("useExam must be used within an ExamProvider");
  }
  return context;
}
