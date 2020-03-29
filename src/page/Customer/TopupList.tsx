import React, { useEffect, useContext, useState, useReducer } from "react";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../AppContext";
import { Typography, Divider, ListItem } from "@material-ui/core";
import { amber, green, red } from "@material-ui/core/colors";
import Loadable from "react-loadable";
import { BooleanReducerState, BooleanReducerActions } from "apptype";
import GeneralDialog from "../../component/Dialog/GeneralDialog";
import UploadButton from "../../component/Utils/UploadButton";
import AppButton from "../../AppComponent/AppButton";
import { AttachMoney } from "@material-ui/icons";

const CustomerBackdrop = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'CustomerBackdrop' */ "./CustomerBackdrop"),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  topupItem: { padding: 12 }
}));

const TopupItemList: React.FC<any> = ({ topupList, onClickDetail }) => {
  return (
    <div>
      {topupList.map((d: any, i: number) => (
        <TopupItem key={d.requestid} data={d} {...{ onClickDetail }} />
      ))}
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
          <Typography
            style={{ ...(data.bill === 1 && { color: amber[600] }) }}
            variant="body2"
          >
            {data.bill === 1 ? "รอดำเนินการ" : "กรุณาอัพโหลดสลิป"}
          </Typography>
        );
      case 1:
        return (
          <Typography style={{ color: green[600] }} variant="body2">
            สำเร็จ
          </Typography>
        );
      case -1:
        return (
          <Typography style={{ color: red[600] }} variant="body2">
            ไม่สำเร็จ
          </Typography>
        );
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
        <Typography style={{ marginRight: 16 }} variant="body2">
          {_dateToString(data.createdate)}
        </Typography>
        {getStatus(data.status)}
        <Typography
          variant="h6"
          style={{ flex: 1, marginRight: 8 }}
          align="right"
        >
          {_thousandSeperater(data.value)}
        </Typography>
        <AttachMoney />
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

const TopupDetail: React.FC<any> = props => {
  const classes = useStyles();
  const { sess } = useContext(AppContext);
  const { topupDetail, slip, setSlip, uploadSlip } = props;
  const { getTopupImg } = useContext(AppContext);
  return (
    <div>
      {topupDetail.status === 0 && (
        <React.Fragment>
          <div style={{ display: "flex" }}>
            <UploadButton
              fullWidth
              label="อัพโหลดสลิป"
              {...{ slip, setSlip }}
            />
            {slip && (
              <AppButton onClick={() => setSlip(null)}>รีเซ็ต</AppButton>
            )}
          </div>
          {slip && <Typography variant="caption">{slip.name}</Typography>}
          <Divider style={{ margin: "24px 0" }} />
        </React.Fragment>
      )}
      {topupDetail.bill === 1 ? (
        <img
          style={{ width: "100%" }}
          alt={sess.userid}
          src={getTopupImg({
            customerid: sess.userid,
            requestid: topupDetail.requestid,
            type: "jpg"
          })}
        />
      ) : (
        <Typography align="center" style={{ margin: "24px 0" }}>
          ยังไม่ได้อัพโหลดสลิป
        </Typography>
      )}
      {topupDetail.status === 0 && (
        <AppButton
          style={{ width: "100%" }}
          variant="contained"
          buttonColor={green}
          onClick={uploadSlip}
          disabled={slip === null}
        >
          อัพโหลด
        </AppButton>
      )}
    </div>
  );
};

const TopupList: React.FC<any> = React.memo(({ location, booleanDispatch }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    profileData,
    _xhrPost,
    _fetchFile,
    booleanReducer
  } = useContext(AppContext);
  const [backDrop, setBackDrop] = useState<any | null>(null);
  const [topupList, setTopupList] = useState<any>(null);
  const [{ detail }, detailDispatch] = useReducer<
    React.Reducer<BooleanReducerState, BooleanReducerActions>
  >(booleanReducer, { detail: false });
  const [topupDetail, setTopupDetail] = useState<any>(null);
  const [slip, setSlip] = useState<any>(null);

  function onClickDetail(detail: any) {
    setTopupDetail(detail);
    detailDispatch({ type: "true", key: "detail" });
  }

  async function getTopup() {
    const res = await _xhrPost({
      csrf,
      url: "loadusersystem",
      body: {
        action: "topuplist",
        linetoken: profileData.userId,
        type: "customer"
      }
    });

    setCsrf(res.csrf);
    setTopupList(res.data);
    setBackDrop(res.data);
  }

  async function uploadSlip() {
    const imgRes = await _fetchFile({
      url: "usersystem",
      csrf,
      headers: {
        action: "receipt",
        type: "customer",
        requestid: topupDetail.requestid
      },
      body: { receiptimage: slip }
    });
    setCsrf(imgRes.csrf);
    if (imgRes.data.status === "success") {
      detailDispatch({ type: "false", key: "detail" });
      getTopup();
      setTopupDetail(null);
      setSlip(null);
    }
  }

  useEffect(() => {
    if (/localhost/.test(window.location.href)) {
      setTopupList([
        {
          requestid: 1,
          value: 500,
          bill: 500,
          createdate: new Date(),
          status: 0
        },
        {
          requestid: 2,
          value: 150,
          bill: 150,
          createdate: new Date(),
          status: 1
        },
        {
          requestid: 3,
          value: 1000,
          bill: 1000,
          createdate: new Date(),
          status: 2
        }
      ]);
    } else {
      getTopup();
    }
  }, []);

  useEffect(() => {
    booleanDispatch({
      type: `${location.hash === "#topup_list"}`,
      key: "topupList"
    });
  }, [location]);

  return (
    <div>
      <Divider />
      {topupList ? (
        topupList.length > 0 ? (
          <TopupItemList {...{ topupList, onClickDetail }} />
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
        <CustomerBackdrop {...{ backDrop, setBackDrop }} />
      )}
      <GeneralDialog
        open={detail}
        onClose={() => detailDispatch({ type: "false", key: "detail" })}
        title="รายละเอียดการเติมเงิน"
      >
        {topupDetail && (
          <TopupDetail {...{ topupDetail, slip, setSlip, uploadSlip }} />
        )}
      </GeneralDialog>
    </div>
  );
});
export default TopupList;
