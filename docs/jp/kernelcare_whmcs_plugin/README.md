# KernelCare WHMCSプラグイン

[[toc]]

## 概要

WHMCSのCloudLinuxライセンスを使用すると、KernelCare、Imunify 360、CloudLinuxのライセンスとその製品を自動的に使用できるようになります。無料または有料のアドオンとして製品にプロビジョニングできます。CloudLinux Licensesアドオンのおかげでメイン製品のすべてのモジュールコマンドは自動的にライセンス製品に再現されます。

KernelCareの価格およびサポートに関する日本語及び日本の問合せ先は　[GDEPソリューションズ株式会社](http://www.gdep-sol.co.jp/) Tel: +81-3-5802-7050  E-mail: kcsales@gdep-sol.co.jp となります。

**アドミンエリアの機能**

* ライセンスを作成
* ライセンスを終了
* ライセンスの一時停止/一時停止解除（IPベースのライセンスのみ）
* ライセンスIPアドレスの変更
* ライセンス詳細の表示

**クライアントエリアの機能**

* ライセンス詳細の表示
* ライセンスIPアドレスの変更

**アドオン機能**

* アドオンとライセンス製品の関係を管理
* サーバとライセンス製品の関係を管理
* リレーションがトリガーされたときにライセンス製品を自動的に追加
* 既存のライセンスを表示
* すべてのアクションに関してモジュールアクション間の依存関係: サーバ製品に対して呼び出された作成、終了、中断、または中断解除は、ライセンス製品に対しても同じ処理が実行されます
* 既存のライセンスの柔軟なフィルタリング

**さらに**

* 多言語サポート – プロビジョニングモジュールのみ
* CloudLinux、KernelCare、およびImunify 360ライセンスをサポート
* WHMCS V6以降をサポート


## インストールと設定


このセクションでは当社の製品を設定する方法を紹介します。

### インストールとアップデート


WHMCS用のCloudLinuxライセンスをダウンロードします。:

* **本番環境**: [http://repo.cloudlinux.com/plugins/whmcs-cl-plugin-latest.zip](http://repo.cloudlinux.com/plugins/whmcs-cl-plugin-latest.zip)
* **ベータ**: [http://repo.cloudlinux.com/plugins/whmcs-cl-plugin-beta.zip](http://repo.cloudlinux.com/plugins/whmcs-cl-plugin-beta.zip)
* 
アーカイブをWHMCSのルートフォルダにアップロードして解凍します。ファイルは自動的にその場所に保管されます。
次のスクリプトを実行してください。:

```
php <whmcs_root>/clDeploy.php --migrate
```


### 製品の設定


1. WHMCS管理エリアにログインし、 _Setup → Products/Services → Products/Services_ に進みます。 _Create a New Group_ をクリックします。
2.  _Product Group Name_ を入力し（product groupはWHMCSシステムでその名前の下に表示されます）、 _Save Changes_ をクリックします。
3.  _Create a New Product_ をクリックします。 _Product Type_ ドロップダウンメニューから _Other_ を選択し、 _Product Group_ ドロップダウンメニューから以前に作成したproduct groupを選択します。
4.  _Product Name_ を入力して _Continue_ をクリックします。
5.  _Details_ タブの _Hidden_ チェックボックスをクリックして、この商品を非表示に設定します。この製品の価格設定をしないでください。価格設定は別の方法で行われます。
6.  _Module Settings_ タブに移動し、 _Module Name_ ドロップダウンから **_CloudLinux Licenses_** を選択します。
7. CloudLinux APIアクセスの詳細を _Username_ と _Password_ に入力し、 _License Type_ ドロップダウンから **_KernelCare_** を選択します。
8.  _Save Changes_ をクリックして確定します。


### アドオンの設定


1.  _Setup → Add-on Modules_ の順に選択し、 _CloudLinux Licenses Add-on_ を見つけて、その横にある _Activate_ をクリックします。
2. 次のステップはこのモジュールへのアクセスを許可することです。  _Configure_をクリックし、admin roleを選択して、 _Save Changes_ をクリックして確認します。

| |
:-------------------------:
|![](/images/kernelcarelicenseforwhmcs_zoom70.png)|
|Fig 1: WHMCSプロビジョニングモジュール構成用KernelCareライセンス|

| |
:-------------------------:
|![](/images/fig2kernelcarelicenseforwhmcsaddonmodulemainpage_zoom70.png)|
|Fig 2: WHMCSアドオンモジュールメインページ用KernelCareライセンス|


## 管理


このセクションではライセンス製品をサーバ製品とリンクする2つの方法、およびモジュールの他の可能性を見つけることができます。

### アドオンを介してのリンク。　オプションライセンス


クライアントがライセンスの有無にかかわらずサーバを注文するかどうかを決定できるようにするために、Product Add-onを使用します。 このようにして、クライアントがアドオンを注文すると、関係がトリガーされ、ライセンス製品がモジュールとともに注文されます。

このような接続を準備するには、次の手順を実行する必要があります。:

1.  _Setup → Products/Services → Products Add-ons_ の順に進み、 _Add New Add-on_ をクリックします。
2. add-on nameを入力し、billing cycleとpriceを設定します。
3.  _Show on Order_ チェックボックスをオンにして、製品にアドオンを割り当て、 _Save Changes_ をクリックします。

| |
:-------------------------:
|![](/images/fig3configurationofproductaddon1_zoom70.png)|
|![](/images/fig3configurationofproductaddon2_zoom70.png)|
|![](/images/fig3-3_zoom50.png)|
|Fig 3: ライセンス製品の追加をトリガーするproduct add-onの設定|

4.  _Add-ons → CloudLinux Licenses Add-on → Add-on Relations_ と進み、 _Add Relation_ をクリックします。
5. 以下に示すように以前に作成した製品アドオンとライセンス製品を選択し、 _Add Relation_ をクリックします。

| |
:-------------------------:
|![](/images/fig4creatingrelation_zoom70.png)|
|Fig 4: 製品アドオンとプロビジョニングモジュール間の関係を作成|


### 製品を直接リンク


ライセンスと一緒にサーバを提供する場合、次の手順を実行してください。

::: tip 注記
ライセンスプロビジョニング製品の価格設定をしないでください。代わりにサーバプロビジョニング製品の価格を上げることができます。
:::

1. この文書の [製品の設定](/jp/kernelcare_whmcs_plugin/#製品の設定) セクションの説明に従って、ライセンスプロビジョニング製品を準備します。
2.  _Add-ons → CloudLinux Licenses Add-on → Products Relations_ の順に進み、 _Add Relation_　をクリックします。
3.  _Main product_ ドロップダウンリストからサーバプロビジョニング製品を選択、 _Linked Product With License_ からライセンスプロビジョニング製品を選択し、 _Add Relation_ をクリックします。

| |
:-------------------------:
|![](/images/fig5creatingrelationdirectly_zoom70.png)|
|Fig 5: サーバとライセンスプロビジョニングモジュール間に直接関係を作成|

### Configurable Options(設定可能なオプション)によるリンク 


クライアントがライセンスの有無にかかわらずサーバを注文するかどうかを決定できるようにするために、Configurable Options ( [https://docs.whmcs.com/Addons_and_Configurable_Options](https://docs.whmcs.com/Addons_and_Configurable_Options)) を使用できます。
以下にこのような接続を準備するための手順を示します。:

1.  [ここ](/jp/kernelcare_whmcs_plugin/#製品の設定) に記載されているようなCloudLinuxLicenses製品を設定します。
2.  _Setup → Products/Services → Configurable Options_ の順に選択して、 _Create a New Group_ をクリックします。
3. グループ名を入力して、 _New Configurable Option_ を追加し、billing cycle、price、option typeを設定します。次に変更を保存します。
4.  _Add-ons → CloudLinux Licenses Add-on → Configurable Options Relations_ に移動して、 _Add Relation_ をクリックします。
5. 割り当てられている適切な構成可能オプションおよびライセンス製品を選択して、 _Add Relation_ をクリックします。

::: tip 注記
このプラグインは `quantity` タイプのConfigurable Optionsをサポートしていません。
:::

| |
:-------------------------:
|![](/images/fig6creatingrelationdirectlybetweenserverandlicenseprovisioningmodules_zoom70.png)|
|Fig 6: サーバとライセンスプロビジョニングモジュール間に直接関係を作成|


### Add-onsを直接リンク

::: tip 注記
WHMCS 7.2.x以降で可能です。
:::

WHMCS 7.2ではProduct Add-onsをProvisioning Modulesに関連付ける機能が導入されました。

クライアントがライセンスの有無にかかわらずサーバを注文するかどうかを決定できるようにするために、製品アドオンを使用します。以下にこのような接続を準備するための手順を示します。

1.  _Setup → Products/Services → Products Add-ons_ の順に進み、 _Add New Add-on_ をクリックします。
2. add-on nameを入力し、billing cycleとpriceを設定します。 次に _Show on Order_ チェックボックスをオンにして、製品にアドオンを割り当てます。
3.  _Module Settings_ タブに移動し、 _Module Name_ ドロップダウンから _CloudLinux Licenses_ を選択します。
4. CloudLinux API アクセス (API secret key) の詳細を _Username_ and _Password_ に入力し、 _License Type_ ドロップダウンから **_KernelCare_** を選択します。
5.  _Save Changes_ をクリックして確定します。

| |
:-------------------------:
|![](/images/fig6configurationofproductaddonwithprovisioningmodules_zoom70.png)|
|Fig 7: Provisioning Modulesを使用したProduct Add-onの設定|

### KernelCare Key ライセンス


1. Module Settingsでサービスを追加しながらKernelCare Keyライセンスを設定するには次の手順に従います。:

*  _License Type_ ドロップダウンで **_KernelCare_** を選択します。;
* (IPアドレスの代わりに) _Use Key_ チェックボックスをマークします。;
* CLNのプロファイルページからIP登録トークン(API secret key)を入力します。;
*  _Key Limit_ フィールドにサーバ数を入力し、 _Save Changes_ をクリックします。;
  
| |
:-------------------------: 
|![](/images/fig7setupkernelcarelicense_zoom70.png)|
|Fig 8: KernelCareライセンスの設定|

*  _License Key Custom Field_ が自動的に追加されます。

| |
:-------------------------: 
|![](/images/fig8licensekeycustomfield_zoom70.png)|
|Fig 9: サービスの編集中に License Key Custom Field が表示されます|

2. サービスを編集するには次のように行います。:
*  _Service Created Successfully_ メッセージが表示されたら、 _Service_ を編集できます。;
* 適切な情報と設定をすべて指定して、 _Save Changes_ をクリックします。

| |
:-------------------------: 
|![](/images/fig9editingservice._zoom70.png)|
|Fig 10: サービスの編集|


### 注文


アカウントに登録されているすべてのサービスが _My Products & Services_ エリアに表示されます。 特定の製品/サービスを選択して _View Details_ をクリックすると、製品情報の表示、ライセンスキーの変更、アドオンの表示ができます。または、 _Management Actions_ セクションで変更を行うことができます。

| |
:-------------------------: 
|![](/images/fig10clientproductslist_zoom70.png)|
|Fig 11: クライアントの製品リスト|

| |
:-------------------------: 
|![](/images/fig11licensesdetails_zoom70.png)|
|Fig 12: ライセンスの詳細|

新しいサービスを注文して購入するには、次の手順に従います。:

* 特定のサービスにおいて _Category → KernelCare Group_ の順に選択し、 _Order Now_ をクリックします。;

| |
:-------------------------: 
|![](/images/fig12orderproductsgroup_zoom70.png)|
|Fig 13: Order - Productsグループ|

* 可能であれば _Billing Cycle_ を選択します。;
*  _Configure Server_ エリアに情報を入力します。;
*  _Available Add-ons_ を選択して _Continue Shopping_ をクリックして先に進むか、 _Checkout_ をクリックしてサービスの詳細を表示します。;

| |
:-------------------------: 
|![](/images/hmfile_hash_2e6c26d3.png)|
|Fig 14: Order - Configure製品|

* もし持っていれば、特定のフィールドに _Promotional Code_ を入力します。;
*  _Payment Method_ を選択し、 _Continue Shopping_ をクリックします。

| |
:-------------------------: 
|![](/images/fig14orderreviewandcheckout_zoom70.png)|
|Fig 15: Order - レビューとチェックアウト|


### 管理エリア

管理エリアから作成、終了、中断/中断解除、IPアドレスまたはライセンスキーの変更などのアクションを指示することができます。それにもかかわらず、これらのアクションはサーバプロビジョニングモジュール上でのみ注文でき、ライセンスプロビジョニング製品に対して自動的に再現されます。

IPアドレスの変更機能のみを手動で注文する必要があります。

作成したライセンスの詳細も表示できます。

| |
:-------------------------: 
|![](/images/fig15kernelcarelicenses_zoom70.png)|
|Fig 16: WHMCS 管理エリア用KernelCareライセンス|

### クライアントエリア


クライアントは自分のサーバのライセンス詳細を表示することもできます。そして、ライセンスのIPアドレスやライセンスキーを変更することができます。

| |
:-------------------------: 
|![](/images/fig16kernelcarelicenses_zoom70.png)|
|Fig 17: WHMCS クライアントエリア用KernelCareライセンス|

IPアドレスまたはライセンスキーを変更するには、上記画面に示すように _Change_ をクリックします。次にIPアドレスまたはライセンスキーを指定して _Save_ をクリックします。

| |
:-------------------------: 
|![](/images/fig17changinglicensekeyoripaddress_zoom70.png)|
|Fig 18: ライセンスキーまたはIPアドレスの変更|


### ライセンスリスト


クライアントが所有するすべてのライセンスの一覧は、add-on →_Licenses List_で確認できます。

クライアント名、サーバプロビジョニング製品、ライセンスプロビジョニング製品、およびライセンスIPアドレス/Keyで、ライセンスのリストをフィルターできます。

| |
:-------------------------: 
|![](/images/fig18-newlicenseslist_zoom70.png)|
|Fig 19: ライセンスリスト|



### アドオンライセンス一覧

::: tip 注記
WHMCS 7.2.x以降で可能です。
:::

add-on → _Licenses List_ でクライアントが所有している _Provisioning Modules_ ライセンスを持つすべての製品アドオンのリストを表示できます。

| |
:-------------------------: 
|![](/images/fig19newaddonlicenseslist_zoom70.png)|
|Fig 20: Add-on ライセンスリスト|

## よくある問題

サーバプロビジョニング製品をアクティブ化した後、それにバインドされたライセンスプロビジョニング製品はまだ保留中です。

**理由**: ライセンスIPアドレスがすでに取得されている可能性があります。

**解決策**: サーバのIPアドレスを変更してください。

::: tip 注記
現在、Imunify360にはキーベースのライセンスしかありません。 IPベースのライセンスのサポートは近日中に追加される予定です。
:::


