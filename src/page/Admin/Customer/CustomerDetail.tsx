import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../../AppContext";
import {
  IconButton,
  Theme,
  Paper,
  Typography,
  Avatar,
  Divider
} from "@material-ui/core";
import { ArrowBackIos, Settings } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => ({
  paper: { padding: 8 },
  itemGrid: {
    margin: theme.spacing(1, 0),
    minWidth: 800,
    padding: 12
  },
  itemPaper: {
    position: "relative",
    padding: 16,
    display: "flex",
    alignItems: "center"
  },
  avatar: { width: 72, height: 72, marginRight: 16 },
  textField: { marginBottom: 12 },
  itemDescription: { display: "flex", marginBottom: 8 }
}));

export interface CustomerDetailProps {}

const DetailCard: React.FC<any> = props => {
  const classes = useStyles();
  const { _dateToString, stringToPhone, _thousandSeperater } = useContext(
    AppContext
  );
  const { detail, setEditing } = props;
  const data = detail.info;

  return (
    <Paper
      elevation={data.status === 1 ? 3 : 0}
      style={{
        ...(data.status === 0 && {
          backgroundColor: "inherit",
          opacity: 0.7
        })
      }}
    >
      <div className={classes.itemPaper}>
        <IconButton
          style={{ position: "absolute", top: 0, right: 0 }}
          onClick={() => setEditing(true)}
        >
          <Settings />
        </IconButton>
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
            ...(data.frequencyform > 3 && { color: red[600], fontWeight: 700 })
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
              style={{ width: 100 }}
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
              style={{ width: 100 }}
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
              style={{ width: 100 }}
            >
              สถานที่
            </Typography>
            <Typography
              align="left"
              variant="body2"
              style={{ fontWeight: 700 }}
            >
              {data.location}
            </Typography>
          </div>
          <div className={classes.itemDescription}>
            <Typography
              align="left"
              variant="body2"
              color="textSecondary"
              style={{ width: 100 }}
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
              style={{ width: 100 }}
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
              style={{ width: 100 }}
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
        </div>
      </div>
    </Paper>
  );
};

const CustomerDetail: React.FC<CustomerDetailProps | any> = props => {
  const classes = useStyles();
  const { match, history } = props;
  const { csrf, setCsrf, _xhrPost, _onLocalhostFn } = useContext(AppContext);
  const [detail, setDetail] = useState<any>(null);
  const [editing, setEditing] = useState<any>(false);

  async function getFormList() {
    const { params } = match;
    const res = await _xhrPost({
      csrf,
      url: "aloadcustomer",
      body: {
        action: "accessformlist",
        customerid: parseInt(params.customerid)
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
  }

  async function getBaseDetail() {
    const { params } = match;
    const res = await _xhrPost({
      csrf,
      url: "aloadcustomer",
      body: {
        action: "base_detail",
        customerid: parseInt(params.customerid)
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
    setDetail(res.data);
  }

  useEffect(() => {
    _onLocalhostFn(
      () => {
        setDetail({
          info: {
            linetoken: "U34854b16de48d84b63c751717c9d2771",
            displayname: "P.R.E.M.I.O.R",
            fullname: "Sippakorn",
            lastname: "Suphapinyo",
            tel: 806760057,
            statusmassage: "UI/UX Developer at PDS Co.,Ltd.",
            picture:
              "https://profile.line-scdn.net/0hPyKQa5SXD1Z2KCciVYpwAUptATsBBgkeDh0UNVooWDJcT05USkhFY1F9AW9dEU8CShsUN1N7UmUJ",
            business_name: "PDS Co.,Ltd.",
            business_type: "รถรับซื้อของเก่า/ซาเล้ง",
            location: "นนทบุรี",
            org_size: "พนักงาน 6-20 คน",
            document: {
              document: [
                "บิลเงินสด",
                "etc",
                "ภพ.20",
                "ใบอนุญาตค้าของเก่า",
                "หนังสือรับรองบริษัท"
              ],
              etc: "Transcript"
            },
            transport: { transport: ["etc"], etc: "Taxi" },
            balance: 335,
            registerdate: "2020-03-21T12:19:16.000Z",
            status: 1
          },
          docs: ["log.txt", "topup"]
        });
      },
      () => {}
    );
    getBaseDetail();
    getFormList();
  }, []);

  return (
    <div>
      <IconButton onClick={() => history.replace("/admin/customer_list")}>
        <ArrowBackIos />
      </IconButton>
      <div className={classes.itemGrid}>
        {detail && <DetailCard {...{ detail, setEditing }} />}
      </div>
    </div>
  );
};
export default CustomerDetail;
