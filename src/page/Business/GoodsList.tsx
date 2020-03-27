import React, { useEffect, useContext, useState } from "react";
import Loadable from "react-loadable";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../AppContext";
import {
  IconButton,
  Typography,
  Paper,
  FormControl,
  Select,
  MenuItem,
  List,
  ListItemText,
  ListItem,
  Divider,
  Theme,
  Menu
} from "@material-ui/core";
import { Close as CloseIcon, MoreVert } from "@material-ui/icons";
import { Link, Route, withRouter, RouteComponentProps } from "react-router-dom";
import { red, green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => ({
  paper: { padding: 8 },
  itemPaper: { margin: theme.spacing(1, 0), padding: 8 }
}));

const AddFab = Loadable({
  loader: () => import(/* webpackChunkName: 'AddFab' */ "./AddFab"),
  loading: () => null
});

const GoodsForm = Loadable({
  loader: () => import(/* webpackChunkName: 'GoodsForm' */ "./GoodsForm"),
  loading: () => null
});

const BusinessProfile = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'BusinessProfile' */ "./BusinessProfile"),
  loading: () => null
});

const BusinessNotifications = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'BusinessNotifications' */ "./BusinessNotifications"
    ),
  loading: () => null
});

const ConfirmDialog = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'ConfirmDialog' */ "../../component/Dialog/ConfirmDialog"
    ),
  loading: () => null
});

export type GoodsListProps = RouteComponentProps<{}>;

const GoodsListItem: React.FC<any> = ({ match, data, index, loadForm }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _dateToString,
    useConfirmDeleteItem,
    profileData,
    _xhrPost
  } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [
    { confirmState, item: itemOnDelete },
    onDeleteList
  ] = useConfirmDeleteItem();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function onDeleteListItem() {
    const res = await _xhrPost({
      csrf,
      url: "formsystem",
      body: {
        action: "delete",
        linetoken: profileData.userId,
        formid: itemOnDelete.formid
      }
    });
    setCsrf(res.csrf);
    console.log(res.data);
    loadForm();
  }

  return (
    <React.Fragment>
      <ListItem style={{ padding: 0 }}>
        <ListItemText
          primary={
            <Paper elevation={3} className={classes.itemPaper}>
              <div style={{ display: "flex" }}>
                <Typography
                  variant="h6"
                  style={{
                    color: data.accessremain === 0 ? red[600] : green[600],
                    padding: "0 4px",
                    marginRight: 8
                  }}
                >{`${data.accessremain}/${data.accesstotal}`}</Typography>
                <Typography variant="h6" style={{ flex: 1 }}>
                  {data.business_name}
                </Typography>
                <IconButton onClick={handleClick}>
                  <MoreVert />
                </IconButton>
              </div>
              <Typography>{data.location}</Typography>
              <span style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ display: "flex" }}>
                  <Typography
                    component="span"
                    variant="body2"
                    style={{ width: 100 }}
                  >
                    วันนัดดูสินค้า
                  </Typography>
                  <Typography component="span" variant="body2">
                    {_dateToString(data.appointment)}
                  </Typography>
                </span>
                <span style={{ display: "flex" }}>
                  <Typography
                    component="span"
                    variant="body2"
                    style={{ width: 100 }}
                  >
                    วันเปิดประมูล
                  </Typography>
                  <Typography component="span" variant="body2">
                    {_dateToString(data.auctiondate)}
                  </Typography>
                </span>
              </span>
            </Paper>
          }
        />
      </ListItem>
      <ConfirmDialog
        type="delete"
        open={confirmState}
        onClose={() => onDeleteList({ action: "cancel" })}
        onCancel={() => onDeleteList({ action: "cancel" })}
        onSubmit={onDeleteListItem}
        title="คุณแน่ใจหรือไม่ว่าต้องการจะลบข้อมูล ?"
      >
        <Typography variant="h6" style={{ fontWeight: 400 }} align="center">
          {itemOnDelete && itemOnDelete.business_name}
        </Typography>
      </ConfirmDialog>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Link
          to={`${match.path}/edit/${data.formid}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <MenuItem onClick={handleClose}>แก้ไข</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            handleClose();
            onDeleteList({ action: "delete", item: data });
          }}
        >
          ลบรายการ
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

const DefaultComponent: React.FC<any> = props => {
  const classes = useStyles();
  const { match } = props;
  const {
    csrf,
    setCsrf,
    enQSnackbar,
    closeSnackbar,
    _xhrPost,
    profileData
  } = useContext(AppContext);
  const [list, setList] = useState<any | null>(null);
  const [status, setStatus] = useState<any>(0);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
  };

  async function loadForm() {
    const res = await _xhrPost({
      csrf,
      url: "loadform",
      body: { action: "list", linetoken: profileData.userId }
    });
    setCsrf(res.csrf);
    console.log(res.data);
    setList(res.data);
  }

  useEffect(() => {
    if (profileData) {
      loadForm();
    }
  }, [profileData]);

  return (
    <div style={{ marginTop: 16 }}>
      <div className={classes.paper}>
        <FormControl>
          <Select value={status} onChange={handleChange} variant="outlined">
            <MenuItem value={0}>กำลังขาย</MenuItem>
            <MenuItem value={1}>จบการขายแล้ว</MenuItem>
          </Select>
        </FormControl>
        {list &&
          !("status" in list) &&
          (list.filter((item: any) => item.endofsale === status).length > 0 ? (
            list
              .filter((item: any) => item.endofsale === status)
              .map((d: any, i: number) => (
                <GoodsListItem
                  key={d.formid}
                  data={d}
                  index={i}
                  {...{ loadForm }}
                  {...props}
                />
              ))
          ) : (
            <Typography variant="h6" align="center" style={{ margin: 48 }}>
              ไม่มีรายการ
            </Typography>
          ))}
      </div>
      <Link to={`${match.path}/create`}>
        <AddFab />
      </Link>
    </div>
  );
};

const EditGoods = withRouter(props => <GoodsForm editting {...props} />);

const GoodsList: React.FC<GoodsListProps> = props => {
  const classes = useStyles();
  const { match } = props;
  const {
    csrf,
    setCsrf,
    enQSnackbar,
    closeSnackbar,
    _xhrPost,
    profileData
  } = useContext(AppContext);

  function addSnackbar() {
    enQSnackbar({
      message: `Item`,
      variant: "success",
      action
    });
  }

  const action = (key: any) => (
    <IconButton onClick={() => closeSnackbar(key)}>
      <CloseIcon style={{ color: "white" }} />
    </IconButton>
  );

  return (
    <div>
      <Route exact path={match.path} component={DefaultComponent} />
      <Route path={`${match.path}/create`} component={GoodsForm} />
      <Route path={`${match.path}/profile`} component={BusinessProfile} />
      <Route
        path={`${match.path}/notifications`}
        component={BusinessNotifications}
      />
      <Route path={`${match.path}/edit/:formid`} component={EditGoods} />
    </div>
  );
};
export default withRouter(props => <GoodsList {...props} />);
