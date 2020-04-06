import React, { useContext, useEffect, useState } from "react";
import Loadable from "react-loadable";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../../AppContext";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
  Theme,
  Divider,
  Link,
  Menu,
  Chip
} from "@material-ui/core";
import { red, green, grey } from "@material-ui/core/colors";
import { MoreVert, Storefront } from "@material-ui/icons";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

const Progress = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'Progress' */ "../../../component/Utils/Progress"
    ),
  loading: () => null
});

const ConfirmDialog = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'ConfirmDialog' */ "../../../component/Dialog/ConfirmDialog"
    ),
  loading: () => null
});

const GeneralDialog = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'GeneralDialog' */ "../../../component/Dialog/GeneralDialog"
    ),
  loading: () => null
});

const GoodsDetail = Loadable({
  loader: () => import(/* webpackChunkName: 'GoodsDetail' */ "./GoodsDetail"),
  loading: () => null
});

const useStyles = makeStyles((theme: Theme) => ({
  paper: { padding: 8 },
  itemPaper: {
    position: "relative",
    margin: theme.spacing(2, 0),
    padding: 16,
    minWidth: 650
  }
}));

export type GoodsListProps = RouteComponentProps<{}>;

const GoodsItemList: React.FC<any> = props => {
  const { goods, goodsType } = props;
  const arr = getArr();

  function getArr() {
    switch (goodsType) {
      case 10:
        return goods.list;
      case 1:
        return goods.list.filter((item: any) => item.boarddisplay === 1);
      case -1:
        return goods.list.filter((item: any) => item.boarddisplay === 0);
      case 2:
        return goods.list.filter((item: any) => item.endofsale === 0);
      case -2:
        return goods.list.filter((item: any) => item.endofsale === 1);
      default:
        return goods.list;
    }
  }

  return (
    <div>
      {arr.length > 0 ? (
        arr.map((d: any, i: number) => (
          <GoodsItem key={d.formid} data={d} {...props} />
        ))
      ) : (
        <Typography style={{ marginTop: 24 }} align="center">
          ไม่มีรายการ
        </Typography>
      )}
    </div>
  );
};

const GoodsItem: React.FC<any> = props => {
  const classes = useStyles();
  const { data, onDeleteGoods, onClickGoods } = props;
  const { _dateToString, _parseLocation } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      className={classes.itemPaper}
      elevation={data.endofsale === 1 ? 0 : 3}
      style={{
        ...(data.endofsale === 1 && {
          backgroundColor: "inherit",
          opacity: 0.7
        })
      }}
    >
      <IconButton
        onClick={handleClick}
        style={{ position: "absolute", right: 0, top: 0 }}
      >
        <MoreVert />
      </IconButton>
      <div style={{ display: "flex", alignItems: "center" }}>
        {data.boarddisplay === 1 && (
          <Chip
            icon={<Storefront style={{ color: "white" }} />}
            label="ขายบนร้านค้า"
            style={{
              marginRight: 16,
              color: "white",
              backgroundColor: green[700]
            }}
          />
        )}
        <Link
          style={{ flex: 1, color: "inherit" }}
          onClick={() => onClickGoods(data)}
        >
          <Typography variant="h6" style={{ cursor: "pointer" }}>
            {data.business_name} {data.endofsale === 1 ? "(จบการขายแล้ว)" : ""}
          </Typography>
        </Link>
      </div>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <Typography style={{ width: 100 }}>สิทธิการเข้าดู</Typography>
        <Typography
          variant="h6"
          style={{
            color: data.accessremain === 0 ? red[600] : green[600],
            marginRight: 24
          }}
        >{`${data.accessremain}/${data.accesstotal}`}</Typography>
        <Typography style={{ marginRight: 8 }}>วันนัดดูสินค้า</Typography>
        <Typography style={{ marginRight: 24, fontWeight: 600 }}>
          {_dateToString(data.appointment)}
        </Typography>
        <Typography style={{ marginRight: 8 }}>วันเปิดประมูล</Typography>
        <Typography style={{ fontWeight: 600 }}>
          {_dateToString(data.auctiondate)}
        </Typography>
      </div>
      <div style={{ display: "flex" }}>
        <Typography style={{ width: 100 }}>เขตพิ้นที่รับ</Typography>
        <Typography style={{ fontWeight: 600 }}>
          {_parseLocation(data.location).label}
        </Typography>
      </div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            onClickGoods(data);
          }}
        >
          แก้ไข
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onDeleteGoods({ action: "delete", item: data });
          }}
        >
          ลบรายการ
        </MenuItem>
      </Menu>
    </Paper>
  );
};

const GoodsList: React.FC<GoodsListProps> = ({ location, history, match }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    _onLocalhostFn,
    useConfirmDeleteItem
  } = useContext(AppContext);
  const [goods, setGoods] = useState<any>(null);
  const [goodsType, setGoodsType] = useState<any>(10);
  const [
    { confirmState, item: itemOnDelete },
    onDeleteGoods
  ] = useConfirmDeleteItem();
  const [goodsDetail, setGoodsDetail] = useState<any>(null);
  const [goodsDetailState, setGoodsDetailState] = useState<boolean>(false);
  const [goodsPage, setGoodsPage] = React.useState(getHash());

  function getHash() {
    const hash = location.hash;
    if (hash === "") {
      return 1;
    } else {
      return parseInt(hash.split("#")[1]);
    }
  }

  const paginationChange = (event: any, value: any) => {
    history.replace(`${match.path}#${value}`);
    setGoodsPage(value);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGoodsType(event.target.value as string);
  };

  function onClickGoods(goods: any) {
    setGoodsDetail(goods);
    setGoodsDetailState(true);
  }

  function onCloseGoodsDetail() {
    setGoodsDetail(null);
    setGoodsDetailState(false);
  }

  async function onDeleteGoodsItem() {
    const res = await _xhrPost({
      csrf,
      url: "abusinesssystem",
      body: {
        action: "form_delete",
        formid: itemOnDelete.formid
      }
    });
    setCsrf(res.csrf);

    onDeleteGoods({ action: "cancel" });
    getGoodsList();
  }

  async function getGoodsList() {
    const res = await _xhrPost({
      csrf,
      url: "aloadbusiness",
      body: {
        action: "form_list",
        startindex: (goodsPage - 1) * 10,
        lastindex: goodsPage * 10
      }
    });

    setCsrf(res.csrf);
    setGoods(res.data);
  }

  useEffect(() => {
    if (!goodsDetailState) {
      getGoodsList();
    }
  }, [goodsPage, goodsDetailState]);

  return (
    <div style={{ padding: 12 }}>
      <div style={{ display: "flex", marginBottom: 24 }}>
        <Typography variant="h5" style={{ marginRight: 16 }}>
          รายการสินค้า
        </Typography>
        <FormControl size="small">
          <Select value={goodsType} onChange={handleChange} variant="outlined">
            <MenuItem value={10}>ทั้งหมด</MenuItem>
            <MenuItem value={1}>ขายบนร้านค้า</MenuItem>
            <MenuItem value={-1}>ไม่ได้ขายบนร้านค้า</MenuItem>
            <MenuItem value={2}>กำลังขาย</MenuItem>
            <MenuItem value={-2}>จบการขายแล้ว</MenuItem>
          </Select>
        </FormControl>
      </div>
      {goods ? (
        goods.list.length > 0 ? (
          <GoodsItemList
            {...{
              goods,
              goodsType,
              onDeleteGoods,
              onClickGoods,
              paginationChange,
              goodsPage
            }}
          />
        ) : (
          <Typography
            style={{ margin: "24px 0" }}
            align="center"
            variant="h4"
            color="textSecondary"
          >
            ไม่มีรายการ
          </Typography>
        )
      ) : (
        <Progress />
      )}
      {goods && Math.ceil(goods.count / 10) > 1 && (
        <div
          style={{ marginTop: 16, display: "flex", justifyContent: "center" }}
        >
          <Pagination
            count={Math.ceil(goods.count / 10)}
            page={goodsPage}
            variant="outlined"
            shape="rounded"
            onChange={paginationChange}
          />
        </div>
      )}
      <GeneralDialog
        open={goodsDetailState}
        onClose={onCloseGoodsDetail}
        title="รายละเอียดสินค้า"
        maxWidth="sm"
      >
        {goodsDetail && <GoodsDetail detail={goodsDetail} />}
      </GeneralDialog>
      <ConfirmDialog
        type="delete"
        open={confirmState}
        onClose={() => onDeleteGoods({ action: "cancel" })}
        onCancel={() => onDeleteGoods({ action: "cancel" })}
        onSubmit={onDeleteGoodsItem}
        title="คุณแน่ใจหรือไม่ว่าต้องการจะลบข้อมูล ?"
      >
        <Typography variant="h6" style={{ fontWeight: 400 }} align="center">
          {itemOnDelete && itemOnDelete.business_name}
        </Typography>
      </ConfirmDialog>
    </div>
  );
};
export default withRouter(props => <GoodsList {...props} />);
