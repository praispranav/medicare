import $ from "jquery";
import { useEffect } from "react";
import { sessionStorageKeys } from "../constants/localStorage";
import { RINGBA_SCRIPT_ID } from "../constants/ringba";

export function useRgbaHook() {
  const storeRgbaData = (key, value) => {
    const rgbaPattern = { [key]: value || "" };
    if (Array.isArray(window._rgba_tags)) {
      window._rgba_tags.push(rgbaPattern);
    } else {
      window._rgba_tags = [rgbaPattern];
    }

    sessionStorage.setItem(
      sessionStorageKeys.rgba,
      JSON.stringify(window._rgba_tags)
    );
  };
  return { storeRgbaData };
}

export function initRingba() {
  const ringbaScript = window.document.getElementById(RINGBA_SCRIPT_ID);
  if (ringbaScript) return;

  $(document).ready(function ($) {
    (function (e, d) {
      //Ringba.com phone number tracking
      var ringba_com_tag = ringbaKey.key;

      var _sc = d.getElementsByTagName("script"),
        _s = _sc[_sc.length - 1];
      e._rgba = e._rgba || { q: [] };
      e._rgba.q.push({
        tag: ringba_com_tag,
        cb: GetNumber,
        render: false,
        script: _s,
      });
      if (!(e._rgba.loading = !!e._rgba.loading)) {
        var sc = d.createElement("script");
        sc.id = RINGBA_SCRIPT_ID;
        sc.type = "text/javascript";
        sc.async = true;
        sc.src = "//js.callcdn.com/js_v3/min/ringba.com.js";
        var s = d.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(sc, s);
        e._rgba.loading = true;
      }
    })(window, document);
    function GetNumber(number, tagId, firstTime) {
      window.pnumber = number;
      setNum(number);
      $("#form-end-contact").attr("href", "tel://" + window.pnumber);
      $("#font-end-contact-number").text(window.pnumber);
    }

    window._rgba_tags = window._rgba_tags || [];
    //   .push(
    //     {user_agent:parsed['user_agent'] || ""},

    //     {zip: parsed['zip'] || ""},
    //     {city: parsed['city'] || ""},
    //     {state: parsed['state'] || ""},
    //     {firstName: parsed['firstName'] || ""},
    //     {lastName: parsed['lastName'] || ""},
    //     {email: parsed['email'] || ""},
    //     {lead_id: parsed["JornayaToken"] || ""},
    //     {fbc: parsed['fbc'] || ""},
    //     {fbp: parsed['fbp'] || ""},
    //     {adid: parsed['Ad_Name'] || ""},

    //     {ads_id: parsed['Adset_Name'] || ""},
    //     {utm_source: parsed['utm_source'] || ""},
    //     {userIp:parsed['userIp'] || ""},
    //     {cid: parsed['Campaign_Name'] || ""},
    //     {fbclid: parsed['fbclid'] || ""},
    //     );
    $(".callnow").click(function () {
      window.fbqFunc("track", "Contact");
    });
  });

  const existingValues = sessionStorage.getItem(sessionStorageKeys.rgba);
  if (existingValues) {
    const parsed = JSON.parse(existingValues);
    if (Array.isArray(parsed)) return (window._rgba_tags = parsed);
  }
}
