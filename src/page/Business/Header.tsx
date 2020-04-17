import React, { useContext, useEffect } from "react";
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
  Badge,
} from "@material-ui/core";
import { MoreVert, ExitToApp, Notifications } from "@material-ui/icons";
import { green, grey } from "@material-ui/core/colors";
import { AppContext } from "../../AppContext";
import { Link } from "react-router-dom";

const ConfirmDialog = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'ConfirmDialog' */ "../../component/Dialog/ConfirmDialog"
    ),
  loading: () => null,
});

const useStyles = makeStyles((theme) => ({ title: { flexGrow: 1 } }));

const Header: React.FC<any> = () => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    useConfirmDeleteItem,
    notifications,
    readNotifications,
    booleanDispatch,
    sess,
    userInfo,
    profileData,
    handleLogout,
  } = useContext(AppContext);
  const [{ confirmState }, onLogout] = useConfirmDeleteItem();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // async function onDelete() {
  //   const res = await _xhrPost({
  //     csrf,
  //     url: "deluser",
  //     body: {
  //       cert: "caviz",
  //       userid: sess.userid,
  //       type: "business",
  //     },
  //   });
  //   console.log(res.data);
  //   setCsrf(res.csrf);
  //   window.location.reload();
  // }

  return (
    <AppBar position="static" color="inherit">
      <Toolbar style={{ paddingRight: 0 }}>
        <Link
          to={"/business/profile"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <IconButton style={{ padding: 0, marginRight: 16 }}>
            {profileData && <Avatar src={profileData.pictureUrl} />}
            {/* {userInfo && userInfo.info && (
              <Avatar src={userInfo.info.picture} />
            )} */}
          </IconButton>
        </Link>

        <Typography variant="h6" className={classes.title} color="primary">
          EasyRecycled
        </Typography>
        {notifications && !("status" in notifications) && (
          <IconButton
            onClick={() => {
              if (
                notifications.filter((item: any) => item.read === 0).length > 0
              ) {
                readNotifications();
              }
              booleanDispatch({ type: "true", key: "noti" });
            }}
            style={{ marginRight: 16 }}
          >
            <Badge
              badgeContent={
                notifications.filter((item: any) => item.read === 0).length
              }
              color="secondary"
            >
              <Notifications />
            </Badge>
          </IconButton>
        )}

        {/* <IconButton edge="start" color="primary" onClick={handleClick}>
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
        /> */}
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <Link
            to={"/business/profile"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem onClick={handleClose}>โปรไฟล์</MenuItem>
          </Link>
          <MenuItem onClick={() => onLogout({ action: "delete" })}>
            ลงชื่อออก
          </MenuItem>
          {/* <MenuItem onClick={onDelete}>ลบ Account</MenuItem> */}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
