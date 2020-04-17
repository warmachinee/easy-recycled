import React, { useEffect, useState, useContext } from "react";
import Loadable from "react-loadable";
import socketIOClient from "socket.io-client";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Theme,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  AttachMoney,
} from "@material-ui/icons";
import { LineProfileData } from "apptype";
import { green } from "@material-ui/core/colors";
import { AppContext } from "../../AppContext";
import { RouteComponentProps, withRouter, Route, Link } from "react-router-dom";

const AppButton = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'AppButton' */ "../../AppComponent/AppButton"),
  loading: () => null,
});

const MarketHeader = Loadable({
  loader: () => import(/* webpackChunkName: 'MarketHeader' */ "./MarketHeader"),
  loading: () => null,
});

const RouteMarketList = Loadable.Map({
  loader: {
    MarketList: () =>
      import(/* webpackChunkName: 'RouteMarketList' */ "./MarketList"),
  },
  render(loaded: any, props: any) {
    let Component = loaded.MarketList.default;
    return <Route {...props} render={() => <Component {...props} />} />;
  },
  loading: () => null,
});

const MarketGoods = Loadable({
  loader: () => import(/* webpackChunkName: 'MarketGoods' */ "./MarketGoods"),
  loading: () => null,
});

const useStyles = makeStyles((theme: Theme) => ({
  offset: theme.mixins.toolbar,
  profileCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: 36,
    padding: 16,
    width: 200,
  },
  title: { flexGrow: 1 },
}));

const liff = window.liff;

export interface MarketProps extends RouteComponentProps<{}> {}

const Market: React.FC<MarketProps> = ({ match, location, history }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    setDense,
    enQSnackbar,
    closeSnackbar,
    _xhrPost,
    _xhrGet,
    _isDesktopBrowser,
    _thousandSeperater,
    checkSession,
    getInfo,
    profileData,
    setProfileData,
    handleLogout,
    setSess,
    userInfo,
    setUserInfo,
  } = useContext(AppContext);
  const [marketList, setMarketList] = useState<any>(null);

  const passingProps: any = {
    ...useContext(AppContext),
    marketList,
    getMarketPlace,
    refreshInfo: getInfo,
  };

  async function getMarketPlace() {
    const res = await _xhrPost({
      csrf,
      url: "loadusersystem",
      body: {
        action: "boardlist",
        linetoken: profileData && profileData.userId,
        type: "customer",
      },
    });
    setCsrf(res.csrf);
    if (
      "status" in res.data &&
      res.data.status === "this is not user account or have been delete account"
    ) {
      checkSession();
    } else {
      setMarketList(res.data);
    }
  }

  function realtimeBoard(list: any) {
    const socket = socketIOClient("https://easyrecycle.ml", {
      transports: ["websocket", "polling"],
    });
    socket.on(`boardlist`, (messageNew: any) => {
      if (messageNew) {
        const { formid, accessremain } = messageNew;
        if (list) {
          setMarketList(null);
          const thisList = list;
          const filtered = thisList.filter(
            (item: any) => item.formid === formid
          );
          filtered[0].accessremain = accessremain;
          setMarketList(thisList);
          if (accessremain === 0) {
            getMarketPlace();
          }
        }
      }
    });
  }

  async function getSess(profile: any) {
    setSess(null);
    const res = await _xhrPost({
      csrf,
      url: "session",
      body: { linetoken: profile.userId, type: "customer" },
    });
    setCsrf(res.csrf);
    setSess(res.data);
  }

  async function getMarketInfo(profile: any) {
    const res = await _xhrPost({
      csrf,
      url: "loadusersystem",
      body: {
        action: "info",
        linetoken: profile.userId,
        type: "customer",
      },
    });
    setCsrf(res.csrf);
    setUserInfo(res.data);
  }

  function getProfile() {
    liff
      .getProfile()
      .then((profile: any) => {
        setProfileData(profile);
        getSess(profile);
        getMarketInfo(profile);
      })
      .catch((err) => console.error(err));
  }

  function handleFetch() {
    const myLiffId = "1653861118-DAld6Lv2"; // customer
    liff.init({ liffId: myLiffId }, async () => {
      if (liff.isLoggedIn()) {
        getProfile();
      } else {
        liff.login({
          redirectUri: "https://easyrecycle.ml/market",
        });
      }
    });
  }

  useEffect(() => {
    if (_isDesktopBrowser()) {
      history.replace("/admin");
    } else {
      if (profileData) {
        getMarketPlace();
      } else {
        handleFetch();
      }
      setDense(true);
    }
  }, [profileData]);

  useEffect(() => {
    realtimeBoard(marketList);
  }, [marketList]);

  return (
    <AppContext.Provider value={...passingProps}>
      <div>
        <MarketHeader {...{ userInfo, handleLogout }} />
        <div className={classes.offset} />
        {userInfo && !("status" in userInfo) && (
          <div
            style={{
              display: "flex",
              padding: "12px 16px 0 16px",
              alignItems: "center",
            }}
          >
            <Link to="/" style={{ color: green[600] }}>
              <Typography style={{ marginRight: 16 }} variant="h6">
                บัญชีของฉัน
              </Typography>
            </Link>
            <Typography
              variant="h6"
              style={{
                marginLeft: 24,
                marginRight: 8,
                fontWeight: 700,
                flex: 1,
              }}
              align="right"
            >
              {_thousandSeperater(userInfo.info.balance)}
            </Typography>
            <AttachMoney />
          </div>
        )}
        <RouteMarketList exact path={match.path} />

        <Route exact path={`${match.path}/:formid`} component={MarketGoods} />
      </div>
    </AppContext.Provider>
  );
};

export default withRouter((props) => <Market {...props} />);
