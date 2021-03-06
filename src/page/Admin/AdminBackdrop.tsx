import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Backdrop, CircularProgress, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

const AdminBackdrop: React.FC<any> = () => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
};
export default AdminBackdrop;
