import Link from "next/link";
import quizData from "@/data/quiz_data.json";

export default function Home() {
  const questionCount = quizData.length;

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <main className="flex w-full max-w-xl flex-col items-center gap-6 rounded-2xl bg-white p-10 text-center shadow-sm dark:bg-zinc-900">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          AWS AI Practitioner 模擬テスト（テスト版）
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          問題プール全 {questionCount} 問からランダムに65問を出題します。
          <br />
          選択肢の順序も出題ごとにランダムに入れ替わります。
          <br />
          ログイン不要・データは保存されません（回答後にリロードすると最初からやり直しになります）。
        </p>
        <Link
          href="/exam"
          className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          模擬テスト開始
        </Link>
      </main>
    </div>
  );
}
