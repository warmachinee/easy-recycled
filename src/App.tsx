import React, { useState, useEffect, useContext } from "react";
import Loadable from "react-loadable";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { SnackbarProvider, withSnackbar } from "notistack";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import { Switch, Route } from "react-router-dom";
import { AppContext } from "./AppContext";
import { createMuiTheme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import * as API from "./api";
const api: any = API.exportApi;

const ErrorBoundary = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'ErrorBoundary' */ "./component/Utils/ErrorBoundary"
    ),
  loading: () => null
});

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

const RouteMarket = Loadable.Map({
  loader: {
    Market: () =>
      import(/* webpackChunkName: 'RouteMarket' */ "./page/Market/Market")
  },
  render(loaded: any, props: any) {
    let Component = loaded.Market.default;
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

interface enQSnackbarProps {
  message: string;
  variant?: "default" | "error" | "success" | "warning" | "info";
  action?: any;
}

const ThisRoute: React.FC<any> = props => {
  const { enqueueSnackbar, closeSnackbar } = props;

  const passingProps: any = {
    ...useContext(AppContext),
    enQSnackbar,
    closeSnackbar
  };

  function enQSnackbar({ message, variant, action }: enQSnackbarProps) {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 10000,
      action
    });
  }

  return (
    <AppContext.Provider value={...passingProps}>
      <Switch>
        <RouteCustomer exact path="/" />
        <RouteMarket path="/market" />
        <RouteBusiness path="/business" />
        <RouteAdmin path="/admin" />
      </Switch>
    </AppContext.Provider>
  );
};

const AllRoute = withSnackbar(ThisRoute);

const App: React.FC<AppProps> = () => {
  const classes = useStyles();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [dense, setDense] = useState<boolean>(false);
  const [csrf, setCsrf] = useState<any | null>(null);

  const appTheme = createMuiTheme({
    palette: {
      type: isDarkMode ? "dark" : "light",
      primary: green
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(",")
    }
  });

  const passingProps: any = {
    ...api,
    isDarkMode,
    setIsDarkMode,
    dense,
    setDense,
    csrf,
    setCsrf
  };

  function getInit() {
    return new Promise(resolve => {
      var req = new XMLHttpRequest();
      req.open("GET", window.location.origin, false);
      req.send(null);
      resolve(req.getResponseHeader("csrf-token"));
    });
  }

  async function getCsrf() {
    const res = await getInit();
    setCsrf(res);
  }

  useEffect(() => {
    getCsrf();
  }, []);

  return (
    <AppContext.Provider value={...passingProps}>
      <ErrorBoundary>
        <SnackbarProvider preventDuplicate dense={dense} maxSnack={8}>
          <ThemeProvider theme={appTheme}>
            <MuiPickersUtilsProvider
              utils={DateFnsUtils}
              // libInstance={moment}
              // utils={MomentUtils}
              // locale="th"
            >
              <div>
                <AllRoute />
              </div>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </SnackbarProvider>
      </ErrorBoundary>
    </AppContext.Provider>
  );
};
export default App;
