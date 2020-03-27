import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  Divider,
  ListItem,
  Theme,
  ListItemText
} from "@material-ui/core";
import { AppContext } from "../../AppContext";

const useStyles = makeStyles((theme: Theme) => ({
  root: { position: "relative" },
  label: {
    backgroundColor: theme.palette.grey[100],
    padding: 12,
    position: "fixed",
    width: 360,
    boxSizing: "border-box",
    zIndex: 1301
  },
  content: {}
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
    _dateToString
  } = useContext(AppContext);
  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.label}>
        การแจ้งเตือน
      </Typography>
      <Divider style={{ marginBottom: 12 }} />
      <div className={classes.content}>
        <div style={{ height: 56 }} />
        {data && data.list.length > 0 ? (
          data.list.map((d: any, i: number) => (
            <React.Fragment key={i}>
              <ListItem>
                <ListItemText primary={_dateToString(d.createdate)} />
                <ListItemText primary={d.activity.method} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography style={{ margin: "24px 0" }} align="center">
            ไม่มีการแจ้งเตือน
          </Typography>
        )}
      </div>
    </div>
  );
};
export default NotiList;
