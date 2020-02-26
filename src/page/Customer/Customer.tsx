import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({}));

const liff = window.liff;

export interface CustomerProps {}

const Customer: React.FC<CustomerProps> = () => {
  const classes = useStyles();
  const [profileData, setProfileData] = useState(null);

  function getProfile() {
    liff
      .getProfile()
      .then((profile: any) => {
        setProfileData(profile);
      })
      .catch(err => console.error(err));
  }

  function handleLogout() {
    liff.logout();
  }

  function handleFetch() {
    const myLiffId = "1653861118-DAld6Lv2";
    liff.init({ liffId: myLiffId }, async () => {
      if (liff.isLoggedIn()) {
        getProfile();
      } else {
        liff.login();
      }
    });
  }

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div>
      Liff
      <pre>{JSON.stringify(liff, null, 2)}</pre>
      Profile data
      <pre>{JSON.stringify(profileData, null, 2)}</pre>
      <Button onClick={handleLogout} variant="contained" color="primary">
        Logout
      </Button>
    </div>
  );
};
export default Customer;
