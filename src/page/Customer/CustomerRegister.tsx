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
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  MobileStepper,
  useTheme,
  Checkbox,
  Link as MaterialLink
} from "@material-ui/core";
import { AppContext } from "../../AppContext";
import { Link } from "react-router-dom";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@material-ui/icons";
import AppButton from "../../AppComponent/AppButton";
import { green, red } from "@material-ui/core/colors";
import GeneralDialog from "../../component/Dialog/GeneralDialog";
import Province from "../../component/Dropdown/Province";
import District from "../../component/Dropdown/District";
import Subdistrict from "../../component/Dropdown/Subdistrict";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  profileCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 16
  },
  avatar: { width: 100, height: 100, margin: "8px auto" },
  displayName: { fontWeight: 600 },
  status: {},
  textField: { marginBottom: 8 },
  stepperRoot: {
    flexGrow: 1
  },
  buttonGroup: {
    display: "flex",
    padding: 8,
    position: "fixed",
    bottom: 0,
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.default
  }
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
        /\d/
      ]}
      placeholderChar={"\u2000"}
    />
  );
}

const formStep = 4;

const FormTitle: React.FC<any> = () => {
  return (
    <Typography variant="h6" style={{ fontWeight: 600 }} align="center">
      สมัครสมาชิก
    </Typography>
  );
};

const FormStepper: React.FC<any> = props => {
  const classes = useStyles();
  const theme = useTheme();
  const { inputForm, activeStep, setActiveStep } = props;

  const handleNext = () => {
    setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
  };

  return (
    <React.Fragment>
      <MobileStepper
        variant="dots"
        steps={formStep}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === formStep - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          activeStep !== 0 ? (
            <Button size="small" onClick={handleBack}>
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          ) : (
            <div style={{ width: 66.31 }} />
          )
        }
      />
      <div
        className={classes.stepperRoot}
        style={{ padding: "16px 16px 68px 16px", overflow: "auto" }}
      >
        <ComponentFromStep {...props} />
      </div>
    </React.Fragment>
  );
};

const ComponentFromStep: React.FC<any> = ({ activeStep, ...other }) => {
  switch (activeStep) {
    case 0:
      return <Component0 {...other} />;
    case 1:
      return <Component1 {...other} />;
    case 2:
      return <Component2 {...other} />;
    case 3:
      return <Component3 {...other} />;
    default:
      return <div>default</div>;
  }
};

const Component0: React.FC<any> = ({ form, ...other }) => {
  return (
    <React.Fragment>
      <ProfileCard {...{ form }} />
      <RegisterForm {...{ form }} {...other} />
    </React.Fragment>
  );
};

const Component1: React.FC<any> = props => {
  const classes = useStyles();

  const {
    form,
    setForm,
    inputForm,
    province,
    setProvince,
    district,
    setDistrict,
    subdistrict,
    setSubdistrict
  } = props;

  const locationProps: any = {
    province,
    setProvince,
    district,
    setDistrict,
    subdistrict,
    setSubdistrict
  };

  function onFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const orgTypeSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      business_type: parseInt((event.target as HTMLInputElement).value)
    });
  };

  const orgSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      org_size: parseInt((event.target as HTMLInputElement).value)
    });
  };

  return (
    <React.Fragment>
      <TextField
        style={{ marginBottom: 16 }}
        className={classes.textField}
        fullWidth
        name="business_name"
        label="ชื่อกิจการ"
        value={form.business_name}
        onChange={onFormChange}
      />
      <TextField
        style={{ marginBottom: 16 }}
        className={classes.textField}
        fullWidth
        name="location"
        label="เขตพิ้นที่รับเศษวัสดุเหลือใช้"
        value={form.location}
        onChange={e =>
          setForm({
            ...form,
            location: (e.target as HTMLInputElement).value
          })
        }
      />
      {/* <Typography variant="h6">เขตพิ้นที่รับเศษวัสดุเหลือใช้</Typography>
      {(province || district || subdistrict) && (
        <Typography>
          {province.name}
          {district ? ` > ${district.name}` : ""}
          {subdistrict
            ? ` > ${subdistrict.name} (${subdistrict.zip_code})`
            : ""}
        </Typography>
      )}
      <div style={{ height: 12 }} />
      <Province {...locationProps} />
      {province && <District {...locationProps} />}
      {province && district && <Subdistrict {...locationProps} />} */}

      <FormControl
        component="fieldset"
        style={{ marginBottom: 16, marginTop: 12 }}
        fullWidth
      >
        <FormLabel component="legend">ประเภทองค์กร</FormLabel>
        <RadioGroup
          name="business_type"
          value={form.business_type}
          onChange={orgTypeSizeChange}
        >
          {inputForm.business_type.map((d: any, i: number) => (
            <FormControlLabel
              key={d}
              value={i}
              control={<Radio color="primary" />}
              label={d}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset" style={{ marginBottom: 16 }} fullWidth>
        <FormLabel component="legend">ขนาดองค์กร</FormLabel>
        <RadioGroup
          name="org_size"
          value={form.org_size}
          onChange={orgSizeChange}
        >
          {inputForm.org_size.map((d: any, i: number) => (
            <FormControlLabel
              key={d}
              value={i}
              control={<Radio color="primary" />}
              label={d}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </React.Fragment>
  );
};

const Component2: React.FC<any> = ({ inputForm, form, setForm }) => {
  const transportOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const thisTransport = [...form.transport];
    const isEtc = form.transport.some((item: any) => item === "etc");
    if (event.target.checked) {
      thisTransport.push(event.target.value);
      setForm({
        ...form,
        transport: thisTransport,
        ...(form.transport.some((item: any) => item !== "etc") && {
          transetc: ""
        })
      });
    } else {
      setForm({
        ...form,
        transport: thisTransport.filter(
          (d: any) => d !== (isEtc ? "etc" : event.target.value)
        ),
        ...(form.transport.some((item: any) => item !== "etc") && {
          transetc: ""
        })
      });
    }
  };

  const documentOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const thisDocument = [...form.document];
    const isEtc = form.document.some((item: any) => item === "etc");
    if (event.target.checked) {
      thisDocument.push(event.target.value);
      setForm({
        ...form,
        document: thisDocument,
        ...(form.document.some((item: any) => item !== "etc") && {
          docsetc: ""
        })
      });
    } else {
      setForm({
        ...form,
        document: thisDocument.filter(
          (d: any) => d !== (isEtc ? "etc" : event.target.value)
        ),
        ...(form.document.some((item: any) => item !== "etc") && {
          docsetc: ""
        })
      });
    }
  };

  return (
    <div>
      {inputForm && (
        <React.Fragment>
          <FormControl
            component="fieldset"
            style={{ marginBottom: 16 }}
            fullWidth
          >
            <FormLabel component="legend">รถที่ใช้ขนส่ง/ทำงาน</FormLabel>
            {inputForm.transport.map((d: any, i: number) => (
              <FormControlLabel
                key={d}
                value={d}
                control={
                  <Checkbox
                    checked={form.transport.some((item: any) => item === d)}
                    color="primary"
                    onChange={transportOnChange}
                  />
                }
                label={d}
              />
            ))}
            {form.transport.some((item: any) => item === "etc") ? (
              <div
                style={{
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  marginLeft: -11,
                  marginRight: 16,
                  verticalAlign: "middle"
                }}
              >
                <Checkbox
                  checked={form.transport.some((item: any) => item === "etc")}
                  color="primary"
                  onChange={transportOnChange}
                />
                <TextField
                  fullWidth
                  autoFocus={form.transport.some((item: any) => item === "etc")}
                  name="transetc"
                  label="อื่นๆ"
                  size="small"
                  value={form.transetc}
                  onChange={e =>
                    setForm({
                      ...form,
                      transetc: (e.target as HTMLInputElement).value
                    })
                  }
                />
              </div>
            ) : (
              <FormControlLabel
                value="etc"
                control={
                  <Checkbox
                    checked={form.transport.some((item: any) => item === "etc")}
                    color="primary"
                    onChange={transportOnChange}
                  />
                }
                label="อื่นๆ"
              />
            )}
          </FormControl>
          <FormControl
            component="fieldset"
            style={{ marginBottom: 16 }}
            fullWidth
          >
            <FormLabel component="legend">
              เอกสารที่ควบคู่การซื้อขายเศษวัสดุเหลือใช้
            </FormLabel>
            {inputForm.document.map((d: any, i: number) => (
              <FormControlLabel
                key={d}
                value={d}
                control={
                  <Checkbox
                    checked={form.document.some((item: any) => item === d)}
                    color="primary"
                    onChange={documentOnChange}
                  />
                }
                label={d}
              />
            ))}
            {form.document.some((item: any) => item === "etc") ? (
              <div
                style={{
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  marginLeft: -11,
                  marginRight: 16,
                  verticalAlign: "middle"
                }}
              >
                <Checkbox
                  checked={form.document.some((item: any) => item === "etc")}
                  color="primary"
                  onChange={documentOnChange}
                />
                <TextField
                  fullWidth
                  autoFocus={form.document.some((item: any) => item === "etc")}
                  name="docsetc"
                  label="อื่นๆ"
                  size="small"
                  value={form.docsetc}
                  onChange={e =>
                    setForm({
                      ...form,
                      docsetc: (e.target as HTMLInputElement).value
                    })
                  }
                />
              </div>
            ) : (
              <FormControlLabel
                value="etc"
                control={
                  <Checkbox
                    checked={form.document.some((item: any) => item === "etc")}
                    color="primary"
                    onChange={documentOnChange}
                  />
                }
                label="อื่นๆ"
              />
            )}
          </FormControl>
        </React.Fragment>
      )}
    </div>
  );
};

const Component3: React.FC<any> = ({
  inputForm,
  form,
  setForm,
  setActiveStep,
  checked,
  setChecked
}) => {
  const classes = useStyles();
  const { _dateToString, _parseLocation } = useContext(AppContext);
  const [conState, setConState] = useState<any>(false);

  const MarginDivider = () => {
    return <div style={{ marginBottom: 12 }} />;
  };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
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
      <Typography variant="h6" style={{ flex: 1 }}>
        ชื่อ-นามสกุล
      </Typography>
      {form.fullname === "" || form.lastname === "" ? (
        <Typography gutterBottom style={{ flex: 1 }}>
          <MaterialLink
            style={{ color: red[600] }}
            onClick={() => setActiveStep(0)}
          >
            กรุณากรอกข้อมูล
          </MaterialLink>
        </Typography>
      ) : (
        <Typography gutterBottom style={{ flex: 1 }}>
          {`${form.fullname} ${form.lastname}`}
        </Typography>
      )}
      {/* <Typography variant="h6" style={{ flex: 1 }}>
        อีเมล
      </Typography>
      {form.email === "" ? (
        <Typography gutterBottom style={{ flex: 1 }}>
          <MaterialLink
            style={{ color: red[600] }}
            onClick={() => setActiveStep(0)}
          >
            กรุณากรอกข้อมูล
          </MaterialLink>
        </Typography>
      ) : (
        <Typography gutterBottom style={{ flex: 1 }}>
          {form.email}
        </Typography>
      )} */}
      <Typography variant="h6" style={{ flex: 1 }}>
        เบอร์โทรศัพท์
      </Typography>
      {form.tel === "" ? (
        <Typography gutterBottom style={{ flex: 1 }}>
          <MaterialLink
            style={{ color: red[600] }}
            onClick={() => setActiveStep(0)}
          >
            กรุณากรอกข้อมูล
          </MaterialLink>
        </Typography>
      ) : (
        <Typography gutterBottom style={{ flex: 1 }}>
          {form.tel}
        </Typography>
      )}
      <Typography variant="h6" style={{ flex: 1 }}>
        ชื่อกิจการ
      </Typography>
      {form.business_name === "" ? (
        <Typography gutterBottom style={{ flex: 1 }}>
          <MaterialLink
            style={{ color: red[600] }}
            onClick={() => setActiveStep(1)}
          >
            กรุณากรอกข้อมูล
          </MaterialLink>
        </Typography>
      ) : (
        <Typography gutterBottom style={{ flex: 1 }}>
          {form.business_name}
        </Typography>
      )}
      <MarginDivider />
      <Typography variant="h6" style={{ flex: 1 }}>
        ประเภทองค์กร
      </Typography>
      <Typography gutterBottom style={{ flex: 1 }}>
        {inputForm["business_type"][form.business_type]}
      </Typography>
      <MarginDivider />
      <Typography variant="h6" style={{ flex: 1 }}>
        ขนาดองค์กร
      </Typography>
      <Typography gutterBottom style={{ flex: 1 }}>
        {inputForm["org_size"][form.org_size]}
      </Typography>
      <MarginDivider />
      <Typography variant="h6" style={{ flex: 1 }}>
        สถานที่ตั้ง
      </Typography>
      {form.location === "" ? (
        <Typography gutterBottom style={{ flex: 1 }}>
          <MaterialLink
            style={{ color: red[600] }}
            onClick={() => setActiveStep(1)}
          >
            กรุณากรอกข้อมูล
          </MaterialLink>
        </Typography>
      ) : (
        <Typography gutterBottom style={{ flex: 1 }}>
          {/* {_parseLocation(form.location).label} */}
          {form.location}
        </Typography>
      )}
      <MarginDivider />
      <Typography variant="h6" style={{ flex: 1 }}>
        รถที่ใช้ขนส่ง/ทำงาน
      </Typography>
      {form.transport.length > 0 ? (
        form.transport.map((d: any) => (
          <Typography key={d} style={{ flex: 1 }}>
            {d === "etc" ? (form.transetc === "" ? "อื่นๆ" : form.transetc) : d}
          </Typography>
        ))
      ) : (
        <MaterialLink
          style={{ color: red[600] }}
          onClick={() => setActiveStep(2)}
        >
          ไม่มีรถที่ใช้ขนส่ง/ทำงาน
        </MaterialLink>
      )}
      <MarginDivider />
      <Typography variant="h6" style={{ flex: 1 }}>
        เอกสารที่ควบคู่การซื้อขายเศษวัสดุเหลือใช้
      </Typography>
      {form.document.length > 0 ? (
        form.document.map((d: any) => (
          <Typography key={d} style={{ flex: 1 }}>
            {d === "etc" ? (form.docsetc === "" ? "อื่นๆ" : form.docsetc) : d}
          </Typography>
        ))
      ) : (
        <MaterialLink
          style={{ color: red[600] }}
          onClick={() => setActiveStep(2)}
        >
          ไม่มีเอกสาร
        </MaterialLink>
      )}
      <MarginDivider />

      <GeneralDialog
        open={conState}
        onClose={() => setConState(false)}
        title="เงื่อนไขและข้อตกลง"
      >
        <Typography
          className={classes.textField}
          style={{ whiteSpace: "pre-line" }}
        >
          {inputForm && inputForm.customer_condition[0]}
        </Typography>
      </GeneralDialog>
    </div>
  );
};

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

const RegisterForm: React.FC<any> = ({
  form,
  setForm,
  inputForm,
  setInputForm
}) => {
  const classes = useStyles();

  function onFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <Typography variant="h6" style={{ marginTop: 16 }}>
        สมัครสมาชิก
      </Typography>

      {/* <TextField
        className={classes.textField}
        fullWidth
        name="email"
        label="อีเมล"
        value={form.email}
        onChange={onFormChange}
      /> */}
      <TextField
        className={classes.textField}
        fullWidth
        name="fullname"
        label="ชื่อ"
        value={form.fullname}
        onChange={onFormChange}
      />
      <TextField
        className={classes.textField}
        fullWidth
        name="lastname"
        label="นามสกุล"
        value={form.lastname}
        onChange={onFormChange}
      />
      <TextField
        className={classes.textField}
        fullWidth
        name="tel"
        label="เบอร์โทรศัพท์"
        InputProps={{
          inputComponent: TextMaskCustom as any
        }}
        value={form.tel}
        onChange={onFormChange}
      />
    </div>
  );
};

const CustomerRegister: React.FC<any> = ({ profileData }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    phoneFormatToNumber,
    getSess,
    _parseLocation
  } = useContext(AppContext);
  const [form, setForm] = useState<any>(null);
  const [activeStep, setActiveStep] = React.useState<any>(0);
  const [inputForm, setInputForm] = useState<any | null>(null);
  const [checked, setChecked] = useState<any>(false);
  // const [province, setProvince] = useState<any>(null);
  // const [district, setDistrict] = useState<any>(null);
  // const [subdistrict, setSubdistrict] = useState<any>(null);
  // const locationProps: any = {
  //   province,
  //   setProvince,
  //   district,
  //   setDistrict,
  //   subdistrict,
  //   setSubdistrict
  // };

  async function loadForm() {
    const res = await _xhrPost({
      csrf,
      url: "loadregister",
      body: { action: "customer_register", type: "customer" }
    });
    setCsrf(res.csrf);

    setInputForm(res.data);
  }

  async function onRegister() {
    const { tel, business_type, org_size, docsetc, transetc } = form;
    const sendObj = {
      linetoken: profileData.userId,
      type: "customer",
      ...form,
      tel: phoneFormatToNumber(tel),
      business_type: inputForm["business_type"][business_type],
      org_size: inputForm["org_size"][org_size],
      ...(docsetc !== "" && { docsetc }),
      ...(transetc !== "" && { transetc })
    };
    const res = await _xhrPost({
      csrf,
      url: "register",
      body: sendObj
    });

    setCsrf(res.csrf);
    getSess(profileData);
  }

  useEffect(() => {
    loadForm();
    if (profileData) {
      setForm({
        email: "",
        fullname: "",
        lastname: "",
        displayname: profileData.displayName,
        tel: "",
        statusmassage: profileData.statusMessage,
        picture: profileData.pictureUrl,
        business_name: "",
        business_type: 0,
        location: "",
        org_size: 0,
        document: [],
        docsetc: "",
        transport: [],
        transetc: ""
      });
    }
  }, [profileData]);

  // useEffect(() => {
  //   if (province || district || subdistrict) {
  //     setForm({
  //       ...form,
  //       location: JSON.stringify({ province, district, subdistrict })
  //       // location: `${province.name} > ${district.name} > ${subdistrict.name} (${subdistrict.zip_code})`
  //     });
  //   }
  // }, [province, district, subdistrict]);

  return (
    <div className={classes.root}>
      <FormTitle />
      {form && inputForm && (
        <FormStepper
          {...{
            inputForm,
            setInputForm,
            activeStep,
            setActiveStep,
            form,
            setForm,
            checked,
            setChecked
          }}
          // {...locationProps}
        />
      )}

      {activeStep === formStep - 1 && (
        <div className={classes.buttonGroup}>
          <AppButton
            variant="contained"
            buttonColor={green}
            style={{ flexGrow: 1.5, margin: 8 }}
            onClick={onRegister}
            disabled={
              form.fullname === "" ||
              form.lastname === "" ||
              form.tel === "" ||
              form.business_name === "" ||
              form.location === "" ||
              // _parseLocation(form.location).label === "" ||
              form.transport.length === 0 ||
              form.document.length === 0 ||
              !checked
            }
          >
            สร้าง
          </AppButton>
        </div>
      )}
    </div>
  );
};
export default CustomerRegister;
