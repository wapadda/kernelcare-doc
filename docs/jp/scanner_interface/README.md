# スキャナーインターフェース

## 本件について

よく使用されるセキュリティスキャナーは、KernelCareによってパッチが適用されている場合でもいくつかのCVEを表示します。 CVE表示に関するこれらのすべての決定は、以下に基づいていることがわかります。

* 現在インストールされている（またはされていない）カーネルパッケージ
* uname情報

## どのような仕組か

それらを正しくさせるために、その情報と `uname -r` 出力に依存するDEBおよびRPMディストリビューションの共通部分を操作することができます。

RPMディストリビューションのスキャナーは `rpm -q` 出力に依存しているため、`LD_PRELOAD` を介して、そこの一部の関数を上書きし、必要なバージョンをスクリプトに出力させることができます。

それに対処するために、`showQueryPackage` をリロードして、その場でバージョン情報を修正します。 下記のようにrpmクエリの結果に表示される情報が変更されます。

```
[centos@ip-172-31-6-166 ~]$ rpm -q kernel-headers
kernel-headers-3.10.0-693.17.1.el7.x86_64
[centos@ip-172-31-6-166 ~]$ LD_PRELOAD=/usr/libexec/kcare/kpatch_package.so rpm -q
kernel-headers-3.10.0-957.21.3.el7.x86_64
```

リロードされた関数は `kcarectl --uname` に依存し、実際のカーネルバージョンを「有効なバージョン」に置き換えます。 この動作は1人のユーザに対してのみ有効であり、他のユーザに干渉しません。 そのユーザを使用して、SSH経由で資格情報スキャンを実行する必要があります。

## インストール

ターゲットシステムで行う必要があるのは、提供されたパッケージでKernelCareエージェントをインストール/更新することだけです。

```
KCARE_SCANNER_USER=username yum -y localinstall ./kernelcare-package.rpm
```
または、既存のパッケージを更新します。

```
KCARE_SCANNER_USER=username yum update kernelcare
```

またはインストール：

```
curl -s -L https://kernelcare.com/installer | KCARE_SCANNER_USER=username bash
```

`username` は、サーバでスキャナーを実行するために使用されるユーザです。 KernelCareパッチ（`kcarectl --update`) を適用すると、パッチが提供されているカーネルに応じたrpmクエリの結果が表示されます。

:::tip 注記
結果を確認するには、上記で定義した `KCARE_SCANNER_USER` を使用してサーバに再ログインする必要があります。
:::

## どのように使うか

かなり簡単です。 パッケージをインストールしてパッチセットを適用した後の新しいスキャン結果には、KernelCareによって処理されたカーネルのCVEは、表示されません。

たとえば、古いカーネルに対するNessusは、非常に多くのCVEが検出されています。

![](/images/scanner-manipulation-before.png)

パッチが適用された後、カーネル関連のCVEはありません。

![](/images/scanner-manipulation-after.png)
