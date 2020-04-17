import React, { useContext } from "react";
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
import {
  Menu as MenuIcon,
  MoreVert,
  ExitToApp,
  Notifications,
} from "@material-ui/icons";
import { green, grey } from "@material-ui/core/colors";
import { AppContext } from "../../AppContext";
import Loadable from "react-loadable";
import { Link } from "react-router-dom";

const AppButton = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'AppButton' */ "../../AppComponent/AppButton"),
  loading: () => null,
});

const ConfirmDialog = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'ConfirmDialog' */ "../../component/Dialog/ConfirmDialog"
    ),
  loading: () => null,
});

const useStyles = makeStyles((theme) => ({ title: { flexGrow: 1 } }));

const CustomerHeader: React.FC<any> = ({
  userInfo,
  handleLogout,
  booleanDispatch,
}) => {
  const classes = useStyles();
  const {
    useConfirmDeleteItem,
    profileData,
    notifications,
    readNotifications,
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

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar style={{ paddingRight: 0 }}>
        <IconButton
          style={{ padding: 0, marginRight: 16 }}
          onClick={() => {
            handleClose();
            booleanDispatch({
              type: "true",
              key: "userProfile",
            });
          }}
        >
          {/* {userInfo && userInfo.info && <Avatar src={userInfo.info.picture} />} */}
          {profileData && <Avatar src={profileData.pictureUrl} />}
        </IconButton>
        <Typography variant="h6" className={classes.title} color="primary">
          EasyRecycled
        </Typography>
        {notifications && !("status" in notifications) && (
          <IconButton
            style={{ marginRight: 16 }}
            onClick={() => {
              if (
                notifications.filter((item: any) => item.read === 0).length > 0
              ) {
                readNotifications();
              }
              booleanDispatch({
                type: "true",
                key: "noti",
              });
            }}
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
        <IconButton edge="start" color="primary">
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
          <MenuItem
            onClick={() => {
              handleClose();
              booleanDispatch({
                type: "true",
                key: "userProfile",
              });
            }}
          >
            โปรไฟล์
          </MenuItem>
          <MenuItem onClick={() => onLogout({ action: "delete" })}>
            ลงชื่อออก
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default CustomerHeader;
