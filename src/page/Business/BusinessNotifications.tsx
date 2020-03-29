import React, { useContext } from "react";
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

export interface BusinessNotificationsProps {}

const BusinessNotifications: React.FC<BusinessNotificationsProps> = () => {
  const classes = useStyles();
  const { setNotiPage, notifications } = useContext(AppContext);

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
export default BusinessNotifications;
