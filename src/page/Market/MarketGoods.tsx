import React, { useEffect, useContext, useState } from "react";
import socketIOClient from "socket.io-client";
import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps } from "react-router-dom";
import { IconButton, Typography } from "@material-ui/core";
import { ArrowBackIos, ShoppingBasket } from "@material-ui/icons";
import { AppContext } from "../../AppContext";
import AppButton from "../../AppComponent/AppButton";
import { green } from "@material-ui/core/colors";
import ConfirmDialog from "../../component/Dialog/ConfirmDialog";
import PreviewImage from "../../component/Utils/PreviewImage";

const useStyles = makeStyles(theme => ({}));

export interface MarketGoodsProps
  extends RouteComponentProps<{ formid: string }> {}

const MarginDivider = () => {
  return <div style={{ marginBottom: 12 }} />;
};

const MarketGoods: React.FC<MarketGoodsProps> = props => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    profileData,
    checkSession,
    _onLocalhostFn,
    _dateToString,
    stringToPhone,
    getFormImg,
    sess
  } = useContext(AppContext);
  const { match, history, location } = props;
  const formid = parseInt(match.params.formid);
  const [data, setData] = useState<any>(null);
  const [confirmState, setConfirmState] = useState<boolean>(false);

  async function getGoodsDetail() {
    const res = await _xhrPost({
      csrf,
      url: "loadusersystem",
      body: {
        action: "formdetail",
        linetoken: profileData.userId,
        type: "customer",
        formid
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
    if (
      "status" in res.data &&
      res.data.status === "this is not user account or have been delete account"
    ) {
      checkSession();
    } else {
      setData(res.data);
      if (!Boolean(res.data.price)) {
        realtimeAccess();
        accessFormFree();
      }
    }
  }

  async function accessForm() {
    const res = await _xhrPost({
      csrf,
      url: "usersystem",
      body: {
        action: "accessform",
        type: "customer",
        formid
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
    getGoodsDetail();
    setConfirmState(false);
  }

  async function accessFormFree() {
    const res = await _xhrPost({
      csrf,
      url: "usersystem",
      body: {
        action: "accessform",
        type: "customer",
        formid
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
  }

  function realtimeAccess() {
    const socket = socketIOClient("https://easyrecycle.ml", {
      transports: ["websocket", "polling"]
    });
    socket.emit("boardlist", {
      action: "boardlist",
      formid
    });
  }

  useEffect(() => {
    _onLocalhostFn(
      () => {
        setData({
          business_name: "PDS",
          sale_condition: "ขายด่วน",
          position: "บุคคล",
          price: "25",
          formcode: { sector: "135", province: "45", number: "" },
          product: [
            { product: "ทองแดง", value: "มากกว่า 5000 kg" },
            { product: "สแตนเลส", value: "น้ำหนัก 501-2000 kg" },
            { product: "กระดาษ", value: "น้ำหนัก 201-500 kg" }
          ]
        });
      },
      () => {
        if (profileData) {
          getGoodsDetail();
        }
      }
    );
  }, [profileData]);

  return (
    <div style={{ marginTop: 16 }}>
      <IconButton onClick={() => history.replace("/market")}>
        <ArrowBackIos fontSize="small" />
      </IconButton>

      {data &&
        ("status" in data && data.status === "wrong formid" ? (
          <Typography
            style={{ margin: "24px 0" }}
            align="center"
            variant="h4"
            color="textSecondary"
          >
            ไม่พบสินค้า ID {formid}
          </Typography>
        ) : Object.keys(data).length < 15 ? (
          <div style={{ padding: 12 }}>
            <Typography variant="h6" style={{ flex: 1 }}>
              ชื่อบริษัท
            </Typography>
            <Typography gutterBottom style={{ flex: 1 }}>
              {data.business_name}
            </Typography>
            <MarginDivider />
            <Typography variant="h6" style={{ flex: 1 }}>
              ตำแหน่ง
            </Typography>
            <Typography gutterBottom style={{ flex: 1 }}>
              {data.position}
            </Typography>
            <MarginDivider />
            <Typography variant="h6" style={{ flex: 1 }}>
              วัสดุเหลือใช้ที่ต้องการจัดจำหน่าย
            </Typography>
            {data.product.length > 0 ? (
              data.product.map((d: any, i: number) => (
                <div key={i} style={{ display: "flex" }}>
                  <Typography style={{ flex: 1 }}>{d.product}</Typography>
                  <Typography style={{ flex: 1 }}>{d.value}</Typography>
                </div>
              ))
            ) : (
              <Typography gutterBottom style={{ flex: 1 }}>
                ไม่มีวัสดุ
              </Typography>
            )}
            <MarginDivider />
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography variant="h6" style={{ flex: 1, marginTop: 24 }}>
                ดูรายละเอียดเพิ่มเติม
              </Typography>
              <AppButton
                style={{ fontSize: 18 }}
                variant="contained"
                buttonColor={green}
                startIcon={<ShoppingBasket />}
                onClick={() => setConfirmState(true)}
              >
                {data.price} บาท
              </AppButton>
            </div>
          </div>
        ) : (
          <div style={{ padding: 12 }}>
            {data.filelist &&
              data.filelist.length > 0 &&
              data.filelist.length <= 10 && (
                <PreviewImage
                  files={data.filelist.map((file: any) =>
                    getFormImg({
                      userid: data.userid,
                      formid,
                      file
                    })
                  )}
                />
              )}
            <Typography variant="h6" style={{ flex: 1 }}>
              ชื่อบริษัท
            </Typography>
            <Typography gutterBottom style={{ flex: 1 }}>
              {data.business_name}
            </Typography>
            <MarginDivider />
            <Typography variant="h6" style={{ flex: 1 }}>
              ตำแหน่ง
            </Typography>
            <Typography gutterBottom style={{ flex: 1 }}>
              {data.position}
            </Typography>
            <MarginDivider />
            <Typography variant="h6" style={{ flex: 1 }}>
              วัสดุเหลือใช้ที่ต้องการจัดจำหน่าย
            </Typography>
            {data.product.length > 0 ? (
              data.product.map((d: any, i: number) => (
                <div key={i} style={{ display: "flex" }}>
                  <Typography style={{ flex: 1 }}>{d.product}</Typography>
                  <Typography style={{ flex: 1 }}>{d.value}</Typography>
                </div>
              ))
            ) : (
              <Typography gutterBottom style={{ flex: 1 }}>
                ไม่มีวัสดุ
              </Typography>
            )}
            <MarginDivider />
            <Typography variant="h6" style={{ flex: 1 }}>
              สถานที่รับวัสดุเหลือใช้
            </Typography>
            <Typography gutterBottom style={{ flex: 1 }}>
              {data.location}
            </Typography>
            <MarginDivider />
            <Typography variant="h6" style={{ flex: 1 }}>
              วันนัดดูสินค้า
            </Typography>
            <Typography gutterBottom style={{ flex: 1 }}>
              {_dateToString(data.appointment)}
            </Typography>
            <MarginDivider />
            <Typography variant="h6" style={{ flex: 1 }}>
              วันเปิดประมูล
            </Typography>
            <Typography gutterBottom style={{ flex: 1 }}>
              {_dateToString(data.auctiondate)}
            </Typography>
            <MarginDivider />
            <Typography variant="h6" style={{ flex: 1 }}>
              รถที่ต้องการใช้ขนส่ง
            </Typography>
            {data.transport.transport.length > 0 &&
              data.transport.transport
                .filter((item: any) => item !== "etc")
                .map((d: any) => (
                  <Typography key={d} style={{ flex: 1 }}>
                    {d}
                  </Typography>
                ))}
            {data.transport.etc !== "none" && (
              <Typography style={{ flex: 1 }}>{data.transport.etc}</Typography>
            )}
            {data.transport.transport.length === 0 &&
              data.transport.etc === "none" && (
                <Typography style={{ flex: 1 }}>ไม่มีรถที่ใช้ขนส่ง</Typography>
              )}
            <MarginDivider />
            <Typography variant="h6" style={{ flex: 1 }}>
              เอกสารที่ต้องการควบคู่กับการซื้อขายวัสดุเหลือใช้
            </Typography>
            {data.document.document.length > 0 &&
              data.document.document
                .filter((item: any) => item !== "etc")
                .map((d: any) => (
                  <Typography key={d} style={{ flex: 1 }}>
                    {d}
                  </Typography>
                ))}
            {data.document.etc !== "none" && (
              <Typography style={{ flex: 1 }}>{data.document.etc}</Typography>
            )}
            {data.document.document.length === 0 &&
              data.document.etc === "none" && (
                <Typography style={{ flex: 1 }}>ไม่มีเอกสาร</Typography>
              )}
            <MarginDivider />
            <Typography variant="h6" style={{ flex: 1 }}>
              ช่องทางติดต่อ
            </Typography>
            <div style={{ display: "flex" }}>
              <Typography style={{ width: 100 }}>เบอร์โทรศัพท์</Typography>
              <Typography style={{ flex: 1 }}>
                {stringToPhone(`0${data.tel}`)
                  ? stringToPhone(`0${data.tel}`)
                  : data.tel}
              </Typography>
            </div>
            <div style={{ display: "flex" }}>
              <Typography style={{ width: 100 }}>อีเมล</Typography>
              <Typography style={{ flex: 1 }}>{data.email}</Typography>
            </div>
            <MarginDivider />
            <Typography variant="h6" style={{ flex: 1 }}>
              เงื่อนไขการขาย
            </Typography>
            <Typography gutterBottom style={{ flex: 1, whiteSpace: "pre" }}>
              {data.sale_condition}
            </Typography>
          </div>
        ))}
      <ConfirmDialog
        type="delete"
        open={confirmState}
        onClose={() => setConfirmState(false)}
        onCancel={() => setConfirmState(false)}
        onSubmit={() => {
          realtimeAccess();
          accessForm();
        }}
        title="คุณแน่ใจหรือไม่ว่าต้องการจะเข้าถึงข้อมูล ?"
        headIcon={ShoppingBasket}
        headIconColor={green}
        submitText="ยอมรับ"
        submitButtonColor={green}
      >
        ราคาเข้าชม {data && data.price}
      </ConfirmDialog>
    </div>
  );
};
export default MarketGoods;
