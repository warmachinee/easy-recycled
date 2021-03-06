import React, { useEffect, useContext, useState, useReducer } from "react";
import Loadable from "react-loadable";
import { Link, withRouter, RouteComponentProps, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../AppContext";
import {
  Button,
  Typography,
  Avatar,
  Paper,
  IconButton,
  Divider,
  TextField,
} from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import { Add, AttachMoney } from "@material-ui/icons";
import { BooleanReducerState, BooleanReducerActions } from "apptype";

const AppButton = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'AppButton' */ "../../AppComponent/AppButton"),
  loading: () => null,
});

const TopupList = Loadable({
  loader: () => import(/* webpackChunkName: 'TopupList' */ "./TopupList"),
  loading: () => null,
});

const MarketHistory = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'MarketHistory' */ "./MarketHistory"),
  loading: () => null,
});

const NotificationsList = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'NotificationsList' */ "../../component/Utils/NotificationsList"
    ),
  loading: () => null,
});

const CustomerHeader = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'CustomerHeader' */ "./CustomerHeader"),
  loading: () => null,
});

const UserProfile = Loadable({
  loader: () => import(/* webpackChunkName: 'UserProfile' */ "./UserProfile"),
  loading: () => null,
});

const GeneralDialog = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'GeneralDialog' */ "../../component/Dialog/GeneralDialog"
    ),
  loading: () => null,
});

const ConfirmDialog = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'ConfirmDialog' */ "../../component/Dialog/ConfirmDialog"
    ),
  loading: () => null,
});

const UploadButton = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'UploadButton' */ "../../component/Utils/UploadButton"
    ),
  loading: () => null,
});

const TopupListRoute = withRouter((props) => <TopupList {...props} />);

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 16,
    margin: "8px 16px",
    borderRadius: 8,
  },
}));

export type CustomerDashboardProps = RouteComponentProps<{}>;

const BalanceCard: React.FC<any> = (props) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    profileData,
    _xhrPost,
    handleLogout,
    _thousandSeperater,
  } = useContext(AppContext);
  const { userInfo, booleanDispatch } = props;
  return (
    <Paper elevation={3} className={classes.paper}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" style={{ marginRight: 16 }}>
          เงินคงเหลือ
        </Typography>
        <div style={{ width: 16 }} />
        <Typography variant="h6" style={{ marginRight: 8, fontWeight: 700 }}>
          {userInfo &&
          userInfo.info &&
          typeof userInfo.info.balance === "number"
            ? `${_thousandSeperater(userInfo.info.balance)}`
            : "-"}
        </Typography>
        <AttachMoney />
      </div>
      <Divider style={{ marginTop: 12 }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <AppButton
          startIcon={<Add />}
          variant="text"
          buttonColor={green}
          onClick={() => booleanDispatch({ type: "true", key: "addTopup" })}
        >
          เติมเงิน
        </AppButton>
        <Link
          to="/#topup_list"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <AppButton
            variant="text"
            buttonColor={green}
            // onClick={() => booleanDispatch({ type: "true", key: "topupList" })}
          >
            ประวัติการเติมเงิน
          </AppButton>
        </Link>
      </div>
    </Paper>
  );
};

const AppTopupChoice: React.FC<any> = ({ value, topup, setTopup }) => {
  return (
    <AppButton
      style={{ flex: 1 }}
      variant="contained"
      {...(topup === value && { buttonColor: grey })}
      onClick={() => setTopup(value)}
    >
      {value}
    </AppButton>
  );
};

const AddTopup: React.FC<any> = (props) => {
  const {
    topupEtc,
    topup,
    setTopup,
    setTopupEtc,
    onCreate,
    slip,
    setSlip,
    bankDetail,
  } = props;
  return (
    <div>
      {bankDetail && (
        <React.Fragment>
          <Typography variant="h6">รายละเอียด</Typography>
          <Typography style={{ whiteSpace: "pre-line" }}>
            {bankDetail.topup}
          </Typography>
        </React.Fragment>
      )}
      <Divider style={{ margin: "16px 0" }} />
      <div style={{ display: "flex", marginBottom: 16 }}>
        <AppTopupChoice value={50} {...props} />
        <div style={{ width: 16 }} />
        <AppTopupChoice value={100} {...props} />
      </div>
      <div style={{ display: "flex", marginBottom: 16 }}>
        <AppTopupChoice value={150} {...props} />
        <div style={{ width: 16 }} />
        <AppTopupChoice value={200} {...props} />
      </div>
      <div style={{ display: "flex", marginBottom: 16 }}>
        <AppTopupChoice value={300} {...props} />
        <div style={{ width: 16 }} />
        <AppTopupChoice value={500} {...props} />
      </div>
      <div style={{ display: "flex", marginBottom: 16 }}>
        <AppTopupChoice value={1000} {...props} />
        <div style={{ width: 16 }} />
        <AppTopupChoice value={"เลือกจำนวนเงิน"} {...props} />
      </div>
      {topup === "เลือกจำนวนเงิน" && (
        <TextField
          fullWidth
          value={`${topupEtc}`}
          variant="outlined"
          size="small"
          type="number"
          label="จำนวนเงิน"
          onChange={(e) => setTopupEtc(parseInt(e.target.value))}
        />
      )}
      <Divider style={{ margin: "16px 0" }} />
      <div style={{ display: "flex" }}>
        <UploadButton fullWidth label="อัพโหลดสลิป" {...{ slip, setSlip }} />
        {slip && <AppButton onClick={() => setSlip(null)}>รีเซ็ต</AppButton>}
      </div>
      {slip && <Typography variant="caption">{slip.name}</Typography>}
      <Divider style={{ margin: "24px 0" }} />
      <AppButton
        style={{ width: "100%" }}
        variant="contained"
        buttonColor={green}
        onClick={() => onCreate({ action: "delete" })}
        disabled={slip === null}
      >
        เติมเงิน
      </AppButton>
    </div>
  );
};

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  history,
  location,
}) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    profileData,
    _xhrPost,
    _fetchFile,
    handleLogout,
    booleanReducer,
    useConfirmDeleteItem,
    checkSession,
    _onLocalhost,
    realtimeAccess,
    addSnackbar,
    userInfo,
    setUserInfo,
    liffLogin,
  } = useContext(AppContext);

  const [
    { addTopup, topupList, noti, userProfile },
    booleanDispatch,
  ] = useReducer<React.Reducer<BooleanReducerState, BooleanReducerActions>>(
    booleanReducer,
    {
      forgot: false,
      topupList: location.hash === "#topup_list",
      noti: false,
      userProfile: false,
    }
  );
  const [topup, setTopup] = useState<any>(50);
  const [topupEtc, setTopupEtc] = useState<any>(0);
  const [slip, setSlip] = useState<any>(null);
  const [bankDetail, setBankDetail] = useState<any>(null);
  const [
    { confirmState, item: itemOnCreate },
    onCreate,
  ] = useConfirmDeleteItem();

  async function getInfo() {
    const res = await _xhrPost({
      csrf,
      url: "loadusersystem",
      body: { action: "info", linetoken: profileData.userId, type: "customer" },
    });

    setCsrf(res.csrf);
    if (
      "status" in res.data &&
      res.data.status === "this is not user account or have been delete account"
    ) {
      checkSession();
    } else {
      const thisData = res.data;
      const thisInfo = thisData.info;
      if (
        thisInfo.displayname !== profileData.displayName ||
        thisInfo.picture !== profileData.pictureUrl
      ) {
        updateProfile(thisInfo);
      } else {
        setUserInfo(thisData);
        getBankDetail();
      }
    }
  }

  async function updateProfile(thisInfo: any) {
    const sendObj = {
      action: "editprofile",
      linetoken: profileData.userId,
      type: "customer",
    };

    if (thisInfo.displayname !== profileData.displayName) {
      Object.assign(sendObj, { displayname: profileData.displayName });
    }

    if (thisInfo.picture !== profileData.pictureUrl) {
      Object.assign(sendObj, { picture: profileData.pictureUrl });
    }

    const res = await _xhrPost({
      csrf,
      url: "usersystem",
      body: sendObj,
    });
    setCsrf(res.csrf);
    liffLogin();
  }

  async function getBankDetail() {
    const res = await _xhrPost({
      csrf,
      url: "loadusersystem",
      body: {
        action: "howtotopup",
        linetoken: profileData.userId,
        type: "customer",
      },
    });

    setCsrf(res.csrf);
    setBankDetail(res.data);
  }

  async function createTopup() {
    const sendObj = {
      action: "createtopup",
      linetoken: profileData.userId,
      type: "customer",
      value: topup === "เลือกจำนวนเงิน" ? parseInt(topupEtc) : topup,
    };
    const res = await _xhrPost({
      csrf,
      url: "usersystem",
      body: sendObj,
    });

    setCsrf(res.csrf);
    realtimeAccess();
    if (res.data.status === "success") {
      addSnackbar({ message: "เพิ่มเงินสำเร็จ", variant: "success" });
      const imgRes = await _fetchFile({
        url: "usersystem",
        csrf,
        headers: {
          action: "receipt",
          type: "customer",
          requestid: res.data.requestid,
        },
        body: { receiptimage: slip },
      });
      setCsrf(imgRes.csrf);
      if (imgRes.data.status === "success") {
        addSnackbar({ message: "อัพโหลดสลิปสำเร็จ", variant: "success" });
        setSlip(null);
        setTopup(50);
        setTopupEtc(0);
        getInfo();
        booleanDispatch({ type: "falseAll" });
        onCreate({ action: "cancel" });
      } else {
        addSnackbar({ message: "อัพโหลดสลิปไม่สำเร็จ", variant: "success" });
      }
    } else {
      addSnackbar({ message: "เพิ่มเงินไม่สำเร็จ", variant: "error" });
    }
  }

  useEffect(() => {
    if (profileData) {
      getInfo();
    }
  }, []);

  useEffect(() => {
    booleanDispatch({
      type: `${location.hash === "#topup_list"}`,
      key: "topupList",
    });
  }, [location]);

  return (
    <div>
      <CustomerHeader {...{ userInfo, handleLogout, booleanDispatch }} />
      <BalanceCard {...{ userInfo, booleanDispatch }} />
      <AppButton
        buttonColor={green}
        variant="contained"
        size="large"
        style={{
          margin: 16,
          width: "calc(100% - 32px)",
          fontSize: 24,
          letterSpacing: 4,
          padding: 24,
        }}
        onClick={() => history.replace("/market")}
      >
        บอร์ดสินค้า
      </AppButton>
      <MarketHistory />
      <ConfirmDialog
        type="delete"
        open={confirmState}
        onClose={() => onCreate({ action: "cancel" })}
        onCancel={() => onCreate({ action: "cancel" })}
        onSubmit={createTopup}
        title="คุณแน่ใจหรือไม่ว่าต้องการจะเติมเงิน ?"
        headIcon={AttachMoney}
        headIconColor={green}
        submitButtonColor={green}
        submitText="เติมเงิน"
      >
        <Typography variant="h6" style={{ fontWeight: 400 }} align="center">
          {itemOnCreate && itemOnCreate.business_name}
        </Typography>
      </ConfirmDialog>
      <GeneralDialog
        open={topupList}
        onClose={() => history.replace("/")}
        title="ประวัติการเติมเงิน"
        fullScreen={true}
        dividers={false}
        contentStyle={{ padding: 0 }}
      >
        <TopupListRoute {...{ userInfo, booleanDispatch }} />
      </GeneralDialog>
      <GeneralDialog
        open={addTopup}
        onClose={() => booleanDispatch({ type: "false", key: "addTopup" })}
        title="เลือกจำนวนเงิน"
      >
        <AddTopup
          {...{
            topup,
            setTopup,
            topupEtc,
            setTopupEtc,
            onCreate,
            slip,
            setSlip,
            bankDetail,
          }}
        />
      </GeneralDialog>
      <GeneralDialog
        open={noti}
        onClose={() => booleanDispatch({ type: "false", key: "noti" })}
        title="การแจ้งเตือน"
        fullScreen={true}
        dividers={false}
        contentStyle={{ padding: 0 }}
      >
        <NotificationsList type="customer" />
      </GeneralDialog>
      <GeneralDialog
        open={userProfile}
        fullScreen={true}
        onClose={() => booleanDispatch({ type: "false", key: "userProfile" })}
        title="โปรไฟล์"
      >
        <UserProfile {...{ userInfo, booleanDispatch, getInfo }} />
      </GeneralDialog>
    </div>
  );
};

export default withRouter((props) => <CustomerDashboard {...props} />);
