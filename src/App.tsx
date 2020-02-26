import React from "react";
import Loadable from "react-loadable";
import { makeStyles } from "@material-ui/styles";
import { Switch, Route } from "react-router-dom";

const RouteCustomer = Loadable.Map({
  loader: {
    Customer: () =>
      import(/* webpackChunkName: 'RouteCustomer' */ "./page/Customer/Customer")
  },
  render(loaded: any, props: any) {
    let Component = loaded.Customer.default;
    return <Route {...props} render={() => <Component {...props} />} />;
  },
  loading: () => null
});

const RouteBusiness = Loadable.Map({
  loader: {
    Business: () =>
      import(/* webpackChunkName: 'RouteBusiness' */ "./page/Business/Business")
  },
  render(loaded: any, props: any) {
    let Component = loaded.Business.default;
    return <Route {...props} render={() => <Component {...props} />} />;
  },
  loading: () => null
});

const RouteAdmin = Loadable.Map({
  loader: {
    Admin: () =>
      import(/* webpackChunkName: 'RouteAdmin' */ "./page/Admin/Admin")
  },
  render(loaded: any, props: any) {
    let Component = loaded.Admin.default;
    return <Route {...props} render={() => <Component {...props} />} />;
  },
  loading: () => null
});

const useStyles = makeStyles(theme => ({}));

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  const classes = useStyles();
  return (
    <div>
      <Switch>
        <RouteCustomer exact path="/" />
        <RouteBusiness path="/business" />
        <RouteAdmin path="/admin" />
      </Switch>
    </div>
  );
};
export default App;
