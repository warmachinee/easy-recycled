import React from "react";
import { makeStyles } from "@material-ui/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({}));

export interface ProgressProps {}

const Progress: React.FC<ProgressProps> = () => {
  const classes = useStyles();
  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}
    >
      <CircularProgress color="primary" />
    </div>
  );
};
export default Progress;
