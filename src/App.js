import { useEffect } from "react";
import "./App.scss";
import Navigator from "./route/navigator";
import { localStorageKeys } from "./constants/localStorage";
import { v4 as uuid } from "uuid";
import { LEAD } from "./constants/lead";
import { ROUTES } from "./constants/routes";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { SLACK_WEBHOOK_URL } from "./constants/slackWebhook";

const overrideConsoleOutputs = async (e, type) => {
  try {
    await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },

      method: "POST",
      body: JSON.stringify({
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: type,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: window.location.href,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: JSON.stringify(e),
            },
          },
        ],
      }),
    });
  } catch (error) {}
};

// window.console.log = (e) => overrideConsoleOutputs(e, "NormalLog");
// window.console.error = (e) => overrideConsoleOutputs(e, "Error");
// window.console.warn = (e) => overrideConsoleOutputs(e, "Warn");
// window.console.info = (e) => overrideConsoleOutputs(e, "Info");

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

  useEffect(() => {
    checkOrCreateVisitorId();
  }, []);
  return (
    <HelmetProvider>
      <div className="App">
        <input id="leadid_token" name="universal_leadid" type="hidden" />
        <Navigator />
      </div>
    </HelmetProvider>
  );
}

export default App;
