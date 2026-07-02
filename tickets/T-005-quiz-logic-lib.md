# T-005: 出題ロジック共通ライブラリ

- **Status**: TODO
- **Phase**: 2 / **Track**: 基盤
- **依存**: T-002（スキーマ）, T-003（シードデータ）
- **要件**: 要件定義書 §3.3（シャッフル）, §9（出題優先度）
- **担当パス**: `lib/quiz/**`, `types/quiz.ts`

## ゴール

模擬テスト（T-006）と全問学習（T-008）の両方が使う出題・採点・記録ロジックを共通ライブラリとして実装する。**このチケットの完了が並行開発開始の合図。**

## タスク

- [ ] `types/quiz.ts`: Question / QuizSession / SessionAnswer / UserQuestionStats などの型定義
- [ ] `lib/quiz/shuffle.ts`: 選択肢シャッフル
  - 選択肢（A〜D）の並び順をランダム化し、シャッフル後の並び（例: `["C","A","D","B"]`）と再マッピング後の正解位置を返す**純関数**
  - 並び順は `session_answers.shuffled_options` に保存して復習時に再現できる形式にする（§3.3）
- [ ] `lib/quiz/selection.ts`: 未解答優先の問題抽出（純関数 + DB 取得部分を分離）
  - 優先度: ① `user_question_stats` にレコードが無い問題 → ② `last_result = false` → ③ `last_result = true`（`last_answered_at` が古い順）
  - 各グループ内はランダム。上位グループで足りない場合は下位から補充。プールが n 問未満なら全問（§9）
- [ ] `lib/quiz/actions.ts`（Server Actions）:
  - `createSession(mode, count)`: セッション作成＋出題問題の決定＋シャッフル
  - `saveAnswer(sessionId, questionId, selectedAnswer, shuffledOptions)`: 回答保存＋`user_question_stats` の upsert（attempts, correct_count, last_result, last_answered_at）
  - `finishSession(sessionId)`: 未回答を不正解扱いで確定し、correct_count / score_rate / finished_at を集計・保存
- [ ] shuffle / selection の純関数部分にユニットテストを書く（vitest 等）

## 完了条件

- ユニットテストがすべてパスする
- `createSession` → `saveAnswer` × n → `finishSession` の一連の流れが動作する（簡単な動作確認スクリプトか手動確認）

## 並行開発メモ

- **完了後、このディレクトリの既存関数のシグネチャ変更は禁止**（Track A〜D が同時に依存するため）。機能追加は新規関数の追加で行うこと。
