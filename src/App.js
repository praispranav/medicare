import { useEffect } from "react";
import "./App.css";
import { AppStart } from "./modules/AppStart/AppStart";
import { localStorageKeys } from "./constants/localStorage";
import { v4 as uuid } from "uuid";
import { LEAD } from "./constants/lead";

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
    if (typeof window !== "undefined") {
      const id = window.document.getElementById(LEAD.id);
      if (id) {
      } else {
        const s = document.createElement("script");
        s.id = LEAD.id;
        s.type = LEAD.type;
        s.async = LEAD.async;
        s.src = LEAD.src;
        // "//create.lidstatic.com/campaign/1a1b4c75-9f48-ab0e-0d04-dbc113047fc3.js?snippet_version=2";
        <noscript>
          <img
            src="//create.leadid.com/noscript.gif?lac=2bfe796d-86b0-578a-2976-5c28f271c074&lck=1a1b4c75-9f48-ab0e-0d04-dbc113047fc3&snippet_version=2"
            alt=""
          />
        </noscript>;
        document.body.appendChild(s);
      }
    }
  };

  useEffect(() => {
    checkOrCreateVisitorId();
    addScript();
  }, []);

  return (
    <div className="App">
      <input id="leadid_token" name="universal_leadid" type="hidden" />
      <AppStart />
    </div>
  );
}

export default App;
