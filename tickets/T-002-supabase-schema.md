# T-002: Supabase スキーマ・RLS 構築

- **Status**: TODO
- **Phase**: 0 / **Track**: 基盤
- **依存**: なし（T-001 と並行可）
- **要件**: 要件定義書 §7（データベース設計）
- **担当パス**: `supabase/**`

## ゴール

要件定義書 §7 の 4 テーブルと RLS ポリシーをマイグレーション SQL として作成し、Supabase プロジェクトに適用できる状態にする。

## タスク

- [ ] `supabase/migrations/0001_init.sql` を作成する
  - `questions`（id, question, options jsonb, correct_answer, explanation, created_at）
  - `quiz_sessions`（id uuid, user_id, mode, total_questions, correct_count, score_rate, started_at, finished_at）
  - `session_answers`（id uuid, session_id, question_id, shuffled_options jsonb, selected_answer, is_correct, answered_at）
  - `user_question_stats`（PK: user_id + question_id, attempts, correct_count, last_result, last_answered_at）
- [ ] RLS を有効化しポリシーを作成する（§7.2）
  - `questions`: ログインユーザー全員が SELECT 可、書き込み不可（service role のみ）
  - `quiz_sessions` / `session_answers` / `user_question_stats`: `user_id = auth.uid()` の行のみ本人が読み書き可（session_answers は親セッションの user_id で判定）
- [ ] インデックスを作成する（`quiz_sessions(user_id, started_at desc)`, `session_answers(session_id)` など）
- [ ] `supabase/README.md` に適用手順を記載する（Supabase ダッシュボードの SQL Editor で実行、または `supabase db push`）

## 完了条件

- マイグレーション SQL が Supabase プロジェクトに適用でき、4 テーブルが作成される
- 別ユーザーのセッション・回答・統計が SELECT できないことを確認できる

## 並行開発メモ

- T-001 とはパスが重ならないため並行可能。
- **適用後のスキーマ変更は全チケットに影響する**ため、変更が必要になったら並行作業を止めて調整すること。
