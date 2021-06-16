import { Route } from "react-router-dom";
import React from "react";

// Public pages components
import { App, Details } from "./pages";

const publicRoutes = [
  {
    layout: "/app",
    page: "/home",
    nome: "home",
    component: App,
  },
  {
    layout: "/app",
    page: "/datails",
    nome: "datails",
    component: Details,
  },
];

const routes = [].concat(...[publicRoutes]);

function getRoutes(routesArray, layout) {
  return routesArray.map((prop, key) => {
    if (prop.layout === layout) {
      return (
        <Route
          path={prop.layout + prop.page}
          component={prop.component}
          key={key}
        />
      );
    } else {
      return null;
    }
  });
}

export default routes;
export { getRoutes };
