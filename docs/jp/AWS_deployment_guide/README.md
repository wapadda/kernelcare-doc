# AWS上のKernelCare – 導入ユーザーガイド

[[TOC]]

## 紹介資料

### はじめに

Linux カーネルはセキュリティ上の欠陥はすべてのサービスと顧客のデータがさらされてしまう可能性があるため、サーバ上で最も重要なソフトウェアの1つです。 KernelCareはサーバを停止してリブートしなくてもLinux kernelを常に自動的に安全に保つことを可能にする技術であり、ダウンタイムやメンテナンス期間の不便さを回避させます。これにより可用性、セキュリティ、安定性、運用コスト、および顧客満足度が向上します。Linuxのほとんどすべてのメインディストリビューションで問題なく動作します。非常に複雑なパッチやカスタマイズされたカーネルを必要に応じて処理できると同時にシンプルで、高速で、簡単に展開することが可能です。

### 前提条件と要件

KernelCareは次のいずれかのディストリビューションを実行しているいずれのx86_64互換サーバまたはVMにインストールすることができます。:
* Amazon Linux 1, 2
* CentOS 6, 7, Xen4CentOS, CentOS-Plus, ElRepo
* CloudLinux 6, 7
* Debian 7, 8, 9, 8-backports
* Oracle Linux 6, 7
* ProxmoxVE 3,4,5
* RedHat EL 6, 7
* Ubuntu 14.04, 16.04, 18.04
* Virtuozzo 6

互換性のあるカーネルの正確なリストは次のリンク先です。: [https://patches.kernelcare.com/](https://patches.kernelcare.com/).

カスタム化されたカーネルがサポートされていない限り、ほとんどの場合において標準のOSカーネルが必要となってきます。

ソフトウェアは実行中のサーバへインストールでき、リブートは不要です。

KernelCareをAWSに導入するにはLinuxの基本的なスキルで十分です。シンプルな導入にはEC2インスタンスが1つだけ含まれています。KernelCareはBYOLモデルとして入手可能となっています。トライアルライセンスを取得するためには [customer portal](https://cln.cloudlinux.com) に登録する必要があります。トライアルライセンスを取得したら、実行中のEC2インスタンスをActivation Keyで登録する必要があります。


### アーキテクチャダイアグラム

あなたのサーバがNATの後ろであってもインターネットにアクセスできる限り、何の問題もなくKernelCareパッチサーバを使うことができます。

通常、KernelCareは適切に動作するためには2つのサーバへのHTTPS接続を必要とします。:

* cln.cloudlinux.com
* patches.kernelcare.com


![](/images/AWS_arch2.png)

サーバが直接インターネットにつながっていないが、プロキシを使用してインターネットへのアクセスができる場合、構成はそれほど変わりません。KernelCareはプロキシ用の標準的な環境変数を取得することができます。

![](/images/AWS_proxy_arch2.png)

プロキシセットアップの環境設定があることを確認してください。それ以外に関してはサーバがインターネットに直接接続されている場合と同じになります。:

```
# export http_proxy=http://proxy.domain.com:port
# export https_proxy=http://proxy.domain.com:port
```

## プランニングガイダンス

### セキュリティ

KernelCareの導入をインストール/コントロールするために必要な唯一のものはSSHアクセスです（ルート認証情報、Keyベースの認証/sudo、または同様のメカニズムが推奨されています）。

### 費用

KernelCareはサブスクリプションサービスとして提供されます。KernelCareの費用およびサポートに関する日本の問合せ先は　[GDEPソリューションズ株式会社](http://www.gdep-sol.co.jp/) Tel: +81-3-5802-7050  E-mail: kcsales@gdep-sol.co.jp となります。

### サイジング

KernelCareエージェントは小さなRAMフットプリントを持っており、バイナリパッチは通常1MB以下を必要としています。

## 導入ガイダンス

### KernelCareの導入

KernelCareをインストールするには、次のコマンドを実行します。:

```
curl -s -L https://kernelcare.com/installer | bash
```

または:

```
wget -qq -O - https://kernelcare.com/installer | bash
```
IPベースのライセンスを使用している場合、他に必要な作業はありません。
Keyベースのライセンスを使用している場合、次のコマンドを実行します。:

```
$ /usr/bin/kcarectl --register KEY
```

`KEY` は製品の購入またはトライアルを申し込むときに提供された登録キーコード文字列です。

Ansible、Puppet、Chefなどの自動化ツールを使用して、KernelCareの導入を簡単に自動化できます。 
自動化される可能性がある手順は次の通りです。:

1. KernelCareエージェントパッケージ （オプション：インターネットにアクセスできないサーバにのみ必要） および KernelCareエージェント設定ファイル(`/etc/sysconfig/kcare/kcare.conf`)の配布
2. 必要な環境変数を設定(オプション).
3. KernelCareエージェントをローカルで入手可能なパッケージまたはKernelCareダウンロードロケーションからインストール
4. KernelCareをライセンスキーまたはIPベースのライセンスで登録

## 運用ガイダンス

### ヘルスチェック

KernelCareによって保護されているシステムは [https://cln.cloudlinux.com](https://cln.cloudlinux.com)　で利用可能なCloudLinux Network（CLN）ポータルによってモニターされています。登録済みのKernelCareインストールはライセンスキーによってグループ化されています。<span style="color:#E76930">黄色</span>のビックリマークでマークされているカーネルには最新のパッチがインストールされていないことを意味します。

![](/images/KC-Ent-monit.png)

どちらの場合でも、KernelCareによって保護されているシステムで次のコマンドを実行することで、利用可能な最新のパッチが適用されているかどうかを確認できます。:

```
$ /usr/bin/kcarectl --check
```
### バックアップとリカバリ

KernelCareをバックアップする理由はありません。KernelCareはデータを保存していません。 KernelCareはいつでも再インストールおよび再登録できます。
KernelCareの設定ファイルを変更した場合、それをバックアップするには  `/etc/sysconfig/kcare/` フォルダをバックアップします。

### 定期メンテナンス

KernelCareはRPM/DEBパッケージ（Linuxディストリビューションによりますが）にパッケージされており、システムパッケージがアップデートされるたびにアップデートされます。追加のメンテナンスは不要です。

### 緊急メンテナンス

インスタンスの1つが劣化した場合、EBSまたはスナップショットに基づいて別のインスタンスを起動すると、KernelCareは以前と同様に機能し続けるため、追加の作業は不要となっています。
代わりに新しいサーバをセットアップした場合、新しいサーバにKernelCareを再登録してください。
パッチをアンインストールする場合、次のコマンドを実行します。:

```
# kcarectl --unload
```

または次のコマンドを実行し、*kernelcare* パッケージを完全に削除します。:

* RPMベースのシステム
    ```
    # rpm -e kernelcare
    ```
または
*  DEBベースのシステム
    ```
    # dpkg --remove kernelcare
    ```
### パッチフィードの詳細オプション

#### **テストと遅延フィード**

KernelCare パッチサーバには標準（本番）フィードに加えていくつかのパッチフィードがあります。:
* **テストフィード** – 完全なテストプロセスを経ていない最新のパッチ（テストビルド）。テストフィードを使用すると新しいパッチをより早くテストすることができます。
* **遅延フィード** – 過去12、24、48時間以内にリリースされたパッチロードをスキップするようにKernelCareに指示します。

フィードオプションは `/etc/sysconfig/kcare/kcare.conf` の `PREFIX` 変数を `test`/`12h`/`24h`/`48h` のいずれかに設定することで有効になります。

#### **Stickyパッチ機能によるフィード管理**

QAおよび本番環境を処理するための最適の方法はCloudLinux Network（CLN）ポータルから発行されたKernelCareライセンスキーのStickyタグ機能を使用することです。 
このタグを使用するにはCLN ポータル → KernelCare タブ → 対象のKeyをクリック → Edit Key Info ウィンドウの順に進みます。

![](/images/KC-Ent-list.png)

![](/images/KC-Ent-edit.png)

環境ごとに別々のキーを準備し、それらを特定のStickyタグに設定する必要があります。これは実際には環境内のすべてのサーバにパッチを適用する必要がある日となります。

![](/images/KC-Ent-sticky.png)

Stickyタグフィールドの日付は2018年5月28日から今日の1日前までの任意の日付にすることができます。

パッチを適用するサーバでStickyタグ機能を使用するには、次のコマンドを実行します。:

```
$ /usr/bin/kcarectl --set-sticky-patch=KEY
```

または `STICKY_PATCH=KEY` を `/etc/sysconfig/kcare/kcare.conf` ファイルに追加しても同じことができます。
  
::: tip 警告
 `KEY` は単純にそのまま KEY と入力します。サーバの登録に使用された実際のKernelCareライセンスキーに、**絶対に置き換えないでください。**
:::

特定のサーバに対してStickyタグ機能が有効になっていると、そのようなすべてのサーバはStickyタグフィールドで指定された日付より前にのみリリースされるパッチを取得します。

このようにしてCLNポータルの単一のフィールドのみをアップデートすることによって、ある環境内のすべてのサーバ（つまり同じKernelCareライセンスキーで登録したもの）に新しいパッチを追加できます。

## サポート

私たちは24時間365日のサポートを無制限に提供しています。英語で [リクエストを送信](https://cloudlinux.zendesk.com/hc/requests/new) するか、英語で [support@cloudlinux.com](mailto:support@cloudlinux.com) に電子メールでお問い合わせください。
* 1営業日以内、ほとんどの場合2、3時間以内に、サポートに関するすべての質問に回答します。
サポートをより促進するにはサーバ上で（ルートユーザとして）次のコマンドを実行します。:
```
# kcarectl --doctor
```
その後、生成されたキーをサポートリクエストに貼り付けます。

KernelCareの価格およびサポートに関する日本語及び日本の問合せ先は　[GDEPソリューションズ株式会社](http://www.gdep-sol.co.jp/) Tel: +81-3-5802-7050  E-mail: kcsales@gdep-sol.co.jp となります。

### サポート費用

KernelCareサブスクリプションにはe-mailまたはオンラインによるサポート費用が含まれています。

## アクセシビリティ

### 参考資料

* KernelCare ウェブサイト: [https://www.kernelcare.com/ja/](https://www.kernelcare.com/ja/)
* KernelCare ブログ: [https://www.kernelcare.com/blog/](https://www.kernelcare.com/blog/)
* KernelCare パッチサーバ: [http://patches.kernelcare.com](http://patches.kernelcare.com)
* KernelCare のドキュメント: [http://docs.kernelcare.com/jp/](http://docs.kernelcare.com/jp/)
* CloudLinux Network – CLN (ポータル): [https://cln.cloudlinux.com](https://cln.cloudlinux.com)
* CloudLinux 24時間365日オンラインサポートシステム: [https://cloudlinux.zendesk.com](https://cloudlinux.zendesk.com)

KernelCareの価格およびサポートに関する日本語及び日本の問合せ先は　[GDEPソリューションズ株式会社](http://www.gdep-sol.co.jp/) Tel: +81-3-5802-7050  E-mail: kcsales@gdep-sol.co.jp となります。
  
### ローカライゼーション

KernelCareは英語のみで利用可能です。