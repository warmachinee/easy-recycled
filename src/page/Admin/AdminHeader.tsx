import React, { useContext, useEffect, useState } from "react";
import Loadable from "react-loadable";
import { makeStyles } from "@material-ui/styles";
import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Popover,
  Badge
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  MoreVert,
  ExitToApp,
  Notifications
} from "@material-ui/icons";
import { green, grey } from "@material-ui/core/colors";
import { AppContext } from "../../AppContext";
import { RouteComponentProps, withRouter } from "react-router-dom";

const ConfirmDialog = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'ConfirmDialog' */ "../../component/Dialog/ConfirmDialog"
    ),
  loading: () => null
});

const AppButton = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'AppButton' */ "../../AppComponent/AppButton"),
  loading: () => null
});

const NotiList = Loadable({
  loader: () => import(/* webpackChunkName: 'NotiList' */ "./NotiList"),
  loading: () => null
});

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  title: { flexGrow: 1 },
  appBar: { width: `calc(100% - ${drawerWidth}px)`, marginLeft: drawerWidth }
}));

const AdminHeader: React.FC<RouteComponentProps<{}>> = ({
  match,
  history,
  location
}) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    useConfirmDeleteItem,
    handleLogout,
    sess,
    _onLocalhostFn
  } = useContext(AppContext);
  const [{ confirmState }, onLogout] = useConfirmDeleteItem();
  const [notifications, setNotifications] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElNoti, setAnchorElNoti] = useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const notiOpen = Boolean(anchorElNoti);

  const notiClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNoti(event.currentTarget);
  };

  const notiClose = () => {
    setAnchorElNoti(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function getNotifications() {
    const res = await _xhrPost({
      csrf,
      url: "aloadusersystem",
      body: {
        action: "noti",
        adminid: sess.userId
        // startindex: (notiPage - 1) * 10,
        // lastindex: notiPage * 10
      }
    });
    setCsrf(res.csrf);
    console.log(res.data);
    setNotifications(res.data);
  }

  useEffect(() => {
    _onLocalhostFn(
      () => {
        setNotifications({
          list: [
            {
              activity: {
                method: "edit form",
                data: [{ boarddisplay: 1 }]
              },
              reflink: 4314742,
              read: 0,
              createdate: "2020-03-26T13:57:45.000Z"
            },
            {
              activity: {
                method: "delete form",
                data: { business_name: "AAA1" }
              },
              reflink: 2310081,
              read: 0,
              createdate: "2020-03-25T21:35:18.000Z"
            },
            {
              activity: {
                method: "delete form",
                data: { business_name: "TPGSA" }
              },
              reflink: 8069118,
              read: 0,
              createdate: "2020-03-25T18:46:04.000Z"
            },
            {
              activity: {
                method: "edit topup",
                data: [{ value: "100" }]
              },
              reflink: 347147812,
              read: 0,
              createdate: "2020-03-24T14:54:12.000Z"
            },
            {
              activity: {
                method: "edit topup",
                data: [{ value: "90" }]
              },
              reflink: 347147812,
              read: 0,
              createdate: "2020-03-24T14:50:17.000Z"
            },
            {
              activity: {
                method: "edit topup",
                data: [{ value: "100" }]
              },
              reflink: 347147812,
              read: 0,
              createdate: "2020-03-24T14:45:57.000Z"
            },
            {
              activity: {
                method: "edit topup",
                data: [{ topupstatus: 1 }]
              },
              reflink: 632217982,
              read: 0,
              createdate: "2020-03-24T05:33:16.000Z"
            },
            {
              activity: {
                method: "edit topup",
                data: [{ topupstatus: -1 }]
              },
              reflink: 181778193,
              read: 0,
              createdate: "2020-03-24T05:33:04.000Z"
            },
            {
              activity: {
                method: "edit topup",
                data: [{ topupstatus: -1 }]
              },
              reflink: 581613014,
              read: 0,
              createdate: "2020-03-24T05:32:47.000Z"
            }
          ],
          count: 13
        });
      },
      () => {
        if (sess && sess.status === "need login before") {
          history.replace(match.path);
        }
        if (sess) {
          getNotifications();
        }
      }
    );
  }, []);

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <Toolbar style={{ paddingRight: 0 }}>
        <Typography variant="h6" className={classes.title} color="primary">
          Admin
        </Typography>
        {notifications && (
          <IconButton onClick={notiClick}>
            <Badge
              badgeContent={
                notifications.list.filter((item: any) => item.read === 0).length
              }
              color="secondary"
            >
              <Notifications />
            </Badge>
          </IconButton>
        )}
        <IconButton edge="start" color="primary" onClick={handleClick}>
          <MoreVert style={{ color: grey[700] }} />
        </IconButton>
        <ConfirmDialog
          type="delete"
          open={confirmState}
          onClose={() => onLogout({ action: "cancel" })}
          onCancel={() => onLogout({ action: "cancel" })}
          onSubmit={() => {
            handleClose();
            handleLogout();
          }}
          title="คุณแน่ใจหรือไม่ว่าต้องการจะลงชื่อออกหรือไม่ ?"
          submitText="ลงชื่อออก"
          headIcon={ExitToApp}
        />
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => onLogout({ action: "delete" })}>
            ลงชื่อออก
          </MenuItem>
        </Menu>
      </Toolbar>
      <Popover
        open={notiOpen}
        anchorEl={anchorElNoti}
        onClose={notiClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        PaperProps={{ style: { width: 360, maxHeight: "60%" } }}
      >
        <NotiList data={notifications} />
      </Popover>
    </AppBar>
  );
};
export default withRouter(props => <AdminHeader {...props} />);
