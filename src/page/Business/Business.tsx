import React, { useEffect, useContext, useState } from "react";
import socketIOClient from "socket.io-client";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../AppContext";
import Loadable from "react-loadable";
import { IconButton, Theme } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { LineProfileData } from "apptype";
import { RouteComponentProps, withRouter } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({}));

export interface BusinessProps extends RouteComponentProps<{}> {
  enqueueSnackbar?: any;
}

const liff = window.liff;

const Header = Loadable({
  loader: () => import(/* webpackChunkName: 'Header' */ "./Header"),
  loading: () => null
});

const BussinessBackdrop = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'BussinessBackdrop' */ "./BussinessBackdrop"),
  loading: () => null
});

const BusinessRegister = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'BusinessRegister' */ "./BusinessRegister"),
  loading: () => null
});

const GoodsList = Loadable({
  loader: () => import(/* webpackChunkName: 'GoodsList' */ "./GoodsList"),
  loading: () => null
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
    _onLocalhostFn
  } = useContext(AppContext);
  const [profileData, setProfileData] = useState<LineProfileData | null>(null);
  const [sess, setSess] = useState<any | null>(null);
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const [backDrop, setBackDrop] = useState<any | null>(null);
  const [notifications, setNotifications] = useState<any | null>(null);
  const [notiPage, setNotiPage] = React.useState(getHash());
  const paginationChange = (event: any, value: any) => {
    history.replace(`${match.path}/notifications#${value}`);
    setNotiPage(value);
  };
  const passingProps: any = {
    ...useContext(AppContext),
    getSess,
    profileData,
    addSnackbar,
    handleLogout,
    checkSession,
    notifications,
    setNotifications,
    notiPage,
    paginationChange,
    readNotifications,
    userInfo,
    getInfo
  };

  function getHash() {
    const hash = location.hash;
    if (hash === "") {
      return 1;
    } else {
      return parseInt(hash.split("#")[1]);
    }
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

  function addSnackbar({ message, variant }: any) {
    enQSnackbar({
      message,
      variant,
      action
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

  async function getInfo() {
    const res = await _xhrPost({
      csrf,
      url: "loadusersystem",
      body: { action: "info", type: "business" }
    });
    setCsrf(res.csrf);
    if ("status" in res.data) {
      checkSession();
    } else {
      setUserInfo(res.data);
    }
  }

  async function getSess(profile: any) {
    setSess(null);
    setBackDrop(null);
    const res = await _xhrPost({
      csrf,
      url: "session",
      body: { linetoken: profile.userId, type: "business" }
    });
    setCsrf(res.csrf);
    setSess(res.data);
    setBackDrop(res.data);
    if (res.data.status !== "not member") {
      getInfo();
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
    handleFetch();
  }

  async function getNotifications(profile: any) {
    const res = await _xhrPost({
      csrf,
      url: "loadusersystem",
      body: {
        action: "noti",
        linetoken: profile.userId,
        type: "business",
        startindex: (notiPage - 1) * 10,
        lastindex: notiPage * 10
      }
    });
    setCsrf(res.csrf);
    console.log(res.data);
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
        type: "business"
      }
    });
    setCsrf(res.csrf);
    console.log(res.data);
    getNotifications(profileData);
  }

  function realtimeNoti() {
    const socket = socketIOClient(location.pathname, {
      transports: ["websocket", "polling"]
    });
    socket.on(`noti-${sess.userid}`, (messageNew: any) => {
      if (messageNew) {
        console.log(messageNew);
      }
    });
  }

  useEffect(() => {
    if (profileData && sess && sess.status !== "not member") {
      _onLocalhostFn(
        () => {
          setNotifications([
            {
              activity: {
                method: "create form",
                data: { business_name: "PDS Co.,Ltd." }
              },
              reflink: 6174567,
              read: 0,
              createdate: "2020-03-25T18:47:43.000Z"
            },
            {
              activity: {
                method: "admin delete form",
                data: { business_name: "TPGSA" }
              },
              reflink: 8069118,
              read: 0,
              createdate: "2020-03-25T18:46:04.000Z"
            },
            {
              activity: {
                method: "create form",
                data: { business_name: "PDS" }
              },
              reflink: 2315022,
              read: 0,
              createdate: "2020-03-25T09:21:12.000Z"
            },
            {
              activity: {
                method: "edit form",
                data: [
                  { business_name: "TPGSA" },
                  {
                    fdocument:
                      '{"document":["บิลเงินสด","ใบอนุญาตค้าของเก่า"],"etc":"none"}'
                  },
                  {
                    transport:
                      '{"transport":["แม็คโครปากคีบ/แม็คโครแม่เหล็ก"],"etc":"none"}'
                  }
                ]
              },
              reflink: 1756407,
              read: 0,
              createdate: "2020-03-21T05:27:06.000Z"
            }
          ]);
        },
        () => {
          realtimeNoti();
          getNotifications(profileData);
        }
      );
    }
  }, [notiPage]);

  useEffect(() => {
    setDense(true);
    _onLocalhostFn(() => {
      setProfileData({
        userId: "U34854b16de48d84b63c751717c9d2771",
        displayName: "P.R.E.M.I.O.R",
        pictureUrl:
          "https://profile.line-scdn.net/0hPyKQa5SXD1Z2KCciVYpwAUptATsBBgkeDh0UNVooWDJcT05USkhFY1F9AW9dEU8CShsUN1N7UmUJ",
        statusMessage: "UI/UX Developer at PDS Co.,Ltd."
      });
      setSess({
        userid: 12346,
        type: "main_admin",
        fullname: "admin",
        lastname: "admin"
      });
      setUserInfo({
        displayname: "P.R.E.M.I.O.R",
        fullname: "Sippakorn",
        lastname: "Suphapinyo",
        tel: 80670057,
        statusmassage: "UI/UX Developer at PDS Co.,Ltd.",
        picture:
          "https://profile.line-scdn.net/0hPyKQa5SXD1Z2KCciVYpwAUptATsBBgkeDh0UNVooWDJcT05USkhFY1F9AW9dEU8CShsUN1N7UmUJ",
        email: "sippakorn.prem@gmail.com"
      });
    }, handleFetch);
  }, []);

  const action = (key: any) => (
    <IconButton onClick={() => closeSnackbar(key)}>
      <CloseIcon style={{ color: "white" }} />
    </IconButton>
  );

  return (
    <AppContext.Provider value={...passingProps}>
      <div>
        <Header {...{ profileData, handleLogout }} />
        {_onLocalhost(
          <GoodsList />,
          <React.Fragment>
            {sess &&
              (sess.status !== "not member" ? (
                <GoodsList />
              ) : (
                <BusinessRegister {...{ profileData }} />
              ))}
            <BussinessBackdrop {...{ backDrop, setBackDrop }} />
          </React.Fragment>
        )}
      </div>
    </AppContext.Provider>
  );
};
export default withRouter(props => <Business {...props} />);
