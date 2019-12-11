const urls = require("./urls-mapping.js");

module.exports = {
  base: "/",

  // tracking ids
  head: [
      ["script", { src: "https://js.hs-scripts.com/5408110.js" }], // HubSpot
      ["link", { rel: "icon", href: "/favicon.ico" }],
  ],
  ga: "UA-12711721-6", // google analitics
  fbPixelID: "645174729237247", // facebook pixel

  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/": {
      lang: "en-US", // this will be set as the lang attribute on <html>
      title: "Documentation",
      description: "KernelСare documentation"
    },
    "/jp/": {
      lang: "jp",
      title: "ドキュメンテーション",
      description: "KernelCare ドキュメンテーション"
    }
  },
  theme: "cloudlinux",
  themeConfig: {
    repo: "cloudlinux/kernelcare-doc",
    editLinks: true,
    docsBranch: "dev",
    docsDir: "docs",

    defaultURL: "/installation/",
    redirectionMapping: urls,
    sidebarDepth: 2,
    logo: "/logo.svg",
    try_free: "https://www.kernelcare.com/free-trial/",

    social: [
      { url: "https://www.facebook.com/kernelcare/", logo: "/fb.png" },
      { url: "https://twitter.com/kernelcare/", logo: "/tw.png" },
      { url: "https://linkedin.com/company/cloudlinux", logo: "/in.png" },
      {
        url: "https://www.youtube.com/channel/UCZ3YMHWnMP7TaxlXVay5-aw",
        logo: "/ytube.png"
      }
    ],
    cloudlinuxSite: "https://cloudlinux.com",
    locales: {
      "/": {
        // text for the language dropdown title
        title: "Language",
        // text for the language dropdown
        selectText: "En",
        // label for this locale in the language dropdown
        label: "English",
        // text for the edit-on-github link
        editLinkText: "Edit this page",
        tryFree: "Try Free",
        search: "Search",
        // config for Service Worker
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        algolia: {
          apiKey: "c4c1bbf8d3bb32958b26dd7cc5e74472",
          indexName: "kernelcare",
          appId: "R7FCMJM4P7"
        },
        bottomLinks: [
          {
            text: "How to",
            url: "https://www.kernelcare.com/install-kernelcare/"
          },
          {
            text: "Sales and Technical FAQs",
            url: "https://www.kernelcare.com/faq/"
          },
          {
            text: "Contact support",
            url: "https://cloudlinux.zendesk.com/hc/en-us/requests/new"
          },
          { text: "Blog", url: "https://www.kernelcare.com/blog/" }
        ],

        sidebar: [
          {
            title: "Content",
            collapsable: false,
            children: [
              "/installation/",
              "/settings/",
              "/command_line/",
              "/how_to's/",
              "/config_options/",
              "/disabling_some_patches/",
              "/delayed_feed/",
              "/extra_patchset/",
              "/sticky_patches/",
              "/scanner_interface/",
              "/nagios_plugin/",
              "/zabbix_template/",
              "/upgrade/",
              "/uninstall/",
              "/technology/",
              "/AWS_deployment_guide/",
              "/reseller_partner_ui/",
              "/kernelcare_enterprise/",
              "/kcare-nexpose/",
              "/kernelcare_whmcs_plugin/",
              "/proxy_settings/",
              "/eol_ubuntu_lts_kernels_support/"
            ]
          }
        ]
      },
      "/jp/": {
        title: "言語",
        selectText: "日本語",
        label: "日本語",
        editLinkText: "編集",
        tryFree: "無料で試す",
        search: "検索する",
        serviceWorker: {
          updatePopup: {
            message: "新しいコンテンツが利用可能です",
            buttonText: "最新の情報に更新"
          }
        },
        algolia: {
          apiKey: "c4c1bbf8d3bb32958b26dd7cc5e74472",
          indexName: "kernelcare-jp",
          appId: "R7FCMJM4P7"
        },
        stayInTouch: "連絡を取り合う",
        bottomLinks: [
            {
                text: "ヘルプと使い方",
                url: "https://www.kernelcare.com/ja/install-kernelcare/"
            },
            {
                text: "よく寄せられる質問",
                url: "https://www.kernelcare.com/ja/faq/"
            },
            {
                text: "サポート",
                url: "https://www.kernelcare.com/ja/support/"
            },
            { text: "ブログ", url: "https://www.kernelcare.com/ja/blog/" }
        ],
        sidebar: [
          {
            title: "コンテンツ",
            collapsable: false,
            children: [
              "/jp/installation/",
              "/jp/settings/",
              "/jp/command_line/",
              "/jp/how_to's/",
              "/jp/config_options/",
              "/jp/disabling_some_patches/",
              "/jp/delayed_feed/",
              "/jp/extra_patchset/",
              "/jp/sticky_patches/",
              "/jp/scanner_interface/",
              "/jp/nagios_plugin/",
              "/jp/zabbix_template/",
              "/jp/upgrade/",
              "/jp/uninstall/",
              "/jp/technology/",
              "/jp/AWS_deployment_guide/",
              "/jp/kernelcare_enterprise/",
              "/jp/kcare-nexpose/",
              "/jp/kernelcare_whmcs_plugin/",
              "/jp/proxy_settings/",
              "/jp/eol_ubuntu_lts_kernels_support/"
            ]
          }
        ]
      }
      // "/ru/": {
      //   selectText: "Выберите язык",
      //   label: "Русский",
      //   editLinkText: "Отредактировать на GitHub",
      //   serviceWorker: {
      //     updatePopup: {
      //       message: "Новый контент доступен",
      //       buttonText: "Обновить"
      //     }
      //   },
      //   algolia: {},
      //   sidebar: [
      //     {
      //       title: "Содержание",
      //       collapsable: false,
      //       children: [
      //         "/ru/installation/",
      //         "/ru/settings/",
      //         "/ru/command_line/",
      //         "/ru/config_options/",
      //         "/ru/disabling_some_patches/",
      //         "/ru/delayed_feed/",
      //         "/ru/extra_patchset/",
      //         "/ru/sticky_patches/",
      //         "/ru/nagios_plugin/",
      //         "/ru/zabbix_template/",
      //         "/ru/upgrade/",
      //         "/ru/uninstall/",
      //         "/ru/technology/",
      //         "/ru/AWS_deployment_guide/",
      //         "/ru/reseller_partner_ui/",
      //         "/ru/kernelcare_enterprise/",
      //         "/ru/kcare-nexpose/",
      //         "/ru/kernelcare_whmcs_plugin/",
      //         "/ru/proxy_settings/",
      //         "/ru/eol_ubuntu_lts_kernels_support/"
      //       ]
      //     }
      //   ]
      // }
    }
  }
};
