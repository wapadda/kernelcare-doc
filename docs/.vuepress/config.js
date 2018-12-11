const URLS = {
  "/installation.htm/": "/installation/",
  "/index.html?installation.htm": "/installation/",
  "/switching_from_ksplice.htm/": "/installation/#switching-from-ksplice",
  "/index.html?switching_from_ksplice.htm":
    "/installation/#switching-from-ksplice",
  "/settings.htm/": "/settings/",
  "/index.html?settings.htm": "/settings/",
  "/command_line.htm/": "/command_line/",
  "/index.html?command_line.htm": "/command_line/",
  "/kcarectl.htm/": "/command_line/#kcarectl",
  "/index.html?kcarectl.htm": "/command_line/#kcarectl",
  "/kcare-uname.htm/": "/command_line/#kcare-uname",
  "/index.html?kcare-uname.htm": "/command_line/#kcare-uname",
  "/config_options.htm/": "/config_options/",
  "/index.html?config_options.htm": "/config_options/",
  "/disabling_some_patches.htm/": "/disabling_some_patches/",
  "/index.html?disabling_some_patches.htm": "/disabling_some_patches/",
  "/delayed_feed.htm/": "/delayed_feed/",
  "/index.html?delayed_feed.htm": "/delayed_feed/",
  "/extra_patchset.htm/": "/extra_patchset/",
  "/index.html?extra_patchset.htm": "/extra_patchset/",
  "/sticky_patches.htm/": "/sticky_patches/",
  "/index.html?sticky_patches.htm": "/sticky_patches/",
  "/nagios_plugin.htm/": "/nagios_plugin/",
  "/index.html?nagios_plugin.htm": "/nagios_plugin/",
  "/zabbix_template.htm/": "/zabbix_template/",
  "/index.html?zabbix_template.htm": "/zabbix_template/",
  "/upgrade.htm/": "/upgrade/",
  "/index.html?upgrade.htm": "/upgrade/",
  "/uninstall.htm/": "/uninstall/",
  "/index.html?uninstall.htm": "/uninstall/",
  "/technology.htm/": "/technology/",
  "/index.html?technology.htm": "/technology/",
  "/reseller_partner_ui.htm/": "/reseller_partner_ui/",
  "/index.html?reseller_partner_ui.htm": "/reseller_partner_ui/",
  "/kernelcare_enterprise.htm/": "/kernelcare_enterprise/",
  "/index.html?kernelcare_enterprise.htm": "/kernelcare_enterprise/",
  "/installation2.htm/": "/kernelcare_enterprise/#installation",
  "/index.html?installation2.htm": "/kernelcare_enterprise/#installation",
  "/managing_users.htm/": "/kernelcare_enterprise/#managing-users",
  "/index.html?managing_users.htm": "/kernelcare_enterprise/#managing-users",
  "/accessing_eportal.htm/": "/kernelcare_enterprise/#accessing-eportal",
  "/index.html?accessing_eportal.htm":
    "/kernelcare_enterprise/#accessing-eportal",
  "/patchset_deployment.htm/": "/kernelcare_enterprise/#patchset-deployment",
  "/index.html?patchset_deployment.htm":
    "/kernelcare_enterprise/#patchset-deployment",
  "/managing_keys.htm/": "/kernelcare_enterprise/#managing-keys",
  "/index.html?managing_keys.htm": "/kernelcare_enterprise/#managing-keys",
  "/managing_servers.htm/": "/kernelcare_enterprise/#managing-servers",
  "/index.html?managing_servers.htm":
    "/kernelcare_enterprise/#managing-servers",
  "/deploying_kernelcare.htm/": "/kernelcare_enterprise/#deploying-kernelcare",
  "/index.html?deploying_kernelcare.htm":
    "/kernelcare_enterprise/#deploying-kernelcare",
  "/kernelcare_client_config_file.htm/":
    "/kernelcare_enterprise/#kernelcare-client-config-file",
  "/index.html?kernelcare_client_config_file.htm":
    "/kernelcare_enterprise/#kernelcare-client-config-file",
  "/changing_eportal_ip.htm/": "/kernelcare_enterprise/#changing-eportal-ip",
  "/index.html?changing_eportal_ip.htm":
    "/kernelcare_enterprise/#changing-eportal-ip",
  "/configuration__locations.htm/":
    "/kernelcare_enterprise/#configuration-locations",
  "/index.html?configuration__locations.htm":
    "/kernelcare_enterprise/#configuration-locations",
  "/stopping__starting.htm/": "/kernelcare_enterprise/#stopping-starting",
  "/index.html?stopping__starting.htm":
    "/kernelcare_enterprise/#stopping-starting",
  "/log_files.htm/": "/kernelcare_enterprise/#log-files",
  "/index.html?log_files.htm": "/kernelcare_enterprise/#log-files",
  "/eportal_api.htm/": "/kernelcare_enterprise/#eportal-api",
  "/index.html?eportal_api.htm": "/kernelcare_enterprise/#eportal-api",
  "/nagios__zabbix_support.htm/":
    "/kernelcare_enterprise/#nagios-zabbix-support",
  "/index.html?nagios__zabbix_support.htm":
    "/kernelcare_enterprise/#nagios-zabbix-support",
  "/kcare-nexpose.htm/": "/kcare-nexpose/",
  "/index.html?kcare-nexpose.htm": "/kcare-nexpose/",
  "/installation3.htm/": "/kcare-nexpose/#installation",
  "/index.html?installation3.htm": "/kcare-nexpose/#installation",
  "/how_it_works.htm/": "/kcare-nexpose/#how-it-works",
  "/index.html?how_it_works.htm": "/kcare-nexpose/#how-it-works",
  "/how_to_launch.htm/": "/kcare-nexpose/#how-to-launch",
  "/index.html?how_to_launch.htm": "/kcare-nexpose/#how-to-launch",
  "/yaml_config_file_description.htm/":
    "/kcare-nexpose/#yaml-config-file-description",
  "/index.html?yaml_config_file_description.htm":
    "/kcare-nexpose/#yaml-config-file-description",
  "/kernelcare_whmcs_plugin.htm/": "/kernelcare_whmcs_plugin/",
  "/index.html?kernelcare_whmcs_plugin.htm": "/kernelcare_whmcs_plugin/",
  "/overview.htm/": "/kernelcare_whmcs_plugin/#overview",
  "/index.html?overview.htm": "/kernelcare_whmcs_plugin/#overview",
  "/installation_configuration.htm/":
    "/kernelcare_whmcs_plugin/#installation-configuration",
  "/index.html?installation_configuration.htm":
    "/kernelcare_whmcs_plugin/#installation-configuration",
  "/installation_and_update.htm/":
    "/kernelcare_whmcs_plugin/#installation-and-update",
  "/index.html?installation_and_update.htm":
    "/kernelcare_whmcs_plugin/#installation-and-update",
  "/configuration_of_product.htm/":
    "/kernelcare_whmcs_plugin/#configuration-of-product",
  "/index.html?configuration_of_product.htm":
    "/kernelcare_whmcs_plugin/#configuration-of-product",
  "/configuration_of_addon.htm/":
    "/kernelcare_whmcs_plugin/#configuration-of-add-on",
  "/index.html?configuration_of_addon.htm":
    "/kernelcare_whmcs_plugin/#configuration-of-add-on",
  "/management.htm/": "/kernelcare_whmcs_plugin/#management",
  "/index.html?management.htm": "/kernelcare_whmcs_plugin/#management",
  "/link_via_addon_optional_lice.htm/":
    "/kernelcare_whmcs_plugin/#link-via-add-on-optional-license",
  "/index.html?link_via_addon_optional_lice.htm":
    "/kernelcare_whmcs_plugin/#link-via-add-on-optional-license",
  "/link_products_directly.htm/":
    "/kernelcare_whmcs_plugin/#link-products-directly",
  "/index.html?link_products_directly.htm":
    "/kernelcare_whmcs_plugin/#link-products-directly",
  "/link_via_configurable_options.htm/":
    "/kernelcare_whmcs_plugin/#link-via-configurable-options",
  "/index.html?link_via_configurable_options.htm":
    "/kernelcare_whmcs_plugin/#link-via-configurable-options",
  "/link_addons_directly.htm/":
    "/kernelcare_whmcs_plugin/#link-add-ons-directly",
  "/index.html?link_addons_directly.htm":
    "/kernelcare_whmcs_plugin/#link-add-ons-directly",
  "/kernelcare_key_licenses.htm/":
    "/kernelcare_whmcs_plugin/#kernelcare-key-licenses",
  "/index.html?kernelcare_key_licenses.htm":
    "/kernelcare_whmcs_plugin/#kernelcare-key-licenses",
  "/order.htm/": "/kernelcare_whmcs_plugin/#order",
  "/index.html?order.htm": "/kernelcare_whmcs_plugin/#order",
  "/admin_area.htm/": "/kernelcare_whmcs_plugin/#admin-area",
  "/index.html?admin_area.htm": "/kernelcare_whmcs_plugin/#admin-area",
  "/client_area.htm/": "/kernelcare_whmcs_plugin/#client-area",
  "/index.html?client_area.htm": "/kernelcare_whmcs_plugin/#client-area",
  "/licenses_list.htm/": "/kernelcare_whmcs_plugin/#licenses-list",
  "/index.html?licenses_list.htm": "/kernelcare_whmcs_plugin/#licenses-list",
  "/add-on_licenses_list.htm/":
    "/kernelcare_whmcs_plugin/#add-on-licenses-list",
  "/index.html?add-on_licenses_list.htm":
    "/kernelcare_whmcs_plugin/#add-on-licenses-list",
  "/common_problems.htm/": "/kernelcare_whmcs_plugin/#common-problems",
  "/index.html?common_problems.htm":
    "/kernelcare_whmcs_plugin/#common-problems",
  "/proxy_settings.htm/": "/proxy_settings/",
  "/index.html?proxy_settings.htm": "/proxy_settings/",
  "/eol_ubuntu_lts_kernels_support.htm/": "/eol_ubuntu_lts_kernels_support/",
  "/index.html?eol_ubuntu_lts_kernels_support.htm":
    "/eol_ubuntu_lts_kernels_support/",
  "/downloading_documentation.htm/": "/downloading_documentation/",
  "/index.html?downloading_documentation.htm": "/downloading_documentation/"
};

module.exports = {
  base: "/",
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/": {
      lang: "en-US", // this will be set as the lang attribute on <html>
      title: "Documentation",
      description: "Kernelcare documentation"
    }
    // TODO: temporary!
    // "/ru/": {
    //   lang: "ru",
    //   title: "Документация",
    //   description: "Документация Kernelcare"
    // }
  },
  // theme: "cloudlinux",
  theme: "/Users/prefer/src/cloudlinux-doc-theme", // local path

  themeConfig: {
    defaultURL: "/installation/",
    redirectionMapping: URLS,
    sidebarDepth: 2,
    logo: "/logo.svg",
    try_free: "https://cloudlinux.com/kernelcare-free-trial5",
    bottomLinks: [
      { text: "How to", url: "#" },
      { text: "Getting started", url: "#" },
      {
        text: "Contact support",
        url: "https://cloudlinux.zendesk.com/hc/en-us/requests/new"
      },
      { text: "Blog", url: "https://www.cloudlinux.com/kernelcare-blog" }
    ],
    social: [
      { url: "https://www.facebook.com/kernelcare/", logo: "/fb.svg" },
      { url: "https://twitter.com/kernelcare/", logo: "/tw.svg" },
      { url: "https://linkedin.com/company/cloudlinux", logo: "/in.svg" },
      {
        url: "https://www.youtube.com/channel/UCZ3YMHWnMP7TaxlXVay5-aw",
        logo: "/ytube.svg"
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
        editLinkText: "Edit this page on GitHub",
        // config for Service Worker
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        // algolia docsearch options for current locale
        algolia: {},

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
              "/reseller_partner_ui/",
              "/kernelcare_enterprise/",
              "/kcare-nexpose/",
              "/kernelcare_whmcs_plugin/",
              "/proxy_settings/",
              "/eol_ubuntu_lts_kernels_support/",
              "/downloading_documentation/"
            ]
          }
        ]
      },
      "/ru/": {
        selectText: "Выберите язык",
        label: "Русский",
        editLinkText: "Отредактировать на GitHub",
        serviceWorker: {
          updatePopup: {
            message: "Новый контент доступен",
            buttonText: "Обновить"
          }
        },
        algolia: {},
        sidebar: [
          {
            title: "Содержание",
            collapsable: false,
            children: [
              "/ru/installation/",
              "/ru/settings/",
              "/ru/command_line/",
              "/ru/config_options/",
              "/ru/disabling_some_patches/",
              "/ru/delayed_feed/",
              "/ru/extra_patchset/",
              "/ru/sticky_patches/",
              "/ru/nagios_plugin/",
              "/ru/zabbix_template/",
              "/ru/upgrade/",
              "/ru/uninstall/",
              "/ru/technology/",
              "/ru/reseller_partner_ui/",
              "/ru/kernelcare_enterprise/",
              "/ru/kcare-nexpose/",
              "/ru/kernelcare_whmcs_plugin/",
              "/ru/proxy_settings/",
              "/ru/eol_ubuntu_lts_kernels_support/",
              "/ru/downloading_documentation/"
            ]
          }
        ]
      }
    }
  }
};
