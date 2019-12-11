# KernelCare.ePortal

KernelCare.ePortalはインターネットにアクセスできない、ファイアウォールの内側にあるサーバのためのKernelCare用のWebベース管理コンソールです。これはKernelCare Enterprise製品の一部であり、オンプレミスにインストールする必要があります。


## ePortalのハードウェア要件

ePortalマシンのディスクサイズは接続されているサーバの数によって変わりません。

要件は常に同じです。:

* 100 GB 以上
* 200 GB 推奨
* SSD

::: tip 注記
SSDは非常に重要な要件です。
:::

その他の要件に関しては、以下の構成と以下の数の接続サーバにおいてテスト済みです。:

* 次の要件の場合、接続マシンの最大数は10,000台です。:
  * VM
  * 1 VCPU
  * 1 GB RAM 
* 次の要件の場合、接続マシンの最大数は75,000台です。:
  * Core i5
  * 1 CPU
  * 4 GB RAM

## インストール

### EL6上のKernelCare.ePortal


KernelCare.ePortalをインストールするには、EL6の最小イメージから始めてください。

e-portalのインストールと作業性のために、nginx Webサーバが必要となってきます。オフィシャルnginxリポジトリからの安定版を使用することをお勧めします。:

```
$ cat > /etc/yum.repos.d/nginx.repo <<EOL
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/6/\$basearch/
gpgcheck=0
enabled=1
EOL
```

詳細は [http://nginx.org/en/linux_packages.html#stable](http://nginx.org/en/linux_packages.html#stable) をご覧ください。

KernelCare.ePortalリポジトリを設定します。:

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

KernelCare.eportalをインストールします。:

```
$ yum install kcare-eportal
```


### EL7上のKernelCare.ePortal


 
KernelCare.ePortalをインストールするには、EL7の最小イメージから始めてください。

e-portalのインストールと作業性のために、nginx Webサーバが必要となってきます。オフィシャルnginxリポジトリからの安定版を使用することをお勧めします。:

```
$ cat > /etc/yum.repos.d/nginx.repo <<EOL
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/\$basearch/
gpgcheck=0
enabled=1
EOL
```

詳細は [http://nginx.org/en/linux_packages.html#stable](http://nginx.org/en/linux_packages.html#stable) をご覧ください。

KernelCare.ePortalリポジトリを設定します。:

```
$ cat > /etc/yum.repos.d/kcare-eportal.repo <<EOL
[kcare-eportal]
name=KernelCare ePortal
baseurl=https://repo.eportal.kernelcare.com/x86_64.el7/
enabled=1
gpgkey=https://repo.cloudlinux.com/kernelcare/RPM-GPG-KEY-KernelCare
gpgcheck=1
EOL
```

KernelCare.eportalをインストールします。:

```
$ yum install kcare-eportal
```

## ePortalマシンでプロキシを調整する方法

ePortalマシンではコマンドラインで使用するのと同じプロキシ設定を定義する必要があります。

これを行うには <span class="notranslate">`PROXY = 'http://example.com'`</span> を次のファイルに追加します。: <span class="notranslate">`/usr/share/kcare-eportal/config/local.py`</span>

このファイルが存在しない場合、NGINXの所有者で作成してください。:

<div class="notranslate">

```
echo "PROXY = 'http://example.com'" > /usr/share/kcare-eportal/config/local.py
chown nginx:nginx /usr/share/kcare-eportal/config/local.py
```
</div>


ePortal をリスタートします。([停止とスタート](/jp/kernelcare_enterprise/#停止とスタート) セクションを参照し、対応するOSを選択してください)。

## ユーザを管理する


 `/usr/bin/kc.eportal` ユーティリティを使用し、ポータルを管理できます。:
| | | |
|-|-|-|
|`-l` | `--list-users`| すべてのユーザを一覧表示|
|`-a` | `--add-user`| ユーザを追加|
|`-d` | `--delete-user` | ユーザを削除|
|`-c` | `--change-password`| ユーザパスワードを変更|
|`-p` | `--password` | ユーザのパスワードを指定|
|`-h` | `--help` | ヘルプを表示|
ユーザを追加するには、次のコマンドを実行します。:

```
$ kc.eportal -a admin -p AdminPassword
```

ユーザのパスワードを変更するには、次のコマンドを実行します。:

```
$ kc.eportal -c admin -p NewPassword
```

### LDAP認証

ePortalはLDAP認証を使って、安全な接続をサポートします。

ユーザログインの入力をするため、LDAP接続の文字列を指定します。

例:

```
uid=%s,dc=example,dc=com
```

ここでの 

`uid=%s` は、key属性であり `%s` を含める必要があります。

LDAP URLを使用してセキュリティ設定とセットアップタイムアウトを指定することもできます。

初めてLDAP資格情報でePortalにログインすると、デフォルトでLDAPユーザ名、読み取り専用権限、およびLDAPの説明を持つユーザがデータベースに作成されます(`http://<eportal>/admin/user/`)。

下図では、 `kc.eportal` コマンドラインインターフェースで作成された一人のユーザと、LDAP認証情報でログインされた二人のユーザを見つけることができます。

![](/images/eportalLDAPusers.png)

このLDAPユーザ管理者権限を設定するには、 `read-only=False` と設定します。(編集アクセスが必要です)

#### **ローカルユーザとLDAPユーザの間に、違いはありますか？**

違いはログイン手順です。 ローカルユーザのログインとパスワードはローカルデータベースに保存されますが、LDAPユーザの場合は、ログインと許可のみがローカルデータベースに保存され、認証はLDAPサーバ経由で行われます。

ユーザーがePortalにログインすると、ePortalは最初にローカルデータベースのユーザ認証情報を確認します。 認証情報が見つかった場合、ユーザは認証され、ユーザ認証情報が見つからない場合にのみ、ePortalはLDAPにリダイレクトします。


## ePortalにアクセス


KernelCare.eportalマネジメントコンソールにアクセスするには **http://YOUR_IP/admin** に接続します。

その後、あなたのログイン名とパスワードを入力してください。

![](/images/access_eportal.png)

 [kc.eportal tool](/jp/kernelcare_enterprise/#ユーザを管理する) を使ってあなたのログイン情報を管理することができます。

## パッチセットの展開


::: tip 注記
ePortal ver0.8以降
:::

KernelCare.ePortalには最新のパッチをダウンロードするためのメカニズムが組み込まれています。使用を開始するには、KernelCare.ePortalナビゲーションバーの _Patch Source_ リンクをクリックしてから Settings をクリックします。パッチソースへのアクセス情報はKernelCare社もしくはその代理者から提供されます。

![](/images/eportal_dep01_1_zoom70.png)


パッチソースアクセス情報を設定すると、利用可能なパッチセットのリストが表示されます。 _Source_ リンクをクリックすると、いつでも戻ってアクセス情報を変更できます。

![](/images/eportal_dep02_1_zoom70.png)

 _[changelog]_ をクリックすると、指定されたパッチセットの変更履歴が表示されます。
 _[deploy this patch, and all before it]_ をクリックすると、このパッチセットとそれ以前のすべてのパッチセットをダウンロードし、展開します。パッチセットは正しい順序で充てていかないと、展開されません。


## Keyを管理する


新しいサーバを登録するには、サーバ登録に使用されるKernelCareキーを作成する必要があります。
Keyのリストに移動するには、左上のKernelCare ePortalロゴをクリックしてください。

![](/images/key-menu_zoom70.png)

* Keyを編集するには、 ![](/images/eportal_keys_edit.png) をクリックします。 _Edit_ タブが開きます。
* Keyを削除するには、 ![](/images/eportal_keys_remove.png) をクリックします。 Keyを削除すると、そのKeyの下にあるすべてのサーバが削除されることに注意してください。
* Keyをクリックして Servers タブに移動すると、そのKeyの下に [登録されているサーバ](/jp/kernelcare_enterprise/#サーバの管理) のリストが表示されます。そのタブでサーバを削除することもできます。

新しい登録を作成するには _Create_ タブをクリックします。
   ![](/images/key-creation_zoom70.png) 
以下のフィールドに入力してください。:

* **Key** —  Key名を入力するかフィールドを空白のままにすることができます。空白の場合、自動生成された名前が使用されます。
* **Description** — Keyの説明を入力できます。
* **Server Limit** — そのキーの下に登録可能なサーバの数
* **Feed** — 特定のフィードを選択するか、空白のままにします。

 _Save_ をクリックしてキーを追加します。新しい登録キーが作成され、リストに追加されます。Key自体は個々のサーバで登録コマンドの一部として使用されます。

 _Save and Add Another_ をクリックすると、このKeyが保存され、Keyがもう1つ追加されます。

 _Save and Continue Editing_ をクリックすると、Keyが追加され、Key編集タブが開かれます。

 _Cancel_ をクリックすると、新しいKeyを追加せずにKeyリストタブに戻ります。


## サーバの管理


 [Keyを管理する](/jp/kernelcare_enterprise/#keyを管理する) のインターフェイスで Key自体をクリックすると、そのKeyに属するサーバを確認できます。

![](/images/server_list_1_zoom70.png)


画面にはKeyの下で登録されている　サーバ　IP、ホスト名、有効なカーネル、および登録時刻と最後のチェックインが表示されます。

### スクリプトの管理


::: tip 注記
スクリプトがePortalで機能しない場合、最初にePortalをアップデートする必要があります。 ePortalをアップデートするには、次のコマンドを実行します。:

```
> yum update kcare-eportal
```
:::
特定のキーに接続されているすべてのサーバIDのリストを表示するには以下を実行します。:
* UIではKeyのリストがあるページに移動します。それから特定のKeyをクリックします。このKeyに接続されているサーバのリストが表示されます。

どのKeyにも接続されていないすべてのサーバIDのリストを表示するには、ナビゲーションバーの <span class="notranslate">_Servers_</span> ボタンを使用します。

![](/images/eportal-servers.png)


### パッチセットを展開するスクリプト


パッチセットを展開するには、次のコマンドを実行します。:

```
> kc.eportal --unroll 16012017_1
```

### KeyごとにePortalの管理下にあるサーバの数を決定するスクリプト


Keyのペア/サーバ数を確認するには、次のコマンドを実行します。:

```
> kc.eportal --list-servers
```
| | |
|-|-|
|Count | Key|
|`0` | `2shcolu7Y1x6885Q`|
|`2` | `6J89aS44j6OmTr05`|


### 最新のパッチセットを自動的にインストールするためのスクリプト

最新のパッチが利用可能かどうかを判断し、インストールします。

```
>kc.eportal --get-latest
```

### UIからパッチを展開する

 
パッチソースページには利用可能なパッチのリストがあります。パッチを展開するには _Roll back this patch, and all after it_ ボタンをクリックします。
パッチとそれ以降のすべてのパッチをロールバックするために使用します。

### 管理UIに拡張チェックイン統計を表示する

新しいテーブルが開始ページに追加されます。このテーブルには次のものが表示されます。:
* サーバの総数
* 過去48時間にチェックインしたサーバの数

各Keyのサーバ数は _Key Inventory_ テーブルに表示されます。

### 読み取り専用ユーザを作成する機能

```
[root@localhost ~]# kc.eportal -l
Num | Username
--- + --------------------------------
 1 | admin
 2 | user
[root@localhost ~]# kc.eportal -r user
User 'user' is now readonly
```

### フィード管理



フィードはサーバ上のパッチセットを管理することを目的としており、パッチセットを特定のKeyにバインドする可能性を提供します。 使用例: パッチの予備テスト、類似のハードウェアを持つサーバグループへのアップデートの適用など。

フィード管理インターフェースに入るには Settings → Feeds と進みます。:

![](/images/feed-button_zoom70.png)

このページにおいてユーザは既存のフィードを管理することができます。: create(作成)、delete(削除)、edit(編集)

![](/images/feed-menu_zoom70.png)

利用可能なオプション:
* Name — フィードの名前
* Auto update — このフィードへのパッチの自動ダウンロードを有効または無効にします
* Deploy after X hours — パッチセットが展開可能になってからフィードにインストールされるまでの時間

10分ごとにePortalは、メインのパッチサーバで新しいパッチをチェックしています。新しいパッチが入手可能であれば、ePortalサーバにアップロードされます。 注記: そのパッチはアップロードされていますが、展開はされていません。パッチの入手可能時間は新しいパッチがePortalに表示された時点から開始すると考えられ、その時間は `Deploy after X hours` オプションで設定されます。従って、ユーザが `Deploy after X hours = 10` と設定すると、パッチはePortalサーバにダウンロードされてから10時間後にフィードに展開されます。

フィードをすぐに自動アップデートする（つまり、ePortalで利用可能になった直後に新しいパッチがフィードにロードされるようにする）には、 `Deploy after X hours = 0` に設定します。

特別なケースとしては、ePortalが新しいサーバにインストールされている場合のクリーンインストールです（デフォルトフィードを含みパッチを含むダウンロードされたアーカイブや展開されたパッチセットを含むフィードはありません）。この場合、ユーザが新しいフィードを作成して　Deployed after X hours　オプションをすぐに設定すると、指定したX時間後にすべてのパッチ（最も古いものから最新のものまで）がフィードに展開されます。これはアーカイブが最初からダウンロードされ、「ePortalに表示されたばかり」と見なされるためです。つまりすべてのパッチはePortal上で同じ出現時刻を持ち、それ以降は Deploy after X hours オプションは無効になります。

![](/images/feedmanagement3_zoom70.png)

メインのePortalページにてユーザは対応するKey <> フィードペアを設定できます。 これはKey作成インターフェースまたはKeyを編集するときに行われます。

![](/images/feedmanagement4_zoom70.png)

デフォルトでは新しいKeyはデフォルトのフィードにバインドされています。もしくはユーザはドロップダウンメニューから目的のフィードを選択できます。

![](/images/feedmanagement5_01_zoom70.png)

::: tip 注記
フィードを削除すると、このフィードに添付されているすべてのKeyがデフォルトのフィードに移動します。
:::

![](/images/feedmanagement6_zoom70.png)

### 追加タグフィールドを追加する


 
サーバに追加タグフィールドを追加するには、次のコマンドを実行します。:

```
kcarectl --tag command
```

この `command` はユーザが定義したパラメーターです。このパラメータはサーバのUIに表示されます。ユーザは各サーバに複数のタグを追加できます。各タグは `;` で区切る必要があります。

例:

```
kcarectl --tag “env:prod;ubuntu”
```

このサーバには2つのタグがあります。: `env:prod` と `ubuntu`.

`env:prod` はタグ名 `env` と 値 `prod`　を持つパラメータです。

![](/images/addingextratagfield_zoom88.png)

特定のサーバからすべてのタグを削除するには、次のコマンドを実行します。:

```
kcarectl --tag ""
```

この `""` は以前に定義したタグを削除するためのパラメータです。


### HTTPSを使用するePortalを設定する方法


e-portalが展開されているサーバに関するいくつかの前提条件:

1. ファイアウォールが443ポートで無効になっている。
2. プライベートKeyとパブリックKeyがサーバにダウンロードされている。

* 証明書に従ってSSL設定テンプレートを編集します。:

```
mv /etc/nginx/eportal.ssl.conf.example /etc/nginx/eportal.ssl.conf
vi /etc/nginx/eportal.ssl.conf
```

* この設定をメインの設定に含めます。:

```
sed -e '3iinclude eportal.ssl.conf;' -i /etc/nginx/conf.d/eportal.conf
```

* nginxをリスタートします。:

```
service nginx restart
```

アップデートされたhttps、e-portalと通信するためには、IPがハードコードされたサーバ設定がある場合、すべてのサーバ上のKernelCare設定ファイルを変更する必要があります。

そうするためには `PATCH_SERVER` 環境変数と `REGISTRATION_URL` 環境変数をアップデートします。:

```
vi /etc/sysconfig/kcare/kcare.conf
```

したがって `/etc/sysconfig/kcare/kcare.conf` を編集した後、以下の例のようにアップデートされた `PATCH_SERVER` および `REGISTRATION_URL` 環境変数を含める必要があります。:

```
PATCH_SERVER=https://eportal_domain_name/
REGISTRATION_URL=https://eportal_domain_name/admin/api/kcare
```


次の例はhttps用に設定されたe-portalに新しいサーバを接続する方法を示しています。:

```
$ export KCARE_PATCH_SERVER=https://eportal_domain_name/
$ export KCARE_REGISTRATION_URL=https://eportal_domain_name/admin/api/kcare
$ export KCARE_MAILTO=admin@mycompany.com
$ curl -s https://repo.cloudlinux.com/kernelcare/kernelcare_install.sh | bash
$ /usr/bin/kcarectl --register key_from_your_eportal
```

## KernelCareの展開


ePortalを使用するために、kernelcareクライアントソフトウェアを展開するには、RPMをインストールする前に以下の環境変数を設定する必要があります。:

| |  | |
|-|--|-|
|**環境変数** | **値** | **説明**|
|`KCARE_PATCH_SERVER` | http://eportal_ip/ | パッチのダウンロード元となるサーバのURL|
|`KCARE_REGISTRATION_URL` | http://eportal_ip/admin/api/kcare | ePortalのapiのURL|
|`KCARE_MAILTO [ver2.5以降]` | email@address | KernelCareアップデートの失敗に関連する全ての通知を受け取るEmailアドレス。 `/etc/cron.d/kcare-cron`　で使用。|

例:

```
$ export KCARE_PATCH_SERVER=http://10.1.10.115/
$ export KCARE_REGISTRATION_URL=http://10.1.10.115/admin/api/kcare
$ export KCARE_MAILTO=admin@mycompany.com
$ curl -s https://repo.cloudlinux.com/kernelcare/kernelcare_install.sh | bash
$ kcarectl --register r72fF838Q47oWigj
```

## KernelCareクライアント設定ファイル


KernelCareクライアント設定ファイルは `/etc/sysconfig/kcare/kcare.conf` にあります。

例:

```
AUTO_UPDATE=True
PATCH_SERVER=http://10.1.10.115/
REGISTRATION_URL=http://10.1.10.115/admin/api/kcare
```

`AUTO_UPDATE` が `True` に設定されている場合、KernelCareクライアントは4時間ごとにチェックインし、最新のパッチをダウンロードして適用しようとします。

`PATCH_SERVER` - パッチのダウンロード元となるサーバ

`REGISTRATION_URL` - サーバの登録/登録解除に使用されるURL


## 展開の自動化

Ansible/Puppet/Chef/Saltのような自動化ツールを使用して、多数のシステムにKernelCareをインストールして操作することが可能です。

展開プロセスは次を含みます。:

* KernelCareエージェントパッケージのダウンロード、配布、およびインストール
* ePortal関連のエントリで `/etc/sysconfig/kcare/kcare.conf` のアップデート
* アクティベーションキーを使用してKernelCareエージェントを登録

### Ansible

自動展開を始めるためには、下記の情報を特定する必要があります。:

*  `eportal_srv` Ansible変数の中の ePortalサーバ名（もしくはIP）。 他の設定ファイルオプションは、 [設定オプション](/jp/config_options/) と [KernelCareクライアント設定ファイル](/jp/kernelcare_enterprise/#KernelCareクライアント設定ファイル) (ePortal)で見つけることができます。
*  `activation_key` Ansible変数の中の アクティベーションkey。 アクティベーションkeyは、ePortalの中にある [Keyを管理する](/jp/kernelcare_enterprise/#keyを管理する) (ePortal)で、生成することができます。

展開フェーズ用のAnsible playbookは、下記の様になるはずです(RPMベースのディストリビューション)。:

```
- hosts: el7_based
  vars:
    eportal_srv: http://192.168.245.105
    activation_key: jvQ5T0SVMt7736a9
  tasks:
  - name: Copy an installation package, use the package that suits your target platform (see KernelCare install script for download links)
    get_url:
      url: https://repo.cloudlinux.com/kernelcare/kernelcare-latest-7.rpm
      dest: /root/kernelcare-latest-7.rpm
    delegate_to: 127.0.0.1
    become: false

  - name: Distribute the installation package
    copy:
      src: /root/kernelcare-latest-7.rpm
      dest: /root/kernelcare-latest-7.rpm

  - name: install the package from a local file
    yum:
      name: /root/kernelcare-latest-7.rpm
      state: present

  - name: Update kcare.conf with ePortal configuration
    blockinfile:
      path: /etc/sysconfig/kcare/kcare.conf
      block: |
        PATCH_SERVER={{ eportal_srv }}/
        REGISTRATION_URL={{ eportal_srv }}/admin/api/kcare

  - name: register KernelCare agents
    command: /usr/bin/kcarectl --register {{ activation_key }}
```

Ubuntu/Debianを使用している場合、playbookは下記のようになります。:

```
- hosts: deb8_based
  vars:
    eportal_srv: http://192.168.245.105
    activation_key: jvQ5T0SVMt7736a9
  tasks:
  - name: Copy an installation package, use the package that suits your target platform (see KernelCare install script for download links)
    get_url:
      url: https://repo.cloudlinux.com/kernelcare-debian/kernelcare-latest-8.deb
      dest: /root/kernelcare-latest-8.deb
    delegate_to: 127.0.0.1
    become: false

  - name: Distribute an installation package
    copy:
      src: /root/kernelcare-latest-8.deb
      dest: /root/kernelcare-latest-8.deb

  - name: install the package from a local file
    apt:
      deb: /root/kernelcare-latest-8.deb

  - name: Update kcare.conf with ePortal configuration
    blockinfile:
      path: /etc/sysconfig/kcare/kcare.conf
      block: |
        PATCH_SERVER={{ eportal_srv }}/
        REGISTRATION_URL={{ eportal_srv }}/admin/api/kcare

  - name: register KernelCare agents
    command: /usr/bin/kcarectl --register {{ activation_key }}
```

KernelCare agentをリムーブするためのAnsible playbookファイルの例:

```
- hosts: el7_based
  tasks:
    - name: unregister KernelCare agents
      command: /usr/bin/kcarectl --unregister

    - name: remove kernelcare package
      yum:
        name: kernelcare
        state: absent
```

Ubuntu/Debianシステム向け:

```
- hosts: deb8_based
  tasks:
    - name: unregister KernelCare agents
      command: /usr/bin/kcarectl --unregister

    - name: remove kernelcare package
      apt:
        name: kernelcare
        state: absent
```

## ePortal IP の変更


ePortal IPはいつでも変更できますが、IPがハードコードされている場合、すべてのサーバ上のKernelCare設定ファイルを変更する必要があります。

これを行うには `/etc/sysconfig/kcare/kcare.conf` を編集します。

変更:

```
PATCH_SERVER=http://10.1.10.115/
REGISTRATION_URL=http://10.1.10.115/admin/api/kcare
```

正しいロケーションを指定します。


## 設定とロケーション


Webサーバ（nginx）の設定は `/etc/nginx/conf.d/eportal.conf` にあります。

データベース（sqlite）は `/usr/share/kcare-eportal/data.sqlite` に保管されています。
データベースをリセットするには、次のコマンドを実行します。:

```
$ rm /usr/share/kcare-eportal/data.sqlite
$ cd /usr/share/kcare-eportal && python createdb.py
```

サーバがパッチにアクセスできるかどうかを判断するために使用されるクライアントアクセスデータファイルは、 `/usr/share/kcare-eportal/kcare_servers.htpasswd` に格納されています。

パッチは `/usr/share/kcare-eportal/patches` に格納されています。


## 停止とスタート


### EL6上のKernelCare.ePortal



nginxサーバの設定を 停止/スタート/再読み込み/再スタート するには次のコマンドを実行します。:

```
$ /etc/init.d/nginx stop|start|reload|restart
```

ePortalを 停止/スタート/再スタート するには、次のコマンドを実行します。（Python）:

```
$ /etc/init.d/uwsgi stop|start|restart
```


### EL7上のKernelCare.ePortal



nginxサーバの設定を 停止/スタート/再読み込み/再スタート するには次のコマンドを実行します。:

```
$ systemctl stop|start|reload|restart nginx
```

ePortalを 停止/スタート/再スタート するには、次のコマンドを実行します。（Python）:

```
$ systemctl stop|start|restart emperor.uwsgi
```


## ログファイル


ePortal メッセージ/エラー: `/var/log/uwsgi/uwsgi-emperor.log`

nginx ePortal アクセスログ: `/var/log/nginx/kcare-eportal.log`

nginx エラーログ: `/var/log/nginx/error_log`


## Nagios と Zabbixのサポート


バージョン1.2以降のKernelCare.ePortalは [Nagios](/jp/nagios_plugin/) および [Zabbix](/jp/zabbix_template/) モニターと同様のサーバモニターをサポートしています。

APIを直接カールして情報を受け取ることができます:

```
https://yourserver/admin/api/kcare/nagios/KCAREKEY
```

または [http://patches.kernelcare.com/downloads/nagios/check_kcare](http://patches.kernelcare.com/downloads/nagios/check_kcare) スクリプトを使用して、自分のサーバを指すように KEY_KCARE_NAGIOS_ENDPOINT を変更することもできます ( [https://cln.cloudlinux.com/clweb](https://cln.cloudlinux.com/clweb) （古いUIへのリンク）を変更、または [https://cln.cloudlinux.com/console/auth/login](https://cln.cloudlinux.com/console/auth/login) （新しいUIへのリンク）とともに [https://yourserver/admin](https://yourserver/admin) を変更)。

::: tip 注記
 `PARTNER_LOGIN/TOKEN` を使用したアクセスはKernelCare.ePortalではサポートされていません。
:::

## 使用状況レポート

一般的な場合、使用状況レポートは自動的に送信されますが、それが不可能な場合、ePortalsはレポートを電子メールとして送信しようとします。 そのためには、ホストで構成済みのSendmail（SSMTP）が必要です。 以下に簡単な説明があります。

メールの送信に失敗すると、ePortalはレポートを `/usr/share/kcare-eportal/reports` に保存します。これは手動で送信する必要があります。

### Sendmail（SSMTP）を構成する方法

まず、 `ssmtp` をインストールする必要があります。

    yum install -y ssmtp

SMTPサーバの構成に従って、`/etc/ssmtp/ssmtp.conf` ファイルを編集します。 以下は、Gmailアカウントに接続する一般的な方法を説明する簡単な設定ファイルです。

    root=username@gmail.com
    mailhub=smtp.gmail.com:587
    hostname=localhost
    UseSTARTTLS=YES
    AuthUser=username@gmail.com
    AuthPass=xxxxxxxxxxxxxxxxxxx
    FromLineOverride=YES
    TLS_CA_File=/etc/ssl/certs/ca-certificates.crt

TLS_CA_Filesの実際の場所は、ディストリビューションに依存します。

    "/etc/ssl/certs/ca-certificates.crt",                // Debian/Ubuntu/Gentoo etc.
    "/etc/pki/tls/certs/ca-bundle.crt",                  // Fedora/RHEL 6
    "/etc/ssl/ca-bundle.pem",                            // OpenSUSE
    "/etc/pki/tls/cacert.pem",                           // OpenELEC
    "/etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem", // CentOS/RHEL 7

下記でも取得できます。

    curl-config --ca

これで接続をテストできます：

    echo -n 'Subject: test\n\nTesting ssmtp' | sendmail -v some-recipient@gmail.com

## カスタム環境変数

ePortalプロセス用に独自の環境変数を定義できます。

`/usr/share/kcare-eportal/environment` フォルダがあります。これは、基本的にenvdir互換のデーモンツールです。

例えば、デフォルトのhttps証明書検証を無効にするには、次のように `PYTHONHTTPSVERIFY` 環境変数を `0` に設定できます。

```
echo 0 > /usr/share/kcare-eportal/environment/PYTHONHTTPSVERIFY`
```
