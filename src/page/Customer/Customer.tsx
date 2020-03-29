import React, { useEffect, useState, useContext } from "react";
import socketIOClient from "socket.io-client";
import Loadable from "react-loadable";
import { makeStyles } from "@material-ui/styles";
import {
  Paper,
  Avatar,
  Typography,
  AppBar,
  Toolbar,
  IconButton
} from "@material-ui/core";
import { Menu as MenuIcon, Close as CloseIcon } from "@material-ui/icons";
import { LineProfileData } from "apptype";
import { green } from "@material-ui/core/colors";
import { AppContext } from "../../AppContext";
import { RouteComponentProps, withRouter } from "react-router-dom";

const CustomerRegister = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'CustomerRegister' */ "./CustomerRegister"),
  loading: () => null
});

const CustomerDashboard = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'CustomerDashboard' */ "./CustomerDashboard"),
  loading: () => null
});

const CustomerBackdrop = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'CustomerBackdrop' */ "./CustomerBackdrop"),
  loading: () => null
});

const AppButton = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'AppButton' */ "../../AppComponent/AppButton"),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
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

export interface CustomerProps extends RouteComponentProps<{}> {}

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <IconButton edge="start" color="primary">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title} color="primary">
          Customer
        </Typography>
        <AppButton
          variant="contained"
          buttonColor={green}
          // onClick={addSnackbar}
        >
          Profile
        </AppButton>
      </Toolbar>
    </AppBar>
  );
};

const Customer: React.FC<CustomerProps> = ({ location, history, match }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    setDense,
    enQSnackbar,
    closeSnackbar,
    _xhrPost,
    _xhrGet,
    _onLocalhost,
    _onLocalhostFn
  } = useContext(AppContext);
  const [profileData, setProfileData] = useState<LineProfileData | null>(null);
  const [sess, setSess] = useState<any | null>(null);
  const [backDrop, setBackDrop] = useState<any | null>(null);
  const [notifications, setNotifications] = useState<any | null>(null);
  const [notiPage, setNotiPage] = React.useState(0);
  const passingProps: any = {
    ...useContext(AppContext),
    sess,
    getSess,
    profileData,
    addSnackbar,
    handleLogout,
    checkSession,
    notifications,
    setNotifications,
    notiPage,
    setNotiPage,
    readNotifications,
    realtimeAccess
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
    // const myLiffId = "1653861118-Pa7l4bay"; // /market
    const myLiffId = "1653861118-DAld6Lv2"; // customer
    liff.init({ liffId: myLiffId }, async () => {
      if (liff.isLoggedIn()) {
        getProfile();
      } else {
        liff.login({
          redirectUri: "https://easyrecycle.ml/"
        });
      }
    });
  }

  async function getInfo() {
    const res = await _xhrPost({
      csrf,
      url: "loadusersystem",
      body: { action: "info", type: "customer" }
    });
    setCsrf(res.csrf);
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
  }

  async function getNotifications(profile: any) {
    const res = await _xhrPost({
      csrf,
      url: "loadusersystem",
      body: {
        action: "noti",
        linetoken: profile.userId,
        type: "customer",
        startindex: 0,
        lastindex: (notiPage + 1) * 10
      }
    });
    setCsrf(res.csrf);

    if (
      ("status" in res.data &&
        res.data.status ===
          "this is not user account or have been delete account") ||
      res.data.status === "need to login user account"
    ) {
      checkSession();
    } else {
      setNotifications(res.data);
    }
  }

  async function readNotifications() {
    const res = await _xhrPost({
      csrf,
      url: "usersystem",
      body: {
        action: "readnoti",
        linetoken: profileData && profileData.userId,
        type: "customer"
      }
    });
    setCsrf(res.csrf);

    getNotifications(profileData);
  }

  function realtimeAccess() {
    const socket = socketIOClient("https://easyrecycle.ml", {
      transports: ["websocket", "polling"]
    });
    socket.emit("noti", {
      action: "noti",
      linetoken: profileData && profileData.userId,
      type: "customer",
      startindex: 0,
      lastindex: (notiPage + 1) * 10
    });
  }

  function realtimeNoti(thisSess: any) {
    const socket = socketIOClient("https://easyrecycle.ml", {
      transports: ["websocket", "polling"]
    });
    socket.on(`noti-${thisSess.userid}`, (messageNew: any) => {
      if (messageNew && messageNew.status === "success") {
        const { list } = messageNew.result;
        setNotifications(list);
      }
    });
  }

  useEffect(() => {
    if (profileData && sess && sess.status !== "not member") {
      realtimeNoti(sess);
      getNotifications(profileData);
    }
  }, [sess, profileData, notiPage]);

  useEffect(() => {
    if (/localhost/.test(window.location.href)) {
      setProfileData({
        userId: "U34854b16de48d84b63c751717c9d2771",
        displayName: "P.R.E.M.I.O.R",
        pictureUrl:
          "https://profile.line-scdn.net/0hPyKQa5SXD1Z2KCciVYpwAUptATsBBgkeDh0UNVooWDJcT05USkhFY1F9AW9dEU8CShsUN1N7UmUJ",
        statusMessage: "UI/UX Developer at PDS Co.,Ltd."
      });
    } else {
      handleFetch();
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
        {sess &&
          (sess.status !== "not member" ? (
            <CustomerDashboard />
          ) : (
            <CustomerRegister {...{ profileData }} />
          ))}
        <CustomerBackdrop {...{ backDrop, setBackDrop }} />
      </div>
    </AppContext.Provider>
  );
};

export default withRouter(props => <Customer {...props} />);
