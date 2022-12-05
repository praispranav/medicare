import Landing1 from "../modules/LandingPage/components/landing1";
import Landing2 from "../modules/LandingPage/components/landing2";
import { ROUTES } from "./routes";

export const TRACK_SCRIPT = [
    {
        pageUrl: ROUTES.landing1,
        scriptUrl: "/assets/scripts/landing1.js",
        meta:{
            "httpEquiv":"delegate-ch",
            "content": "sec-ch-ua https://track.qualifybenefits.co; sec-ch-ua-mobile https://track.qualifybenefits.co; sec-ch-ua-arch https://track.qualifybenefits.co; sec-ch-ua-model https://track.qualifybenefits.co; sec-ch-ua-platform https://track.qualifybenefits.co; sec-ch-ua-platform-version https://track.qualifybenefits.co; sec-ch-ua-bitness https://track.qualifybenefits.co; sec-ch-ua-full-version-list https://track.qualifybenefits.co; sec-ch-ua-full-version https://track.qualifybenefits.co"
        },
        content: <Landing1 />,
        noscriptUrl: "https://track.qualifybenefits.co/d/.js?noscript=true&lpurl="
    },
    {
        pageUrl: ROUTES.landing2,
        scriptUrl: "/assets/scripts/landing2.js",
        meta:{
            "httpEquiv":"delegate-ch",
            "content": "sec-ch-ua https://track.qualifybenefits.co; sec-ch-ua-mobile https://track.qualifybenefits.co; sec-ch-ua-arch https://track.qualifybenefits.co; sec-ch-ua-model https://track.qualifybenefits.co; sec-ch-ua-platform https://track.qualifybenefits.co; sec-ch-ua-platform-version https://track.qualifybenefits.co; sec-ch-ua-bitness https://track.qualifybenefits.co; sec-ch-ua-full-version-list https://track.qualifybenefits.co; sec-ch-ua-full-version https://track.qualifybenefits.co"
        },
        content: <Landing2 />,
        noscriptUrl: "https://track.qualifybenefits.co/d/.js?noscript=true&lpurl=https://sea-lion-app-b2qc6.ondigitalocean.app"
    },
]