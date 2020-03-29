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

const NotificationsList = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'NotificationsList' */ "../../component/Utils/NotificationsList"
    ),
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
    _onLocalhostFn,
    notifications,
    readNotifications
  } = useContext(AppContext);
  const [{ confirmState }, onLogout] = useConfirmDeleteItem();
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

  useEffect(() => {
    if (sess && sess.status === "need login before") {
      history.replace(match.path);
    }
  }, []);

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <Toolbar style={{ paddingRight: 0 }}>
        <Typography variant="h6" className={classes.title} color="primary">
          {sess ? `${sess.fullname} ${sess.lastname}` : "Admin"}
        </Typography>
        {notifications && (
          <IconButton
            onClick={(e: any) => {
              readNotifications();
              notiClick(e);
            }}
          >
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
        {/* <IconButton onClick={notiClick}>
          <Badge badgeContent={4} color="secondary">
            <Notifications />
          </Badge>
        </IconButton> */}
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
        <NotificationsList />
      </Popover>
    </AppBar>
  );
};
export default withRouter(props => <AdminHeader {...props} />);
