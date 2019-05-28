# 設定オプション


kcarectlの動作は `/etc/sysconfig/kcare/kcare.conf` を使用し、設定できます。

| | |
|-|-|
|`AUTO_UPDATE=True|False` | `True` - 自動更新を有効化; `False` - 自動更新を無効化|
|`chkconfig kcare off` | restart 後に自動更新を無効化|
|`PATCH_METHOD=normal|nofreeze|smart` | `Normal` - (デフォルト) freezer を使用;<br>`Nofreeze` - プロセスをフリーズすることのために freezer を使用しない;<br> `Smart` - smart freezerは、パッチ適用のためにフリーズする必要のあるスレッドのみをフリーズ(kernelcare ver2.3以降)|
|`PATCH_SERVER` | パッチをダウンロードするために使用するサーバ|
|`REGISTRATION_URL` | ライセンスされるサーバ|
|`PREFIX=prefix` | パッチソースのプレフィックスで、プレフィックスベースで異なるロケーションからダウンロードすることによって、異なるビルドをテストするために使用（ver2.2以降）|
|`UPDATE_POLICY=REMOTE|LOCAL|LOCAL_FIRST [ver1.6以降] ` | ポリシーに従い、サーバの起動時に次のコマンドを実行。:<br>`REMOTE` - (デフォルト) パッチサーバからパッチを取得<br>`LOCAL` - ローカルにキャッシュされたパッチのみ取得。何もキャッシュされていない場合、何も行いません (キャッシュは自動的に実行)<br>`LOCAL_FIRST` - ローカルにキャッシュされたパッチが存在するかどうかを確認し、それらを取得。そうでない場合、リモートサーバから取得。|
|`IGNORE_UNKNOWN_KERNEL=True|False` `[ver2.5-4以降]` | 自動更新時にカーネルが不明の場合、通知を実行しない|
|`LOAD_KCARE_SYSCTL [ver2.7-1以降]` |  `/etc/sysconfig/kcare/sysctl.conf` はパッチセットロード時に実行するかどうかをコントロールします。デフォルトでは True となっています。|
|`--set-patch-type extra` | 追加のパッチを有効化|
|`--set-patch-type free` | 無料のパッチを有効化|
|`STICKY_PATCH=KEY` | `KEY` からスティッキーパッチを取得(CLN、Key 編集を参照); IPベースのサーバまたはePortalではサポートされていません。|
|`STICKY_PATCH=DDMMYY` | 特定の日付でのパッチを充てます。詳細情報は [Stickyパッチ](/jp/sticky_patches/) を参照ください。|
|`REPORT_FQDN=True|False` | ホスト名として完全に認定されたドメイン（Fully Qualified Domain）を使用する必要があります。デフォルトでは　False となっています。|
|`FORCE_GID=N`|シンボリックリンクの保護パッチに、このグループIDを使用。デフォルトでは48（デフォルトのApacheユーザ GID）もしくは99（ `nobody` ユーザ）となっています。)|



