# AWS AI Practitioner 模擬テスト（テスト版）

`../test_tickets/` のチケットに基づく、DB・認証なしの最小構成プロトタイプです。
`../claude2/quiz_data.json`（193問）を `data/quiz_data.json` にコピーして静的に読み込み、すべてクライアント側（React state）で完結します。

## セットアップ

```bash
npm install
```

## 開発サーバー起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開くと確認できます。

## Lint

```bash
npm run lint
```

## 補足

- Supabase・認証・API Route は使用しません。
- ページをリロードすると回答状態は失われます（永続化なし、仕様どおり）。
- リポジトリのパスに日本語フォルダ名が含まれているため、Next.js 16 標準の Turbopack がパス処理でクラッシュする既知の問題があります。そのため `dev` / `build` スクリプトは `--webpack` を指定して従来の webpack ビルドを使うようにしています。
