import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Avatar,
  Typography,
  Divider,
  TextField,
  IconButton,
  InputAdornment
} from "@material-ui/core";
import { AppContext } from "../../../AppContext";
import AppButton from "../../../AppComponent/AppButton";
import { green, red, amber } from "@material-ui/core/colors";
import ConfirmDialog from "../../../component/Dialog/ConfirmDialog";
import { Cancel, CheckCircle, Create, Save } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  avatar: { height: 72, width: 72, margin: 12 }
}));

const TopupDetail: React.FC<any> = props => {
  const classes = useStyles();
  const { topupDetail, booleanDispatch, getTopupList } = props;
  const {
    csrf,
    setCsrf,
    _xhrPost,
    _dateToString,
    getTopupImg,
    _onEnter,
    _thousandSeperater
  } = useContext(AppContext);
  const [actionState, setActionState] = useState<any>(false);
  const [actionType, setActionType] = useState<any>("");
  const [isEditing, setIsEditing] = useState<any>(false);
  const [topupValue, setTopupValue] = useState<any>(topupDetail.value);

  function onReject() {
    setActionType("reject");
    setActionState(true);
  }

  function onAccept() {
    setActionType("accept");
    setActionState(true);
  }

  function onActionClose() {
    setActionType("");
    setActionState(false);
  }

  // async function onPending() {
  //   const res = await _xhrPost({
  //     csrf,
  //     url: "atopupsystem",
  //     body: {
  //       action: "edit",
  //       customerid: topupDetail.userid,
  //       requestid: topupDetail.requestid,
  //       status: 0
  //     }
  //   });
  //   console.log(res.data);
  //   setCsrf(res.csrf);
  //   booleanDispatch({ type: "false", key: "detail" });
  //   getTopupList();
  // }

  async function onClickAction() {
    const res = await _xhrPost({
      csrf,
      url: "atopupsystem",
      body: {
        action: "edit",
        customerid: topupDetail.userid,
        requestid: topupDetail.requestid,
        status: actionType === "accept" ? 1 : -1
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
    onActionClose();
    booleanDispatch({ type: "false", key: "detail" });
    getTopupList();
  }

  async function onEditTopup() {
    const res = await _xhrPost({
      csrf,
      url: "atopupsystem",
      body: {
        action: "edit",
        customerid: topupDetail.userid,
        requestid: topupDetail.requestid,
        value: topupValue
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
    setIsEditing(false);
    getTopupList();
  }

  return (
    <div>
      {isEditing ? (
        <div style={{ display: "flex" }}>
          <TextField
            autoFocus={isEditing}
            style={{ marginRight: 16 }}
            label="แก้ไขจำนวนเงิน"
            type="number"
            value={topupValue}
            variant="outlined"
            size="small"
            onChange={e => setTopupValue(e.target.value)}
            onKeyPress={_onEnter(onEditTopup)}
          />
          <AppButton
            variant="contained"
            buttonColor={green}
            onClick={onEditTopup}
          >
            บันทึก
          </AppButton>
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex" }}>
            <Typography variant="h6" style={{ marginRight: 16 }}>
              จำนวนเงิน
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 700 }}>
              {_thousandSeperater(topupValue)} ฿{" "}
              <IconButton
                style={{ padding: 0, marginBottom: 4 }}
                onClick={() => setIsEditing(true)}
              >
                <Create fontSize="small" />
              </IconButton>
            </Typography>
          </div>
          <Typography variant="h6" align="right" style={{ flex: 1 }}>
            {_dateToString(topupDetail.createdate)}
          </Typography>
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", marginTop: 16 }}>
        <Avatar className={classes.avatar} src={topupDetail.picture} />
        <div style={{ marginLeft: 24 }}>
          <div style={{ display: "flex" }}>
            <Typography variant="h6" style={{ marginRight: 16 }}>
              {topupDetail.fullname}
            </Typography>
            <Typography variant="h6">{topupDetail.lastname}</Typography>
          </div>
          <Typography>{topupDetail.displayname}</Typography>
        </div>
      </div>
      <Divider style={{ margin: "24px 0" }} />
      {topupDetail.bill === 1 ? (
        <img
          style={{ width: "100%" }}
          alt={topupDetail.userid}
          src={getTopupImg({
            customerid: topupDetail.userid,
            requestid: topupDetail.requestid
          })}
        />
      ) : (
        <Typography align="center" style={{ margin: "24px 0" }}>
          ยังไม่ได้อัพโหลดสลิป
        </Typography>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {topupDetail.status === 0 && (
          <AppButton
            variant="contained"
            buttonColor={red}
            onClick={onReject}
            style={{ margin: 8 }}
          >
            ปฏิเสธ
          </AppButton>
        )}
        {topupDetail.status === 0 && (
          <AppButton
            variant="contained"
            buttonColor={green}
            onClick={onAccept}
            style={{ margin: 8 }}
          >
            อนุมัติ
          </AppButton>
        )}
      </div>
      <ConfirmDialog
        type="delete"
        open={actionState}
        onClose={onActionClose}
        onCancel={onActionClose}
        onSubmit={onClickAction}
        title={
          actionType === "accept"
            ? "คุณต้องการอนุมัติหรือไม่ ?"
            : "คุณต้องการปฏิเสธหรือไม่ ?"
        }
        submitText={actionType === "accept" ? "อนุมัติ" : "ปฏิเสธ"}
        headIcon={actionType === "accept" ? CheckCircle : Cancel}
        headIconColor={actionType === "accept" ? green : red}
        submitButtonColor={actionType === "accept" ? green : red}
      />
    </div>
  );
};
export default TopupDetail;
