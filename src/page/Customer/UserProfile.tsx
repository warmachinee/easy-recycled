import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import Loadable from "react-loadable";
import {
  Typography,
  Avatar,
  Divider,
  IconButton,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Link as MaterialLink,
  Button,
} from "@material-ui/core";
import { Settings, ArrowBackIos } from "@material-ui/icons";
import MaskedInput from "react-text-mask";
import AppButton from "../../AppComponent/AppButton";
import { green } from "@material-ui/core/colors";
import { AppContext } from "../../AppContext";

const FullscreenImage = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'FullscreenImage' */ "../../component/Dialog/FullscreenImage"
    ),
  loading: () => null,
});

const GeneralDialog = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'GeneralDialog' */ "../../component/Dialog/GeneralDialog"
    ),
  loading: () => null,
});

const UploadDocs = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'UploadDocs' */ "../../component/Utils/UploadDocs"
    ),
  loading: () => null,
});

const useStyles = makeStyles((theme) => ({
  avatar: { height: 128, width: 128, margin: "auto" },
  label: { fontWeight: 700, width: "30%" },
  text: { width: "70%" },
  textField: { marginBottom: 12 },
}));

export interface UserProfileProps {}

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

const DocsForm: React.FC<any> = (props) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    profileData,
    _xhrPost,
    _fetchFile,
    addSnackbar,
  } = useContext(AppContext);
  const {
    docsType,
    setDocsType,
    handleChange,
    docsDisplay,
    setDocsDisplay,
    docs,
    setDocs,
    setIsUpload,
    getInfo,
  } = props;

  async function uploadDocs() {
    const imgRes = await _fetchFile({
      url: "usersystem",
      csrf,
      headers: {
        action: "docs",
        type: "customer",
        docstype: docsType,
      },
      body: { [`${docsType}image`]: docs },
    });
    if (imgRes.data.status === "success") {
      addSnackbar({ message: "อัพโหลดเอกสารสำเร็จ", variant: "success" });
      setDocs(null);
      setDocsDisplay(null);
      setIsUpload(false);
      setDocsType("id_card");
      setCsrf(imgRes.csrf);
      getInfo();
    } else {
      addSnackbar({ message: "อัพโหลดเอกสารไม่สำเร็จ", variant: "error" });
    }
  }

  return (
    <div>
      <div>
        <FormControl>
          <Select value={docsType} onChange={handleChange} variant="outlined">
            {docsArr.map((d: any, i: number) => (
              <MenuItem key={i} value={d}>
                {docsArrString[i]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{ display: "flex", marginTop: 16 }}>
          <UploadDocs fullWidth label="อัพโหลด" {...props} />
          {docs && (
            <AppButton
              buttonColor={green}
              onClick={() => {
                setDocs(null);
                setDocsDisplay(null);
              }}
            >
              รีเซ็ต
            </AppButton>
          )}
        </div>

        {docsDisplay && (
          <img
            src={docsDisplay}
            alt="docsimg"
            style={{ width: "100%", marginTop: 16 }}
          />
        )}
        <AppButton
          buttonColor={green}
          variant="contained"
          style={{ margin: "16px 0", width: "100%" }}
          disabled={!docs}
          onClick={uploadDocs}
        >
          บันทึก
        </AppButton>
      </div>
    </div>
  );
};

const UserDocs: React.FC<any> = ({ data }) => {
  const keys: any = data.split(".")[0];
  const { sess } = useContext(AppContext);
  const [open, setOpen] = useState<any>(false);

  return (
    <React.Fragment>
      <div style={{ marginBottom: 8 }} onClick={() => setOpen(true)}>
        <Button variant="text" color="primary">
          {docsLabel[keys]}
        </Button>
      </div>
      <FullscreenImage
        open={open}
        onClose={() => setOpen(false)}
        title={docsLabel[keys]}
        fullScreen
      >
        <img
          style={{ width: "100%", maxHeight: "calc(100% - 64px)" }}
          src={`https://easyrecycle.ml/customer/${sess.userid}/${data}`}
          alt={docsLabel[keys]}
        />
      </FullscreenImage>
    </React.Fragment>
  );
};

const ProfileComponent: React.FC<any> = ({
  data,
  booleanDispatch,
  getInfo,
  userDocs,
}) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    profileData,
    _xhrPost,
    checkSession,
    phoneFormatToNumber,
    stringToPhone,
    realtimeAccess,
  } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState<any>(false);
  const [thisData, setThisData] = useState<any>({
    ...data,
    tel: stringToPhone(`0${data.tel}`),
  });
  const [docs, setDocs] = useState<any>(null);
  const [docsDisplay, setDocsDisplay] = useState<any>(null);
  const [isUpload, setIsUpload] = useState<any>(false);
  const [docsType, setDocsType] = useState<any>("id_card");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDocsType(event.target.value);
  };

  function checkDisabled() {
    const keyArr = ["displayname", "fullname", "lastname", "business_name"];
    const thisArr = [];
    for (var i = 0; i < keyArr.length; i++) {
      if (thisData[keyArr[i]] !== data[keyArr[i]]) {
        thisArr.push(thisData[keyArr[i]]);
      }
    }
    if (thisData.tel !== `0${data.tel}`) {
      thisArr.push(thisData[keyArr[i]]);
    }
    return thisArr.length === 0;
  }

  function onCloseUpload() {
    setIsUpload(false);
    setDocs(null);
    setDocsDisplay(null);
  }

  async function onSave() {
    const sendObj = {
      action: "editprofile",
      linetoken: profileData.userId,
      type: "customer",
      picture: profileData.pictureUrl,
    };
    const keyArr = ["displayname", "fullname", "lastname", "business_name"];
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
      url: "usersystem",
      body: sendObj,
    });

    setCsrf(res.csrf);
    if (
      "status" in res.data &&
      res.data.status === "this is not user account or have been delete account"
    ) {
      checkSession();
    } else {
      getInfo();
      setIsEditing(false);
      //   booleanDispatch({ type: "false", key: "userProfile" });
    }
    realtimeAccess();
  }

  return (
    <div style={{ position: "relative" }}>
      {
        <IconButton
          style={{ position: "absolute", top: -12, right: 0 }}
          onClick={() => setIsEditing((prev: any) => !prev)}
        >
          <Settings />
        </IconButton>
      }
      {isEditing ? (
        <React.Fragment>
          <TextField
            style={{ marginTop: 24 }}
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
            onChange={(e) =>
              setThisData({ ...thisData, fullname: e.target.value })
            }
          />
          <TextField
            className={classes.textField}
            fullWidth
            label="นามสกุล"
            value={thisData.lastname}
            onChange={(e) =>
              setThisData({ ...thisData, lastname: e.target.value })
            }
          />
          <Divider style={{ margin: "12px 0" }} />
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
          <TextField
            className={classes.textField}
            fullWidth
            label="ชื่อกิจการ"
            value={thisData.business_name}
            onChange={(e) =>
              setThisData({ ...thisData, business_name: e.target.value })
            }
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
                  tel: `0${data.tel}`,
                });
                setIsEditing(false);
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
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Avatar src={data.picture} className={classes.avatar} />
          <Typography align="center" variant="h6">
            {data.displayname}
          </Typography>
          <Typography align="center">{`${data.fullname} ${data.lastname}`}</Typography>
          <Typography align="center">{data.statusmassage}</Typography>
          <Divider style={{ margin: "12px 0" }} />
          <div style={{ display: "flex" }}>
            <Typography className={classes.label}>เบอร์โทรศัพท์</Typography>
            <Typography className={classes.text}>
              {stringToPhone(`0${data.tel}`)}
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Typography className={classes.label}>ชื่อกิจการ</Typography>
            <Typography className={classes.text}>
              {data.business_name}
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Typography className={classes.label}>ประเภทกิจการ</Typography>
            <Typography className={classes.text}>
              {data.business_type}
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Typography className={classes.label}>ขนาดองค์กร</Typography>
            <Typography className={classes.text}>{data.org_size}</Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Typography className={classes.label}>สถานที่</Typography>
            <Typography className={classes.text}>{data.location}</Typography>
          </div>
          <Divider style={{ margin: "12px 0" }} />
          <div style={{ margin: "8px 0" }}>
            <AppButton
              buttonColor={green}
              variant="outlined"
              size="large"
              onClick={() => setIsUpload(true)}
              style={{ width: "100%" }}
            >
              อัพโหลดรูปเอกสาร
            </AppButton>
          </div>
          {userDocs && (
            <div style={{ marginTop: 16 }}>
              {userDocs
                .filter(
                  (d: any) =>
                    d.split(".")[1] !== "webp" &&
                    d !== "topup" &&
                    d !== "log.txt"
                )
                .map((d: any, i: number) => (
                  <UserDocs key={d} data={d} />
                ))}
            </div>
          )}
        </React.Fragment>
      )}

      <GeneralDialog
        open={isUpload}
        onClose={onCloseUpload}
        title="อัพโหลดรูปเอกสาร"
      >
        <DocsForm
          {...{
            docs,
            setDocs,
            docsDisplay,
            setDocsDisplay,
            onCloseUpload,
            docsType,
            setDocsType,
            handleChange,
            getInfo,
            setIsUpload,
          }}
        />
      </GeneralDialog>
    </div>
  );
};

const UserProfile: React.FC<UserProfileProps | any> = (props) => {
  const classes = useStyles();
  const { userInfo } = props;
  const { info, docs } = userInfo;

  return (
    <div>
      {info && <ProfileComponent data={info} userDocs={docs} {...props} />}
    </div>
  );
};
export default UserProfile;
