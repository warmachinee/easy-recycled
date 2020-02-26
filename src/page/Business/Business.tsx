import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({}));

export interface BusinessProps {}

const Business: React.FC<BusinessProps> = () => {
  const classes = useStyles();
  return <div>Business</div>;
};
export default Business;
