import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Divider,
  Typography,
  Button,
  ListItem,
  ListItemText,
  Theme
} from "@material-ui/core";
import { AppContext } from "../../AppContext";

const useStyles = makeStyles((theme: Theme) => ({
  content: { flexGrow: 1, padding: "16px 16px 68px 16px", overflow: "auto" },
  buttonGroup: {
    display: "flex",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.default
  }
}));

const NotificationsList: React.FC<any> = () => {
  const classes = useStyles();
  const {
    setNotiPage,
    notifications,
    _dateToString,
    _getNotiText
  } = useContext(AppContext);
  const ctx = useContext(AppContext);

  const arr = "list" in notifications ? notifications.list : notifications;

  return (
    <React.Fragment>
      <Divider />
      {notifications && arr.length > 0 ? (
        arr.map((d: any, i: number) => (
          <React.Fragment key={i}>
            <ListItem button>
              <ListItemText
                primary={_getNotiText(d).primary}
                secondary={
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <Typography component="span" color="textSecondary">
                      {_getNotiText(d).secondary}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      {_dateToString(d.createdate)}
                    </Typography>
                  </span>
                }
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
      {notifications && arr.length >= 10 && (
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
export default NotificationsList;
