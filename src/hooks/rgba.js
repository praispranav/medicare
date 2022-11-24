import $ from "jquery";
import { useState } from "react";
import { sessionStorageKeys } from "../constants/localStorage";
import { RINGBA_SCRIPT_ID } from "../constants/ringba";
import { useSearchParams } from "react-router-dom";
import { useRingbaUser } from "../constants/ringba";

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

export function useInitRingba() {
  const [history, setHistory] = useSearchParams();
  const ringbaKey = useRingbaUser(history);
  const [num, setNum] = useState();

  const ringbaScript = window.document.getElementById(RINGBA_SCRIPT_ID);
  if (ringbaScript) {
  } else {
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

      const existingValues = sessionStorage.getItem(sessionStorageKeys.rgba);
      if (existingValues) {
        const parsed = JSON.parse(existingValues);
        if (Array.isArray(parsed)) return (window._rgba_tags = parsed);
      }
      //   .push(
      //     {user_agent:parsed['user_agent'] || ""},
      //     {userIp:parsed['userIp'] || ""},
      //     {fbp: parsed['fbp'] || ""},
      //     {fbc: parsed['fbc'] || ""},

      //     {zip: parsed['zip'] || ""},
      //     {city: parsed['city'] || ""},
      //     {state: parsed['state'] || ""},

      //     {firstName: parsed['firstName'] || ""},
      //     {lastName: parsed['lastName'] || ""},
      
      //     {email: parsed['email'] || ""},

      //     {lead_id: parsed["JornayaToken"] || ""},
      
      //     {utm_source: parsed['utm_source'] || ""},
      //     {fbclid: parsed['fbclid'] || ""},
      //     {adid: parsed['Ad_Name'] || ""},
      //     {ads_id: parsed['Adset_Name'] || ""},
      //     {cid: parsed['Campaign_Name'] || ""},
      //     );
      $(".callnow").click(function () {
        window.fbqFunc("track", "Contact");
      });
    });
  }

  return { number:num, staticNumber: ringbaKey.number };
}
