# How To 集

## 再起動せずにハイパースレッディング（SMT）を無効にする方法: KernelCare case

この文書では、最近発見された MDS / Zombieload の脆弱性を軽減するために、KernelCare を使用して再起動せずに SMT（Simultaneous Multithreading） を無効または有効にする方法について説明します。

CPU 同時マルチスレッド化（SMT）を無効にすることは、最近の MDS の脆弱性（「Zombieload」とも呼ばれる）に対抗するために必要な軽減策の1つです。ホスティングプラットフォームの構成とそのワークロードパターンによっては、パフォーマンスに影響があります。また、ゲストに専用コアを割り当てるなど、他の軽減策の影響も考慮する必要があります（VM など）。

カーネルの `sysfs` インタフェースを使ってSMTの状態を制御したり、取得したりできます。2つのファイルがあり、両方とも `/sys/devices/system/cpu/smt` ディレクトリにあります。:

* `control`
* `active`


 `/sys/devices/system/cpu/smt` ディレクトリが見つからない場合は、実行中のカーネルがSMTをサポートしていないことを意味します。この場合、SMTコントロールがシステムで利用可能になるように KernelCareパッチ を適用する必要があります。以下の `kcarectrl` コマンドを使用してください。:

```
kcarectl --update
Kernel is safe
```

```
ls -l /sys/devices/system/cpu/smt
-r--r--r-- 1 root root 4096 May 17 13:06 active
-rw-r--r-- 1 root root 4096 May 17 13:06 control
```

これらのファイルを配置したらすぐに、SMTを無効にすることができます。


<iframe width="560" height="315" src="https://www.youtube.com/embed/RUGCvEO1hAE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### SMT のコントロール

`/sys/devices/system/cpu/smt/control`

このファイルを使用してSMTを有効または無効にし、またその状態も表示できます。値は3つあります。:

1. `on`: CPU は SMT をサポートしており、有効になっています。すべての 論理CPU は、制限なしにオフラインまたはオンラインにできます。
2. `off`: CPU は SMT をサポートしていますが、無効になっています。制限なしにオフライン/オンラインにできるのは、いわゆるプライマリ　SMT　スレッドだけです。非プライマリ兄弟（sibling）スレッドをオンラインにしようとすると拒否されます。
3. `notsupported`: CPU は SMT をサポートしていません。制御ファイルに書き込むことはできません。

### SMT ステータス

`/sys/devices/system/cpu/smt/active`

このファイルの内容は、SMT のステータスを示します（たとえば、同じ物理コア上で2つ以上の兄弟（sibling）スレッドがアクティブである場合、このファイルの内容は1で、そうでない場合は0です）。

SMTサポートを制御するためのコマンドがいくつかあります（root権限が必要です）。:

#### SMT の状態を確認

```
cat /sys/devices/system/cpu/smt/active
```

#### SMT を有効に

```
echo on > /sys/devices/system/cpu/smt/control
```

#### SMT を無効に

```
echo off > /sys/devices/system/cpu/smt/control
```

SMTを無効にし、 [マイクロコードを更新し](/how_to's/#ベンダ提供のパッケージで再起動せずにマイクロコードを更新する方法), KernelCare パッチを適用すると、ZombieLoad の脆弱性からシステムが保護されます。仮想システム（VM、VPS、その他のクラウドインスタンスタイプなど）には、後者のアクションのみが適用されます。

#### 例

ビデオの例が [ここにあります](https://asciinema.org/a/zZYA3INITh59ObzSGp9OeLCdn)。

## ベンダ提供のパッケージで再起動せずにマイクロコードを更新する方法

この文書では、Linux を実行している Intel CPU のマイクロコードを更新する方法を説明します。

::: tip 注記
この文書は変更されることがあり、他のディストリビューションのための指示で更新されます。
:::

**内容:**

* [UbuntuとDebianでのマイクロコード更新](/how_to's/#UbuntuとDebianでのマイクロコード更新)
* [Red Hat Enterprise Linux（およびその派生物）でのマイクロコード更新)](/how_to's/#Red-HatおよびCentOSでのマイクロコード更新)


::: tip 注記
* これらの手順はrootとして実行する必要があります。
* 示されている例はDebian用です。 (Debian 9のビデオの例は [ここをクリックします](https://asciinema.org/a/pWVQb2xR2K65B9TAfWwgvhOvG)。)
* あなたのシステムが　CPU　および　カーネル関連の脆弱性から完全に保護されていることに疑念がある場合は、 [KernelCare社、もしくは GDEPソリューションズ株式会社に連絡を取って下さい。](mailto:kcsales@gdep-sol.co.jp).
:::

### UbuntuとDebianでのマイクロコード更新

1. あなたのプラットフォーム用のマイクロコードパッケージのダウンロードリンクを探します。
   
    * Ubuntu: [https://usn.ubuntu.com/3977-1/](https://usn.ubuntu.com/3977-1/)
    * Debian: [https://packages.debian.org/search?keywords=intel-microcode](https://packages.debian.org/search?keywords=intel-microcode)
  
2. パッケージをダウンロードします。

:::tip 注記
Debian 9　の例
:::

```
cd <a temporary directory, e.g. /tmp>
mkdir firmware
cd firmware
wget http://security.debian.org/debian-security/pool/updates/non-free/i/intel-microcode/intel-microcode_3.20190514.1~deb9u1_amd64.deb
```

3. ダウンロードしたパッケージをチェックします。

```
md5sum intel-microcode_3.20190514.1~deb9u1_amd64.deb
c7bc9728634137453e0f4821fb6bb436  intel-microcode_3.20190514.1~deb9u1_amd64.deb
```

チェックサムのリストは [Debianパッケージのダウンロードページ](https://packages.debian.org/stretch/amd64/intel-microcode/download) にあります。

4. パッケージを解凍します。

```
dpkg -x intel-microcode_3.20190514.1~deb9u1_amd64.deb
```

5. 解凍したファイルをチェックします。

```
ls -l
total 1896
drwxr-xr-x 5 root root   53 May 15 04:18 etc
-rw-r--r-- 1 root root 1940140 May 17 11:42 intel-microcode_3.20190514.1~deb9u1_amd64.deb
drwxr-xr-x 3 root root   22 May 15 04:18 lib
drwxr-xr-x 3 root root   19 May 15 04:18 usr
```
6. 既存のマイクロコードのバックアップを作成します。

```
test -d /lib/firmware/intel-ucode/ && mv /lib/firmware/intel-ucode/ /lib/firmware/intel-ucode.backup
```

7. 新しいマイクロコードをコピーして、チェックします。

```
cp -r lib/firmware/intel-ucode/ /lib/firmware/
ls -l /lib/firmware/ | grep intel-ucode
drwxr-xr-x  2 root root 4096 May 17 11:47 intel-ucode
drwxr-xr-x  2 root root 4096 May 16 20:54 intel-ucode.backup
```

8. 現在のマイクロコードのバージョンをチェックします。

```
dmesg | grep microcode
[ 2.254717] microcode: sig=0x306a9, pf=0x10, revision=0x12
[ 2.254820] microcode: Microcode Update Driver: v2.01 <tigran@aivazian.fsnet.co.uk>, Peter Oruba
```

9. (オプション) 現在のマイクロコードのバージョン（コアあたりのリビジョン）を、再チェックします。

```
cat /proc/cpuinfo | grep -e microcode
microcode : 0x12
microcode : 0x12
microcode : 0x12
microcode : 0x12
```

10. マイクロコードリロードファイルが存在することを確認します。

```
ls -l /sys/devices/system/cpu/microcode/reload
--w------- 1 root root 4096 May 17 11:54 /sys/devices/system/cpu/microcode/reload
```

11. カーネルに新しいマイクロコードを強制的にロードさせます。

```
echo 1 > /sys/devices/system/cpu/microcode/reload
```

12. 新しいマイクロコードをチェックします。

```
dmesg | grep microcode
[ 2.254717] microcode: sig=0x306a9, pf=0x10, revision=0x12
[ 2.254820] microcode: Microcode Update Driver: v2.01 <tigran@aivazian.fsnet.co.uk>, Peter Oruba
[ 1483.494573] platform microcode: firmware: direct-loading firmware intel-ucode/06-3a-09
[ 1483.495985] microcode: updated to revision 0x21, date = 2019-02-13
[ 1483.496012] platform microcode: firmware: direct-loading firmware intel-ucode/06-3a-09
[ 1483.496698] platform microcode: firmware: direct-loading firmware intel-ucode/06-3a-09
[ 1483.497391] platform microcode: firmware: direct-loading firmware intel-ucode/06-3a-09
```

13. (オプション) 新しいマイクロコードのバージョン（コアあたりのリビジョン）を、再チェックします。

```
cat /proc/cpuinfo | grep -e microcode
microcode : 0x21
microcode : 0x21
microcode : 0x21
microcode : 0x21
```

### Red HatおよびCentOSでのマイクロコード更新

RHEL ベースのディストリビューションの場合は、 `microcode_ctl utility` を使用して、マイクロコードを更新できます。

1.  `microcode_ctl` パッケージを更新して最新のマイクロコードを入手します。

```
yum update microcode_ctl
```

2. 強制ファイルを作成します。

 `force-late-intel–06–4f–01` ファームウェアディレクトリの内側を作成します。

```
touch /lib/firmware/`uname -r`/force-late-intel-06-4f-01
```

3. マイクロコードのアップデートを実行します。

```
/usr/libexec/microcode_ctl/update_ucode
```

4. カーネルに新しいマイクロコードを強制的にロードさせます。

```
echo 1 > /sys/devices/system/cpu/microcode/reload
```

5. 新しいマイクロコードをチェックします。

```
dmesg | grep microcode
[ 2.254717] microcode: sig=0x306a9, pf=0x10, revision=0x12
[ 2.254820] microcode: Microcode Update Driver: v2.01 <tigran@aivazian.fsnet.co.uk>, Peter Oruba
[ 1483.494573] platform microcode: firmware: direct-loading firmware intel-ucode/06-3a-09
[ 1483.495985] microcode: updated to revision 0x21, date = 2019-02-13
[ 1483.496012] platform microcode: firmware: direct-loading firmware intel-ucode/06-3a-09
[ 1483.496698] platform microcode: firmware: direct-loading firmware intel-ucode/06-3a-09
[ 1483.497391] platform microcode: firmware: direct-loading firmware intel-ucode/06-3a-09
```

6. (オプション) 新しいマイクロコードのバージョン（コアあたりのリビジョン）を、再チェックします。

```
cat /proc/cpuinfo | grep -e microcode
microcode : 0x21
microcode : 0x21
microcode : 0x21
microcode : 0x21
```

<iframe width="560" height="315" src="https://www.youtube.com/embed/EydWy-b9uns" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### CentOS 6でのマイクロコードの更新

1, `microcode_ctl` パッケージを更新して最新のマイクロコードを取得します

```
yum update microcode_ctl
```

2, `yum update microcode_ctl` が次を出力する場合,

```
Package(s) microcode_ctl available, but not installed.
No Packages marked for Update
```

パッケージを手動でインストールする必要があります。

3, `microcode_ctl` パッケージをインストールするには、次のコマンドを実行します

```
yum install microcode_ctl
```

コマンド出力:

```
Installed:
  microcode_ctl.x86_64 2:1.17-33.11.el6_10                                                                                                                                 

Complete!
```
 
4, CPUマイクロコードバージョンを確認します.

```
cat /proc/cpuinfo | grep microcode
microcode       : 9
microcode       : 9
microcode       : 9
microcode       : 9
```

5, マイクロコードを更新してみてください

```
microcode_ctl -u
```

出力が表示される場合：

```
microcode_ctl: writing microcode (length: 2370560)
microcode_ctl: cannot open /dev/cpu/microcode for writing errno=2 (No such file or directory)
```

ドライバーのマイクロコードをロードする必要があります。

6, ドライバーのマイクロコードを読み込みます

```
modprobe microcode
```

7, マイクロコードをもう一度更新してみてください

```
microcode_ctl -u
```

出力が表示される場合

```
microcode_ctl: writing microcode (length: 2370560)
microcode_ctl: microcode successfully written to /dev/cpu/microcode
```

更新は成功です。

8, バージョンを確認してください：

```
cat /proc/cpuinfo | grep microcode
microcode       : 17
microcode       : 17
microcode       : 17
microcode       : 17
```

<iframe width="560" height="315" src="https://www.youtube.com/embed/EydWy-b9uns" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
