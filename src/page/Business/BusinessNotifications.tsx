import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Dialog,
  Divider,
  Typography,
  Button,
  ListItem,
  ListItemText,
  Theme
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { AppContext } from "../../AppContext";

const useStyles = makeStyles((theme: Theme) => ({
  content: { flexGrow: 1, padding: "16px 16px 68px 16px", overflow: "auto" },
  buttonGroup: {
    display: "flex",
    padding: 8,
    position: "absolute",
    bottom: 0,
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.default
  }
}));

export interface BusinessNotificationsProps {}

const BusinessNotifications: React.FC<BusinessNotificationsProps> = () => {
  const classes = useStyles();
  const { notiPage, paginationChange, notifications } = useContext(AppContext);
  const [open, setOpen] = useState(
    window.location.pathname === "/business/notifications"
  );

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
      <Typography variant="h6" style={{ fontWeight: 600 }} align="center">
        การแจ้งเตือน
      </Typography>
      <Divider style={{ margin: "8px 0" }} />
      <div className={classes.content}>
        {notifications &&
          notifications.map((d: any, i: number) => (
            <React.Fragment key={d.createdate}>
              <ListItem button>
                <ListItemText
                  primary={d.activity.method}
                  secondary={d.activity.data.business_name}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
      </div>
      <div className={classes.buttonGroup}>
        {notifications && Math.ceil(notifications.length / 10) > 1 && (
          <div
            style={{
              margin: "16px 0",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Pagination
              count={Math.ceil(notifications.length / 10)}
              page={notiPage}
              variant="outlined"
              shape="rounded"
              onChange={paginationChange}
            />
          </div>
        )}
        <Link to="/business" style={{ textDecoration: "none", flexGrow: 1 }}>
          <Button
            style={{ width: "calc(100% - 16px)", margin: 8 }}
            color="primary"
            variant="outlined"
          >
            ย้อนกลับ
          </Button>
        </Link>
      </div>
    </Dialog>
  );
};
export default BusinessNotifications;
