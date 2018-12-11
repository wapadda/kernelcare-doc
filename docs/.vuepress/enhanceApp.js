import URLS from "./urls.js";
export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  router.addRoutes([{ path: "/", redirect: "/installation/" }]);

  router.beforeEach((to, from, next) => {
    if (/.htm[l]*$/.test(to.path)) {
      const newUrl = URLS[location.pathname + location.search];
      if (newUrl) {
        router.push(newUrl);
      } else {
        next();
      }
    } else {
      next();
    }
  });
};
