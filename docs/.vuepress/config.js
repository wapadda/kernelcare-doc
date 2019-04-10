const urls = require("./urls-mapping.js");

module.exports = {
  base: "/",

  // tracking ids
  head: [["script", { src: "https://js.hs-scripts.com/5408110.js" }]], // HubSpot
  ga: "UA-12711721-6", // google analitics
  fbPixelID: "645174729237247", // facebook pixel

  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/": {
      lang: "en-US", // this will be set as the lang attribute on <html>
      title: "Documentation",
      description: "Kernelcare documentation"
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
    try_free: "https://cloudlinux.com/kernelcare-free-trial5",

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
        // text for the language dropdown
        selectText: "Languages",
        // label for this locale in the language dropdown
        label: "English",
        // text for the edit-on-github link
        editLinkText: "Edit this page",
        // config for Service Worker
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        algolia: {
          apiKey: "9e2f9685334c9bab4a296dce7b5b77cd",
          indexName: "kernelcare"
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
              "/config_options/",
              "/disabling_some_patches/",
              "/delayed_feed/",
              "/extra_patchset/",
              "/sticky_patches/",
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
