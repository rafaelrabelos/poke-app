import React from "react";
import { Switch, Redirect } from "react-router-dom";
import routes, { getRoutes } from "../../routes";
import "./layout.css";

class Layout extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  render() {
    return (
      <>
        <div className="container-fluid">
          {/* Page content */}
          {/* roteamento do layout */}
            <div className="main-center">
              <Switch>
                {getRoutes(routes, "/app")}
                <Redirect from="*" to="/app/home" />
              </Switch>
            </div>
        </div>
      </>
    );
  }
}

export default Layout;
