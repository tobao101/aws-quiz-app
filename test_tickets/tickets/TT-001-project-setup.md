# TT-001: プロジェクト初期化（テスト版・DBなし）

- **Status**: TODO
- **依存**: なし
- **担当パス**: `test-app/**` 全体

## ゴール

Next.js（App Router）+ TypeScript + Tailwind CSS のプロジェクトを `test-app/` 配下に作成し、DB・認証を一切使わずに開発サーバーが起動する状態にする。

## タスク

- [ ] `test-app/` に `create-next-app` で TypeScript / Tailwind CSS / ESLint / App Router 構成のプロジェクトを作成する
  - `src/` ディレクトリは使わず、`test-app/app/` 直下に配置する構成とする
- [ ] `claude2/quiz_data.json`（193問）を `test-app/data/quiz_data.json` にコピーする
  - Supabase 等の DB は使わず、`import quizData from "@/data/quiz_data.json"` のようにビルド時の静的 import で読み込めることを確認する
- [ ] トップページ（`app/page.tsx`）に簡単な説明文と「模擬テスト開始」への導線（TT-003 完成までは仮リンクで可）を置く
- [ ] `README.md`（`test-app/README.md`）にセットアップ手順（install / dev 起動）を記載する

## 完了条件

- `npm run dev` でトップページが表示される
- Tailwind のスタイルが効いている
- `quiz_data.json` を import し、件数（193件）が正しく読み込めることを画面かコンソールで確認できる
- `npm run lint` がエラーなしで通る

## メモ

- このチケットは `test-app/` 全体の骨格を作るため、TT-002 以降より先に単独で完了させること。
- 認証・DB・API Route は今回のスコープでは一切不要。すべてクライアント側の静的データ・React state で完結させる。
