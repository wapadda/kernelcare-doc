# KernelCare のインストール


KernelCareは64ビットバージョンのCentOS/RHEL 6.xおよび7.x、CloudLinux 6.xおよび7.x、Virtuozzo/PCS/OpenVZ 2.6.32、Debian 8および9、Proxmox VE 4、Virt-SIG/Xen4CentOS 6および7、Ubuntu 14.04、15.04および16.04 kernelと互換性があります。互換性のあるカーネルのリストは次のリンクよりご参照ください。: [https://patches.kernelcare.com/](https://patches.kernelcare.com/) .

KernelCareをインストールするには次のコマンドを実行します。:

```
curl -s -L https://kernelcare.com/installer | bash
```

もしくは:

```
wget -qq -O - https://kernelcare.com/installer | bash
```

もしIPベースのライセンスを使用している場合、その他に必要な作業はありません。

もしキーベースのライセンスを使用している場合、次のコマンドを実行してください。:

```
$ /usr/bin/kcarectl --register KEY
```

上記コマンドの `KEY` とは製品の購入またはトライアルを申し込んだ際に提供された登録キーコード文字列です。

もしトライアル期間の終了後に **_Key limit reached_** エラーが発生した場合、まず次のコマンドを実行し、サーバーの登録を解除する必要があります。:

```
kcarectl --unregister
```

パッチが適用されているかどうかを確認するには、次のコマンドを実行してください。:

```
$ /usr/bin/kcarectl --info
```

ソフトウェアは自動的に4時間毎に新しいパッチをチェックします。

もし手動でアップデートを実行したい場合、次のコマンドを実行してください。:

```
$ /usr/bin/kcarectl --update
```

KernelCareと現在使用しているOSのカーネルとの互換性を確認するためには、リンク先のこの [script](https://raw.githubusercontent.com/iseletsk/kernelchecker/master/py/kc-compat.py) を使用し、次のコマンドを実行してください。:

```
curl -s -L https://kernelcare.com/checker | python
```

もしくは:

```
wget -qq -O - https://kernelcare.com/checker | python
```

より詳細については次のリンクよりご確認ください。: [https://www.kernelcare.com/ja/faq/](https://www.kernelcare.com/ja/faq/)

## Kspliceからの切り替え


KspliceからKernelCareに切り替えるためには、Kspliceをアンインストールし、代わりにKernelCareをインストールし、以下のリンク先にあるスクリプトを使用してください。

システムが64ビットでない場合（KernelCareは64ビット以外のサポートを行っていないため）、自動的に検出し、停止します。

Kspliceモジュールをアンインストールできない場合も検出し、複数回再試行します。

スクリプトについては次のリンク先よりダウンロードしてください。: [http://patches.kernelcare.com/ksplice2kcare](http://patches.kernelcare.com/ksplice2kcare) .

次のコマンドを実行してください。:

```
$ bash ksplice2kcare $KERNELCARE_KEY$
```

このkeyはCLNのKernelCare Keysセクションにおいて作成/取得されます。

IPベースのライセンスを使用したい場合は、次のコマンドを実行してください。:

```
$ bash ksplice2kcare IP
```

そのサーバへIPライセンスを追加する必要がありますが、それは実際のIPアドレスではなくIPという2文字を記入するということです。

デフォルトではスクリプトはkspliceのアンインストールを3回試行し、それぞれの試行の間には60秒間待ちます。待ちたくない場合 `nohup` を使い、コマンドを実行できます。

またスクリプトを編集し、 `RETRY` と `SLEEP` の値を変更することによってそれを変更できます。

スクリプトは終了コード `0` で終了し、成功すれば _Done_ というメッセージが表示されます。それ以外の場合は終了コード `-1` が表示されます。

完全なログファイルは `/var/log/ksplice2kcare.log` に格納されています。

