import { useEffect } from "react";
import "./App.scss";
import { AppStart } from "./modules/AppStart/AppStart";
import { localStorageKeys } from "./constants/localStorage";
import { v4 as uuid } from "uuid";
import { LEAD } from "./constants/lead";
import { ROUTES } from "./constants/routes";
import { Helmet } from "react-helmet";

function App() {
  const checkOrCreateVisitorId = () => {
    const localStorageVisitorId = localStorage.getItem(
      localStorageKeys.visitorId
    );
    if (localStorageVisitorId) {
    } else {
      const newVisitorId = uuid();
      localStorage.setItem(localStorageKeys.visitorId, newVisitorId);
    }
  };

  const addScript = () => {
    // const pathName = window.location.pathname;
    // console.log(
    //   "LeadScriptTest",
    //   typeof window !== "undefined" && pathName !== ROUTES.congrats
    // );
    // if (typeof window !== "undefined" && pathName !== ROUTES.congrats) {
    //   const id = window.document.getElementById(LEAD.id);
    //   if (id) {
    //   } else {
    //     const s = document.createElement("script");
    //     s.id = LEAD.id;
    //     s.type = LEAD.type;
    //     s.async = LEAD.async;
    //     s.src = LEAD.src;
    //     // "//create.lidstatic.com/campaign/1a1b4c75-9f48-ab0e-0d04-dbc113047fc3.js?snippet_version=2";
    //     document.body.appendChild(s);
    //   }
    // }
  };

  useEffect(() => {
    checkOrCreateVisitorId();
    addScript();
  }, []);

  return (
    <div className="App">
      <input id="leadid_token" name="universal_leadid" type="hidden" />
      <AppStart />
      {window.location.pathname !== ROUTES.congrats ? <LeadNode /> : undefined}
    </div>
  );
}

function LeadNode() {
  return (
    <Helmet>
      <script
        id={LEAD.id}
        type={LEAD.type}
        async={LEAD.async}
        src={LEAD.src}
      ></script>
      <noscript> Fail to load javascript </noscript>
    </Helmet>
  );
}

export default App;
