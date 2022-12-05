import { MODULE_TYPE } from "./moduleType";

const generateRoutes = (routes) => {
  let str = "";
  routes.forEach((route) => (str += `/${route}`));
  return str;
};

export const ROUTES = {
  landing1: "/lander-1",
  landing2: "/lander-2",
  
  full: {
    route: generateRoutes([MODULE_TYPE.full]),
    children: {
      homePage: generateRoutes([MODULE_TYPE.full, '']),
      zipCodeForm: generateRoutes([MODULE_TYPE.full, "zipcode"]),
      nameForm: generateRoutes([MODULE_TYPE.full, "name"]),
      phoneEmailForm: generateRoutes([MODULE_TYPE.full, "phonemail"]),
      congrats: generateRoutes([MODULE_TYPE.full, "congrats"]),
    },
  },
  short: {
    route: generateRoutes([MODULE_TYPE.short]),
    children: {
      homePage: generateRoutes([MODULE_TYPE.short]),
      medicareAandB: generateRoutes([MODULE_TYPE.short, 'medicareaandb']),
      zipCodeForm: generateRoutes([MODULE_TYPE.short, "zipcode"]),
      noOffer: generateRoutes([MODULE_TYPE.short, "nooffer"]),
      congrats: generateRoutes([MODULE_TYPE.short, "congrats"]),
    },
  },
  call: {
    route: generateRoutes([MODULE_TYPE.call]),
    children: {
      homePage: generateRoutes([MODULE_TYPE.call, '']),
    },
  },
};