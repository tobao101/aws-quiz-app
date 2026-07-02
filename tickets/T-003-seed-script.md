# T-003: 問題データシードスクリプト

- **Status**: TODO
- **Phase**: 0 / **Track**: 基盤
- **依存**: T-002（questions テーブル）
- **要件**: 要件定義書 §3（データ仕様）
- **担当パス**: `scripts/**`, `package.json`（scripts 追記のみ）

## ゴール

`claude2/quiz_data.json`（193問）を Supabase の `questions` テーブルへ投入するシードスクリプトを作成する。

## タスク

- [ ] `scripts/seed.ts` を作成する
  - `claude2/quiz_data.json` を読み込み、`questions` テーブルへ **upsert**（id 基準）する
  - `SUPABASE_SERVICE_ROLE_KEY` を使用する（RLS をバイパスして書き込むため）
  - 投入件数・スキップ件数をログ出力する
- [ ] `package.json` に `"seed": "tsx scripts/seed.ts"` 等の npm script を追加する（tsx などの実行手段は任意）
- [ ] 再実行しても重複・エラーにならないこと（冪等性）を確認する

## 完了条件

- `npm run seed` で 193 問が `questions` テーブルに入る
- 再実行しても件数が増えない（upsert で更新される）

## 並行開発メモ

- id は 1〜195 で**欠番あり**（193件）。連番を前提にしないこと。
- 問題文・解説には改行 `\n` が含まれる。そのまま保存すること。
