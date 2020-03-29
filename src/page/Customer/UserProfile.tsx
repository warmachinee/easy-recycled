import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  Avatar,
  Divider,
  IconButton,
  TextField
} from "@material-ui/core";
import { Settings, ArrowBackIos } from "@material-ui/icons";
import MaskedInput from "react-text-mask";
import AppButton from "../../AppComponent/AppButton";
import { green } from "@material-ui/core/colors";
import { AppContext } from "../../AppContext";

const useStyles = makeStyles(theme => ({
  avatar: { height: 128, width: 128, margin: "auto" },
  label: { fontWeight: 700, width: "30%" },
  text: { width: "70%" },
  textField: { marginBottom: 12 }
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
        /\d/
      ]}
      placeholderChar={"\u2000"}
    />
  );
}

const ProfileComponent: React.FC<any> = ({
  data,
  booleanDispatch,
  getInfo
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
    realtimeAccess
  } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState<any>(false);
  const [thisData, setThisData] = useState<any>({
    ...data,
    tel: stringToPhone(`0${data.tel}`)
  });

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

  async function onSave() {
    const sendObj = {
      action: "editprofile",
      linetoken: profileData.userId,
      type: "customer"
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
      body: sendObj
    });
    console.log(res.data);
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
          onClick={() => setIsEditing(true)}
        >
          <Settings />
        </IconButton>
      }
      {isEditing ? (
        <React.Fragment>
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
            onChange={e =>
              setThisData({ ...thisData, fullname: e.target.value })
            }
          />
          <TextField
            className={classes.textField}
            fullWidth
            label="นามสกุล"
            value={thisData.lastname}
            onChange={e =>
              setThisData({ ...thisData, lastname: e.target.value })
            }
          />
          <Divider style={{ margin: "12px 0" }} />
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
            label="ชื่อกิจการ"
            value={thisData.business_name}
            onChange={e =>
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
                  tel: `0${data.tel}`
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
        </React.Fragment>
      )}
    </div>
  );
};

const UserProfile: React.FC<UserProfileProps | any> = props => {
  const classes = useStyles();
  const { userInfo } = props;
  const { info } = userInfo;

  return <div>{info && <ProfileComponent data={info} {...props} />}</div>;
};
export default UserProfile;
