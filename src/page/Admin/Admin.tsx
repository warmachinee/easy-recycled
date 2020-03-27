import React, { useContext, useEffect, useState } from "react";
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
  const passingProps: any = {
    ...useContext(AppContext),
    sess,
    getSess,
    ic_bg,
    handleLogout
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
    }
  }

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
