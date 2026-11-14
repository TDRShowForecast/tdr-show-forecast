# TDRショーパレ予測Bot（非公式）

X: @TDRShowForecast。スマホだけで管理するための初期構成です。**本番投稿・定期稼働はまだ有効にしていません。**

## 配置したもの

- `tdr-bot-source.zip`: Pythonのソース、100件のテスト、運用資料。秘密情報は含みません。
- `.github/workflows/tdr-bot.yml`: ZIPを展開して無料の標準GitHub runnerで実行します。

## スマホで操作

Actions → TDR Forecast Bot → Run workflow から選びます。

| operation | 内容 |
|---|---|
| diagnose | 気象データの通信診断。DB・Xキー不要、投稿なし |
| test | 自動テスト。外部気象通信・投稿なし |
| run | 公演取得と予測を1回実行。DB設定が必要 |
| pause | 投稿を停止 |
| resume | 投稿停止を解除（投稿許可のガードは解除しません） |
| status | 保存状態を確認 |

## 未完了の設定

履歴保存用Supabase Freeの作成とDB接続、Xキーの非公開登録、実気象の検証、初回投稿の承認が必要です。GitHub SecretsにDATABASE_URLとXの4キーを登録します。DBはSession poolerの5432、TLS必須です。キーをコード、README、Issueに貼り付けないでください。

定期実行はRepository VariablesのCLOUD_ENABLED=trueにするまでジョブが動きません。X投稿はLIVE_POSTINGとINITIAL_POST_APPROVEDが両方trueになるまで無効です。これらは動作・料金・アカウント・データの確認後に設定します。

## 制限

無料クラウドは定刻実行や長期の無人稼働を保証しません。公開リポジトリの定期実行は60日間活動がないと停止する場合があります。Supabaseも無料枠に制限があります。Xの投稿料は別です。

雷や地点の雨雲などの情報が不足する場合は、確率を出さず判定保留にします。モデルの数値は経験則による暫定仮説で、現在の公式運営基準ではありません。ZIP内のdocsに詳細と未完了事項を記録しています。
