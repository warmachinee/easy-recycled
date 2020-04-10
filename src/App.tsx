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
import { LineProfileData } from "apptype";
const api: any = API.exportApi;

const ErrorBoundary = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'ErrorBoundary' */ "./component/Utils/ErrorBoundary"
    ),
  loading: () => null,
});

const RouteCustomer = Loadable.Map({
  loader: {
    Customer: () =>
      import(
        /* webpackChunkName: 'RouteCustomer' */ "./page/Customer/Customer"
      ),
  },
  render(loaded: any, props: any) {
    let Component = loaded.Customer.default;
    return <Route {...props} render={() => <Component {...props} />} />;
  },
  loading: () => null,
});

const RouteMarket = Loadable.Map({
  loader: {
    Market: () =>
      import(/* webpackChunkName: 'RouteMarket' */ "./page/Market/Market"),
  },
  render(loaded: any, props: any) {
    let Component = loaded.Market.default;
    return <Route {...props} render={() => <Component {...props} />} />;
  },
  loading: () => null,
});

const RouteBusiness = Loadable.Map({
  loader: {
    Business: () =>
      import(
        /* webpackChunkName: 'RouteBusiness' */ "./page/Business/Business"
      ),
  },
  render(loaded: any, props: any) {
    let Component = loaded.Business.default;
    return <Route {...props} render={() => <Component {...props} />} />;
  },
  loading: () => null,
});

const RouteAdmin = Loadable.Map({
  loader: {
    Admin: () =>
      import(/* webpackChunkName: 'RouteAdmin' */ "./page/Admin/Admin"),
  },
  render(loaded: any, props: any) {
    let Component = loaded.Admin.default;
    return <Route {...props} render={() => <Component {...props} />} />;
  },
  loading: () => null,
});

const useStyles = makeStyles((theme) => ({}));

export interface AppProps {}

interface enQSnackbarProps {
  message: string;
  variant?: "default" | "error" | "success" | "warning" | "info";
  action?: any;
}

const ThisRoute: React.FC<any> = (props) => {
  const { enqueueSnackbar, closeSnackbar } = props;
  const [userInfo, setUserInfo] = useState<any>(null);
  const [profileData, setProfileData] = useState<LineProfileData | null>(null);
  const [sess, setSess] = useState<any | null>(null);
  const [backDrop, setBackDrop] = useState<any | null>(null);

  const passingProps: any = {
    ...useContext(AppContext),
    enQSnackbar,
    closeSnackbar,
  };

  const customerProps: any = {
    ...passingProps,
    userInfo,
    setUserInfo,
    profileData,
    setProfileData,
    sess,
    setSess,
    backDrop,
    setBackDrop,
  };

  function enQSnackbar({ message, variant, action }: enQSnackbarProps) {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 5000,
      action,
    });
  }

  return (
    <Switch>
      <AppContext.Provider value={...passingProps}>
        <AppContext.Provider value={...customerProps}>
          <RouteCustomer exact path="/" />
          <RouteMarket path="/market" />
        </AppContext.Provider>
        <RouteBusiness path="/business" />
        <RouteAdmin path="/admin" />
      </AppContext.Provider>
    </Switch>
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
      primary: green,
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
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });

  const passingProps: any = {
    ...api,
    isDarkMode,
    setIsDarkMode,
    dense,
    setDense,
    csrf,
    setCsrf,
  };

  function getInit() {
    return new Promise((resolve) => {
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
