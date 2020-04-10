import React, { useState, useEffect, useContext } from "react";
import Loadable from "react-loadable";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../../AppContext";
import {
  Paper,
  Theme,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Divider,
  Chip,
  Button,
} from "@material-ui/core";
import { ArrowBackIos, Settings } from "@material-ui/icons";
import { red, green } from "@material-ui/core/colors";
import MaskedInput from "react-text-mask";
import AppButton from "../../../AppComponent/AppButton";
import ConfirmDialog from "../../../component/Dialog/ConfirmDialog";

const GeneralDialog = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'GeneralDialog' */ "../../../component/Dialog/GeneralDialog"
    ),
  loading: () => null,
});

const useStyles = makeStyles((theme: Theme) => ({
  paper: { padding: 8 },
  itemGrid: {
    margin: theme.spacing(1, 0),
    minWidth: 800,
    padding: 12,
  },
  itemPaper: {
    position: "relative",
    padding: 16,
    display: "flex",
    alignItems: "center",
  },
  avatar: { width: 72, height: 72, marginRight: 16 },
  textField: { marginBottom: 12 },
  itemDescription: { display: "flex", marginBottom: 8 },
  docsItem: {
    padding: 0,
    minWidth: "auto",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export interface CustomerDetailProps {}

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

function TextMaskCustom(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[0-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
    />
  );
}

const docsArr = [
  "id_card",
  "house_regist",
  "access",
  "cert_book",
  "doc_20",
  "doc_105",
  "doc_106",
];

const docsArrString = [
  "บัตรประชาชน",
  "สำเนาทะเบียนบ้าน",
  "ใบอนุญาติค้าของเก่า",
  "หนังสือรับรองบริษัท",
  "ภพ. 20",
  "ใบรง. 4 ลำดับที่ 105",
  "ใบรง. 4 ลำดับที่ 106",
];

const docsLabel: any = {
  id_card: "บัตรประชาชน",
  house_regist: "สำเนาทะเบียนบ้าน",
  access: "ใบอนุญาติค้าของเก่า",
  cert_book: "หนังสือรับรองบริษัท",
  doc_20: "ภพ. 20",
  doc_105: "ใบรง. 4 ลำดับที่ 105",
  doc_106: "ใบรง. 4 ลำดับที่ 106",
};

const UserDocs: React.FC<any> = ({ data, customerid, getBaseDetail }) => {
  const classes = useStyles();
  const keys: any = data.split(".")[0];
  const { sess, _xhrPost, csrf, setCsrf } = useContext(AppContext);
  const [open, setOpen] = useState<any>(false);
  const [onDeleteState, setOnDeleteState] = useState<any>(false);

  function onDeleteImage() {
    setOnDeleteState(true);
  }

  function onCancelDelete() {
    setOnDeleteState(false);
  }

  async function onDeletePic() {
    const sendObj = {
      action: "deldocs",
      customerid,
      docstype: keys,
    };
    const res = await _xhrPost({
      csrf,
      url: "acustomersystem",
      body: sendObj,
    });
    setCsrf(res.csrf);
    if (res.data.status === "success") {
      getBaseDetail();
      onCancelDelete();
    }
  }

  return (
    <React.Fragment>
      <div onClick={() => setOpen(true)}>
        <Button variant="text" color="primary" className={classes.docsItem}>
          {docsLabel[keys]}
        </Button>
      </div>
      <GeneralDialog
        open={open}
        onClose={() => setOpen(false)}
        title={docsLabel[keys]}
        maxWidth="md"
      >
        <div
          style={{
            marginBottom: 16,
          }}
        >
          <AppButton
            buttonColor={red}
            variant="contained"
            onClick={onDeleteImage}
          >
            ลบเอกสาร
          </AppButton>
        </div>
        <img
          style={{ width: "100%", maxHeight: "calc(100% - 64px)" }}
          src={`https://easyrecycle.ml/customer/${customerid}/${data}`}
          alt={docsLabel[keys]}
        />
      </GeneralDialog>
      <ConfirmDialog
        type="delete"
        open={onDeleteState}
        onClose={onCancelDelete}
        onCancel={onCancelDelete}
        onSubmit={onDeletePic}
        title="คุณแน่ใจหรือไม่ว่าต้องการจะลบเอกสาร ?"
      >
        <img
          style={{ width: "100%" }}
          src={`https://easyrecycle.ml/customer/${customerid}/${data}`}
          alt={docsLabel[keys]}
        />
      </ConfirmDialog>
    </React.Fragment>
  );
};

const DetailCard: React.FC<any> = (props) => {
  const classes = useStyles();
  const { _dateToString, stringToPhone, _thousandSeperater } = useContext(
    AppContext
  );
  const { detail, setEditing } = props;
  const data = detail.info;
  const userDocs = detail.docs;

  return (
    <Paper
      elevation={data.status === 1 ? 3 : 0}
      style={{
        ...(data.status === 0 && {
          backgroundColor: "inherit",
          opacity: 0.7,
        }),
      }}
    >
      <div className={classes.itemPaper}>
        <IconButton
          style={{ position: "absolute", top: 0, right: 0 }}
          onClick={() => setEditing(true)}
        >
          <Settings />
        </IconButton>
        <Avatar className={classes.avatar} src={data.picture} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography style={{ flex: 1, fontWeight: 600 }} align="left">
            {data.status === 1 ? "" : "(ไม่ได้ใช้งานแล้ว)"}
            {`${data.fullname} ${data.lastname} ( ${data.displayname} )`}
          </Typography>
          <Typography align="left" color="textSecondary">
            {data.statusmassage}
          </Typography>
          <div style={{ display: "flex" }}>
            <Typography
              align="left"
              variant="body2"
              color="textSecondary"
              style={{ marginRight: 16 }}
            >
              สมัครเมื่อวันที่
            </Typography>
            <Typography
              align="left"
              variant="body2"
              style={{ fontWeight: 700 }}
            >
              {_dateToString(data.registerdate)}
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Typography
              align="left"
              variant="body2"
              color="textSecondary"
              style={{ marginRight: 16 }}
            >
              เบอร์โทรศัพท์
            </Typography>
            <Typography
              align="left"
              variant="body2"
              style={{ fontWeight: 700, marginRight: 24 }}
            >
              {stringToPhone(`0${data.tel}`)}
            </Typography>
          </div>
        </div>
        <Typography align="left">เงินคงเหลือ</Typography>
        <Typography
          variant="h6"
          style={{
            width: 100,
            marginRight: 16,
            ...(data.frequencyform > 3 && { color: red[600], fontWeight: 700 }),
          }}
          align="right"
        >
          {_thousandSeperater(data.balance)}
        </Typography>
        <Typography>บาท</Typography>
      </div>
      <Divider />
      <div className={classes.itemPaper}>
        <div style={{ width: 88 }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className={classes.itemDescription}>
            <Typography
              align="left"
              variant="body2"
              color="textSecondary"
              style={{ minWidth: 100 }}
            >
              ชื่อกิจการ
            </Typography>
            <Typography
              align="left"
              variant="body2"
              style={{ fontWeight: 700 }}
            >
              {data.business_name}
            </Typography>
          </div>
          <div className={classes.itemDescription}>
            <Typography
              align="left"
              variant="body2"
              color="textSecondary"
              style={{ minWidth: 100 }}
            >
              ประเภทกิจการ
            </Typography>
            <Typography
              align="left"
              variant="body2"
              style={{ fontWeight: 700 }}
            >
              {data.business_type}
            </Typography>
          </div>
          <div className={classes.itemDescription}>
            <Typography
              align="left"
              variant="body2"
              color="textSecondary"
              style={{ minWidth: 100 }}
            >
              สถานที่
            </Typography>
            <Typography
              align="left"
              variant="body2"
              style={{ fontWeight: 700 }}
            >
              {data.location}
            </Typography>
          </div>
          <div className={classes.itemDescription}>
            <Typography
              align="left"
              variant="body2"
              color="textSecondary"
              style={{ minWidth: 100 }}
            >
              ขนาดองค์กร
            </Typography>
            <Typography
              align="left"
              variant="body2"
              style={{ fontWeight: 700 }}
            >
              {data.org_size}
            </Typography>
          </div>
          <div className={classes.itemDescription}>
            <Typography
              align="left"
              variant="body2"
              color="textSecondary"
              style={{ minWidth: 100 }}
            >
              รถที่ใช้ขนส่ง
            </Typography>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {data.transport.transport
                .filter((item: any) => item !== "etc")
                .map((d: any) => (
                  <Typography
                    key={d}
                    align="left"
                    variant="body2"
                    style={{ fontWeight: 700 }}
                  >
                    {d}
                  </Typography>
                ))}
              {data.transport.etc !== "none" && (
                <Typography
                  align="left"
                  variant="body2"
                  style={{ fontWeight: 700 }}
                >
                  {data.transport.etc}
                </Typography>
              )}
              {data.transport.transport.filter((item: any) => item !== "etc")
                .length === 0 &&
                data.transport.etc !== "none" && (
                  <Typography
                    align="left"
                    variant="body2"
                    style={{ fontWeight: 700 }}
                  >
                    ไม่มีรถที่ใช้ขนส่ง
                  </Typography>
                )}
            </div>
          </div>
          <div className={classes.itemDescription}>
            <Typography
              align="left"
              variant="body2"
              color="textSecondary"
              style={{ minWidth: 100 }}
            >
              เอกสาร
            </Typography>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {data.document.document
                .filter((item: any) => item !== "etc")
                .map((d: any) => (
                  <Typography
                    key={d}
                    align="left"
                    variant="body2"
                    style={{ fontWeight: 700 }}
                  >
                    {d}
                  </Typography>
                ))}
              {data.document.etc !== "none" && (
                <Typography
                  align="left"
                  variant="body2"
                  style={{ fontWeight: 700 }}
                >
                  {data.document.etc}
                </Typography>
              )}
              {data.document.document.filter((item: any) => item !== "etc")
                .length === 0 &&
                data.document.etc !== "none" && (
                  <Typography
                    align="left"
                    variant="body2"
                    style={{ fontWeight: 700 }}
                  >
                    ไม่มีเอกสาร
                  </Typography>
                )}
            </div>
          </div>
          <div className={classes.itemDescription}>
            <Typography
              align="left"
              variant="body2"
              color="textSecondary"
              style={{ minWidth: 100 }}
            >
              ไฟล์
            </Typography>
            {userDocs &&
              (userDocs.filter(
                (d: any) =>
                  d.split(".")[1] !== "webp" && d !== "topup" && d !== "log.txt"
              ).length > 0 ? (
                <div>
                  {userDocs
                    .filter(
                      (d: any) =>
                        d.split(".")[1] !== "webp" &&
                        d !== "topup" &&
                        d !== "log.txt"
                    )
                    .map((d: any, i: number) => (
                      <UserDocs key={d} data={d} {...props} />
                    ))}
                </div>
              ) : (
                <Typography
                  align="left"
                  variant="body2"
                  style={{ fontWeight: 700 }}
                >
                  ไม่มีไฟล์
                </Typography>
              ))}
          </div>
        </div>
      </div>
    </Paper>
  );
};

const EditDetail: React.FC<any> = (props) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    _dateToString,
    stringToPhone,
    phoneFormatToNumber,
  } = useContext(AppContext);
  const { data, setEditing, getBaseDetail, match } = props;
  const { info } = data;
  const { customerid } = match.params;
  const [thisData, setThisData] = useState<any>({
    ...info,
    tel: stringToPhone(`0${info.tel}`),
  });

  function checkDisabled() {
    const keyArr = ["displayname", "fullname", "lastname", "business_name"];
    const thisArr = [];
    for (var i = 0; i < keyArr.length; i++) {
      if (thisData[keyArr[i]] !== data[keyArr[i]]) {
        thisArr.push(thisData[keyArr[i]]);
      }
    }
    if (phoneFormatToNumber(thisData.tel) !== `0${info.tel}`) {
      thisArr.push(thisData[keyArr[i]]);
    }
    return thisArr.length === 0;
  }

  async function onSave() {
    const { params } = match;
    const sendObj = {
      action: "base_edit",
      customerid,
    };
    const keyArr = ["displayname", "fullname", "lastname", "business_name"];
    for (var i = 0; i < keyArr.length; i++) {
      if (thisData[keyArr[i]] !== data[keyArr[i]]) {
        Object.assign(sendObj, { [keyArr[i]]: thisData[keyArr[i]] });
      }
    }
    if (thisData.tel !== `0${info.tel}`) {
      Object.assign(sendObj, { tel: phoneFormatToNumber(thisData.tel) });
    }
    const res = await _xhrPost({
      csrf,
      url: "acustomersystem",
      body: sendObj,
    });

    setCsrf(res.csrf);
    getBaseDetail();
    setEditing(false);
  }

  async function onSaveStatus(status: any) {
    const { params } = match;
    const sendObj = {
      action: "base_edit",
      customerid,
      status,
    };
    const res = await _xhrPost({
      csrf,
      url: "acustomersystem",
      body: sendObj,
    });

    setCsrf(res.csrf);
    getBaseDetail();
    setEditing(false);
  }

  return (
    <div>
      <div
        style={{ display: "flex", marginBottom: 12, alignItems: "baseline" }}
      >
        <Typography style={{ minWidth: 100 }}>สถานะบัญชี</Typography>
        <div style={{ display: "flex" }}>
          <Chip
            label="เปิดการใช้งาน"
            style={{
              marginRight: 4,
              ...(info.status === 1 && { color: "white" }),
            }}
            {...(info.status === 0 && { variant: "outlined" })}
            {...(info.status === 1 && { color: "primary" })}
            onClick={() => onSaveStatus(1)}
          />
          <Chip
            label="ปิดการใช้งาน"
            style={{ ...(info.status === 0 && { color: "white" }) }}
            {...(info.status === 1 && { variant: "outlined" })}
            {...(info.status === 0 && { color: "primary" })}
            onClick={() => onSaveStatus(0)}
          />
        </div>
      </div>
      <Divider style={{ margin: "16px 0" }} />
      <TextField
        className={classes.textField}
        fullWidth
        label="ชื่อที่แสดง"
        value={thisData.displayname}
        onChange={(e) =>
          setThisData({ ...thisData, displayname: e.target.value })
        }
      />
      <TextField
        className={classes.textField}
        fullWidth
        label="ชื่อ"
        value={thisData.fullname}
        onChange={(e) => setThisData({ ...thisData, fullname: e.target.value })}
      />
      <TextField
        className={classes.textField}
        fullWidth
        label="นามสกุล"
        value={thisData.lastname}
        onChange={(e) => setThisData({ ...thisData, lastname: e.target.value })}
      />
      <Divider style={{ margin: "16px 0" }} />
      <TextField
        className={classes.textField}
        fullWidth
        label="เบอร์โทรศัพท์"
        InputProps={{
          inputComponent: TextMaskCustom as any,
        }}
        value={thisData.tel}
        onChange={(e) => setThisData({ ...thisData, tel: e.target.value })}
      />
      <Divider style={{ margin: "12px 0" }} />
      <div style={{ display: "flex" }}>
        <AppButton
          buttonColor={green}
          variant="outlined"
          style={{ flex: 1, margin: 8 }}
          onClick={() => {
            setThisData({
              ...data,
              tel: `0${info.tel}`,
            });
            setEditing(false);
          }}
        >
          ยกเลิก
        </AppButton>
        <AppButton
          buttonColor={green}
          variant="contained"
          style={{ flex: 1, margin: 8 }}
          onClick={onSave}
          disabled={checkDisabled()}
        >
          บันทึก
        </AppButton>
      </div>
    </div>
  );
};

const CustomerDetail: React.FC<CustomerDetailProps | any> = (props) => {
  const classes = useStyles();
  const { match, history } = props;
  const { params } = match;
  const customerid = parseInt(params.customerid);
  const { csrf, setCsrf, _xhrPost, _onLocalhostFn } = useContext(AppContext);
  const [detail, setDetail] = useState<any>(null);
  const [editing, setEditing] = useState<any>(false);

  async function getFormList() {
    const { params } = match;
    const res = await _xhrPost({
      csrf,
      url: "aloadcustomer",
      body: {
        action: "accessformlist",
        customerid: parseInt(params.customerid),
      },
    });

    setCsrf(res.csrf);
  }

  async function getBaseDetail() {
    const res = await _xhrPost({
      csrf,
      url: "aloadcustomer",
      body: {
        action: "base_detail",
        customerid,
      },
    });

    setCsrf(res.csrf);
    setDetail(res.data);
  }

  useEffect(() => {
    getBaseDetail();
    // getFormList();
  }, []);

  return (
    <div>
      <IconButton onClick={() => history.replace("/admin/customer_list")}>
        <ArrowBackIos />
      </IconButton>
      <div className={classes.itemGrid}>
        {detail && (
          <DetailCard {...{ detail, setEditing, customerid, getBaseDetail }} />
        )}
      </div>
      <GeneralDialog
        open={editing}
        onClose={() => setEditing(false)}
        title="แก้ไขข้อมูล"
      >
        {detail && (
          <EditDetail data={detail} {...{ setEditing, getBaseDetail, match }} />
        )}
      </GeneralDialog>
    </div>
  );
};
export default CustomerDetail;
