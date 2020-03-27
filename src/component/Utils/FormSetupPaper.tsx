import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 12,
    marginTop: 16,
    border: "1px solid"
  }
}));

const FormSetupPaper: React.FC<any> = ({ children }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={2}>
      {children}
    </Paper>
  );
};
export default FormSetupPaper;
