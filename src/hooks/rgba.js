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
  };
  return { storeRgbaData };
}

export function useInitRingba() {
  const [history, setHistory] = useSearchParams();
  const ringbaKey = useRingbaUser(history);
  const [num, setNum] = useState();

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
      

      $(".callnow").click(function () {
        window.fbqFunc("track", "Contact");
      });
    });

    const setInitialValue = () =>{
      // window._rgba_tags.push(
      //   { user_agent: "" },
      //   { userIp: "" },
      //   { fbp: "" },
      //   { fbc: "" },

      //   { zip: "" },
      //   { city: "" },
      //   { state: "" },

      //   { firstName: "" },
      //   { lastName: "" },

      //   { email: "" },

      //   { lead_id: "" },

      //   { utm_source: "" },
      //   { fbclid: "" },
      //   { adid: "" },
      //   { ads_id: "" },
      //   { cid: "" }
      // );
      // const existingValues = sessionStorage.getItem(sessionStorageKeys.rgba);
      // if (existingValues) {
      //   const parsed = JSON.parse(existingValues);
      //   if (Array.isArray(parsed)) return (window._rgba_tags = parsed);
      // }
    }

  return { number: num, staticNumber: ringbaKey.number, setInitialValue };
}
