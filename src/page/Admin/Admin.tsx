import React, { useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Loadable from "react-loadable";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../AppContext";
import ic_bg from "../../img/adminbg.jpeg";

const AdminLogin = Loadable({
  loader: () => import(/* webpackChunkName: 'AdminLogin' */ "./AdminLogin"),
  loading: () => null
});

const Dashboard = Loadable({
  loader: () => import(/* webpackChunkName: 'Dashboard' */ "./Dashboard"),
  loading: () => null
});

const AdminBackdrop = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'AdminBackdrop' */ "./AdminBackdrop"),
  loading: () => null
});

const useStyles = makeStyles(theme => ({}));

export interface AdminProps {}

const Admin: React.FC<AdminProps> = () => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    enQSnackbar,
    closeSnackbar,
    _xhrPost,
    _xhrGet,
    _onLocalhost
  } = useContext(AppContext);
  const [sess, setSess] = useState<any | null>(null);
  const [notifications, setNotifications] = useState<any>(null);
  const [notiPage, setNotiPage] = React.useState(0);
  const passingProps: any = {
    ...useContext(AppContext),
    sess,
    getSess,
    ic_bg,
    handleLogout,
    notifications,
    setNotifications,
    notiPage,
    setNotiPage,
    realtimeAccess,
    realtimeTopupAccept,
    realtimeEndOfSale
  };

  async function handleLogout() {
    const res = await _xhrGet("logout");
    setCsrf(res.csrf);
    console.log(res.data);
    getSess();
  }

  async function getSess() {
    const res = await _xhrGet("asession");
    setCsrf(res.csrf);
    console.log(res.data);
    if (res.data.status === "not member") {
      handleLogout();
    } else {
      setSess(res.data);
      getNotifications(res.data);
    }
  }

  async function getNotifications(thisSess: any) {
    const res = await _xhrPost({
      csrf,
      url: "aloadusersystem",
      body: {
        action: "noti",
        adminid: thisSess.userId,
        startindex: 0,
        lastindex: (notiPage + 1) * 10
      }
    });
    setCsrf(res.csrf);
    console.log(res.data);
    setNotifications(res.data);
  }

  function realtimeAccess() {
    const socket = socketIOClient("https://easyrecycle.ml", {
      transports: ["websocket", "polling"]
    });
    socket.emit("noti", {
      action: "noti",
      linetoken: sess && sess.userid,
      type: sess.type,
      startindex: 0,
      lastindex: (notiPage + 1) * 10
    });
  }

  function realtimeTopupAccept(detail: any) {
    const socket = socketIOClient("https://easyrecycle.ml", {
      transports: ["websocket", "polling"]
    });
    const { linetoken } = detail;
    socket.emit("noti", {
      action: "noti",
      linetoken,
      type: "customer",
      startindex: 0,
      lastindex: (notiPage + 1) * 10
    });
  }

  function realtimeEndOfSale(detail: any) {
    const socket = socketIOClient("https://easyrecycle.ml", {
      transports: ["websocket", "polling"]
    });
    const { linetoken } = detail;
    console.log({
      action: "noti",
      linetoken,
      type: "business",
      startindex: 0,
      lastindex: (notiPage + 1) * 10
    });
    socket.emit("noti", {
      action: "noti",
      linetoken,
      type: "business",
      startindex: 0,
      lastindex: (notiPage + 1) * 10
    });
  }

  function realtimeNoti() {
    const socket = socketIOClient("https://easyrecycle.ml", {
      transports: ["websocket", "polling"]
    });
    socket.on(`noti-${sess.userid}`, (messageNew: any) => {
      if (messageNew) {
        console.log(messageNew);
      }
    });
  }

  useEffect(() => {
    if (sess && sess.status !== "not member") {
      realtimeNoti();
      getNotifications(sess);
    }
  }, [sess, notiPage]);

  useEffect(() => {
    getSess();
  }, []);

  return (
    <AppContext.Provider value={...passingProps}>
      <div>
        {_onLocalhost(
          <Dashboard />,
          sess ? (
            sess.status === "need login before" ? (
              <AdminLogin />
            ) : (
              <Dashboard />
            )
          ) : (
            <AdminBackdrop />
          )
        )}
      </div>
    </AppContext.Provider>
  );
};
export default Admin;
