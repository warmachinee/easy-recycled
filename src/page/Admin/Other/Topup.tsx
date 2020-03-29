import React, { useContext, useEffect, useState, useReducer } from "react";
import Loadable from "react-loadable";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../../AppContext";
import {
  Typography,
  ListItem,
  Divider,
  FormControl,
  Select,
  MenuItem,
  Avatar
} from "@material-ui/core";
import { amber, green, red } from "@material-ui/core/colors";
import Pagination from "@material-ui/lab/Pagination";
import { BooleanReducerState, BooleanReducerActions } from "apptype";
import { withRouter, RouteComponentProps } from "react-router-dom";

const Progress = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'Progress' */ "../../../component/Utils/Progress"
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

const TopupDetail = Loadable({
  loader: () => import(/* webpackChunkName: 'TopupDetail' */ "./TopupDetail"),
  loading: () => null
});

const useStyles = makeStyles(theme => ({ topupItem: { padding: 12 } }));

export type TopupProps = RouteComponentProps<{}>;

const TopupItemList: React.FC<any> = props => {
  const { topupList, topupType, onClickDetail } = props;
  const arr =
    topupType === 10
      ? topupList.list
      : topupList.list.filter((item: any) => item.status === topupType);
  return (
    <div style={{ minWidth: 600 }}>
      {arr.length > 0 ? (
        arr.map((d: any, i: number) => (
          <TopupItem key={d.requestid} data={d} {...{ onClickDetail }} />
        ))
      ) : (
        <Typography
          style={{ margin: "24px 0" }}
          align="center"
          variant="h4"
          color="textSecondary"
        >
          ไม่มีรายการ
        </Typography>
      )}
    </div>
  );
};

const TopupItem: React.FC<any> = ({ data, onClickDetail }) => {
  const classes = useStyles();
  const { _dateToString, _thousandSeperater } = useContext(AppContext);

  function getStatus(status: number) {
    switch (status) {
      case 0:
        return (
          <Typography style={{ ...(data.bill === 1 && { color: amber[600] }) }}>
            {data.bill === 1 ? "รอดำเนินการ" : "ยังไม่ได้อัพโหลดสลิป"}
          </Typography>
        );
      case 1:
        return <Typography style={{ color: green[600] }}>สำเร็จ</Typography>;
      case -1:
        return <Typography style={{ color: red[600] }}>ไม่สำเร็จ</Typography>;
      default:
        return null;
    }
  }

  return (
    <React.Fragment>
      <ListItem
        button
        className={classes.topupItem}
        onClick={() => onClickDetail(data)}
      >
        <Typography style={{ marginRight: 24 }}>
          {_dateToString(data.createdate)}
        </Typography>
        <Typography
          style={{ flex: 1 }}
        >{`${data.fullname} ${data.lastname} (${data.displayname})`}</Typography>
        {getStatus(data.status)}
        <Typography variant="h6" style={{ width: 100 }} align="right">
          {_thousandSeperater(data.value)} ฿
        </Typography>
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

const Topup: React.FC<TopupProps> = ({ location, history, match }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    _onLocalhostFn,
    booleanReducer,
    getTopupImg
  } = useContext(AppContext);
  const [topupList, setTopupList] = useState<any>(null);
  const [topupType, setTopupType] = useState<any>(10);
  const [{ detail }, booleanDispatch] = useReducer<
    React.Reducer<BooleanReducerState, BooleanReducerActions>
  >(booleanReducer, { detail: false });
  const [topupDetail, setTopupDetail] = useState<any>(null);
  const [topupPage, setTopupPage] = React.useState(getHash());

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
    setTopupPage(value);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTopupType(event.target.value as string);
  };

  function onClickDetail(detail: any) {
    setTopupDetail(detail);
    booleanDispatch({ type: "true", key: "detail" });
  }

  async function getTopupList() {
    const res = await _xhrPost({
      csrf,
      url: "aloadtopup",
      body: {
        action: "list",
        startindex: (topupPage - 1) * 10,
        lastindex: topupPage * 10
      }
    });

    setCsrf(res.csrf);
    setTopupList(res.data);
  }

  function getPercentStatus(i: number) {
    switch (i % 3) {
      case 0:
        return 1;
      case 1:
        return 0;
      case 2:
        return -1;
      default:
        return 0;
    }
  }

  useEffect(() => {
    getTopupList();
  }, [topupPage]);

  return (
    <div>
      <div style={{ display: "flex", marginBottom: 24 }}>
        <Typography variant="h5" style={{ marginRight: 16 }}>
          รายการเติมเงิน
        </Typography>
        <FormControl size="small">
          <Select value={topupType} onChange={handleChange} variant="outlined">
            <MenuItem value={10}>ทั้งหมด</MenuItem>
            <MenuItem value={0}>รอดำเนินการ</MenuItem>
            <MenuItem value={1}>สำเร็จ</MenuItem>
            <MenuItem value={-1}>ไม่สำเร็จ</MenuItem>
          </Select>
        </FormControl>
      </div>
      {topupList ? (
        topupList.list.length > 0 ? (
          <TopupItemList
            {...{
              topupList,
              topupType,
              onClickDetail,
              paginationChange,
              topupPage
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
      {topupList && Math.ceil(topupList.count / 10) > 1 && (
        <div
          style={{ marginTop: 16, display: "flex", justifyContent: "center" }}
        >
          <Pagination
            count={Math.ceil(topupList.count / 10)}
            page={topupPage}
            variant="outlined"
            shape="rounded"
            onChange={paginationChange}
          />
        </div>
      )}
      <GeneralDialog
        open={detail}
        onClose={() => booleanDispatch({ type: "false", key: "detail" })}
        title="รายละเอียดการเติมเงิน"
      >
        {topupDetail && (
          <TopupDetail {...{ topupDetail, booleanDispatch, getTopupList }} />
        )}
      </GeneralDialog>
    </div>
  );
};

export default withRouter(props => <Topup {...props} />);
