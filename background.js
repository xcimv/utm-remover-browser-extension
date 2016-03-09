;(function() {
  "use strict";

  function removeUtmParams(url) {
    // https://gist.github.com/paulirish/626834#file-utmstrip-user-js-L30-L35
    return url.replace(/\?([^#]*)/, function(_, search) {
      search = search.split("&").map(function(v) {
        return !/^utm_/.test(v) && v;
      }).filter(Boolean).join("&");
      return search ? "?" + search : "";
    });
  }

  var callback = function(details) {
    if (details.url.indexOf("utm_") === -1) {
      return;
    }

    return { redirectUrl: removeUtmParams(details.url) };
  };
  var filter = { urls: ["*://*/*"] };
  var extraInfoSpec = ["blocking"];

  chrome.webRequest.onBeforeRequest.addListener(callback, filter, extraInfoSpec);
})();
