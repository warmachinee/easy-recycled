import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  Divider,
  ListItem,
  Theme,
  ListItemText,
  Button
} from "@material-ui/core";
import { AppContext } from "../../AppContext";

const useStyles = makeStyles((theme: Theme) => ({
  root: { position: "relative" },
  label: {
    padding: 12,
    position: "fixed",
    width: 360,
    boxSizing: "border-box",
    zIndex: 1301
  },
  content: { flexGrow: 1, padding: "16px 16px 68px 16px", overflow: "auto" },
  buttonGroup: {
    display: "flex",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.default
  }
}));

export interface NotiListProps {}

const NotiList: React.FC<NotiListProps | any> = ({ data }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    useConfirmDeleteItem,
    handleLogout,
    sess,
    _dateToString,
    notifications,
    setNotiPage
  } = useContext(AppContext);
  return (
    <React.Fragment>
      <Divider />
      {notifications && notifications.length > 0 ? (
        notifications.map((d: any, i: number) => (
          <React.Fragment key={i}>
            <ListItem button>
              <ListItemText
                primary={d.activity.method}
                secondary={d.activity.data.business_name}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))
      ) : (
        <Typography
          style={{ margin: "24px 0" }}
          align="center"
          variant="h4"
          color="textSecondary"
        >
          ไม่มีการแจ้งเตือน
        </Typography>
      )}
      {notifications && notifications.length >= 10 && (
        <div className={classes.buttonGroup}>
          <Button
            style={{ width: "calc(100% - 16px)", margin: 8, fontSize: 14 }}
            color="primary"
            variant="text"
            onClick={() => setNotiPage((num: any) => num + 1)}
          >
            โหลดเพิ่ม
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};
export default NotiList;
