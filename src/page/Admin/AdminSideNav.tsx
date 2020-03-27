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

const AdminSideNav: React.FC<AdminSideNavProps> = ({ match, location }) => {
  const classes = useStyles();

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
          <StyledListItem
            to={`${match.path}/goods_list`}
            primary="รายการสินค้า"
            {...{ location }}
          />
          <StyledListItem
            to={`${match.path}/topup`}
            primary="รายการเติมเงิน"
            {...{ location }}
          />
          <StyledListItem
            to={`${match.path}/setup`}
            primary="ตั้งค่า"
            {...{ location }}
          />
        </List>
        <Divider />
        <Label text="ลูกค้า" />
        <List>
          <PaddingListItem
            to={`${match.path}/customer_list`}
            primary="รายชื่อลูกค้า"
            {...{ location }}
          />
          <PaddingListItem
            to={`${match.path}/customer_form`}
            primary="ฟอร์มลูกค้า"
            {...{ location }}
          />
        </List>
        <Divider />
        <Label text="ผู้ขาย" />
        <List>
          <PaddingListItem
            to={`${match.path}/business_list`}
            primary="รายชื่อผู้ขาย"
            {...{ location }}
          />
          <PaddingListItem
            to={`${match.path}/business_form`}
            primary="ฟอร์มผู้ขาย"
            {...{ location }}
          />
        </List>
        <Divider />
      </Drawer>
    </ThemeProvider>
  );
};
export default withRouter(props => <AdminSideNav {...props} />);
