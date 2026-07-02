# T-001: Next.js プロジェクト初期化

- **Status**: TODO
- **Phase**: 0 / **Track**: 基盤
- **依存**: なし
- **要件**: 要件定義書 §6（技術スタック）
- **担当パス**: リポジトリルート全体（このチケットのみ）

## ゴール

Next.js（App Router）+ TypeScript + Tailwind CSS のプロジェクトをリポジトリルートに構築し、開発サーバーが起動する状態にする。

## タスク

- [ ] `create-next-app` で TypeScript / Tailwind CSS / ESLint / App Router 構成のプロジェクトを作成する
  - ルートに既存フォルダ（`claude2/`, `tickets/` 等）があり `create-next-app` が非空ディレクトリを拒否する場合は、一時ディレクトリに生成してからルートへ移動する
  - `src/` ディレクトリは使わず、ルート直下に `app/` を置く構成とする
- [ ] `app/layout.tsx` に共通レイアウト（ヘッダー: アプリ名＋ナビゲーション。ログアウトボタンの場所だけ確保し、実装は T-004 に任せる）
- [ ] `components/ui/` に最小限の共通 UI（Button, Card 程度）を作成する
- [ ] `.env.local.example` を作成する（`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`）
- [ ] `README.md` にセットアップ手順（install / env 設定 / dev 起動）を記載する

## 完了条件

- `npm run dev` でトップページが表示される
- Tailwind のスタイルが効いている
- `npm run lint` がエラーなしで通る

## 並行開発メモ

- プロジェクト全体の骨格を作るため**他チケットと並行不可**。最初に単独で完了させること。
