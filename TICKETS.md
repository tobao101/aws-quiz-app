# チケット管理ファイル — AWS AI Practitioner 模擬テストアプリ

- 要件定義書: [claude2/要件定義書.md](./claude2/要件定義書.md)
- 問題データ: [claude2/quiz_data.json](./claude2/quiz_data.json)（193問）
- 個別チケット: [tickets/](./tickets/) フォルダ（1チケット = 1ファイル）

## 使い方（Claude Code 並行開発）

1. **基盤チケット T-001〜T-005 は依存順に直列で完了させる**（全チケットの土台のため並行不可。1〜2セッションで一気にやるのが早い）
2. T-005 完了後、**Track A〜D を別々の Claude Code セッション + git worktree で並行開発**できる
3. 各セッションには「`tickets/T-0XX-xxx.md` を読んで実装して。完了したらチケットの Status を DONE にして」と指示する
4. チケットの Status は**各チケットファイルの先頭**で管理する（並行セッション同士が同じファイルを編集して衝突しないようにするため。下の一覧表は人間が任意のタイミングで同期すればOK）

### worktree での並行開発例

```bash
# Track A 用のセッション
git worktree add .claude/worktrees/track-a -b feature/mock-exam
# → その worktree で Claude Code を起動し「tickets/T-006-mock-exam.md を実装して」

# Track B 用のセッション（別ターミナル）
git worktree add .claude/worktrees/track-b -b feature/study-mode
```

各 Track の完了後、main にマージしてから次のチケットへ進む。

## チケット一覧

| ID | チケット名 | Phase | 依存 | Track | Status |
| --- | --- | --- | --- | --- | --- |
| [T-001](./tickets/T-001-project-setup.md) | Next.js プロジェクト初期化 | 0 | なし | 基盤 | TODO |
| [T-002](./tickets/T-002-supabase-schema.md) | Supabase スキーマ・RLS 構築 | 0 | なし | 基盤 | TODO |
| [T-003](./tickets/T-003-seed-script.md) | 問題データシードスクリプト | 0 | T-002 | 基盤 | TODO |
| [T-004](./tickets/T-004-auth.md) | ユーザー認証（F-01） | 1 | T-001, T-002 | 基盤 | TODO |
| [T-005](./tickets/T-005-quiz-logic-lib.md) | 出題ロジック共通ライブラリ | 2 | T-002, T-003 | 基盤 | TODO |
| [T-006](./tickets/T-006-mock-exam.md) | 模擬テスト実施画面（F-02） | 2 | T-004, T-005 | A | TODO |
| [T-007](./tickets/T-007-mock-result.md) | 模擬テスト結果画面（F-02） | 2 | T-006 | A | TODO |
| [T-008](./tickets/T-008-study-mode.md) | 全問学習モード（F-03） | 3 | T-004, T-005 | B | TODO |
| [T-009](./tickets/T-009-review-list.md) | 復習一覧画面（F-04） | 4 | T-002, T-004 | C | TODO |
| [T-010](./tickets/T-010-review-detail.md) | 復習詳細画面（F-04） | 4 | T-009 | C | TODO |
| [T-011](./tickets/T-011-dashboard.md) | ダッシュボード（F-05） | 5 | T-004, T-005 | D | TODO |
| [T-012](./tickets/T-012-polish.md) | レスポンシブ・A11y・仕上げ | 5 | 全画面チケット | 仕上げ | TODO |

Status の値: `TODO` / `IN_PROGRESS` / `REVIEW` / `DONE`

## 依存関係と開発の流れ

```
[直列: 基盤]
T-001 (Next.js) ────┬→ T-004 (認証) ─────────────┐
T-002 (DB スキーマ) ─┘                            │
T-002 → T-003 (シード) → T-005 (共通ロジック) ────┤
                                                  ▼
[ここから並行可能]
  Track A: T-006 (模擬テスト実施) → T-007 (結果画面)
  Track B: T-008 (全問学習モード)
  Track C: T-009 (復習一覧) → T-010 (復習詳細)
  Track D: T-011 (ダッシュボード)
                                                  │
[最後に統合]                                       ▼
  T-012 (レスポンシブ・A11y・仕上げ)
```

## 並行開発時の衝突回避ルール

| Track | 触ってよいパス |
| --- | --- |
| A | `app/mock/**`, `components/mock/**` |
| B | `app/study/**`, `components/study/**` |
| C | `app/review/**`, `components/review/**` |
| D | `app/page.tsx`, `components/dashboard/**` |

- `lib/**`, `types/**`, `components/ui/**` は T-005 完了後は**原則変更禁止**。追加が必要な場合は新規ファイル・新規関数の追加のみとし、既存関数のシグネチャ変更は禁止（他 Track が壊れるため）
- 似た UI（例: T-007 と T-010 の問題別レビュー表示）は Track をまたいで共通化せず、まず各 Track 内で独立実装 → T-012 で統合する
- DB スキーマの変更が必要になった場合は、並行作業を一旦止めて基盤担当（人間）が判断する
