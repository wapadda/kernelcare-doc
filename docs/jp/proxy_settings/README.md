# ファイアウォールとプロキシの設定


## ファイアウォール以下のサーバへのパッチ適用
 
あなたのサーバがNATの後ろにあっても、インターネットにアクセスできる限り、何の問題もなくKernelCareパッチサーバを使うことができます。

一般的に、KernelCareは正常な作業のために、2つのサーバへの接続のみを必要とします。:

```
cln.cloudlinux.com
patches.kernelcare.com
```

追加のアドレスがKernelCareエージェントのインストール/アップデートに使用されます。:

```
repo.cloudlinux.com
```

![](/images/patchingthroughfirewall.png)

## プロキシ経由でサーバにパッチを適用


 
サーバがインターネットに直接アクセスできないが、プロキシを使用してインターネットにアクセスできる場合、構成はそれほど変わりません。 KernelCareは、プロキシ用の標準的な環境変数を取得できます。

プロキシ設定の環境設定があることを確認してください。それ以外は全て、サーバがインターネットに直接接続されている場合と同じです。:

```
# export http_proxy=http://proxy.domain.com:port
# export https_proxy=http://proxy.domain.com:port
```

![](/images/patchingthroughproxy.png)

