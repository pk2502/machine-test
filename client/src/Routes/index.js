import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/" component={Home} exact />
      </Switch>
    </Fragment>
  );
};

export default Routes;
