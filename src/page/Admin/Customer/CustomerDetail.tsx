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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@material-ui/core";
import { ArrowBackIos, Settings, Create } from "@material-ui/icons";
import { red, green } from "@material-ui/core/colors";
import MaskedInput from "react-text-mask";
import AppButton from "../../../AppComponent/AppButton";
import ConfirmDialog from "../../../component/Dialog/ConfirmDialog";
import Province from "../../../component/Dropdown/Province";
import District from "../../../component/Dropdown/District";
import Subdistrict from "../../../component/Dropdown/Subdistrict";
import { DatePicker } from "@material-ui/pickers";

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
  editButton: { padding: 6, marginBottom: 6, marginLeft: 8 },
  dateText: { width: "50%" },
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
  const {
    _dateToString,
    stringToPhone,
    _thousandSeperater,
    _parseLocation,
  } = useContext(AppContext);
  const { detail, setEditing, inputForm } = props;
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
        {inputForm && (
          <IconButton
            style={{ position: "absolute", top: 0, right: 0 }}
            onClick={() => setEditing(true)}
          >
            <Settings />
          </IconButton>
        )}
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
              {_parseLocation(data.location).label}
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

const StringEdit: React.FC<any> = (props) => {
  const classes = useStyles();
  const { value, label, customerid, getBaseDetail, keys } = props;
  const { csrf, setCsrf, _xhrPost, _onEnter } = useContext(AppContext);
  const [thisValue, setThisValue] = useState<any>(value);
  const [editing, setEditing] = useState<boolean>(false);

  async function handleSave() {
    const sendObj = {
      action: "base_edit",
      customerid,
      [keys]: thisValue,
    };
    const res = await _xhrPost({
      csrf,
      url: "acustomersystem",
      body: sendObj,
    });
    setCsrf(res.csrf);
    setEditing(false);
    getBaseDetail();
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <Typography variant="h6">
        {label}
        <IconButton
          className={classes.editButton}
          onClick={() => setEditing((prev) => !prev)}
        >
          <Create fontSize="small" />
        </IconButton>
      </Typography>
      {editing ? (
        <div style={{ display: "flex" }}>
          <TextField
            style={{ marginRight: 16 }}
            fullWidth
            autoFocus={editing}
            value={thisValue}
            onChange={(e) => setThisValue(e.target.value)}
            onKeyPress={_onEnter(handleSave)}
          />
          <AppButton
            disabled={thisValue === value}
            variant="contained"
            buttonColor={green}
            onClick={handleSave}
          >
            บันทึก
          </AppButton>
          <AppButton
            variant="text"
            buttonColor={green}
            onClick={() => {
              setEditing(false);
              setThisValue(value);
            }}
          >
            ยกเลิก
          </AppButton>
        </div>
      ) : (
        <Typography style={{ whiteSpace: "pre-line" }}>{value}</Typography>
      )}
    </div>
  );
};

const TelEdit: React.FC<any> = (props) => {
  const classes = useStyles();
  const { value, customerid, getBaseDetail, keys } = props;
  const {
    csrf,
    setCsrf,
    _xhrPost,
    _onEnter,
    stringToPhone,
    phoneFormatToNumber,
  } = useContext(AppContext);
  const [thisValue, setThisValue] = useState<any>(stringToPhone(`0${value}`));
  const [editing, setEditing] = useState<boolean>(false);

  async function handleSave() {
    const sendObj = {
      action: "base_edit",
      customerid,
      [keys]: phoneFormatToNumber(thisValue),
    };
    const res = await _xhrPost({
      csrf,
      url: "acustomersystem",
      body: sendObj,
    });
    setCsrf(res.csrf);
    setEditing(false);
    getBaseDetail();
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <Typography variant="h6">
        เบอร์โทรศัพท์
        <IconButton
          className={classes.editButton}
          onClick={() => setEditing((prev) => !prev)}
        >
          <Create fontSize="small" />
        </IconButton>
      </Typography>
      {editing ? (
        <div style={{ display: "flex" }}>
          <TextField
            style={{ marginRight: 16 }}
            fullWidth
            autoFocus={editing}
            value={thisValue}
            onChange={(e) => setThisValue(e.target.value)}
            onKeyPress={_onEnter(handleSave)}
            InputProps={{
              inputComponent: TextMaskCustom as any,
            }}
          />
          <AppButton
            disabled={phoneFormatToNumber(thisValue) !== `0${value}`}
            variant="contained"
            buttonColor={green}
            onClick={handleSave}
          >
            บันทึก
          </AppButton>
          <AppButton
            variant="text"
            buttonColor={green}
            onClick={() => {
              setEditing(false);
              setThisValue(value);
            }}
          >
            ยกเลิก
          </AppButton>
        </div>
      ) : (
        <Typography style={{ whiteSpace: "pre-line" }}>{value}</Typography>
      )}
    </div>
  );
};

const RadioEdit: React.FC<any> = (props) => {
  const classes = useStyles();
  const { value, label, customerid, getBaseDetail, keys, inputForm } = props;
  const { csrf, setCsrf, _xhrPost } = useContext(AppContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [thisValue, setThisValue] = useState<string>(value);

  async function handleSave() {
    const sendObj = {
      action: "base_edit",
      customerid,
      [keys]: thisValue,
    };
    const res = await _xhrPost({
      csrf,
      url: "acustomersystem",
      body: sendObj,
    });
    setCsrf(res.csrf);
    setEditing(false);
    getBaseDetail();
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <Typography variant="h6">
        {label}
        <IconButton
          className={classes.editButton}
          onClick={() => setEditing((prev) => !prev)}
        >
          <Create fontSize="small" />
        </IconButton>
      </Typography>
      <Typography>{value}</Typography>
      <GeneralDialog
        open={editing}
        onClose={() => {
          setEditing(false);
          setThisValue(value);
        }}
        title={`แก้ไข${label}`}
      >
        <FormControl
          component="fieldset"
          style={{ marginBottom: 16 }}
          fullWidth
        >
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup
            value={thisValue}
            onChange={(e) => setThisValue(e.target.value)}
          >
            {inputForm.business_type.map((d: any, i: number) => (
              <FormControlLabel
                key={d}
                value={d}
                control={<Radio color="primary" />}
                label={d}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <AppButton
            variant="text"
            buttonColor={green}
            onClick={() => {
              setEditing(false);
              setThisValue(value);
            }}
            style={{ margin: 8 }}
          >
            ยกเลิก
          </AppButton>
          <AppButton
            disabled={thisValue === value}
            variant="contained"
            buttonColor={green}
            onClick={handleSave}
            style={{ margin: 8 }}
          >
            บันทึก
          </AppButton>
        </div>
      </GeneralDialog>
    </div>
  );
};

const CheckboxEdit: React.FC<any> = (props) => {
  const classes = useStyles();
  const {
    value,
    label,
    customerid,
    getBaseDetail,
    keys,
    etcKeys,
    inputForm,
  } = props;
  const { csrf, setCsrf, _xhrPost, _onEnter } = useContext(AppContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [thisValue, setThisValue] = useState<any>(value[keys]);
  const [thisEtc, setThisEtc] = useState<any>(
    value.etc === "none" ? "" : value.etc
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const thisArr = [...thisValue];
    if (event.target.checked) {
      thisArr.push(event.target.value);
      setThisValue(thisArr);
      setThisEtc(thisEtc);
    } else {
      setThisValue(
        thisArr.filter(
          (d: any) =>
            d !== (event.target.value === "" ? "etc" : event.target.value)
        )
      );
      setThisEtc(thisEtc);
    }
  };

  function onCloseDialog() {
    setEditing(false);
    setThisValue(value.transport);
    setThisEtc(value.etc === "none" ? "" : value.etc);
  }

  async function handleSave() {
    const sendObj = {
      action: "base_edit",
      customerid,
      [keys]: thisValue,
      ...(thisValue.some((item: any) => item === "etc") && {
        [etcKeys]: thisEtc,
      }),
    };
    const res = await _xhrPost({
      csrf,
      url: "acustomersystem",
      body: sendObj,
    });
    setCsrf(res.csrf);
    setEditing(false);
    getBaseDetail();
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <Typography variant="h6">
        {label}
        <IconButton
          className={classes.editButton}
          onClick={() => setEditing((prev) => !prev)}
        >
          <Create fontSize="small" />
        </IconButton>
      </Typography>
      {value[keys]
        .filter((item: any) => item !== "etc")
        .map((d: any) => (
          <Typography key={d}>{d}</Typography>
        ))}
      {value.etc !== "none" && <Typography>{value.etc}</Typography>}
      {value[keys].filter((item: any) => item !== "etc").length === 0 &&
        value.etc === "none" && <Typography>{`ไม่มี${label}`}</Typography>}
      <GeneralDialog
        open={editing}
        onClose={onCloseDialog}
        title={`แก้ไข${label}`}
      >
        <FormControl
          component="fieldset"
          style={{ marginBottom: 16 }}
          fullWidth
        >
          <FormLabel component="legend">{label}</FormLabel>
          {inputForm[keys].map((d: any, i: number) => (
            <FormControlLabel
              key={d}
              value={d}
              control={
                <Checkbox
                  checked={thisValue.some((item: any) => item === d)}
                  color="primary"
                  onChange={onChange}
                />
              }
              label={d}
            />
          ))}
          {thisValue.some((item: any) => item === "etc") ? (
            <div
              style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                marginLeft: -11,
                marginRight: 16,
                verticalAlign: "middle",
              }}
            >
              <Checkbox
                checked={thisValue.some((item: any) => item === "etc")}
                color="primary"
                onChange={onChange}
              />
              <TextField
                fullWidth
                autoFocus={thisEtc !== "none"}
                name={etcKeys}
                label="อื่นๆ"
                size="small"
                value={thisEtc}
                onChange={(e) => setThisEtc(e.target.value)}
                onKeyPress={_onEnter(handleSave)}
              />
            </div>
          ) : (
            <FormControlLabel
              value="etc"
              control={
                <Checkbox
                  checked={thisValue.some((item: any) => item === "etc")}
                  color="primary"
                  onChange={onChange}
                />
              }
              label="อื่นๆ"
            />
          )}
        </FormControl>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <AppButton
            variant="text"
            buttonColor={green}
            onClick={onCloseDialog}
            style={{ margin: 8 }}
          >
            ยกเลิก
          </AppButton>
          <AppButton
            variant="contained"
            buttonColor={green}
            onClick={handleSave}
            style={{ margin: 8 }}
          >
            บันทึก
          </AppButton>
        </div>
      </GeneralDialog>
    </div>
  );
};

const LocationEdit: React.FC<any> = (props) => {
  const classes = useStyles();
  const { csrf, setCsrf, _xhrPost, _parseLocation } = useContext(AppContext);
  const { value, customerid, getBaseDetail } = props;
  const [editing, setEditing] = useState<boolean>(false);
  const [thisValue, setThisValue] = useState<string>(value);
  const [province, setProvince] = useState<any>(_parseLocation(value).province);
  const [district, setDistrict] = useState<any>(_parseLocation(value).district);
  const [subdistrict, setSubdistrict] = useState<any>(
    _parseLocation(value).subdistrict
  );
  const locationProps: any = {
    province,
    setProvince,
    district,
    setDistrict,
    subdistrict,
    setSubdistrict,
  };

  function onCancel() {
    setEditing(false);
    setThisValue(value);
    setProvince(_parseLocation(value).province);
    setDistrict(_parseLocation(value).district);
    setSubdistrict(_parseLocation(value).subdistrict);
  }

  async function handleSave() {
    const sendObj = {
      action: "base_edit",
      customerid,
      location: thisValue,
    };
    const res = await _xhrPost({
      csrf,
      url: "acustomersystem",
      body: sendObj,
    });
    setCsrf(res.csrf);
    setEditing(false);
    getBaseDetail();
  }

  React.useEffect(() => {
    if (province || district || subdistrict) {
      setThisValue(JSON.stringify({ province, district, subdistrict }));
    }
  }, [province, district, subdistrict]);

  return (
    <div style={{ marginBottom: 12 }}>
      <Typography variant="h6">
        สถานที่
        <IconButton
          className={classes.editButton}
          onClick={() => {
            setEditing((prev) => !prev);
            setThisValue(value);
            setProvince(_parseLocation(value).province);
            setDistrict(_parseLocation(value).district);
            setSubdistrict(_parseLocation(value).subdistrict);
          }}
        >
          <Create fontSize="small" />
        </IconButton>
      </Typography>
      {(province || district || subdistrict) && (
        <Typography>
          {province.name}
          {district ? ` > ${district.name}` : ""}
          {subdistrict
            ? ` > ${subdistrict.name} (${subdistrict.zip_code})`
            : ""}
        </Typography>
      )}
      {editing && (
        <div style={{ display: "flex", marginTop: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <Province {...locationProps} />
            {province && <District {...locationProps} />}
            {province && district && <Subdistrict {...locationProps} />}
          </div>
          <div style={{ marginLeft: 16, marginBottom: "auto" }}>
            <AppButton
              disabled={thisValue === value}
              variant="contained"
              buttonColor={green}
              onClick={handleSave}
            >
              บันทึก
            </AppButton>
            <AppButton variant="text" buttonColor={green} onClick={onCancel}>
              ยกเลิก
            </AppButton>
          </div>
        </div>
      )}
    </div>
  );
};

const EditDetail: React.FC<any> = (props) => {
  const classes = useStyles();
  const { csrf, setCsrf, _xhrPost } = useContext(AppContext);
  const { data, setEditing, getBaseDetail, match, inputForm } = props;
  const { info } = data;
  const { customerid } = match.params;

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
      <StringEdit
        value={info.displayname}
        label="ชื่อที่แสดง"
        keys="displayname"
        {...{ customerid, getBaseDetail }}
      />
      <StringEdit
        value={info.fullname}
        label="ชื่อ"
        keys="fullname"
        {...{ customerid, getBaseDetail }}
      />
      <StringEdit
        value={info.lastname}
        label="นามสกุล"
        keys="lastname"
        {...{ customerid, getBaseDetail }}
      />
      <StringEdit
        value={info.statusmassage}
        label="ข้อความสถานะ"
        keys="statusmassage"
        {...{ customerid, getBaseDetail }}
      />
      <TelEdit value={info.tel} keys="tel" {...{ customerid, getBaseDetail }} />
      <Divider style={{ margin: "16px 0" }} />
      <StringEdit
        value={info.business_name}
        label="ชื่อกิจการ"
        keys="business_name"
        {...{ customerid, getBaseDetail }}
      />
      <RadioEdit
        value={info.business_type}
        label="ประเภทกิจการ"
        keys="business_type"
        {...{ customerid, getBaseDetail, inputForm }}
      />
      <RadioEdit
        value={info.org_size}
        label="ขนาดองค์กร"
        keys="org_size"
        {...{ customerid, getBaseDetail, inputForm }}
      />
      <LocationEdit value={info.location} {...{ customerid, getBaseDetail }} />
      <CheckboxEdit
        value={info.transport}
        label="รถที่ใช้ขนส่ง"
        keys="transport"
        etcKeys="transetc"
        {...{ customerid, getBaseDetail, inputForm }}
      />
      <CheckboxEdit
        value={info.document}
        label="เอกสาร"
        keys="document"
        etcKeys="docsetc"
        {...{ customerid, getBaseDetail, inputForm }}
      />
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
  const [form, setForm] = useState<any>(null);

  async function getForm(passedCsrf: any) {
    const res = await _xhrPost({
      csrf: passedCsrf,
      url: "aloadcustomer",
      body: {
        action: "customer_register",
      },
    });
    setCsrf(res.csrf);
    setForm(res.data);
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
    setDetail(res.data);
    getForm(res.csrf);
  }

  useEffect(() => {
    getBaseDetail();
  }, []);

  return (
    <div>
      <IconButton onClick={() => history.replace("/admin/customer_list")}>
        <ArrowBackIos />
      </IconButton>
      <div className={classes.itemGrid}>
        {detail && (
          <DetailCard
            inputForm={form}
            {...{ detail, setEditing, customerid, getBaseDetail }}
          />
        )}
      </div>
      <GeneralDialog
        open={editing}
        onClose={() => setEditing(false)}
        title="แก้ไขข้อมูล"
      >
        {detail && form && (
          <EditDetail
            data={detail}
            inputForm={form}
            {...{ setEditing, getBaseDetail, match }}
          />
        )}
      </GeneralDialog>
    </div>
  );
};
export default CustomerDetail;
