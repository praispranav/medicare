const express = require("express");
const path = require("path");

const app = express();

const MODULE_TYPE = {
  full: "full",
  short: "short",
  call: "call",
};

const generateRoutes = (routes) => {
  let str = "";
  routes.forEach((route) => (str += `/${route}`));
  return str;
};

const ROUTES = {
  full: {
    route: generateRoutes([MODULE_TYPE.full]),
    children: {
      homePage: generateRoutes([MODULE_TYPE.full, ""]),
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
      medicareAandB: generateRoutes([MODULE_TYPE.short, "medicareaandb"]),
      zipCodeForm: generateRoutes([MODULE_TYPE.short, "zipcode"]),
      noOffer: generateRoutes([MODULE_TYPE.short, "nooffer"]),
      congrats: generateRoutes([MODULE_TYPE.short, "congrats"]),
    },
  },
  call: {
    route: generateRoutes([MODULE_TYPE.call]),
    children: {
      homePage: generateRoutes([MODULE_TYPE.call, ""]),
    },
  },
};

app.use(express.static(path.join(__dirname, "/build")));

const fullModuleChild = Object.values(ROUTES.full.children);
const shortModuleChild = Object.values(ROUTES.short.children);
const callModuleChild = Object.values(ROUTES.call.children);

fullModuleChild.forEach((i) => {
  app.get(i, (req, res) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
  });
});

shortModuleChild.forEach((i) => {
  app.get(i, (req, res) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
  });
});

callModuleChild.forEach((i) => {
  app.get(i, (req, res) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port);
