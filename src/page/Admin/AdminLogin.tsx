import React, { useState, useContext } from "react";
import Loadable from "react-loadable";
import { makeStyles } from "@material-ui/styles";
import { Paper, TextField, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { AppContext } from "../../AppContext";

const AppButton = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'AppButton' */ "../../AppComponent/AppButton"),
  loading: () => null
});

const cardWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    backgroundColor: "black",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "relative"
  },
  card: {
    padding: 24,
    width: cardWidth,
    borderRadius: 12,
    opacity: 0.93,
    backgroundColor: "white"
  }
}));

export interface AdminLoginProps {}

const CardGrid: React.FC<any> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%"
      }}
    >
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {children}
      </div>
      <div style={{ flex: 1 }} />
    </div>
  );
};

const AdminLogin: React.FC<AdminLoginProps> = React.memo(() => {
  const classes = useStyles();
  const { _onEnter, getSess, _xhrPost, csrf, setCsrf, ic_bg } = useContext(
    AppContext
  );
  const [err, setErr] = useState<any>({ username: false, password: false });
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function onLogin() {
    const sendObj = {
      username,
      password
    };
    const res = await _xhrPost({
      csrf,
      url: "alogin",
      body: sendObj
    });
    setCsrf(res.csrf);

    switch (res.data.status) {
      case "wrong username":
        setErr({ username: true, password: false });
        break;
      case "wrong password":
        setErr({ username: false, password: true });
        break;
      case "success":
        getSess();
        break;
      default:
        setErr({ username: false, password: false });
        break;
    }
  }

  return (
    <div className={classes.root} style={{ backgroundImage: `url(${ic_bg})` }}>
      <CardGrid>
        <Paper elevation={4} className={classes.card}>
          <Typography
            align="center"
            variant="h5"
            style={{ marginBottom: 24, fontWeight: 600 }}
          >
            Admin Login
          </Typography>
          <TextField
            autoFocus
            fullWidth
            variant="filled"
            label="Username"
            {...(err.username && {
              error: true,
              helperText: "Wrong username"
            })}
            style={{ marginBottom: 16 }}
            onChange={e => setUsername(e.target.value)}
            onKeyPress={_onEnter(
              username === "" || password === "" ? () => {} : onLogin
            )}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Password"
            type="password"
            {...(err.password && {
              error: true,
              helperText: "Wrong password"
            })}
            onChange={e => setPassword(e.target.value)}
            onKeyPress={_onEnter(
              username === "" || password === "" ? () => {} : onLogin
            )}
          />
          <AppButton
            variant="contained"
            buttonColor={green}
            style={{ marginTop: 16, width: "100%" }}
            size="large"
            onClick={onLogin}
            disabled={username === "" || password === ""}
          >
            Login
          </AppButton>
        </Paper>
      </CardGrid>
    </div>
  );
});

export default AdminLogin;
