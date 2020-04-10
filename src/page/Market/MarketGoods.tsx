import React, { useEffect, useContext, useState } from "react";
import socketIOClient from "socket.io-client";
import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps } from "react-router-dom";
import { IconButton, Typography, useTheme } from "@material-ui/core";
import { ArrowBackIos, ShoppingBasket } from "@material-ui/icons";
import { AppContext } from "../../AppContext";
import AppButton from "../../AppComponent/AppButton";
import { green, grey, red } from "@material-ui/core/colors";
import ConfirmDialog from "../../component/Dialog/ConfirmDialog";
import PreviewImage from "../../component/Utils/PreviewImage";
import { ResponsivePie } from "@nivo/pie";

const useStyles = makeStyles((theme) => ({}));

export interface MarketGoodsProps
  extends RouteComponentProps<{ formid: string }> {}

const MarginDivider = () => {
  return <div style={{ marginBottom: 12 }} />;
};

const chartTheme = {
  labels: {
    text: {
      fontSize: 16,
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  },
};

const defs = [
  {
    id: "total",
    type: "patternDots",
    background: "inherit",
    color: red[400],
    size: 4,
    padding: 1,
    stagger: true,
  },
  {
    id: "free",
    type: "patternLines",
    background: "inherit",
    color: green[400],
    rotation: -45,
    lineWidth: 6,
    spacing: 7,
  },
];

function getFill(data: any) {
  let variant = "";
  switch (data.status) {
    case "total":
      variant = "total";
      break;
    case "free":
      variant = "free";
      break;
    default:
      variant = "free";
  }
  return {
    match: {
      id: data.id,
    },
    id: variant,
  };
}

const ChartTooltip: React.FC<any> = ({ label, value }) => {
  const theme = useTheme();
  return (
    <div style={{ display: "flex" }}>
      <Typography
        variant="body1"
        style={{
          color: theme.palette.grey[900],
          fontWeight: 400,
          marginRight: 16,
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        style={{
          color: theme.palette.grey[900],
          fontWeight: 700,
          marginRight: 8,
        }}
      >
        {value}
      </Typography>
    </div>
  );
};

const MarketGoods: React.FC<MarketGoodsProps> = (props) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    profileData,
    checkSession,
    _dateToString,
    stringToPhone,
    getFormImg,
    sess,
    addSnackbar,
    refreshInfo,
    _parseLocation,
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
        formid,
      },
    });

    setCsrf(res.csrf);
    if (
      "status" in res.data &&
      res.data.status === "this is not user account or have been delete account"
    ) {
      checkSession();
    } else {
      setData(res.data);
      if (!Boolean(res.data.price)) {
        accessFormInitial();
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
        formid,
      },
    });
    setCsrf(res.csrf);
    refreshInfo();
    switch (res.data.status) {
      case "success":
      case "not need to access":
        getGoodsDetail();
        setConfirmState(false);
        break;
      case "full access":
        addSnackbar({ message: "สิทธิการเข้าถึงเต็ม", variant: "error" });
        break;
      case "balance not enough":
        addSnackbar({ message: "จำนวนเงินไม่เพียงพอ", variant: "error" });
        break;
      default:
        setConfirmState(false);
        break;
    }
  }

  async function accessFormInitial() {
    const res = await _xhrPost({
      csrf,
      url: "usersystem",
      body: {
        action: "accessform",
        type: "customer",
        formid,
      },
    });
    setCsrf(res.csrf);
  }

  function realtimeAccess() {
    const socket = socketIOClient("https://easyrecycle.ml", {
      transports: ["websocket", "polling"],
    });
    socket.emit("boardlist", {
      action: "boardlist",
      formid,
    });
  }

  function getStatusText(status: string) {
    switch (status) {
      case "wrong formid":
        return `ไม่พบสินค้า ID ${formid}`;
      case "full access":
        return "สิทธิการเข้าถึงเต็ม";
      case "balance not enough":
        return "จำนวนเงินไม่เพียงพอ";
      default:
        return "";
    }
  }

  useEffect(() => {
    if (profileData) {
      getGoodsDetail();
    }
  }, [profileData]);

  return (
    <div style={{ marginTop: 16 }}>
      <IconButton onClick={() => history.replace("/market")}>
        <ArrowBackIos fontSize="small" />
      </IconButton>
      {data &&
        !("status" in data) &&
        data.filelist &&
        data.filelist.length > 0 &&
        data.filelist.length <= 10 && (
          <PreviewImage
            editting={true}
            files={data.filelist.map((file: any) =>
              getFormImg({
                userid: data.userid,
                formid,
                file,
              })
            )}
          />
        )}
      <MarginDivider />
      {data && !("status" in data) && (
        <div style={{ padding: 12 }}>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <Typography variant="h6" gutterBottom style={{ width: 100 }}>
              สถานที่
            </Typography>
            <Typography gutterBottom style={{ flex: 1 }}>
              {_parseLocation(data.location).label}
            </Typography>
          </div>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <Typography variant="h6" gutterBottom style={{ width: 100 }}>
              สินค้า
            </Typography>
            <Typography style={{ flex: 1 }}>
              {data.product.length > 0
                ? data.product.map((d: any) => d.product).join(", ")
                : "ไม่มีวัสดุ"}
            </Typography>
          </div>
          {/* <div style={{ display: "flex", alignItems: "baseline" }}>
            <Typography variant="h6" gutterBottom style={{ width: 100 }}>
              หมายเลข
            </Typography>
            <Typography gutterBottom style={{ flex: 1 }}>
              {_parseLocation(data.location).label}
            </Typography>
          </div> */}
        </div>
      )}
      {data && !("status" in data) && (
        <div style={{ height: 400, width: "auto" }}>
          <ResponsivePie
            data={data.product.map((item: any) => {
              return {
                id: item.product,
                label: item.value,
                value: 1,
              };
            })}
            sliceLabel={(d: any) => `${d.label}`}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: "nivo" }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: "color" }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: "ruby",
                },
                id: "dots",
              },
              {
                match: {
                  id: "c",
                },
                id: "dots",
              },
              {
                match: {
                  id: "go",
                },
                id: "dots",
              },
              {
                match: {
                  id: "python",
                },
                id: "dots",
              },
              {
                match: {
                  id: "scala",
                },
                id: "lines",
              },
              {
                match: {
                  id: "lisp",
                },
                id: "lines",
              },
              {
                match: {
                  id: "elixir",
                },
                id: "lines",
              },
              {
                match: {
                  id: "javascript",
                },
                id: "lines",
              },
            ]}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      )}
      {data &&
        ("status" in data ? (
          <Typography
            style={{ margin: "24px 0" }}
            align="center"
            variant="h4"
            color="textSecondary"
          >
            {getStatusText(data.status)}
          </Typography>
        ) : (
          <div style={{ padding: 12 }}>
            {data.business_name && (
              <React.Fragment>
                <Typography variant="h6" style={{ flex: 1 }}>
                  ชื่อกิจการ
                </Typography>
                <Typography gutterBottom style={{ flex: 1 }}>
                  {data.business_name}
                </Typography>
                <MarginDivider />
              </React.Fragment>
            )}
            {data.position && (
              <React.Fragment>
                <Typography variant="h6" style={{ flex: 1 }}>
                  ผู้ให้ข้อมูล
                </Typography>
                <Typography gutterBottom style={{ flex: 1 }}>
                  {data.position}
                </Typography>
                <MarginDivider />
              </React.Fragment>
            )}
            {data.product && (
              <React.Fragment>
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
              </React.Fragment>
            )}
            {data.location && (
              <React.Fragment>
                <Typography variant="h6" style={{ flex: 1 }}>
                  เขตพื้นที่รับเศษวัสดุเหลือใช้
                </Typography>
                <Typography gutterBottom style={{ flex: 1 }}>
                  {_parseLocation(data.location).label}
                </Typography>
                <MarginDivider />
              </React.Fragment>
            )}
            {data.appointment && (
              <React.Fragment>
                <Typography variant="h6" style={{ flex: 1 }}>
                  วันนัดดูสินค้า
                </Typography>
                <Typography gutterBottom style={{ flex: 1 }}>
                  {_dateToString(data.appointment)}
                </Typography>
                <MarginDivider />
              </React.Fragment>
            )}
            {data.auctiondate && (
              <React.Fragment>
                <Typography variant="h6" style={{ flex: 1 }}>
                  วันเปิดประมูล
                </Typography>
                <Typography gutterBottom style={{ flex: 1 }}>
                  {_dateToString(data.auctiondate)}
                </Typography>
                <MarginDivider />
              </React.Fragment>
            )}
            {data.transport && (
              <React.Fragment>
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
                  <Typography style={{ flex: 1 }}>
                    {data.transport.etc}
                  </Typography>
                )}
                {data.transport.transport.length === 0 &&
                  data.transport.etc === "none" && (
                    <Typography style={{ flex: 1 }}>
                      ไม่มีรถที่ใช้ขนส่ง
                    </Typography>
                  )}
                <MarginDivider />
              </React.Fragment>
            )}
            {data.document && (
              <React.Fragment>
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
                  <Typography style={{ flex: 1 }}>
                    {data.document.etc}
                  </Typography>
                )}
                {data.document.document.length === 0 &&
                  data.document.etc === "none" && (
                    <Typography style={{ flex: 1 }}>ไม่มีเอกสาร</Typography>
                  )}
                <MarginDivider />
              </React.Fragment>
            )}
            {data.tel && data.email && (
              <React.Fragment>
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
              </React.Fragment>
            )}
            {data.sale_condition && (
              <React.Fragment>
                <Typography variant="h6" style={{ flex: 1 }}>
                  เงื่อนไขการขาย Scarp
                </Typography>
                <Typography
                  gutterBottom
                  style={{ flex: 1, whiteSpace: "pre-line" }}
                >
                  {data.sale_condition}
                </Typography>
                <MarginDivider />
              </React.Fragment>
            )}
            {Object.keys(data).length < 15 && (
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
            )}
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
