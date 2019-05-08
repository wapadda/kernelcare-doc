import VueFacebookPixel from "vue-analytics-facebook-pixel";

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  const isClient = typeof window !== "undefined";
  if (isClient && siteData.fbPixelID) {
    Vue.use(VueFacebookPixel);
    Vue.analytics.fbq.init(siteData.fbPixelID);
  }
};
