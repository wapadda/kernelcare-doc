# 基本的な管理方法


自動更新を無効にするには以下のコマンドを実行してください。:

次のファイルを編集してください。 `/etc/sysconfig/kcare/kcare.conf`

```
AUTO_UPDATE=False 
```

有効なアップデートバージョンを確認するには以下のコマンドを実行してください。:

```
$ /usr/bin/kcarectl --uname 
```

 `uname` と同じシンタックスを持つ便利なスクリプトである `/usr/bin/kcare-uname` を使用してください。

適用されたパッチを見るには以下のコマンドを実行してください。:

```
$ /usr/bin/kcarectl --patch-info 
```

