import React, { useContext, useEffect, useState } from "react";
import Loadable from "react-loadable";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../../../AppContext";
import {
  Typography,
  IconButton,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Divider,
  Switch,
  Chip
} from "@material-ui/core";
import { Create } from "@material-ui/icons";
import { green, red } from "@material-ui/core/colors";
import { DatePicker } from "@material-ui/pickers";

const AppButton = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'AppButton' */ "../../../../AppComponent/AppButton"
    ),
  loading: () => null
});

const GeneralDialog = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'GeneralDialog' */ "../../../../component/Dialog/GeneralDialog"
    ),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  editButton: { padding: 6, marginBottom: 6, marginLeft: 8 },
  dateText: { width: "50%" }
}));

const StatusSetup: React.FC<any> = ({ value }) => {
  const classes = useStyles();
  const { csrf, setCsrf, _xhrPost, getGoodsDetail, detail } = useContext(
    AppContext
  );
  const [editing, setEditing] = useState<boolean>(false);
  const [state, setState] = useState<any>({
    status: value.status,
    boarddisplay: value.boarddisplay,
    endofsale: value.endofsale,
    formcode_sector: value.formcode ? value.formcode.sector : "",
    formcode_province: value.formcode ? value.formcode.province : "",
    formcode_number: value.formcode ? value.formcode.number : ""
  });

  async function handleSave({ value, keys }: { value: any; keys: string }) {
    const res = await _xhrPost({
      csrf,
      url: "abusinesssystem",
      body: {
        action: "form_edit",
        formid: detail.formid,
        [keys]: value
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
    getGoodsDetail();
  }

  return (
    <div>
      <Typography style={{ marginBottom: 12 }} variant="h6">
        ตั้งค่า
        {!editing && (
          <IconButton
            className={classes.editButton}
            onClick={() => {
              setEditing(true);
              setState({
                status: value.status,
                boarddisplay: value.boarddisplay,
                endofsale: value.endofsale,
                formcode_sector: value.formcode ? value.formcode.sector : "",
                formcode_province: value.formcode
                  ? value.formcode.province
                  : "",
                formcode_number: value.formcode ? value.formcode.number : ""
              });
            }}
          >
            <Create fontSize="small" />
          </IconButton>
        )}
      </Typography>
      <div
        style={{ display: "flex", marginBottom: 12, alignItems: "baseline" }}
      >
        <Typography style={{ width: 100 }}>รหัสสินค้า</Typography>
        {editing ? (
          <div style={{ display: "flex" }}>
            <TextField
              style={{ marginRight: 16 }}
              fullWidth
              value={`${state.formcode_sector}`}
              type="number"
              onChange={e =>
                setState({ ...state, formcode_sector: e.target.value })
              }
            />
            <AppButton
              disabled={state.formcode_sector === value}
              variant="contained"
              buttonColor={green}
              onClick={() =>
                handleSave({
                  value: state.formcode_sector,
                  keys: "formcode_sector"
                })
              }
            >
              บันทึก
            </AppButton>
            <AppButton
              variant="text"
              buttonColor={green}
              onClick={() => {
                setEditing(false);
                setState({
                  status: value.status,
                  boarddisplay: value.boarddisplay,
                  endofsale: value.endofsale,
                  formcode_sector: value.formcode ? value.formcode.sector : "",
                  formcode_province: value.formcode
                    ? value.formcode.province
                    : "",
                  formcode_number: value.formcode ? value.formcode.number : ""
                });
              }}
            >
              ยกเลิก
            </AppButton>
          </div>
        ) : (
          <Typography>
            {value.formcode && value.formcode.sector
              ? value.formcode.sector
              : "-"}
          </Typography>
        )}
      </div>
      <div
        style={{ display: "flex", marginBottom: 12, alignItems: "baseline" }}
      >
        <Typography style={{ width: 100 }}>รหัสจังหวัด</Typography>
        {editing ? (
          <div style={{ display: "flex" }}>
            <TextField
              style={{ marginRight: 16 }}
              fullWidth
              value={`${state.formcode_province}`}
              type="number"
              onChange={e =>
                setState({ ...state, formcode_province: e.target.value })
              }
            />
            <AppButton
              disabled={state.formcode_province === value}
              variant="contained"
              buttonColor={green}
              onClick={() =>
                handleSave({
                  value: state.formcode_province,
                  keys: "formcode_province"
                })
              }
            >
              บันทึก
            </AppButton>
            <AppButton
              variant="text"
              buttonColor={green}
              onClick={() => {
                setEditing(false);
                setState({
                  status: value.status,
                  boarddisplay: value.boarddisplay,
                  endofsale: value.endofsale,
                  formcode_sector: value.formcode ? value.formcode.sector : "",
                  formcode_province: value.formcode
                    ? value.formcode.province
                    : "",
                  formcode_number: value.formcode ? value.formcode.number : ""
                });
              }}
            >
              ยกเลิก
            </AppButton>
          </div>
        ) : (
          <Typography>
            {value.formcode && value.formcode.province
              ? value.formcode.province
              : "-"}
          </Typography>
        )}
      </div>
      <div
        style={{ display: "flex", marginBottom: 12, alignItems: "baseline" }}
      >
        <Typography style={{ width: 100 }}>หมายเลข</Typography>
        {editing ? (
          <div style={{ display: "flex" }}>
            <TextField
              style={{ marginRight: 16 }}
              fullWidth
              value={`${state.formcode_number}`}
              type="number"
              onChange={e =>
                setState({ ...state, formcode_number: e.target.value })
              }
            />
            <AppButton
              disabled={state.formcode_number === value}
              variant="contained"
              buttonColor={green}
              onClick={() =>
                handleSave({
                  value: state.formcode_number,
                  keys: "formcode_number"
                })
              }
            >
              บันทึก
            </AppButton>
            <AppButton
              variant="text"
              buttonColor={green}
              onClick={() => {
                setEditing(false);
                setState({
                  status: value.status,
                  boarddisplay: value.boarddisplay,
                  endofsale: value.endofsale,
                  formcode_sector: value.formcode ? value.formcode.sector : "",
                  formcode_province: value.formcode
                    ? value.formcode.province
                    : "",
                  formcode_number: value.formcode ? value.formcode.number : ""
                });
              }}
            >
              ยกเลิก
            </AppButton>
          </div>
        ) : (
          <Typography>
            {value.formcode && value.formcode.number
              ? value.formcode.number
              : "-"}
          </Typography>
        )}
      </div>

      <div
        style={{ display: "flex", marginBottom: 12, alignItems: "baseline" }}
      >
        <Typography style={{ width: 100 }}>ร้านค้า</Typography>
        {editing ? (
          <div style={{ display: "flex" }}>
            <Chip
              label="ขายบนร้านค้า"
              style={{
                marginRight: 4,
                ...(state.boarddisplay === 1 && { color: "white" })
              }}
              {...(state.boarddisplay === 0 && { variant: "outlined" })}
              {...(state.boarddisplay === 1 && { color: "primary" })}
              onClick={() => {
                setState({ ...state, boarddisplay: 1 });
                handleSave({ value: 1, keys: "boarddisplay" });
              }}
            />
            <Chip
              label="ไม่ได้ขายบนร้านค้า"
              style={{ ...(state.boarddisplay === 0 && { color: "white" }) }}
              {...(state.boarddisplay === 1 && { variant: "outlined" })}
              {...(state.boarddisplay === 0 && { color: "primary" })}
              onClick={() => {
                setState({ ...state, boarddisplay: 0 });
                handleSave({ value: 0, keys: "boarddisplay" });
              }}
            />
          </div>
        ) : (
          <Chip
            label={
              value.boarddisplay === 1 ? "แสดงบนร้านค้า" : "ไม่แสดงบนร้านค้า"
            }
            {...(value.boarddisplay === 0 && { variant: "outlined" })}
            {...(value.boarddisplay === 1 && {
              color: "primary",
              style: { color: "white" }
            })}
          />
        )}
      </div>
      <div
        style={{ display: "flex", marginBottom: 12, alignItems: "baseline" }}
      >
        <Typography style={{ width: 100 }}>การขาย</Typography>
        {editing ? (
          <div style={{ display: "flex" }}>
            <Chip
              label="ขายต่อ"
              style={{
                marginRight: 4,
                ...(state.endofsale === 0 && { color: "white" })
              }}
              {...(state.endofsale === 1 && { variant: "outlined" })}
              {...(state.endofsale === 0 && { color: "primary" })}
              onClick={() => {
                setState({ ...state, endofsale: 0 });
                handleSave({ value: 0, keys: "endofsale" });
              }}
            />
            <Chip
              label="จบการขาย"
              style={{ ...(state.endofsale === 1 && { color: "white" }) }}
              {...(state.endofsale === 0 && { variant: "outlined" })}
              {...(state.endofsale === 1 && { color: "primary" })}
              onClick={() => {
                setState({ ...state, endofsale: 1 });
                handleSave({ value: 1, keys: "endofsale" });
              }}
            />
          </div>
        ) : (
          <Chip
            label={value.endofsale === 1 ? "จบการขายแล้ว" : "กำลังขาย"}
            {...(value.endofsale === 1 && { variant: "outlined" })}
            {...(value.endofsale === 0 && {
              color: "primary",
              style: { color: "white" }
            })}
          />
        )}
      </div>
      {/* <div
        style={{ display: "flex", marginBottom: 12, alignItems: "baseline" }}
      >
        <Typography style={{ width: 100 }}>สถานะ</Typography>
        {editing ? (
          <div style={{ display: "flex" }}>
            <Chip
              label="แสดง"
              style={{
                marginRight: 4,
                ...(state.status === 1 && { color: "white" })
              }}
              {...(state.status === 0 && { variant: "outlined" })}
              {...(state.status === 1 && { color: "primary" })}
              onClick={() => {
                setState({ ...state, status: 1 });
                handleSave({ value: 1, keys: "status" });
              }}
            />
            <Chip
              label="ไม่แสดง"
              style={{ ...(state.status === 0 && { color: "white" }) }}
              {...(state.status === 1 && { variant: "outlined" })}
              {...(state.status === 0 && { color: "primary" })}
              onClick={() => {
                setState({ ...state, status: 0 });
                handleSave({ value: 0, keys: "status" });
              }}
            />
          </div>
        ) : (
          <Chip
            label={value.status === 1 ? "แสดง" : "ไม่แสดง"}
            {...(value.status === 0 && { variant: "outlined" })}
            {...(value.status === 1 && {
              color: "primary",
              style: { color: "white" }
            })}
          />
        )}
      </div> */}
      {editing && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <AppButton
            buttonColor={red}
            variant="contained"
            onClick={() => {
              setEditing(false);
              setState({
                status: value.status,
                boarddisplay: value.boarddisplay,
                endofsale: value.endofsale,
                formcode_sector: value.formcode ? value.formcode.sector : "",
                formcode_province: value.formcode
                  ? value.formcode.province
                  : "",
                formcode_number: value.formcode ? value.formcode.number : ""
              });
            }}
          >
            จบการแก้ไข
          </AppButton>
        </div>
      )}
    </div>
  );
};

const BusinessName: React.FC<any> = ({ value }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    getGoodsDetail,
    detail,
    _onEnter
  } = useContext(AppContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [thisValue, setThisValue] = useState<string>(value);

  async function handleSave() {
    const res = await _xhrPost({
      csrf,
      url: "abusinesssystem",
      body: {
        action: "form_edit",
        formid: detail.formid,
        business_name: thisValue
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
    setEditing(false);
    getGoodsDetail();
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <Typography variant="h6">
        ชิ่อบริษัท
        <IconButton
          className={classes.editButton}
          onClick={() => setEditing(prev => !prev)}
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
            onChange={e => setThisValue(e.target.value)}
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
        <Typography>{value}</Typography>
      )}
    </div>
  );
};

const BusinessAccess: React.FC<any> = ({ remain, total }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    getGoodsDetail,
    detail,
    _onEnter
  } = useContext(AppContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [thisValue, setThisValue] = useState<string>("0");

  async function handleSave() {
    const res = await _xhrPost({
      csrf,
      url: "abusinesssystem",
      body: {
        action: "form_edit",
        formid: detail.formid,
        accessremain: parseInt(thisValue)
      }
    });
    console.log(res.data);
    setEditing(false);
    setCsrf(res.csrf);
    getGoodsDetail();
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <Typography variant="h6" style={{ marginRight: 16 }}>
          สิทธิการเข้าชม
        </Typography>
        <Typography variant="h6" style={{ marginRight: 16 }}>
          {`${remain}/${total}`}
          <IconButton
            className={classes.editButton}
            onClick={() => setEditing(prev => !prev)}
          >
            <Create fontSize="small" />
          </IconButton>
        </Typography>
      </div>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <Typography variant="h6" style={{ marginRight: 16 }}>
          {editing ? "เพิ่มจำนวน" : "เหลือ"}
        </Typography>
        {editing ? (
          <div style={{ display: "flex" }}>
            <TextField
              style={{ marginRight: 16 }}
              fullWidth
              autoFocus={editing}
              value={thisValue}
              type="number"
              onChange={e => setThisValue(e.target.value)}
              onKeyPress={_onEnter(handleSave)}
            />
            <AppButton
              disabled={thisValue === remain}
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
                setThisValue(remain);
              }}
            >
              ยกเลิก
            </AppButton>
          </div>
        ) : (
          <React.Fragment>
            <Typography style={{ marginRight: 24 }}>{remain}</Typography>
            <Typography variant="h6" style={{ marginRight: 16 }}>
              ทั้งหมด
            </Typography>
            <Typography>{total}</Typography>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

const BusinessAccessPrice: React.FC<any> = ({ value }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    getGoodsDetail,
    detail,
    _onEnter
  } = useContext(AppContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [thisValue, setThisValue] = useState<string>(value);

  async function handleSave() {
    const res = await _xhrPost({
      csrf,
      url: "abusinesssystem",
      body: {
        action: "form_edit",
        formid: detail.formid,
        price: thisValue
      }
    });
    console.log(res.data);
    setEditing(false);
    setCsrf(res.csrf);
    getGoodsDetail();
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <Typography variant="h6" style={{ marginRight: 48 }}>
          ราคาเข้าชม
        </Typography>
        {editing ? (
          <div style={{ display: "flex" }}>
            <TextField
              style={{ marginRight: 16 }}
              fullWidth
              autoFocus={editing}
              value={thisValue}
              type="number"
              onChange={e => setThisValue(e.target.value)}
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
          <Typography>
            {value === "" ? "-" : value} บาท
            <IconButton
              className={classes.editButton}
              onClick={() => setEditing(prev => !prev)}
            >
              <Create fontSize="small" />
            </IconButton>
          </Typography>
        )}
      </div>
    </div>
  );
};

const BusinessLocation: React.FC<any> = ({ value }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    getGoodsDetail,
    detail,
    _onEnter
  } = useContext(AppContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [thisValue, setThisValue] = useState<string>(value);

  async function handleSave() {
    const res = await _xhrPost({
      csrf,
      url: "abusinesssystem",
      body: {
        action: "form_edit",
        formid: detail.formid,
        location: thisValue
      }
    });
    console.log(res.data);
    setEditing(false);
    setCsrf(res.csrf);
    getGoodsDetail();
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <Typography variant="h6">
        สถานที่
        {/* <IconButton
          className={classes.editButton}
          onClick={() => setEditing(prev => !prev)}
        >
          <Create fontSize="small" />
        </IconButton> */}
      </Typography>
      {editing ? (
        <div style={{ display: "flex" }}>
          <TextField
            style={{ marginRight: 16 }}
            fullWidth
            autoFocus={editing}
            value={thisValue}
            onChange={e => setThisValue(e.target.value)}
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
        <Typography>{value}</Typography>
      )}
    </div>
  );
};

const BusinessDate: React.FC<any> = ({ appointment, auctiondate }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    getGoodsDetail,
    detail,
    _dateToString,
    _dateToAPI
  } = useContext(AppContext);
  const [editing, setEditing] = useState<{ [keys: string]: boolean }>({
    appointment: false,
    auctiondate: false
  });

  async function handleSave({ date, keys }: { date: any; keys: string }) {
    const res = await _xhrPost({
      csrf,
      url: "abusinesssystem",
      body: {
        action: "form_edit",
        formid: detail.formid,
        [keys]: _dateToAPI(date)
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
    getGoodsDetail();
    setEditing({ ...editing, [keys]: false });
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex" }}>
        <Typography className={classes.dateText} variant="h6">
          วันนัดดูสินค้า
          <IconButton
            className={classes.editButton}
            onClick={() =>
              setEditing((prev: any) => {
                return { ...prev, appointment: !prev.appointment };
              })
            }
          >
            <Create fontSize="small" />
          </IconButton>
        </Typography>
        <div style={{ width: 16 }} />
        <Typography className={classes.dateText} variant="h6">
          วันประมูล
          <IconButton
            className={classes.editButton}
            onClick={() =>
              setEditing((prev: any) => {
                return { ...prev, auctiondate: !prev.auctiondate };
              })
            }
          >
            <Create fontSize="small" />
          </IconButton>
        </Typography>
      </div>
      <div style={{ display: "flex" }}>
        {editing.appointment ? (
          <DatePicker
            className={classes.dateText}
            clearable
            size="small"
            fullWidth
            inputVariant="outlined"
            clearLabel="รีเซ็ต"
            okLabel="ตกลง"
            cancelLabel="ยกเลิก"
            value={appointment}
            minDateMessage=""
            onChange={(d: any) => handleSave({ date: d, keys: "appointment" })}
            labelFunc={() => {
              return appointment
                ? _dateToString(new Date(appointment))
                : "เลือกวันที่";
            }}
          />
        ) : (
          <Typography className={classes.dateText}>
            {_dateToString(new Date(appointment))}
          </Typography>
        )}
        <div style={{ width: 16 }} />
        {editing.auctiondate ? (
          <DatePicker
            className={classes.dateText}
            clearable
            size="small"
            fullWidth
            inputVariant="outlined"
            clearLabel="รีเซ็ต"
            okLabel="ตกลง"
            cancelLabel="ยกเลิก"
            value={auctiondate}
            minDateMessage=""
            onChange={(d: any) => handleSave({ date: d, keys: "auctiondate" })}
            labelFunc={() => {
              return auctiondate
                ? _dateToString(new Date(auctiondate))
                : "เลือกวันที่";
            }}
          />
        ) : (
          <Typography className={classes.dateText}>
            {_dateToString(new Date(auctiondate))}
          </Typography>
        )}
      </div>
    </div>
  );
};

const BusinessPosition: React.FC<any> = ({ value }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    getGoodsDetail,
    detail,
    businessForm
  } = useContext(AppContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [thisValue, setThisValue] = useState<string>(value);

  async function handleSave() {
    const res = await _xhrPost({
      csrf,
      url: "abusinesssystem",
      body: {
        action: "form_edit",
        formid: detail.formid,
        position: thisValue
      }
    });
    console.log(res.data);
    setEditing(false);
    setCsrf(res.csrf);
    getGoodsDetail();
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <Typography variant="h6">
        ตำแหน่ง
        <IconButton
          className={classes.editButton}
          onClick={() => setEditing(prev => !prev)}
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
        title="แก้ไขตำแหน่ง"
      >
        <FormControl
          component="fieldset"
          style={{ marginBottom: 16 }}
          fullWidth
        >
          <FormLabel component="legend">ตำแหน่ง</FormLabel>
          <RadioGroup
            value={thisValue}
            onChange={e => setThisValue(e.target.value)}
          >
            {businessForm.position.map((d: any, i: number) => (
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

const BusinessTransport: React.FC<any> = ({ value }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    getGoodsDetail,
    detail,
    businessForm,
    _onEnter
  } = useContext(AppContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [thisValue, setThisValue] = useState<any>(value.transport);
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
    const res = await _xhrPost({
      csrf,
      url: "abusinesssystem",
      body: {
        action: "form_edit",
        formid: detail.formid,
        transport: thisValue,
        ...(thisValue.some((item: any) => item === "etc") && {
          transetc: thisEtc
        })
      }
    });
    console.log(res.data);
    setEditing(false);
    setCsrf(res.csrf);
    getGoodsDetail();
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <Typography variant="h6">
        รถที่ใช้ขนส่ง
        <IconButton
          className={classes.editButton}
          onClick={() => setEditing(prev => !prev)}
        >
          <Create fontSize="small" />
        </IconButton>
      </Typography>
      {value.transport
        .filter((item: any) => item !== "etc")
        .map((d: any) => (
          <Typography key={d}>{d}</Typography>
        ))}
      {value.etc !== "none" && <Typography>{value.etc}</Typography>}
      {value.transport.filter((item: any) => item !== "etc").length === 0 &&
        value.etc === "none" && <Typography>ไม่มีรถที่ใช้ขนส่ง</Typography>}
      <GeneralDialog
        open={editing}
        onClose={onCloseDialog}
        title="แก้ไขรถที่ใช้ขนส่ง"
      >
        <FormControl
          component="fieldset"
          style={{ marginBottom: 16 }}
          fullWidth
        >
          <FormLabel component="legend">รถที่ต้องการใช้ขนส่ง</FormLabel>
          {businessForm.transport.map((d: any, i: number) => (
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
                verticalAlign: "middle"
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
                name="transetc"
                label="อื่นๆ"
                size="small"
                value={thisEtc}
                onChange={e => setThisEtc(e.target.value)}
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

const BusinessDocument: React.FC<any> = ({ value }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    getGoodsDetail,
    detail,
    businessForm,
    _onEnter
  } = useContext(AppContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [thisValue, setThisValue] = useState<any>(value.document);
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
    setThisValue(value.document);
    setThisEtc(value.etc === "none" ? "" : value.etc);
  }

  async function handleSave() {
    const res = await _xhrPost({
      csrf,
      url: "abusinesssystem",
      body: {
        action: "form_edit",
        formid: detail.formid,
        document: thisValue,
        ...(thisValue.some((item: any) => item === "etc") && {
          docsetc: thisEtc
        })
      }
    });
    console.log(res.data);
    setEditing(false);
    setCsrf(res.csrf);
    getGoodsDetail();
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <Typography variant="h6">
        เอกสาร
        <IconButton
          className={classes.editButton}
          onClick={() => setEditing(prev => !prev)}
        >
          <Create fontSize="small" />
        </IconButton>
      </Typography>
      {value.document
        .filter((item: any) => item !== "etc")
        .map((d: any) => (
          <Typography key={d}>{d}</Typography>
        ))}
      {value.etc !== "none" && <Typography>{value.etc}</Typography>}
      {value.document.filter((item: any) => item !== "etc").length === 0 &&
        value.etc === "none" && <Typography>ไม่มีเอกสาร</Typography>}
      <GeneralDialog
        open={editing}
        onClose={onCloseDialog}
        title="แก้ไขรถที่ใช้ขนส่ง"
      >
        <FormControl
          component="fieldset"
          style={{ marginBottom: 16 }}
          fullWidth
        >
          <FormLabel component="legend">รถที่ต้องการใช้ขนส่ง</FormLabel>
          {businessForm.document.map((d: any, i: number) => (
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
                verticalAlign: "middle"
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
                name="docsetc"
                label="อื่นๆ"
                size="small"
                value={thisEtc}
                onChange={e => setThisEtc(e.target.value)}
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

const BusinessSaleCondition: React.FC<any> = ({ value }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    getGoodsDetail,
    detail,
    _onEnter
  } = useContext(AppContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [thisValue, setThisValue] = useState<string>(value);

  async function handleSave() {
    const res = await _xhrPost({
      csrf,
      url: "abusinesssystem",
      body: {
        action: "form_edit",
        formid: detail.formid,
        sale_condition: thisValue
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
    setEditing(false);
    getGoodsDetail();
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <Typography variant="h6">
        เงื่อนไขการขาย
        <IconButton
          className={classes.editButton}
          onClick={() => setEditing(prev => !prev)}
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
            variant="outlined"
            multiline
            rowsMax="10"
            onChange={e => setThisValue(e.target.value)}
          />
          <AppButton
            disabled={thisValue === value}
            variant="contained"
            buttonColor={green}
            onClick={handleSave}
            style={{ marginBottom: "auto" }}
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
            style={{ marginBottom: "auto" }}
          >
            ยกเลิก
          </AppButton>
        </div>
      ) : (
        <Typography style={{ whiteSpace: "pre" }}>{value}</Typography>
      )}
    </div>
  );
};

const GoodsDetail: React.FC<any> = ({ detail }) => {
  const classes = useStyles();
  const { csrf, setCsrf, _xhrPost, _onLocalhostFn } = useContext(AppContext);
  const [data, setData] = useState<any>(null);
  const [businessForm, setBusinessForm] = useState<any>(null);
  const passingProps: any = {
    ...useContext(AppContext),
    getGoodsDetail,
    detail,
    businessForm
  };

  async function getGoodsDetail() {
    const res = await _xhrPost({
      csrf,
      url: "aloadbusiness",
      body: {
        action: "form_detail",
        formid: detail.formid
      }
    });
    setData(res.data);
    const formRes = await _xhrPost({
      csrf: res.csrf,
      url: "aloadbusiness",
      body: {
        action: "business_form"
      }
    });
    setCsrf(formRes.csrf);
    setBusinessForm(formRes.data);
  }

  useEffect(() => {
    _onLocalhostFn(
      () => {
        setData({
          accessremain: 10,
          accesstotal: 10,
          business_name: "Test",
          sale_condition: "1. ขายด่วน\n2. อื่นๆ",
          price: "",
          position: "ผู้จัดการ",
          product: [{ product: "ทองแดง", value: "มากกว่า 5000 kg" }],
          appointment: "2020-03-25T17:00:00.000Z",
          auctiondate: "2020-03-25T17:00:00.000Z",
          location: "นนทบุรี",
          document: {
            document: ["ใบรง.ลำดับที่ 106 (กำจัดขยะประเภทอันตราย)"],
            etc: "none"
          },
          transport: {
            transport: ["รถบรรทุกติดเฮี๊ยบ(มือขยุ้ม)"],
            etc: "none"
          },
          picture: 0,
          endofsale: 0,
          createdate: null,
          status: 1,
          boarddisplay: 0,
          formcode: { sector: "10", province: "11", number: "12" }
        });
        setBusinessForm({
          form_condition: ["<แก้ไข เงื่อนไขและข้อตกลง>"],
          position: [
            "ผู้จัดการ",
            "จัดซื้อ-จัดจ้าง",
            "บุคคล",
            "หัวหน้าแผนก",
            "เจ้าหน้าที่ SAFETY"
          ],
          product: [
            "ทองแดง",
            "ทองเหลือง",
            "อลูมิเนียม",
            "สแตนเลส",
            "เหล็ก",
            "พลาสติก",
            "กระดาษ",
            "พาเลทไม้"
          ],
          productvalue: [
            "มากกว่า 5000 kg",
            "น้ำหนัก 2001-5000 kg",
            "น้ำหนัก 501-2000 kg",
            "น้ำหนัก 201-500 kg",
            "น้ำหนัก 51-200 kg",
            "น้ำหนัก 1-50 kg"
          ],
          org_size: [
            "พนักงาน 1-5 คน",
            "พนักงาน 6-20 คน",
            "พนักงาน 21-40 คน",
            "พนักงาน 41-100 คน",
            "มากกว่า 100 คน"
          ],
          document: [
            "บิลเงินสด",
            "ใบอนุญาตค้าของเก่า",
            "ภพ.20",
            "หนังสือรับรองบริษัท",
            "ใบรง.4 ลำดับที่ 105 (คัดแยกขยะที่ไม่เป็นอันตราย)",
            "ใบรง.ลำดับที่ 106 (กำจัดขยะประเภทอันตราย)"
          ],
          transport: [
            "รถกะบะ Pickup",
            "รถบรรทุก 6 ล้อ",
            "รถบรรทุกติดเฮี๊ยบ(มือขยุ้ม)",
            "รถสไลด์(วางกะบะเหล็ก)",
            "แม็คโครปากคีบ/แม็คโครแม่เหล็ก"
          ]
        });
      },
      () => {
        if (detail) {
          getGoodsDetail();
        }
      }
    );
  }, [detail]);

  return data && businessForm ? (
    <AppContext.Provider value={...passingProps}>
      <div>
        <StatusSetup value={data} />
        <Divider style={{ margin: "16px 0" }} />
        <BusinessName value={data.business_name} />
        <BusinessAccess remain={data.accessremain} total={data.accesstotal} />
        <BusinessAccessPrice value={data.price} />
        <BusinessLocation value={data.location} />
        <BusinessDate
          appointment={data.appointment}
          auctiondate={data.auctiondate}
        />
        <BusinessPosition value={data.position} />
        <BusinessTransport value={data.transport} />
        <BusinessDocument value={data.document} />
        <BusinessSaleCondition value={data.sale_condition} />
      </div>
    </AppContext.Provider>
  ) : (
    <div />
  );
};
export default GoodsDetail;
