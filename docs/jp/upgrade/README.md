# アップグレード


::: tip 注記
‘無料パッチセット’ から完全機能の有料のKernelCareライセンスにアップグレードする方法
:::

無償のSymlink Protection(シンボリックリンク保護)パッチセットをインストールし、 [KernelCare](https://www.kernelcare.com/) が提供するリブート無しの包括的なカーネルセキュリティアップデートを利用したいのであれば、以下でそれを行う方法を説明します。

KernelCareの価格およびサポートに関する日本語及び日本の問合せ先は　[GDEPソリューションズ株式会社](http://www.gdep-sol.co.jp/) Tel: +81-3-5802-7050  E-mail: kcsales@gdep-sol.co.jp となります。

あなたがIPベースのライセンスを使用している場合、他に何もする必要はなく、既に準備ができている状態に設定されています。

KEYベースのライセンスを使用している場合、次のコマンドを実行します。:

```
$ /usr/bin/kcarectl --register KEY
```

パッチが適用されたかどうかを確認するには次のコマンドを実行します。:

```
$ /usr/bin/kcarectl --info
```

ソフトウェアは4時間毎に新しいパッチを自動的に確認しますが、手動でアップデートを実行する場合、次のコマンドを実行します。:

```
$ /usr/bin/kcarectl --update
```

::: tip 注記
 _無償_ パッチが _デフォルト_ に変更されました。 それでもシンボリックリンク保護が必要な場合、 _追加の_ パッチを適用する必要があります。それらにはシンボリックリンク保護とCentOS 6およびCentOS 7のセキュリティ修正が含まれています（追加のパッチには追加の料金はかかりません）。
::: 

追加のパッチを有効にしてパッチを適用するには、次のコマンドを実行します。:

```
kcarectl --set-patch-type extra --update
```

アップデートせずに追加のパッチを有効にするには、次のコマンドを実行します。:

```
kcarectl --set-patch-type extra
```

_追加の_ パッチは次回の自動アップデートで適用されます。

詳細を見るには、次のコマンドを実行します。:

```
kcarectl --patch-info
```

次のようなものを見つけることができるはずです。:

```
OS: centos6
kernel: kernel-2.6.32-696.6.3.el6
time: 2017-07-31 22:46:22
uname: 2.6.32-696.6.3.el6
 
kpatch-name: 2.6.32/symlink-protection.patch
kpatch-description: symlink protection // If you see this patch, it means that you can enable symlink protection.
kpatch-kernel: kernel-2.6.32-279.2.1.el6
kpatch-cve: N/A
kpatch-cvss: N/A
kpatch-cve-url: N/A
kpatch-patch-url: https://gerrit.cloudlinux.com/#/c/16508/
 
kpatch-name: 2.6.32/symlink-protection.kpatch-1.patch
kpatch-description: symlink protection (kpatch adaptation)
kpatch-kernel: kernel-2.6.32-279.2.1.el6
kpatch-cve: N/A
kpatch-cvss: N/A
kpatch-cve-url: N/A
kpatch-patch-url: https://gerrit.cloudlinux.com/#/c/16508/
 
kpatch-name: 2.6.32/ipset-fix-list-shrinking.patch
kpatch-description: fix ipset list shrinking for no reason
kpatch-kernel: N/A
kpatch-cve: N/A
kpatch-cvss:N/A
kpatch-cve-url: N/A
kpatch-patch-url: https://bugs.centos.org/view.php?id=13499
```

シンボリックリンクオーナーマッチ保護を有効にするには、次の行を追加します。:

```
Fs.enforce_symlinksifowner =1
```

`/etc/sysconfig/kcare/sysctl.conf` に入れ、そして実行します。:

```
sysctl -w fs.enforce_symlinksifowner=1
```

詳細は [http://docs.cloudlinux.com/index.html?symlink_owner_match_protection.html](http://docs.cloudlinux.com/index.html?symlink_owner_match_protection.html) を参照ください。

より多くの情報はこちらで見つけることができます。: [http://www.kernelcare.com/jp/faq.php](http://www.kernelcare.com/jp/faq.php).


