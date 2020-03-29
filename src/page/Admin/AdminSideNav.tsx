import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import {
  Theme,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  createMuiTheme,
  Typography
} from "@material-ui/core";
import { grey, green } from "@material-ui/core/colors";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  label: {
    padding: theme.spacing(1, 2),
    color: grey[400]
  }
}));

export type AdminSideNavProps = RouteComponentProps<{}>;

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const Label: React.FC<any> = ({ text }) => {
  const classes = useStyles();
  return (
    <Typography variant="h6" className={classes.label}>
      {text}
    </Typography>
  );
};

const StyledListItem: React.FC<any> = ({ to, primary, location }) => {
  const classes = useStyles();
  return (
    <Link {...{ to }} style={{ color: "inherit", textDecoration: "none" }}>
      <ListItem button>
        <ListItemText
          primary={
            <Typography
              style={{
                ...(to === location.pathname && {
                  fontWeight: 700,
                  color: green[500]
                })
              }}
            >
              {primary}
            </Typography>
          }
        />
      </ListItem>
    </Link>
  );
};

const PaddingListItem: React.FC<any> = ({ to, primary, location }) => {
  const classes = useStyles();
  return (
    <Link {...{ to }} style={{ color: "inherit", textDecoration: "none" }}>
      <ListItem button>
        <ListItemText
          primary={
            <Typography
              style={{
                paddingLeft: 24,
                ...(to === location.pathname && {
                  fontWeight: 700,
                  color: green[500]
                })
              }}
            >
              {primary}
            </Typography>
          }
        />
      </ListItem>
    </Link>
  );
};

const AdminSideNav: React.FC<any> = ({ match, location, sess }) => {
  const classes = useStyles();

  const per1 =
    sess.permission &&
    sess.permission.permission.some((item: any) => item === 1);
  const per2 =
    sess.permission &&
    sess.permission.permission.some((item: any) => item === 2);
  const per3 =
    sess.permission &&
    sess.permission.permission.some((item: any) => item === 3);
  const per4 =
    sess.permission &&
    sess.permission.permission.some((item: any) => item === 4);
  const per5 =
    sess.permission &&
    sess.permission.permission.some((item: any) => item === 5);

  return (
    <ThemeProvider theme={theme}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <StyledListItem
            to={`${match.path}`}
            primary="แดชบอร์ด"
            {...{ location }}
          />
          {per3 && (
            <StyledListItem
              to={`${match.path}/goods_list`}
              primary="รายการสินค้า"
              {...{ location }}
            />
          )}
          {per5 && (
            <StyledListItem
              to={`${match.path}/topup`}
              primary="รายการเติมเงิน"
              {...{ location }}
            />
          )}

          <StyledListItem
            to={`${match.path}/admin_list`}
            primary="แอดมิน"
            {...{ location }}
          />
          <StyledListItem
            to={`${match.path}/setup`}
            primary="ตั้งค่า"
            {...{ location }}
          />
        </List>
        {per2 && (
          <React.Fragment>
            <Divider />
            <Label text="ลูกค้า" />
          </React.Fragment>
        )}
        <List>
          {per2 && (
            <PaddingListItem
              to={`${match.path}/customer_list`}
              primary="รายชื่อลูกค้า"
              {...{ location }}
            />
          )}
          {per4 && (
            <PaddingListItem
              to={`${match.path}/customer_form`}
              primary="ฟอร์มลูกค้า"
              {...{ location }}
            />
          )}
        </List>
        {per1 && (
          <React.Fragment>
            <Divider />
            <Label text="ผู้ขาย" />
          </React.Fragment>
        )}
        <List>
          {per1 && (
            <PaddingListItem
              to={`${match.path}/business_list`}
              primary="รายชื่อผู้ขาย"
              {...{ location }}
            />
          )}
          {(per3 || per4) && (
            <PaddingListItem
              to={`${match.path}/business_form`}
              primary="ฟอร์มผู้ขาย"
              {...{ location }}
            />
          )}
        </List>
        <Divider />
      </Drawer>
    </ThemeProvider>
  );
};
export default withRouter(props => <AdminSideNav {...props} />);
