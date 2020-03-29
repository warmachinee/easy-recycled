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
  Chip
} from "@material-ui/core";
import { red, green } from "@material-ui/core/colors";
import { Settings, ArrowBackIos } from "@material-ui/icons";
import MaskedInput from "react-text-mask";

const GeneralDialog = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'GeneralDialog' */ "../../../component/Dialog/GeneralDialog"
    ),
  loading: () => null
});

const AppButton = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'AppButton' */ "../../../AppComponent/AppButton"
    ),
  loading: () => null
});

const GoodsList = Loadable({
  loader: () => import(/* webpackChunkName: 'GoodsList' */ "./Goods/GoodsList"),
  loading: () => null
});

const useStyles = makeStyles((theme: Theme) => ({
  paper: { padding: 8 },
  itemGrid: {
    margin: theme.spacing(1, 0),
    minWidth: 800,
    padding: 12
  },
  itemPaper: {
    position: "relative",
    padding: 16,
    display: "flex",
    alignItems: "center"
  },
  avatar: { width: 72, height: 72, marginRight: 16 },
  textField: { marginBottom: 12 }
}));

export interface BusinessDetailProps {}

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
        /\d/
      ]}
      placeholderChar={"\u2000"}
    />
  );
}

const DetailCard: React.FC<any> = props => {
  const classes = useStyles();
  const { _dateToString, stringToPhone } = useContext(AppContext);
  const { data, setEditing } = props;

  return (
    <Paper
      className={classes.itemPaper}
      elevation={data.status === 1 ? 3 : 0}
      style={{
        ...(data.status === 0 && {
          backgroundColor: "inherit",
          opacity: 0.7
        })
      }}
    >
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
          <Typography align="left" variant="body2" style={{ fontWeight: 700 }}>
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
          <Typography
            align="left"
            variant="body2"
            color="textSecondary"
            style={{ marginRight: 16 }}
          >
            อีเมล
          </Typography>
          <Typography align="left" variant="body2" style={{ fontWeight: 700 }}>
            {data.email}
          </Typography>
        </div>
      </div>
      <Typography align="left">จำนวนสินค้า</Typography>
      <Typography
        variant="h6"
        style={{
          width: 48,
          marginRight: 16,
          ...(data.frequencyform > 3 && { color: red[600], fontWeight: 700 })
        }}
        align="right"
      >
        {data.frequencyform}
      </Typography>
    </Paper>
  );
};

const EditDetail: React.FC<any> = props => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    _dateToString,
    stringToPhone,
    phoneFormatToNumber
  } = useContext(AppContext);
  const { data, setEditing, getBaseDetail, match } = props;
  const [thisData, setThisData] = useState<any>({
    ...data,
    tel: stringToPhone(`0${data.tel}`)
  });

  function checkDisabled() {
    const keyArr = [
      "displayname",
      "fullname",
      "lastname",
      "email",
      "statusmassage"
    ];
    const thisArr = [];
    for (var i = 0; i < keyArr.length; i++) {
      if (thisData[keyArr[i]] !== data[keyArr[i]]) {
        thisArr.push(thisData[keyArr[i]]);
      }
    }
    if (phoneFormatToNumber(thisData.tel) !== `0${data.tel}`) {
      thisArr.push(thisData[keyArr[i]]);
    }
    return thisArr.length === 0;
  }

  async function onSave() {
    const { params } = match;
    const sendObj = {
      action: "base_edit",
      businessid: parseInt(params.businessid)
    };
    const keyArr = [
      "displayname",
      "fullname",
      "lastname",
      "email",
      "statusmassage"
    ];
    for (var i = 0; i < keyArr.length; i++) {
      if (thisData[keyArr[i]] !== data[keyArr[i]]) {
        Object.assign(sendObj, { [keyArr[i]]: thisData[keyArr[i]] });
      }
    }
    if (thisData.tel !== `0${data.tel}`) {
      Object.assign(sendObj, { tel: phoneFormatToNumber(thisData.tel) });
    }
    const res = await _xhrPost({
      csrf,
      url: "abusinesssystem",
      body: sendObj
    });
    console.log(res.data);
    setCsrf(res.csrf);
    getBaseDetail();
    setEditing(false);
  }

  async function onSaveStatus(status: any) {
    const { params } = match;
    const sendObj = {
      action: "base_edit",
      businessid: parseInt(params.businessid),
      status
    };
    const res = await _xhrPost({
      csrf,
      url: "abusinesssystem",
      body: sendObj
    });
    console.log(res.data);
    setCsrf(res.csrf);
    getBaseDetail();
    setEditing(false);
  }

  return (
    <div>
      <div
        style={{ display: "flex", marginBottom: 12, alignItems: "baseline" }}
      >
        <Typography style={{ width: 100 }}>สถานะบัญชี</Typography>
        <div style={{ display: "flex" }}>
          <Chip
            label="เปิดการใช้งาน"
            style={{
              marginRight: 4,
              ...(data.status === 1 && { color: "white" })
            }}
            {...(data.status === 0 && { variant: "outlined" })}
            {...(data.status === 1 && { color: "primary" })}
            onClick={() => onSaveStatus(1)}
          />
          <Chip
            label="ปิดการใช้งาน"
            style={{ ...(data.status === 0 && { color: "white" }) }}
            {...(data.status === 1 && { variant: "outlined" })}
            {...(data.status === 0 && { color: "primary" })}
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
        onChange={e =>
          setThisData({ ...thisData, displayname: e.target.value })
        }
      />
      <TextField
        className={classes.textField}
        fullWidth
        label="ชื่อ"
        value={thisData.fullname}
        onChange={e => setThisData({ ...thisData, fullname: e.target.value })}
      />
      <TextField
        className={classes.textField}
        fullWidth
        label="นามสกุล"
        value={thisData.lastname}
        onChange={e => setThisData({ ...thisData, lastname: e.target.value })}
      />
      <TextField
        className={classes.textField}
        fullWidth
        label="สเตตัส"
        value={thisData.statusmassage}
        onChange={e =>
          setThisData({ ...thisData, statusmassage: e.target.value })
        }
      />
      <Divider style={{ margin: "16px 0" }} />
      <TextField
        className={classes.textField}
        fullWidth
        label="เบอร์โทรศัพท์"
        InputProps={{
          inputComponent: TextMaskCustom as any
        }}
        value={thisData.tel}
        onChange={e => setThisData({ ...thisData, tel: e.target.value })}
      />
      <TextField
        className={classes.textField}
        fullWidth
        label="อีเมล"
        value={thisData.email}
        onChange={e => setThisData({ ...thisData, email: e.target.value })}
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
              tel: `0${data.tel}`
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

const BusinessDetail: React.FC<BusinessDetailProps | any> = props => {
  const classes = useStyles();
  const { match, history } = props;
  const { csrf, setCsrf, _xhrPost, _onLocalhostFn } = useContext(AppContext);
  const [detail, setDetail] = useState<any>(null);
  const [goods, setGoods] = useState<any>(null);
  const [editing, setEditing] = useState<any>(false);

  async function getBaseDetail() {
    const { params } = match;
    const res = await _xhrPost({
      csrf,
      url: "aloadbusiness",
      body: {
        action: "base_detail",
        businessid: parseInt(params.businessid)
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
    setDetail(res.data);
  }

  useEffect(() => {
    _onLocalhostFn(
      () => {
        setDetail({
          linetoken: "U34854b16de48d84b63c751717c9d2771",
          email: "sippakorn.prem@gmail.com",
          displayname: "P.R.E.M.I.O.R",
          fullname: "Sippakorn",
          lastname: "Suphapinyo",
          tel: 806760057,
          statusmassage: "UI/UX Developer at PDS Co.,Ltd.",
          picture:
            "https://profile.line-scdn.net/0hPyKQa5SXD1Z2KCciVYpwAUptATsBBgkeDh0UNVooWDJcT05USkhFY1F9AW9dEU8CShsUN1N7UmUJ",
          frequencyform: 3,
          registerdate: "2020-03-09T21:35:27.000Z",
          status: 1
        });
      },
      () => {
        getBaseDetail();
      }
    );
  }, []);

  return (
    <div>
      <IconButton onClick={() => history.replace("/admin/business_list")}>
        <ArrowBackIos />
      </IconButton>
      <div className={classes.itemGrid}>
        {detail && <DetailCard data={detail} {...{ setEditing }} />}
      </div>
      <GoodsList />
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
export default BusinessDetail;
