# コマンドラインツール


`/usr/bin/kcarectl` - あなたのカーネル用のKernelCareパッチを管理できます。

`/usr/bin/kcare-uname` - 特定のシステム情報を表示します。

## kcarectl

`/usr/bin/kcarectl` - あなたのカーネル用のKernelCareパッチを管理できます。

| | |
|-|-|
|`-i, --info` | KernelCareによってインストールされたパッチに関する情報を表示|
|`-u, --update ` | 最新のパッチをダウンロードし、それらを現在のカーネルに適用|
|`--smart-update  [ver1.6以降] ` | --update と同じですが、 [UPDATE_POLICY](/jp/config_options/) を使用してパッチの入手先を決定|
|`--unload` | パッチのアンロード|
|`--auto-update` | アップデートが必要かどうかをチェックし、アップデート|
|`--patch-info` | 適用されているパッチの一覧を表示|
|`--force  [ver2.3以降] ` | update とともに使用すると、一部のスレッドをフリーズできない場合にでもパッチを適用|
|`--uname` | 安全なカーネルバージョンを表示|
|`--license-info` | 現在のライセンス情報を出力|
|`--register KEY` | KernelCare Keyを使用して登録|
|`--register-autoretry [ver2.5以降]` | 登録が失敗した場合、登録を永久に再試行|
|`--unregister` | Keyベースのサーバ用のKernelCareから登録を解除|
|`--test` | 運用サーバのビルドではなくテストビルドを試行 (非推奨、代わりに --prefix=test を使用)|
|`--prefix` | パッチソースのプレフィックスで、プレフィックス（ver2.2以降）ベースで異なるロケーションからダウンロードすることによって、異なるビルドをテストするために使用|
|`--version` | KernelCareのバージョンを表示|
|`--import-key PATH` | gpgキーをインポート|
|`--set-monitoring-key` | 16から32文字の英数字のみでIPベースのライセンスに監視キー(monitoring key)を設定（ver2.1以降）|
|`--freezer  [ver2.3以降] ` | none: どのようなスレッドもフリーズしない; full: すべてのスレッドをフリーズする; smart: パッチ適用のためにフリーズする必要があるスレッドのみをフリーズする。オプションが選択されていない場合、最適なフリーズ方法が自動的に選択されます|
|`--check [ver2.4-1以降]` | アップデートすることなく、新しいパッチセットが利用可能かどうかをチェックします。終了コード 0 は新しいカーネルがあることを意味し、新しいカーネルがない場合は 1 となります|
|`--doctor [ver2.6以降]` | 診断のためにCloudLinuxサポートスタッフにレポートを送付|
|`--set-patch-type extra ` | 追加のパッチを有効化|
|`--set-patch-type free` | 無料のパッチを有効化|
|`--set-sticky-patch SET_STICKY_PATCH` | DDMMYY形式の日付時点で最新の状態にするようにパッチを設定。もしくはKEYに設定されている場合はKEYから取得(ePortalではサポートされていません)。何も記述しなければ、設定されません。より詳細な情報は [Stickyパッチ](/jp/sticky_patches/) を参照ください|
|`--tag COMMAND` | サーバに追加のTagフィールドを追加。 COMMAND はユーザー定義のパラメーターです。より詳細な情報は [サーバの管理](/jp/kernelcare_enterprise/#サーバの管理) を参照ください|

## kcare-uname


特定のシステム情報を表示。 オプションを無しの場合は `-s` と同様です。

| | |
|-|-|
|`-a, --all` | すべての情報を次の順序で表示。ただし、 `-p` と `-i` が unknown としてを省略される場合を除いて。|
|`-s, --kernel-name` | カーネル名を表示|
|`-n, --nodename` | ネットワークノードのホスト名を表示|
|`-r, --kernel-release` | カーネルのリリースを表示|
|`-v, --kernel-version` | カーネルのバージョンを表示|
|`-m, --machine` | マシンのハードウェア名を表示|
|`-p, --processor` | プロセッサタイプまたは `unknown` を表示|
|`-i, --hardware-platform` | ハードウェアプラットフォームまたは `unknown` を表示|
|`-o, --operating-system` | オペレーティングシステムを表示|
|`--help` | ヘルプを表示し、終了|
|`--version` | バージョン情報を出力し、終了|

## kernelcare doctor

このツールは、KernelCare環境に関する重要な情報を収集し、サポートチームに送
信します。

```
# kcarectl --doctor
Generating report...
Uploading...
Key: FRWf74Zw11111111.83991334-1111-1111-1111-681ddd653e5f
Please, provide above mentioned key to KernelCare Support Team
```

このコマンドはレポートを生成し、サポートチケットにリンクできるIDを出力しま
す。

:::tip 注記
レポートのアップロード中に接続の問題が発生した場合、レポートは `/root/cl-report` としてローカルに保存されます。 このファイルは、サポートチームに手動で
送信する必要があります。
:::