# Kcare-nexpose


このスクリプトはNexposeによって検出されたがKernelCareによってパッチされた脆弱性を例外としてマークします。

::: tip 注記
Nexposeを初めて使用する場合、設定方法と操作方法に関する [オフィシャルドキュメント](https://nexpose.help.rapid7.com/docs/) を読んでください。
:::

## インストール


### yumリポジトリから

kcare-nexposeをインストールするには、EL6の最小イメージから始めてください。:

```
$ cat > /etc/yum.repos.d/kcare-eportal.repo <<EOL
[kcare-eportal]
name=kcare-eportal
baseurl=http://repo.eportal.kernelcare.com/x86_64/
gpgkey=http://repo.cloudlinux.com/kernelcare-debian/6/conf/kcaredsa_pub.gpg
enabled=1
gpgcheck=1
EOL
```

kcare-nexposeをインストールするには、次のコマンドを実行してください。:

```
$ yum install kcare-nexpose
```

 
### GitHubから
 
```
$ git clone https://github.com/cloudlinux/kcare-nexpose.git
$ cd kcare-nexpose/
$ python setup.py install
$ pip install -r REQUIREMENTS
```

## 仕組み


このスクリプトは、KernelCare（KernelCare ePortalまたはKernelCareパッチサーバからダウンロード）によって適用されたパッチに関連するCVEを発見し、Nexposeの脆弱性スキャナレポートから除外します。スクリプトはNexposeでこの例外を承認できます（承認したくない場合はスクリプト設定で `is_approve` を `false` に設定します）。また、前回のスクリプト実行で残った古い例外を削除することもできます（スクリプト設定で `delete_old` を `true` に設定します）。

まずNexposeでレポートを生成し（下記のサポートされているレポートタイプを参照）、設定ファイルでそれを指定する必要があります。また他のいくつかの [パラメータ](/kcare-nexpose/#yaml-config-file-description) を指定する必要があります。:

```
$ cp /usr/local/etc/kcare-nexpose.yml.template /usr/local/etc/kcare-nexpose.yml
$ vim /usr/local/etc/kcare-nexpose.yml
```

::: tip 注記
NexposeのIPアドレスとKernelCare ePortalのIPアドレスは同じである必要があります。 NexposeとKernelCare ePortalを別々のインスタンスで使用する場合はNexposeとKernelCare ePortalがローカルホスト（127.0.0.1）を使用していないことを確認してください。そうでなければkcare-nexposeはNexposeとKernelCare ePortalからのIPアドレスを分析するだけなので、脆弱性を誤ってマークする可能性があります。CLNライセンスサーバで使用されている場合、スクリプトはNATの背後にあるサーバとそれらのホスト名で照合することで機能します。
:::
 
### サポートされているレポートタイプ

::: warning 注記
レポートを作成する前に [site](https://nexpose.help.rapid7.com/docs/what-is-a-site) と [scan](https://nexpose.help.rapid7.com/docs/selecting-a-scan-engine-for-a-site) を設定したことを確認してください。
:::

_raw-xml-v2_

![](/images/nexpose-xml2_zoom70.png)

## 起動方法


kcare-nexpose runを起動するには次のコマンドを実行します。:

```
$ kcare-nexpose -c /usr/local/etc/kcare-nexpose.yml
```

## YAML設定ファイルの説明


```
# Nexpose section
nexpose:
 
# Host to connect with Nexpose Security Console
 host: 192.168.100.100
 
 # Port to connect with Nexpose Security Console
 port: 3780
 
 # Username to auth with Nexpose Security Console
 username: admin
 
 # Password to auth with Nexpose Security Console
 password: hup^r37kZc72MjY}=ox?WTQ
 
 # Report name which will be analyzed for look up related CVE with kernelcare ePortal
 report-name: kernelcare
 
 # Change this to 'true' if you want the script to automatically mark
 # vulnerabilities as exceptions, so they don't show up in the report
 is_approve: true
 
 # If you want to delete old exceptions. If it is false, old exceptions will not be deleted
 delete_old: true
 
 format: raw-xml-v2
 
# License and patch server section
patch-server:
 
 # URL to connect to Kernelcare ePortal
 # For kernelcare ePortal use "http://<kernel-care-eportal-domain-name-or-ip>/admin/api/kcare/patchset/"
 # For licenses issued by CLN, use "https://cln.cloudlinux.com/api/kcare/patchset.json?key="
 server: https://cln.cloudlinux.com/api/kcare/patchset.json?key=
 
 # Server for patch sets
 # For patch sets from Kernelcare ePortal server use domain name
 # (or IP address)
 # patches-info: http://<kernel-care-eportal-domain-name-or-ip>
 
 # For patch sets from the central KernelCare patch server
 patches-info: http://patches.kernelcare.com/
 
 # List of KernelCare license keys
 keys:
   - 0G0996952sTtCU4z
   - hx5LO1n49zY5jp6B
```

