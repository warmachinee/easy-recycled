import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../../AppContext";
import {
  Typography,
  TextField,
  Divider,
  FormControl,
  FormLabel,
  Checkbox,
  FormControlLabel,
  List,
  ButtonBase,
  Paper,
  Theme,
  Chip
} from "@material-ui/core";
import AppButton from "../../../AppComponent/AppButton";
import { green } from "@material-ui/core/colors";
import { Add } from "@material-ui/icons";
import GeneralDialog from "../../../component/Dialog/GeneralDialog";

const useStyles = makeStyles((theme: Theme) => ({
  textField: { marginBottom: 12 },
  paper: { padding: 8 },
  itemGrid: { margin: theme.spacing(1, 0), minWidth: 800, width: "100%" },
  itemPaper: {
    position: "relative",
    padding: 16,
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  avatar: { width: 48, height: 48, marginRight: 16 }
}));

export interface AdminListProps {}

const permissionChoice = [
  <Typography>สามารถแก้ไขข้อมูลบริษัท</Typography>,
  <Typography>สามารถแก้ไขข้อมูลลูกค้า</Typography>,
  <Typography>ระบบสินค้า</Typography>,
  <Typography>ระบบแก้ไขรายละเอียดฟอร์ม</Typography>,
  <Typography>ระบบจัดการการเติมเงิน</Typography>
];

const adminPermission = [
  <Typography variant="h6">สามารถแก้ไขข้อมูลบริษัท</Typography>,
  <Typography variant="h6">สามารถแก้ไขข้อมูลลูกค้า</Typography>,
  <div style={{ display: "flex", flexDirection: "column" }}>
    <Typography variant="h6">ระบบสินค้า</Typography>
    <div style={{ display: "flex" }}>
      <Typography style={{ marginLeft: 24, marginRight: 16 }}>-</Typography>
      <Typography>ปรับแต่งราคางาน ( ฟรี , 50, 100, 200 ฯลฯ )</Typography>
    </div>
    <div style={{ display: "flex" }}>
      <Typography style={{ marginLeft: 24, marginRight: 16 }}>-</Typography>
      <Typography>สร้าง/แก้ไข รหัสสินค้า, ราคางาน และ จำนวนที่แสดง</Typography>
    </div>
    <div style={{ display: "flex" }}>
      <Typography style={{ marginLeft: 24, marginRight: 16 }}>-</Typography>
      <Typography>ลบสินค้า</Typography>
    </div>
  </div>,
  <div style={{ display: "flex", flexDirection: "column" }}>
    <Typography variant="h6">ระบบแก้ไขรายละเอียดฟอร์ม</Typography>
    <div style={{ display: "flex" }}>
      <Typography style={{ marginLeft: 24, marginRight: 16 }}>-</Typography>
      <Typography>บริษัท ( ชนิดสินค้า , ยอมรับเงื่อนไข ฯลฯ )</Typography>
    </div>
    <div style={{ display: "flex" }}>
      <Typography style={{ marginLeft: 24, marginRight: 16 }}>-</Typography>
      <Typography>
        ลูกค้า ( ขนาดองค์กร, รถที่ใช้การขนส่ง/ทำงาน , ยอมรับเงื่อนไข ฯลฯ )
      </Typography>
    </div>
  </div>,
  <div style={{ display: "flex", flexDirection: "column" }}>
    <Typography variant="h6">ระบบจัดการการเติมเงิน</Typography>
    <div style={{ display: "flex" }}>
      <Typography style={{ marginLeft: 24, marginRight: 16 }}>-</Typography>
      <Typography>แสดงรายการการเติมเงินของลูกค้าทั้งระบบ</Typography>
    </div>
    <div style={{ display: "flex" }}>
      <Typography style={{ marginLeft: 24, marginRight: 16 }}>-</Typography>
      <Typography>
        ปรับสถานะการเติมเงินได้ ( อนุมัติหรือไม่อนุมัติ )
        หลักการคือเมื่อลูกค้าได้ทำการอัพโหลดหลักฐานการเติมเงินแล้ว
        เราจะต้องตรวจสอบแล้วทำการอัพเดทสถานะการเติมเงินของลูกค้า
      </Typography>
    </div>
  </div>
];

const AdminAbility: React.FC<any> = () => {
  return (
    <div>
      {adminPermission.map((d: any, i: any) => (
        <div style={{ display: "flex" }} key={i}>
          <Typography variant="h6" style={{ marginRight: 24 }}>
            {i + 1}.
          </Typography>
          {d}
        </div>
      ))}
    </div>
  );
};

const AddAdminForm: React.FC<any> = ({
  setOpen,
  getAdminList,
  onClickEdit,
  onCancleEdit,
  edit,
  onEditData,
  setEditing
}) => {
  const classes = useStyles();
  const { csrf, setCsrf, _xhrPost, _thousandSeperater, sess } = useContext(
    AppContext
  );
  const [form, setForm] = useState<any>({
    username: "",
    password: "",
    fullname: "",
    lastname: "",
    permission: [],
    status: 1
  });

  function checkDisabled() {
    return edit
      ? false
      : form.username === "" ||
          form.password === "" ||
          form.fullname === "" ||
          form.lastname === "";
  }

  function handleClose() {
    setForm({
      username: "",
      password: "",
      fullname: "",
      lastname: "",
      permission: []
    });
    if (edit) {
      setEditing(false);
    } else {
      setOpen(false);
    }
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const thisArr = [...form.permission];
    const value = parseInt(event.target.value);
    const checked = event.target.checked;
    if (event.target.checked) {
      thisArr.push(value);
      setForm({ ...form, permission: thisArr.sort() });
    } else {
      setForm({
        ...form,
        permission: thisArr.filter((d: any) => d !== value).sort()
      });
    }
  };

  async function onSave() {
    const { username, password, fullname, lastname, permission } = form;
    const res = await _xhrPost({
      csrf,
      url: "aregister",
      body: {
        username,
        password,
        fullname,
        lastname,
        permission
      }
    });

    setCsrf(res.csrf);
    handleClose();
    getAdminList();
  }

  async function onEdit() {
    const { username, password, fullname, lastname, permission } = form;
    const res = await _xhrPost({
      csrf,
      url: "ausersystem",
      body: {
        action: "editprofile",
        adminid: sess.userid,
        username,
        passcode: password,
        fullname,
        lastname,
        permission: onEditData.permission.permission.filter(
          (per: any) => !permission.includes(per)
        )
      }
    });

    setCsrf(res.csrf);
    setEditing(false);
    getAdminList();
  }

  async function onSaveStatus(status: any) {
    const res = await _xhrPost({
      csrf,
      url: "ausersystem",
      body: {
        action: "editprofile",
        adminid: onEditData.userid,
        status
      }
    });

    setCsrf(res.csrf);
    setEditing(false);
    getAdminList();
  }

  useEffect(() => {
    if (edit) {
      const { username, fullname, lastname, permission, status } = onEditData;
      setForm({
        username,
        password: "",
        fullname,
        lastname,
        permission: permission.permission,
        status
      });
    }
  }, []);

  return (
    <div>
      {edit && (
        <React.Fragment>
          <Typography style={{ width: 100 }}>สถานะบัญชี</Typography>
          <div style={{ display: "flex", marginBottom: 16 }}>
            <Chip
              label="เปิดการใช้งาน"
              style={{
                marginRight: 4,
                ...(form.status === 1 && { color: "white" })
              }}
              {...(form.status === 0 && { variant: "outlined" })}
              {...(form.status === 1 && { color: "primary" })}
              onClick={() => onSaveStatus(1)}
            />
            <Chip
              label="ปิดการใช้งาน"
              style={{ ...(form.status === 0 && { color: "white" }) }}
              {...(form.status === 1 && { variant: "outlined" })}
              {...(form.status === 0 && { color: "primary" })}
              onClick={() => onSaveStatus(0)}
            />
          </div>
        </React.Fragment>
      )}
      <TextField
        className={classes.textField}
        fullWidth
        label="ชื่อผู้ใช้งาน (Username)"
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
      />
      <TextField
        className={classes.textField}
        fullWidth
        label="รหัสผ่าน (Password)"
        type="password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <TextField
        className={classes.textField}
        fullWidth
        label="ชื่อ"
        value={form.fullname}
        onChange={e => setForm({ ...form, fullname: e.target.value })}
      />
      <TextField
        className={classes.textField}
        fullWidth
        label="นามสกุล"
        value={form.lastname}
        onChange={e => setForm({ ...form, lastname: e.target.value })}
      />
      <Divider style={{ margin: "16px 0" }} />
      <FormControl component="fieldset" style={{ marginBottom: 16 }} fullWidth>
        <FormLabel component="legend">ความสามารถ</FormLabel>
        {Array.from(new Array(5)).map((d: any, i: number) => (
          <FormControlLabel
            key={i}
            value={i + 1}
            control={
              <Checkbox
                checked={form.permission.some((item: any) => item === i + 1)}
                color="primary"
                onChange={onChange}
              />
            }
            label={permissionChoice[i]}
          />
        ))}
      </FormControl>
      <Divider style={{ margin: "12px 0" }} />
      <div style={{ display: "flex" }}>
        <AppButton
          buttonColor={green}
          variant="outlined"
          style={{ flex: 1, margin: 8 }}
          onClick={handleClose}
        >
          ยกเลิก
        </AppButton>
        <AppButton
          buttonColor={green}
          variant="contained"
          style={{ flex: 1, margin: 8 }}
          onClick={edit ? onEdit : onSave}
          disabled={checkDisabled()}
        >
          บันทึก
        </AppButton>
      </div>
    </div>
  );
};

const AdminItem: React.FC<any> = ({ data, onClickEdit, onCancleEdit }) => {
  const classes = useStyles();
  const { csrf, setCsrf, _xhrPost, _dateToString } = useContext(AppContext);

  return (
    <ButtonBase
      className={classes.itemGrid}
      onClick={() =>
        data.type === "main_admin" ? console.log() : onClickEdit(data)
      }
    >
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
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <Typography
              style={{ fontWeight: 600, marginRight: 24 }}
              align="left"
              variant="h6"
            >
              {data.status === 1 ? "" : "(ไม่ได้ใช้งานแล้ว)"}
              {data.username}
            </Typography>
            <Typography align="left" variant="h6">
              {`${data.fullname} ${data.lastname}`}
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Typography
              align="left"
              variant="body2"
              color="textSecondary"
              style={{ marginRight: 16 }}
            >
              สร้างเมื่อวันที่
            </Typography>
            <Typography
              align="left"
              variant="body2"
              style={{ fontWeight: 700, marginRight: 48 }}
            >
              {_dateToString(data.createdate)}
            </Typography>
            <Typography
              align="left"
              variant="body2"
              color="textSecondary"
              style={{ marginRight: 16 }}
            >
              ความสามารถ
            </Typography>
            {data.permission.permission.map((d: any) => (
              <Typography
                key={d}
                align="left"
                variant="body2"
                style={{ fontWeight: 700, marginRight: 8 }}
              >
                {d}
              </Typography>
            ))}
            <Typography
              align="left"
              variant="body2"
              style={{
                fontWeight: data.type === "main_admin" ? 700 : 500,
                marginRight: 16,
                flex: 1
              }}
            >
              {data.type === "main_admin" ? "แอดมินหลัก" : "แอดมินรอง"}
            </Typography>
          </div>
        </div>
      </Paper>
    </ButtonBase>
  );
};

const AdminList: React.FC<AdminListProps> = () => {
  const classes = useStyles();
  const { csrf, setCsrf, _xhrPost, _thousandSeperater, sess } = useContext(
    AppContext
  );
  const [adminList, setAdminList] = useState<any>(null);
  const [open, setOpen] = useState<any>(false);
  const [qa, setQa] = useState<any>(false);
  const [onEditData, setOnEditData] = useState<any>(null);
  const [editing, setEditing] = useState<any>(false);

  function onClickEdit(item: any) {
    setEditing(true);
    setOnEditData(item);
  }

  function onCancleEdit() {
    setEditing(false);
    setOnEditData(null);
  }

  async function getAdminList() {
    const res = await _xhrPost({
      csrf,
      url: "aloadusersystem",
      body: {
        action: "adminlist"
      }
    });

    setCsrf(res.csrf);
    setAdminList(res.data);
  }

  useEffect(() => {
    getAdminList();
  }, []);

  return (
    <div style={{ padding: 8, overflowX: "auto" }}>
      {sess &&
        (sess.type === "main_admin" ? (
          <React.Fragment>
            <Typography variant="h6" style={{ marginBottom: 16 }}>
              รายชื่อแอดมิน
            </Typography>
            <div style={{ display: "flex" }}>
              <AppButton
                onClick={() => setOpen(true)}
                startIcon={<Add />}
                buttonColor={green}
                variant="contained"
              >
                เพิ่มแอดมิน
              </AppButton>
              <AppButton
                onClick={() => setQa(true)}
                buttonColor={green}
                variant="text"
                style={{ marginLeft: 16 }}
              >
                ความสามารถของแอดมิน
              </AppButton>
            </div>
            {adminList &&
              (adminList.length > 0 ? (
                <div style={{ marginTop: 24 }}>
                  {adminList.map((d: any) => (
                    <AdminItem
                      key={d.userid}
                      data={d}
                      {...{
                        getAdminList,
                        setOpen,
                        onClickEdit,
                        onCancleEdit
                      }}
                    />
                  ))}
                </div>
              ) : (
                <Typography
                  style={{ margin: "24px 0" }}
                  align="center"
                  variant="h4"
                  color="textSecondary"
                >
                  ไม่มีแอดมิน
                </Typography>
              ))}
          </React.Fragment>
        ) : (
          <AdminAbility />
        ))}

      <GeneralDialog
        open={editing}
        onClose={() => setEditing(false)}
        title="แก้ไข"
      >
        {onEditData && (
          <AddAdminForm
            edit
            {...{
              setOpen,
              getAdminList,
              onClickEdit,
              onCancleEdit,
              onEditData,
              setEditing
            }}
          />
        )}
      </GeneralDialog>
      <GeneralDialog
        open={open}
        onClose={() => setOpen(false)}
        title="เพิ่มแอดมิน"
      >
        <AddAdminForm
          {...{ setOpen, getAdminList, onClickEdit, onCancleEdit }}
        />
      </GeneralDialog>
      <GeneralDialog
        open={qa}
        onClose={() => setQa(false)}
        title="ความสามารถของแอดมิน"
        maxWidth="sm"
      >
        <AdminAbility />
      </GeneralDialog>
    </div>
  );
};
export default AdminList;
