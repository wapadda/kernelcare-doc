# Nagiosプラグイン


`check_kcare` は古くなったサーバや非アクティブなサーバを監視する方法を提供するNagiosプラグインです。KernelCare Keyに割り当てられているサーバまたはパートナーアカウントのすべてのサーバに関する情報を提供できます。

Nagiosモニタリングシステムのインストールから始めます。

このプラグインは [http://patches.kernelcare.com/downloads/nagios/check_kcare](http://patches.kernelcare.com/downloads/nagios/check_kcare) からダウンロードすることができます。

そのプラグインを ` /usr/lib64/nagios/plugins/ ` ディレクトリに配置し、以下のコマンドを実行してこのスクリプトを実行可能な状態にします。:

```
chmod +x /usr/lib64/nagios/plugins/check_kcare
```

以下のテンプレートから `kcare.cfg` 設定ファイルを作成し、 `/etc/nagios/conf.d/` ディレクトリに配置します。

 `KERNELCARE_KEY` の代わりにKernelCare Keyも指定する必要があります。 ライセンスがIPベースの場合、CLNアカウントの_Profile_セクションに、ログインとAPIセキュリティトークンを見つけることができます。

Nagiosサービスを再起動（リスタート）し、Nagios Web UI (http://NAGIOS_IP/nagios/) にアクセスします。_Services_リンク(_Hosts_の左上)をクリックします。モニタリングスクリプトからの出力を示す文字列を見つけることができるはずです（下記のスクリーンショットをご覧ください）。

スクリプトオプション:

| | |
|-|-|
|`-k KERNELCARE_KEY` | KEYに関連したサーバの状況を取得|
|`-l PARTNER_LOGIN --api-token TOKEN` | ログイン/トークンをベースとしたパートナーアカウントのすべてのサーバ状況を取得|
|`-c o,u,i -- return CRITICAL` | カンマで区切られた o, u & i のリスト<br>`o` - 非最新<br>`u` - 未知のカーネル<br>`i` - 非アクティブサーバ|
|`-w o,u,i -- return WARNING` | カンマで区切られた o, u & i のリスト<br>`o` - 非最新<br>`u` - 未知のカーネル<br>`i` - 非アクティブサーバ|

KeyベースのKernelCareライセンスの設定の例は以下の通りです（IPベースのセクションはここではコメントアウトされています）。:

KernelCareステータスチェックサービスを関連付けるホストの例です

```
define host {
      host_name                       kcare-service
      notifications_enabled           0
      max_check_attempts             1
      notification_interval           0
      check_period                   24x7
}
 
 
define command {
      command_name     check_kcare
      command_line     /usr/lib64/nagios/plugins/check_kcare -k $ARG1$
}
 
define command {
      command_name     check_kcare_opts
      command_line     /usr/lib64/nagios/plugins/check_kcare -k $ARG1$ -c $ARG2$ -w $ARG3$
}
define command {
      command_name     check_kcare_partner
      command_line     /usr/lib64/nagios/plugins/check_kcare -l $ARG1$ --api-token $ARG2$
}
 
define command {
      command_name     check_kcare_partner_opts
      command_line     /usr/lib64/nagios/plugins/check_kcare -k $ARG1$ -l $ARG1$ --api-token $ARG2$ -c $ARG2$ -w $ARG3$
}
 
define service {
      host_name                       kcare-service
      service_description             KernelCare Server Status Checker By Key
      check_command                   check_kcare!KERNELCARE_KEY
      notifications_enabled           1
      check_interval                 240
      retry_interval                 60
      max_check_attempts             4
      notification_options           w,c,r
      check_period                     24x7
      notification_period             24x7
}
 
#define service {
#       host_name                       kcare-service
#       service_description             KernelCare Server Status Checker By login/token with outdated/inactive considered as critical
#       check_command                   check_kcare_partner_opts!partner_login!partner_token!o,i!u
#       notifications_enabled           1
#       check_interval                  240
#       retry_interval                  60
#       max_check_attempts              4
#       notification_options            w,c,r
#       check_period                     24x7
#       notification_period             24x7
#}
```


![](/images/nagiosservices_zoom70.png)



![](/images/hmfile_hash_6837b862.png)






