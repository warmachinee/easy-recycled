import React, { useState, useEffect, useContext } from "react";
import Loadable from "react-loadable";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import {
  IconButton,
  Typography,
  MobileStepper,
  Button,
  useTheme,
  Dialog,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  MenuItem,
  Select,
  Divider,
  Checkbox,
  Link as MaterialLink,
  Theme,
  GridList,
  GridListTile
} from "@material-ui/core";
import {
  Close as CloseIcon,
  KeyboardArrowRight,
  KeyboardArrowLeft,
  Cancel
} from "@material-ui/icons";
import { AppContext } from "../../AppContext";
import AppButton from "../../AppComponent/AppButton";
import { green, red } from "@material-ui/core/colors";
import { DatePicker } from "@material-ui/pickers";

const UploadAlbum = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'UploadAlbum' */ "../../component/Utils/UploadAlbum"
    ),
  loading: () => null
});

const ConfirmDialog = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: 'ConfirmDialog' */ "../../component/Dialog/ConfirmDialog"
    ),
  loading: () => null
});

const useStyles = makeStyles((theme: Theme) => ({
  stepperRoot: {
    flexGrow: 1
  },
  buttonGroup: {
    display: "flex",
    padding: 8,
    position: "absolute",
    bottom: 0,
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.default
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  }
}));

const FormTitle: React.FC<any> = () => {
  return (
    <Typography variant="h6" style={{ fontWeight: 600 }} align="center">
      ข้อมูลขายวัสดุเหลือใช้
    </Typography>
  );
};

const formStep = 4;

const FormStepper: React.FC<any> = props => {
  const classes = useStyles();
  const theme = useTheme();
  const { businessForm, activeStep, setActiveStep } = props;

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
      return <ComponentStep0 {...other} />;
    case 1:
      return <ComponentStep1 {...other} />;
    case 2:
      return <ComponentStep2 {...other} />;
    case 3:
      return <ComponentStep3 {...other} />;
    default:
      return <div>default</div>;
  }
};

const SelectProduct: React.FC<any> = props => {
  const { label, value, onChange, menuArr } = props;
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel ref={inputLabel}>{label}</InputLabel>
      <Select labelWidth={labelWidth} value={value} onChange={onChange}>
        {menuArr.map((d: any, i: number) => (
          <MenuItem key={i} value={i}>
            {d}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const ComponentStep0: React.FC<any> = ({
  editting,
  goodsDetail,
  businessForm,
  form,
  setForm,
  onEndSale
}) => {
  const positionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      position: parseInt((event.target as HTMLInputElement).value)
    });
  };

  const orgSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      org_size: parseInt((event.target as HTMLInputElement).value)
    });
  };

  return (
    <div>
      {editting && goodsDetail && (
        <React.Fragment>
          <div style={{ display: "flex" }}>
            <Typography variant="h6" style={{ flex: 1 }}>
              จำนวนการเข้าชม
            </Typography>
            <Typography variant="h6">{`${goodsDetail.accessremain}/${goodsDetail.accesstotal}`}</Typography>
          </div>
          {goodsDetail.endofsale === 0 && (
            <AppButton
              variant="contained"
              buttonColor={red}
              style={{ flexGrow: 1.5, margin: "16px 0" }}
              onClick={() => onEndSale({ action: "delete" })}
            >
              จบการขาย
            </AppButton>
          )}
          <Divider style={{ margin: "16px 0" }} />
        </React.Fragment>
      )}
      <TextField
        fullWidth
        name="business_name"
        label="ชื่อบริษัท"
        value={form.business_name}
        style={{ marginBottom: 16 }}
        variant="outlined"
        size="small"
        onChange={e =>
          setForm({
            ...form,
            business_name: (e.target as HTMLInputElement).value
          })
        }
      />
      <Typography variant="h6">เงื่อนไขการขาย</Typography>
      <TextField
        fullWidth
        name="sale_condition"
        label="เงื่อนไข"
        value={form.sale_condition}
        style={{ marginBottom: 16 }}
        variant="outlined"
        multiline
        rowsMax="10"
        onChange={e =>
          setForm({
            ...form,
            sale_condition: (e.target as HTMLInputElement).value
          })
        }
      />
      {businessForm && (
        <React.Fragment>
          <FormControl
            component="fieldset"
            style={{ marginBottom: 16 }}
            fullWidth
          >
            <FormLabel component="legend">ตำแหน่ง</FormLabel>
            <RadioGroup
              name="position"
              value={form.position}
              onChange={positionChange}
            >
              {businessForm.position.map((d: any, i: number) => (
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
      )}
    </div>
  );
};

const ComponentStep1: React.FC<any> = ({
  editting,
  businessForm,
  form,
  setForm,
  album,
  setAlbum,
  albumDisplay,
  setAlbumDisplay
}) => {
  const classes = useStyles();
  const { _dateToString } = useContext(AppContext);
  const [productArr, setProductArr] = useState<any>([]);
  const [productVal, setProductVal] = useState<any>("0");
  const [productAmount, setProductAmount] = useState<any>("0");

  const productChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProductVal(event.target.value as string);
  };

  const amountChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProductAmount(event.target.value as string);
  };

  function addProduct() {
    const thisArr = [...productArr];
    thisArr.push({
      product: getProduct({ type: "product", value: productVal }),
      amount: getProduct({ type: "amount", value: productAmount })
    });
    setProductArr(thisArr);
    setForm({
      ...form,
      product: thisArr.map(d => d.product),
      productvalue: thisArr.map(d => d.amount)
    });
    setProductVal("0");
    setProductAmount("0");
  }

  function removeProduct(index: number) {
    const thisArr = [...productArr];
    setProductArr(thisArr.filter((d: any, i: number) => i !== index));
    setForm({
      ...form,
      product: thisArr
        .filter((d: any, i: number) => i !== index)
        .map(d => d.product),
      productvalue: thisArr
        .filter((d: any, i: number) => i !== index)
        .map(d => d.amount)
    });
  }

  function getProduct({ value, type }: { [keys: string]: any }) {
    const thisType: any =
      type === "product" ? businessForm.product : businessForm.productvalue;
    const thisValue = parseInt(value);
    return thisType[thisValue];
  }

  useEffect(() => {
    const thisArr: any = [];
    form.product.forEach((d: any, i: number) => {
      thisArr.push({ product: form.product[i], amount: form.productvalue[i] });
    });
    setProductArr(thisArr);
  }, []);

  return (
    <div>
      <Typography variant="h6">วัสดุเหลือใช้ที่ต้องการจัดจำหน่าย</Typography>
      <Typography>
        เลือกเฉพาะสินค้าที่ต้องการจำหน่าย กรณีพาเลทไม้เปลี่ยนจากหน่วย kg เป็น
        ตัว (pcs)
      </Typography>

      {productArr.map((d: any, i: number) => (
        <div style={{ display: "flex", alignItems: "center" }} key={i}>
          <Typography variant="body2" style={{ flex: 1 }}>
            {d.product}
          </Typography>
          <Typography variant="body2" style={{ flex: 1 }}>
            {d.amount}
          </Typography>
          <IconButton onClick={() => removeProduct(i)}>
            <CloseIcon />
          </IconButton>
        </div>
      ))}
      {!editting && (
        <div style={{ display: "flex", margin: "16px 0" }}>
          <div style={{ flex: 1 }}>
            <SelectProduct
              label="วัสดุ"
              value={productVal}
              onChange={productChange}
              menuArr={businessForm.product}
            />
            <div style={{ height: 8 }} />
            <SelectProduct
              label="ปริมาณ"
              value={productAmount}
              onChange={amountChange}
              menuArr={businessForm.productvalue}
            />
          </div>
          <div style={{ width: 8 }} />
          <AppButton
            size="large"
            variant="contained"
            buttonColor={green}
            onClick={addProduct}
          >
            เพิ่ม
          </AppButton>
        </div>
      )}
      <div style={{ marginTop: 16, display: "flex" }}>
        <UploadAlbum
          fullWidth
          label="อัพโหลดอัลบัมสินค้า"
          {...{ album, setAlbum, albumDisplay, setAlbumDisplay }}
        />
        {album && album.length > 0 && (
          <AppButton buttonColor={green} onClick={() => setAlbum(null)}>
            รีเซ็ต
          </AppButton>
        )}
      </div>
      {album && album.length > 0 && (
        <Typography>รูปทั้งหมด {album.length}</Typography>
      )}
      <Divider />
      <TextField
        fullWidth
        name="location"
        label="สถานที่รับวัสดุเหลือใช้"
        value={form.location}
        style={{ margin: "16px 0" }}
        variant="outlined"
        size="small"
        onChange={e =>
          setForm({
            ...form,
            location: (e.target as HTMLInputElement).value
          })
        }
      />
      <DatePicker
        clearable
        fullWidth
        inputVariant="outlined"
        label={"วันนัดดูสินค้า"}
        clearLabel="รีเซ็ต"
        okLabel="ตกลง"
        cancelLabel="ยกเลิก"
        value={form.appointment}
        minDateMessage=""
        onChange={(d: any) =>
          setForm({
            ...form,
            appointment: d
          })
        }
        labelFunc={() => {
          return form.appointment
            ? _dateToString(new Date(form.appointment))
            : "เลือกวันที่";
        }}
        style={{ marginBottom: 12 }}
      />
      <DatePicker
        clearable
        fullWidth
        inputVariant="outlined"
        label={"วันเปิดประมูล"}
        clearLabel="รีเซ็ต"
        okLabel="ตกลง"
        cancelLabel="ยกเลิก"
        value={form.auctiondate}
        minDateMessage=""
        onChange={(d: any) =>
          setForm({
            ...form,
            auctiondate: d
          })
        }
        labelFunc={() => {
          return form.auctiondate
            ? _dateToString(new Date(form.auctiondate))
            : "เลือกวันที่";
        }}
        style={{ marginBottom: 12 }}
      />
    </div>
  );
};

const ComponentStep2: React.FC<any> = ({ businessForm, form, setForm }) => {
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
      {businessForm && (
        <React.Fragment>
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
              เอกสารที่ต้องการควบคู่กับการซื้อขายวัสดุเหลือใช้
            </FormLabel>
            {businessForm.document.map((d: any, i: number) => (
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

const ComponentStep3: React.FC<any> = ({
  businessForm,
  form,
  setForm,
  setActiveStep
}) => {
  const { _dateToString } = useContext(AppContext);
  const MarginDivider = () => {
    return <div style={{ marginBottom: 12 }} />;
  };
  return (
    <div>
      <Typography variant="h6" style={{ flex: 1 }}>
        ชื่อบริษัท
      </Typography>
      {form.business_name === "" ? (
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
          {form.business_name}
        </Typography>
      )}
      <MarginDivider />
      <Typography variant="h6" style={{ flex: 1 }}>
        ตำแหน่ง
      </Typography>
      <Typography gutterBottom style={{ flex: 1 }}>
        {businessForm["position"][form.position]}
      </Typography>
      <MarginDivider />
      <Typography variant="h6" style={{ flex: 1 }}>
        ขนาดองค์กร
      </Typography>
      <Typography gutterBottom style={{ flex: 1 }}>
        {businessForm["org_size"][form.org_size]}
      </Typography>
      <MarginDivider />
      <Typography variant="h6" style={{ flex: 1 }}>
        วัสดุเหลือใช้ที่ต้องการจัดจำหน่าย
      </Typography>
      {form.product.length > 0 ? (
        form.product.map((d: any, i: number) => (
          <div key={i} style={{ display: "flex" }}>
            <Typography style={{ flex: 1 }}>{d}</Typography>
            <Typography style={{ flex: 1 }}>{form.productvalue[i]}</Typography>
          </div>
        ))
      ) : (
        <MaterialLink
          style={{ color: red[600] }}
          onClick={() => setActiveStep(1)}
        >
          ไม่มีวัสดุ
        </MaterialLink>
      )}
      <MarginDivider />
      <Typography variant="h6" style={{ flex: 1 }}>
        สถานที่รับวัสดุเหลือใช้
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
          {form.location}
        </Typography>
      )}
      <MarginDivider />
      <Typography variant="h6" style={{ flex: 1 }}>
        วันนัดดูสินค้า
      </Typography>
      <Typography gutterBottom style={{ flex: 1 }}>
        {_dateToString(form.appointment)}
      </Typography>
      <MarginDivider />
      <Typography variant="h6" style={{ flex: 1 }}>
        วันเปิดประมูล
      </Typography>
      <Typography gutterBottom style={{ flex: 1 }}>
        {_dateToString(form.auctiondate)}
      </Typography>
      <MarginDivider />
      <Typography variant="h6" style={{ flex: 1 }}>
        รถที่ต้องการใช้ขนส่ง
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
          ไม่มีรถที่ใช้ขนส่ง
        </MaterialLink>
      )}
      <MarginDivider />
      <Typography variant="h6" style={{ flex: 1 }}>
        เอกสารที่ต้องการควบคู่กับการซื้อขายวัสดุเหลือใช้
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
    </div>
  );
};

const GoodsForm: React.FC<any> = React.memo(({ history, match, editting }) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    addSnackbar,
    _xhrPost,
    _fetchFile,
    profileData,
    _dateToAPI,
    useConfirmDeleteItem
  } = useContext(AppContext);
  const [open, setOpen] = useState(
    window.location.pathname === "/business/create"
  );
  const [activeStep, setActiveStep] = React.useState<any>(0);
  const [form, setForm] = useState<any>({
    business_name: "",
    position: 0,
    sale_condition: "",
    org_size: 0,

    product: [],
    productvalue: [],
    appointment: new Date(),
    auctiondate: new Date(),
    location: "",

    document: [],
    docsetc: "",
    transport: [],
    transetc: ""
  });
  const [goodsDetail, setGoodsDetail] = useState<any | null>(null);
  const [businessForm, setBusinessForm] = useState<any | null>(null);
  const [
    { confirmState, item: itemOnEndSale },
    onEndSale
  ] = useConfirmDeleteItem();
  const [album, setAlbum] = useState<any | null>(null);
  const [albumDisplay, setAlbumDisplay] = useState<any | null>(null);

  async function loadBusinessForm() {
    const res = await _xhrPost({
      csrf,
      url: "loadregister",
      body: { action: "business_form", type: "business" }
    });
    setCsrf(res.csrf);
    console.log(res.data);
    setBusinessForm(res.data);
    if (editting && match) {
      const { formid } = match.params;
      if (formid) {
        loadBusinessDetail(parseInt(formid), res.data);
        loadBusinessAlbum(parseInt(formid));
      }
    }
  }

  async function loadBusinessDetail(formid: number, thisForm: any) {
    const res = await _xhrPost({
      csrf,
      url: "loadform",
      body: { action: "detail", formid, linetoken: profileData.userId }
    });
    setCsrf(res.csrf);
    // console.log(res.data);
    const d = res.data;
    setInitialGoodsDetail(d, thisForm);
    setGoodsDetail(res.data);
    // if (thisForm) {
    //   setForm({ ...form, sale_condition: thisForm.form_condition[0] });
    // }
  }

  async function loadBusinessAlbum(formid: number) {
    const res = await _xhrPost({
      csrf,
      url: "loadform",
      body: { action: "album", formid, linetoken: profileData.userId }
    });
    setCsrf(res.csrf);
    console.log(res.data);
  }

  function setInitialGoodsDetail(d: any, thisForm: any) {
    const {
      business_name,
      sale_condition,
      appointment,
      auctiondate,
      location,
      product,
      document,
      transport
    } = d;
    const obj = {
      business_name,
      sale_condition,
      org_size: 0,
      appointment,
      auctiondate,
      location
    };
    // setAlbumDisplay();
    Object.assign(obj, {
      position: "",
      product: [],
      productvalue: [],

      document: [],
      docsetc: "",
      transport: "0",
      transetc: ""
    });
    if (thisForm["position"].indexOf(d.position) !== -1) {
      Object.assign(obj, {
        position: thisForm["position"].indexOf(d.position)
      });
    }
    if (product.length > 0) {
      Object.assign(obj, {
        product: product.map((item: any) => item.product),
        productvalue: product.map((item: any) => item.value)
      });
    }
    if (document.document && document.document.length > 0) {
      Object.assign(obj, {
        document: document.document
      });
    }
    if (
      transport.transport &&
      thisForm["transport"].indexOf(transport.transport[0]) !== -1
    ) {
      Object.assign(obj, {
        transport: thisForm["transport"]
          .indexOf(transport.transport[0])
          .toString()
      });
    }
    if (document.etc !== "none") {
      Object.assign(obj, {
        docsetc: document.etc
      });
    }
    if (transport.etc !== "none") {
      Object.assign(obj, {
        transetc: transport.etc
      });
    }
    console.log(obj);
    setForm(obj);
  }

  async function createForm() {
    const {
      business_name,
      position,
      sale_condition,
      org_size,
      product,
      productvalue,
      appointment,
      auctiondate,
      location,
      document,
      transport,
      docsetc,
      transetc
    } = form;
    const sendObj = {
      action: "create",
      linetoken: profileData.userId,
      business_name,
      position: businessForm["position"][position],
      sale_condition,
      product,
      productvalue,
      appointment: _dateToAPI(appointment),
      auctiondate: _dateToAPI(auctiondate),
      location,
      transport,
      document,
      ...(docsetc !== "" && { docsetc }),
      ...(transetc !== "" && { transetc })
    };
    console.log(sendObj);
    const res = await _xhrPost({
      csrf,
      url: "formsystem",
      body: sendObj
    });
    if (res.data.status === "success") {
      if (album) {
        uploadAlbum(res.data.formid, res.csrf);
      } else {
        history.push("/business");
      }
    }
  }

  async function uploadAlbum(formid: any, csrf: any) {
    const imgRes = await _fetchFile({
      url: "formsystem",
      csrf,
      headers: {
        action: "album",
        linetoken: profileData.userId,
        formid
      },
      body: { albumimage: album }
    });
    console.log(imgRes);
    setAlbum(null);
    if (imgRes.data.status === "success") {
      addSnackbar({ message: "สร้างสำเร็จ", variant: "success" });
      history.push("/business");
    }
  }

  async function editForm() {
    const {
      business_name,
      sale_condition,
      position,
      appointment,
      auctiondate,
      location,
      document,
      transport,
      docsetc,
      transetc
    } = form;
    const { formid } = match.params;
    const sendObj = {
      action: "edit",
      linetoken: profileData.userId,
      formid: parseInt(formid),
      transport,
      document,
      ...(docsetc !== "" && { docsetc }),
      ...(transetc !== "" && { transetc })
    };
    if (goodsDetail.business_name !== business_name) {
      Object.assign(sendObj, { business_name });
    }
    if (goodsDetail.sale_condition !== sale_condition) {
      Object.assign(sendObj, { sale_condition });
    }
    if (
      businessForm["position"].indexOf(goodsDetail.position) !==
      parseInt(position)
    ) {
      Object.assign(sendObj, {
        position: businessForm["position"][position]
      });
    }
    if (_dateToAPI(goodsDetail.appointment) !== _dateToAPI(appointment)) {
      Object.assign(sendObj, {
        appointment: _dateToAPI(appointment)
      });
    }
    if (_dateToAPI(goodsDetail.auctiondate) !== _dateToAPI(auctiondate)) {
      Object.assign(sendObj, {
        auctiondate: _dateToAPI(auctiondate)
      });
    }
    if (goodsDetail.location !== location) {
      Object.assign(sendObj, { location });
    }
    const res = await _xhrPost({
      csrf,
      url: "formsystem",
      body: sendObj
    });
    setCsrf(res.csrf);
    console.log(res.data);
    if (true) {
      uploadAlbum(parseInt(formid), res.csrf);
    } else {
      history.push("/business");
    }
  }

  async function endOfSale() {
    const { formid } = match.params;
    const res = await _xhrPost({
      csrf,
      url: "formsystem",
      body: {
        action: "endofsale",
        linetoken: profileData.userId,
        formid: parseInt(formid)
      }
    });
    setCsrf(res.csrf);
    console.log(res.data);
    if (res.data.status === "success") {
      addSnackbar({ message: "จบการขายสำเร็จ", variant: "success" });
    }
    history.push("/business");
  }

  useEffect(() => {
    if (/localhost/.test(window.location.href)) {
      setBusinessForm({
        form_condition: [],
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
    } else {
      loadBusinessForm();
    }
    if (editting) {
      setOpen(true);
    }
  }, []);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
      <FormTitle />
      <FormStepper
        {...{
          businessForm,
          activeStep,
          setActiveStep,
          form,
          setForm,
          editting,
          goodsDetail,
          onEndSale,
          album,
          setAlbum,
          albumDisplay,
          setAlbumDisplay
        }}
      />
      <div className={classes.buttonGroup}>
        <Link
          to="/business"
          style={{ textDecoration: "none", flexGrow: 1, margin: 8 }}
        >
          <Button style={{ width: "100%" }} color="primary" variant="outlined">
            ยกเลิก
          </Button>
        </Link>
        {editting ? (
          <AppButton
            variant="contained"
            buttonColor={green}
            style={{ flexGrow: 1.5, margin: 8 }}
            onClick={editForm}
          >
            บันทึก
          </AppButton>
        ) : (
          activeStep === formStep - 1 && (
            <AppButton
              variant="contained"
              buttonColor={green}
              style={{ flexGrow: 1.5, margin: 8 }}
              onClick={createForm}
              disabled={
                form.business_name === "" ||
                form.product.length === 0 ||
                form.location === "" ||
                form.transport.length === 0 ||
                form.document.length === 0
              }
            >
              สร้าง
            </AppButton>
          )
        )}
      </div>
      <ConfirmDialog
        open={confirmState}
        onClose={() => onEndSale({ action: "cancel" })}
        onCancel={() => onEndSale({ action: "cancel" })}
        onSubmit={endOfSale}
        title="คุณแน่ใจหรือไม่ว่าต้องการจะจบการขายนี้ ?"
        submitText="จบการขาย"
        headIcon={Cancel}
      />
    </Dialog>
  );
});
export default GoodsForm;
