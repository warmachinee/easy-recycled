import React, { useEffect, useState, useContext } from "react";
import Loadable from "react-loadable";
import socketIOClient from "socket.io-client";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Theme
} from "@material-ui/core";
import { Menu as MenuIcon, Close as CloseIcon } from "@material-ui/icons";
import { LineProfileData } from "apptype";
import { green } from "@material-ui/core/colors";
import { AppContext } from "../../AppContext";
import { RouteComponentProps, withRouter, Route } from "react-router-dom";

const AppButton = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'AppButton' */ "../../AppComponent/AppButton"),
  loading: () => null
});

const MarketHeader = Loadable({
  loader: () => import(/* webpackChunkName: 'MarketHeader' */ "./MarketHeader"),
  loading: () => null
});

const RouteMarketList = Loadable.Map({
  loader: {
    MarketList: () =>
      import(/* webpackChunkName: 'RouteMarketList' */ "./MarketList")
  },
  render(loaded: any, props: any) {
    let Component = loaded.MarketList.default;
    return <Route {...props} render={() => <Component {...props} />} />;
  },
  loading: () => null
});

const MarketGoods = Loadable({
  loader: () => import(/* webpackChunkName: 'MarketGoods' */ "./MarketGoods"),
  loading: () => null
});

const useStyles = makeStyles((theme: Theme) => ({
  offset: theme.mixins.toolbar,
  profileCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: 36,
    padding: 16,
    width: 200
  },
  title: { flexGrow: 1 }
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
    _onLocalhost
  } = useContext(AppContext);
  const [profileData, setProfileData] = useState<LineProfileData | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [sess, setSess] = useState<any | null>(null);
  const [backDrop, setBackDrop] = useState<any | null>(null);
  const [passedFormid, setPassedFormid] = useState<any>(null);
  const [marketList, setMarketList] = useState<any>(null);

  const passingProps: any = {
    ...useContext(AppContext),
    sess,
    getSess,
    profileData,
    addSnackbar,
    handleLogout,
    checkSession,
    passedFormid,
    marketList,
    getMarketPlace
  };

  function addSnackbar({ message, variant }: any) {
    enQSnackbar({
      message,
      variant,
      action
    });
  }

  function getProfile() {
    liff
      .getProfile()
      .then((profile: any) => {
        setProfileData(profile);
        getSess(profile);
      })
      .catch(err => console.error(err));
  }

  async function handleLogout() {
    const res = await _xhrGet("logout");
    setCsrf(res.csrf);
    if (liff.isLoggedIn()) {
      liff.logout();
    }
    window.location.reload();
  }

  async function checkSession() {
    const res = await _xhrGet("logout");
    setCsrf(res.csrf);
    handleFetch();
  }

  function handleFetch() {
    const myLiffId = "1653861118-Pa7l4bay";
    liff.init({ liffId: myLiffId }, async () => {
      if (liff.isLoggedIn()) {
        getProfile();
      } else {
        liff.login();
      }
    });
  }

  async function getInfo(profile: any) {
    const res = await _xhrPost({
      csrf,
      url: "loadusersystem",
      body: { action: "info", linetoken: profile.userId, type: "customer" }
    });
    // console.log(res.data);
    setCsrf(res.csrf);
    if ("status" in res.data) {
      checkSession();
    }
    setUserInfo(res.data);
  }

  async function getSess(profile: any) {
    setSess(null);
    setBackDrop(null);
    const res = await _xhrPost({
      csrf,
      url: "session",
      body: { linetoken: profile.userId, type: "customer" }
    });
    setCsrf(res.csrf);
    setSess(res.data);
    setBackDrop(res.data);
    if (res.data && res.data.userid) {
      getInfo(profile);
    }
  }

  async function getMarketPlace() {
    const res = await _xhrPost({
      csrf,
      url: "loadusersystem",
      body: {
        action: "boardlist",
        linetoken: profileData && profileData.userId,
        type: "customer"
      }
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
      transports: ["websocket", "polling"]
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

  useEffect(() => {
    if (profileData) {
      if (passedFormid && new URLSearchParams(location.search).get("formid")) {
        history.replace(`/market/${passedFormid}`);
      } else {
        getMarketPlace();
      }
    }
  }, [profileData]);

  useEffect(() => {
    realtimeBoard(marketList);
  }, [marketList]);

  useEffect(() => {
    handleFetch();
    const formidFromSearchParams = new URLSearchParams(location.search).get(
      "formid"
    );
    if (formidFromSearchParams) {
      setPassedFormid(formidFromSearchParams);
    }
    setDense(true);
  }, []);

  const action = (key: any) => (
    <IconButton onClick={() => closeSnackbar(key)}>
      <CloseIcon style={{ color: "white" }} />
    </IconButton>
  );

  return (
    <AppContext.Provider value={...passingProps}>
      <div>
        <MarketHeader {...{ userInfo, handleLogout }} />
        <div className={classes.offset} />
        {userInfo && !("status" in userInfo) && (
          <div style={{ display: "flex", padding: "12px 16px 0 16px" }}>
            <Typography style={{ marginRight: 16 }}>ยอดเงินคงเหลือ</Typography>
            <Typography
              style={{ width: 64, marginRight: 8, fontWeight: 700 }}
              align="right"
            >
              {userInfo.info.balance}
            </Typography>
            <Typography>บาท</Typography>
          </div>
        )}
        <RouteMarketList exact path={match.path} />

        <Route exact path={`${match.path}/:formid`} component={MarketGoods} />
      </div>
    </AppContext.Provider>
  );
};

export default withRouter(props => <Market {...props} />);
