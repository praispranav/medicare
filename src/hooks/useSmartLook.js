import React, { useEffect } from "react";

export function useSmartLook() {
  useEffect(() => {
    window.smartlook ||
      (function (d) {
        var o = (window.smartlook = function () {
            o.api.push(arguments);
          }),
          h = d.getElementsByTagName("head")[0];
        var c = d.createElement("script");
        o.api = new Array();
        c.async = true;
        c.type = "text/javascript";
        c.charset = "utf-8";
        c.src = "https://web-sdk.smartlook.com/recorder.js";
        h.appendChild(c);
      })(document);
    window.smartlook("init", "86bca46341ffe5cbb59fc94a232c9c5d9d96c08c", {
      region: "eu",
    });
  }, []);

  return {};
}

export default useSmartLook