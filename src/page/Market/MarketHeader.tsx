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
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  MoreVert,
  ExitToApp,
  Refresh,
} from "@material-ui/icons";
import { green, grey } from "@material-ui/core/colors";
import { AppContext } from "../../AppContext";
import Loadable from "react-loadable";
import { withRouter, RouteComponentProps } from "react-router-dom";

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

const useStyles = makeStyles((theme) => ({
  avatar: { position: "absolute", left: 0 },
}));

const MarketHeader: React.FC<any | RouteComponentProps<{}>> = ({
  userInfo,
  handleLogout,
  history,
  location,
}) => {
  const classes = useStyles();
  const {
    useConfirmDeleteItem,
    sess,
    getMarketPlace,
    profileData,
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
    <AppBar position="fixed" color="inherit">
      <Toolbar style={{ paddingRight: 0 }}>
        <IconButton style={{ padding: 0 }} onClick={() => history.replace("/")}>
          {profileData ? (
            <Avatar src={profileData.pictureUrl} className={classes.avatar} />
          ) : (
            <Avatar style={{ marginRight: 16 }} className={classes.avatar}>
              {sess ? sess.fullname.charAt(0) : "M"}
            </Avatar>
          )}
        </IconButton>
        {/* <div style={{ flexGrow: 1 }} /> */}
        <Typography
          variant="h6"
          color="primary"
          align="center"
          style={{ flex: 1, fontWeight: 700, marginRight: 16 }}
        >
          บอร์ดสินค้า
        </Typography>
        <IconButton
          edge="start"
          color="primary"
          onClick={getMarketPlace}
          style={{ position: "absolute", right: 0 }}
        >
          <Refresh style={{ color: grey[700] }} />
        </IconButton>
        {/* <ConfirmDialog
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
        </Menu> */}
      </Toolbar>
    </AppBar>
  );
};
export default withRouter((props) => <MarketHeader {...props} />);
