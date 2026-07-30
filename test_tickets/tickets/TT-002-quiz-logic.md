# TT-002: 出題ロジック（ランダム抽出・選択肢シャッフル）

- **Status**: DONE
- **依存**: TT-001
- **担当パス**: `test-app/lib/quiz/**`, `test-app/types/**`

## ゴール

問題プール（193問）から65問をランダム抽出し、各問題の選択肢順をランダム化する純関数を実装する。DB や履歴を参照しないため、本番版（`tickets/T-005`）の「未解答優先」ロジックは含めない、単純ランダム抽出でよい。

## タスク

- [x] `types/quiz.ts`: 型定義
  - `Question`（id, question, options: {A,B,C,D}, correct_answer, explanation）
  - `ShuffledQuestion`（Question + シャッフル後の選択肢配列・正解の再マッピング情報）
  - `UserAnswer`（questionId, selectedKeyまたはselectedText, isCorrect）
- [x] `lib/quiz/selectQuestions.ts`: 問題プールからランダムに65問選ぶ純関数
  - 重複なく65問選ぶ（Fisher–Yates 等でシャッフル→先頭65件）
  - プールが65問未満の場合は全問を返す（要件定義書 §3.2 と同じ考え方）
- [x] `lib/quiz/shuffleOptions.ts`: 選択肢（A〜D）の順序をランダム化する純関数
  - シャッフル後の並び（例: 表示順に並べた選択肢テキストの配列）と、どのキーが正解かを再マッピングして返す
  - 正誤判定は「選択肢テキストの一致」または「シャッフル後の位置に対する正解フラグ」で行える形にする
- [x] 動作確認（簡単なテストコードまたはコンソールログ）で以下を確認する
  - 65問が重複なく選ばれる
  - 選択肢の順序が問題ごとに異なる
  - シャッフル後も正誤判定に必要な情報が正しく保持されている
  - 検証スクリプト: `test-app/scripts/verify-quiz-logic.ts`（`npx tsx scripts/verify-quiz-logic.ts` で再実行可能）

## 完了条件

- [x] `selectQuestions` が呼び出すたびに異なる65問の組み合わせを返す
- [x] `shuffleOptions` が呼び出すたびに異なる選択肢順を返し、正解判定に必要な情報を含む
- [x] 純関数のため DB・API 呼び出しを一切含まない

## メモ

- 本番版の `lib/quiz/selection.ts`（未解答優先ロジック）とは別物。今回は履歴データが存在しないため単純ランダムでよい。
- TT-003 / TT-004 がこの関数を利用するため、完成後は関数シグネチャを変えない（変える場合は TT-003 側も合わせて修正する）。
