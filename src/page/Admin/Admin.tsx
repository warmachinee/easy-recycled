import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({}));

export interface AdminProps {}

const Admin: React.FC<AdminProps> = () => {
  const classes = useStyles();
  return (
    <div>
      Admin
      <pre>{JSON.stringify(navigator.userAgent, null, 2)}</pre>
    </div>
  );
};
export default Admin;
