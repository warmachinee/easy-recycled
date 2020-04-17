import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import MaskedInput from "react-text-mask";
import {
  TextField,
  Theme,
  Paper,
  Avatar,
  Typography,
  Button,
  Checkbox,
} from "@material-ui/core";
import { AppContext } from "../../AppContext";
import GeneralDialog from "../../component/Dialog/GeneralDialog";
import AppButton from "../../AppComponent/AppButton";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => ({
  root: { padding: theme.spacing(1, 2) },
  profileCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 16,
  },
  avatar: { width: 100, height: 100, margin: "8px auto" },
  displayName: { fontWeight: 600 },
  status: {},
  textField: { marginBottom: 8 },
}));

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

const ProfileCard: React.FC<any> = ({ form }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.profileCard}>
      <Avatar className={classes.avatar} src={form.picture} />
      <Typography className={classes.displayName} align="center">
        {form.displayname}
      </Typography>
      <Typography
        className={classes.status}
        gutterBottom
        variant="body2"
        align="center"
      >
        {form.statusmassage}
      </Typography>
    </Paper>
  );
};

const RegisterForm: React.FC<any> = ({ form, setForm, businessForm }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    phoneFormatToNumber,
    _xhrPost,
    profileData,
    getSess,
    addSnackbar,
  } = useContext(AppContext);
  const [conState, setConState] = useState<any>(false);
  const [checked, setChecked] = useState<any>(false);
  const [loadingRegis, setLoadingRegis] = useState<any>(false);

  function onFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleRegister();
    }
  }

  async function handleRegister() {
    setLoadingRegis(true);
    const sendObj = {
      linetoken: profileData.userId,
      type: "business",
      ...form,
      tel: phoneFormatToNumber(form.tel),
    };
    console.log(sendObj);
    const res = await _xhrPost({
      csrf,
      url: "register",
      body: sendObj,
    });
    console.log(res.data);
    setCsrf(res.csrf);
    if (res.data.status === "success") {
      addSnackbar({ message: "สมัครสำเร็จ", variant: "success" });
      getSess(profileData);
      setLoadingRegis(false);
    } else {
      addSnackbar({
        message: `สมัครไม่สำเร็จ : ${res.data.status}`,
        variant: "error",
      });
      setLoadingRegis(false);
    }
  }

  return (
    <div>
      <Typography variant="h6" style={{ marginTop: 16 }}>
        สมัครสมาชิก
      </Typography>
      <TextField
        className={classes.textField}
        fullWidth
        name="email"
        label="อีเมล"
        value={form.email}
        onChange={onFormChange}
        onKeyPress={handleKeyPress}
      />
      <TextField
        className={classes.textField}
        fullWidth
        name="fullname"
        label="ชื่อ"
        value={form.fullname}
        onChange={onFormChange}
        onKeyPress={handleKeyPress}
      />
      <TextField
        className={classes.textField}
        fullWidth
        name="lastname"
        label="นามสกุล"
        value={form.lastname}
        onChange={onFormChange}
        onKeyPress={handleKeyPress}
      />
      <TextField
        className={classes.textField}
        fullWidth
        name="tel"
        label="เบอร์โทรศัพท์"
        InputProps={{
          inputComponent: TextMaskCustom as any,
        }}
        value={form.tel}
        onChange={onFormChange}
        onKeyPress={handleKeyPress}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          color="primary"
          checked={checked}
          onChange={(e: any) => setChecked(e.target.checked)}
          style={{ marginRight: 16 }}
        />
        <AppButton
          style={{ padding: 0 }}
          buttonColor={green}
          variant="text"
          onClick={() => setConState(true)}
        >
          ยอมรับเงื่อนไขและข้อตกลง
        </AppButton>
      </div>
      <Button
        disabled={
          form.email === "" ||
          form.fullname === "" ||
          form.lastname === "" ||
          form.tel === "" ||
          !checked ||
          loadingRegis
        }
        color="primary"
        variant="contained"
        style={{ width: "100%", marginTop: 8 }}
        onClick={handleRegister}
      >
        {loadingRegis ? "กรุณารอสักครู่" : "สมัคร"}
      </Button>
      <GeneralDialog
        open={conState}
        onClose={() => setConState(false)}
        title="เงื่อนไขและข้อตกลง"
      >
        {businessForm && (
          <Typography style={{ marginBottom: 16, whiteSpace: "pre-line" }}>
            {businessForm.form_condition[0]}
          </Typography>
        )}
      </GeneralDialog>
    </div>
  );
};

const BusinessRegister: React.FC<any> = ({ profileData }) => {
  const classes = useStyles();
  const { csrf, setCsrf, _xhrPost } = useContext(AppContext);
  const [form, setForm] = useState<any>(null);
  const [businessForm, setBusinessForm] = useState<any | null>(null);

  async function loadBusinessForm() {
    const res = await _xhrPost({
      csrf,
      url: "loadregister",
      body: { action: "business_form", type: "business" },
    });
    setCsrf(res.csrf);

    setBusinessForm(res.data);
  }

  useEffect(() => {
    if (profileData) {
      setForm({
        email: "",
        fullname: "",
        lastname: "",
        displayname: profileData.displayName ? profileData.displayName : "-",
        tel: "",
        statusmassage: profileData.statusMessage
          ? profileData.statusMessage
          : "-",
        picture: profileData.pictureUrl ? profileData.pictureUrl : "-",
      });
    }
    loadBusinessForm();
  }, [profileData]);

  return (
    <div className={classes.root}>
      {form && (
        <React.Fragment>
          <ProfileCard {...{ form }} />
          <RegisterForm {...{ form, setForm, businessForm }} />
        </React.Fragment>
      )}
    </div>
  );
};
export default BusinessRegister;
