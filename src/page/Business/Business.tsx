import React, { useEffect, useContext, useState, useReducer } from "react";
import socketIOClient from "socket.io-client";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../AppContext";
import Loadable from "react-loadable";
import { IconButton, Theme } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { LineProfileData } from "apptype";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { BooleanReducerState, BooleanReducerActions } from "apptype";

const useStyles = makeStyles((theme: Theme) => ({}));

export interface BusinessProps extends RouteComponentProps<{}> {
  enqueueSnackbar?: any;
}

const liff = window.liff;

const Header = Loadable({
  loader: () => import(/* webpackChunkName: 'Header' */ "./Header"),
  loading: () => null,
});

const GeneralDialog = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'GeneralDialog' */ "../../component/Dialog/GeneralDialog"
    ),
  loading: () => null,
});

const NotificationsList = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'NotificationsList' */ "../../component/Utils/NotificationsList"
    ),
  loading: () => null,
});

const BussinessBackdrop = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'BussinessBackdrop' */ "./BussinessBackdrop"),
  loading: () => null,
});

const BusinessRegister = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'BusinessRegister' */ "./BusinessRegister"),
  loading: () => null,
});

const GoodsList = Loadable({
  loader: () => import(/* webpackChunkName: 'GoodsList' */ "./GoodsList"),
  loading: () => null,
});

const Business: React.FC<BusinessProps> = ({ location, history, match }) => {
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
    _onLocalhostFn,
    booleanReducer,
    _isDesktopBrowser,
  } = useContext(AppContext);
  const [profileData, setProfileData] = useState<LineProfileData | null>(null);
  const [sess, setSess] = useState<any | null>(null);
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const [backDrop, setBackDrop] = useState<any | null>(null);
  const [notifications, setNotifications] = useState<any | null>(null);
  const [notiPage, setNotiPage] = React.useState(0);
  const [{ noti }, booleanDispatch] = useReducer<
    React.Reducer<BooleanReducerState, BooleanReducerActions>
  >(booleanReducer, { noti: false });

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
    userInfo,
    getInfo,
    booleanDispatch,
    realtimeAccess,
    realtimeEndOfSale,
  };

  function getProfile() {
    liff
      .getProfile()
      .then((profile: any) => {
        setProfileData(profile);
        getSess(profile);
      })
      .catch((err) => console.error(err));
  }

  function addSnackbar({ message, variant }: any) {
    enQSnackbar({
      message,
      variant,
      action,
    });
  }

  function handleFetch() {
    const myLiffId = "1653861118-82Pmap5k";
    liff.init({ liffId: myLiffId }, async () => {
      if (liff.isLoggedIn()) {
        getProfile();
      } else {
        liff.login();
      }
    });
  }

  async function getInfo(thisProfile: any) {
    const res = await _xhrPost({
      csrf,
      url: "loadusersystem",
      body: { action: "info", type: "business" },
    });
    setCsrf(res.csrf);
    if ("status" in res.data) {
      checkSession();
    } else {
      const thisData = res.data;
      const thisInfo = thisData;
      if (
        thisInfo.displayname !== thisProfile.displayName ||
        thisInfo.picture !== thisProfile.pictureUrl
      ) {
        updateProfile(thisInfo, thisProfile);
      } else {
        setUserInfo(thisData);
      }
    }
  }

  async function updateProfile(thisInfo: any, thisProfile: any) {
    const sendObj = {
      action: "editprofile",
      linetoken: thisProfile.userId,
      type: "business",
    };

    if (thisInfo.displayname !== thisProfile.displayName) {
      Object.assign(sendObj, { displayname: thisProfile.displayName });
    }

    if (thisInfo.picture !== thisProfile.pictureUrl) {
      Object.assign(sendObj, { picture: thisProfile.pictureUrl });
    }

    const res = await _xhrPost({
      csrf,
      url: "usersystem",
      body: sendObj,
    });
    setCsrf(res.csrf);
    handleFetch();
  }

  async function getSess(profile: any) {
    setSess(null);
    setBackDrop(null);
    const res = await _xhrPost({
      csrf,
      url: "session",
      body: { linetoken: profile.userId, type: "business" },
    });
    setCsrf(res.csrf);
    setSess(res.data);
    setBackDrop(res.data);
    if (res.data.status !== "not member") {
      getInfo(profile);
      getNotifications(profile);
    }
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
    // handleFetch();
    window.location.reload();
  }

  async function getNotifications(profile: any) {
    const res = await _xhrPost({
      csrf,
      url: "loadusersystem",
      body: {
        action: "noti",
        linetoken: profile.userId,
        type: "business",
        startindex: 0,
        lastindex: (notiPage + 1) * 10,
      },
    });
    setCsrf(res.csrf);

    if (
      "status" in res.data &&
      res.data.status === "this is not user account or have been delete account"
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
        type: "business",
      },
    });
    setCsrf(res.csrf);

    getNotifications(profileData);
  }

  function realtimeAccess() {
    const socket = socketIOClient("https://easyrecycle.ml", {
      transports: ["websocket", "polling"],
    });
    socket.emit("noti", {
      action: "noti",
      linetoken: profileData && profileData.userId,
      type: "business",
      startindex: 0,
      lastindex: (notiPage + 1) * 10,
    });
  }

  function realtimeEndOfSale(detail: any) {
    const socket = socketIOClient("https://easyrecycle.ml", {
      transports: ["websocket", "polling"],
    });
    const { linetoken } = detail;
    socket.emit("noti", {
      action: "noti",
      linetoken,
      type: "customer",
      startindex: 0,
      lastindex: (notiPage + 1) * 10,
    });
  }

  function realtimeNoti(thisSess: any) {
    const socket = socketIOClient("https://easyrecycle.ml", {
      transports: ["websocket", "polling"],
    });
    socket.on(`noti-${thisSess.userid}`, (messageNew: any) => {
      if (messageNew && messageNew.status === "success") {
        const { list } = messageNew.result;
        setNotifications(list);
      }
    });
  }

  useEffect(() => {
    if (profileData && sess) {
      realtimeNoti(sess);
      getNotifications(profileData);
    }
  }, [sess, profileData, notiPage]);

  useEffect(() => {
    // if (_isDesktopBrowser()) {
    //   history.replace("/admin");
    // } else {

    // }
    handleFetch();
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
            <React.Fragment>
              <Header />
              <GoodsList />
            </React.Fragment>
          ) : (
            <BusinessRegister {...{ profileData }} />
          ))}
        {/* <BussinessBackdrop {...{ backDrop, setBackDrop }} /> */}
        <GeneralDialog
          open={noti}
          onClose={() => booleanDispatch({ type: "false", key: "noti" })}
          title="การแจ้งเตือน"
          fullScreen={true}
          dividers={false}
          contentStyle={{ padding: 0 }}
        >
          <NotificationsList type="business" />
        </GeneralDialog>
      </div>
    </AppContext.Provider>
  );
};
export default withRouter((props) => <Business {...props} />);
