# 追加のパッチセット


::: tip 注記
KernelCare 2.12-5以降
:::

KernelCareの追加パッチセットにはCentOS 6およびCentOS 7用のKernelCareからのすべてのセキュリティ修正およびCentOS 6用のシンボリックリンク保護とIPSetバグ修正が含まれています。

追加のパッチを有効にしてパッチを適用するには、次のコマンドを実行してください。:

```
kcarectl --set-patch-type extra --update
```

アップデートせずに追加のパッチを適用するには、次のコマンドを実行してください。:

```
kcarectl --set-patch-type extra
```

次回の自動アップデートにおいて「追加の」パッチが適用されます。

詳細を見るには、次のコマンドを実行してください。:

```
kcarectl --patch-info
```

以下のようなものが見えるはずです。:

```
OS: centos6
kernel: kernel-2.6.32-696.6.3.el6
time: 2017-07-31 22:46:22
uname: 2.6.32-696.6.3.el6
 
kpatch-name: 2.6.32/symlink-protection.patch
kpatch-description: symlink protection // If you see this patch, it mean that you can enable symlink protection.
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
kpatch-cvss: N/A
kpatch-cve-url: N/A
kpatch-patch-url: https://bugs.centos.org/view.php?id=13499
```
Symlink Owner Match Protectionを有効にするには、次のコマンドを実行してください。:

`Fs.enforce_symlinksifowner =1`

を `/etc/sysconfig/kcare/sysctl.conf` に設定してください。

次のコマンドを実行してください。:

```
sysctl -w fs.enforce_symlinksifowner=1
```

より詳細について [http://docs.cloudlinux.com/index.html?symlink_owner_match_protection.html](http://docs.cloudlinux.com/index.html?symlink_owner_match_protection.html) を参照ください。

