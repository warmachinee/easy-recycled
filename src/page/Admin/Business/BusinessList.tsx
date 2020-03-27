import React, { useContext, useEffect, useState } from "react";
import Loadable from "react-loadable";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../../AppContext";
import {
  Typography,
  Theme,
  Paper,
  ButtonBase,
  Avatar,
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";
import Progress from "../../../component/Utils/Progress";
import { withRouter, Route, RouteComponentProps } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { red } from "@material-ui/core/colors";

const BusinessDetail = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'BusinessDetail' */ "./BusinessDetail"),
  loading: () => null
});

const useStyles = makeStyles((theme: Theme) => ({
  paper: { padding: 8 },
  itemGrid: { margin: theme.spacing(1, 0), minWidth: 650, width: "100%" },
  itemPaper: {
    position: "relative",
    padding: 16,
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  avatar: { width: 72, height: 72, marginRight: 16 }
}));

export interface BusinessListProps extends RouteComponentProps<{}> {}

const BusinessItem: React.FC<any> = props => {
  const classes = useStyles();
  const { _dateToString, stringToPhone } = useContext(AppContext);
  const { match, data, history, businessType } = props;
  const checkStatus = data.status ? data.status : businessType;

  return (
    <ButtonBase
      className={classes.itemGrid}
      onClick={() => history.replace(`${match.path}/${data.businessid}`)}
    >
      <Paper
        className={classes.itemPaper}
        elevation={checkStatus === 1 ? 3 : 0}
        style={{
          ...(checkStatus === 0 && {
            backgroundColor: "inherit",
            opacity: 0.7
          })
        }}
      >
        <Avatar className={classes.avatar} src={data.picture} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography style={{ flex: 1, fontWeight: 600 }} align="left">
            {checkStatus === 1 ? "" : "(ไม่ได้ใช้งานแล้ว)"}
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
            <Typography
              align="left"
              variant="body2"
              color="textSecondary"
              style={{ marginRight: 16 }}
            >
              อีเมล
            </Typography>
            <Typography
              align="left"
              variant="body2"
              style={{ fontWeight: 700 }}
            >
              {data.email}
            </Typography>
          </div>
        </div>
        <Typography align="left">จำนวนสินค้า</Typography>
        <Typography
          variant="h6"
          style={{
            width: 48,
            marginRight: 16,
            ...(data.frequencyform >= 3 && { color: red[600], fontWeight: 700 })
          }}
          align="right"
        >
          {data.frequencyform}
        </Typography>
      </Paper>
    </ButtonBase>
  );
};

const DefaultComponent: React.FC<any> = props => {
  const classes = useStyles();
  const { location, match, history } = props;
  const { csrf, setCsrf, _xhrPost, _onLocalhostFn } = useContext(AppContext);
  const [business, setBusiness] = useState<any>(null);
  const [businessPage, setBusinessPage] = useState(getHash());
  const [businessType, setBusinessType] = useState<any>(10);

  function getHash() {
    const hash = location.hash;
    if (hash === "") {
      return 1;
    } else {
      return parseInt(hash.split("#")[1]);
    }
  }

  const paginationChange = (event: any, value: any) => {
    history.replace(`${match.path}#${value}`);
    setBusinessPage(value);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBusinessType(event.target.value as string);
    getBaseList(event.target.value);
  };

  async function getBaseList(status?: any) {
    const sendObj = {
      action: "base_list",
      startindex: (businessPage - 1) * 10,
      lastindex: businessPage * 10,
      ...(status !== 10 && { status })
    };
    if (status === 0) {
      setBusiness(null);
    }
    const res = await _xhrPost({
      csrf,
      url: "aloadbusiness",
      body: sendObj
    });
    console.log(res.data);
    setCsrf(res.csrf);
    setBusiness(res.data);
  }

  useEffect(() => {
    _onLocalhostFn(
      () => {
        const thisList = [
          {
            businessid: 2310081,
            linetoken: "U1e84a64d2648d5dfa1c3c113e6c1d37c",
            email: "sippakorn.prem@gmail.com",
            displayname: "Imagery.bag",
            fullname: "Sippakorn",
            lastname: "Suphapinyo",
            tel: 80670057,
            statusmassage: "สั่งของส่งรูปมาเลยค่า ????",
            picture:
              "https://profile.line-scdn.net/0hcuLOUwB5PFpxNhey7D5DDU1zMjcGGDoSCVN1aFMxMmNdBHNcGAN0blc_az8JUX0JH1EmaAczYGxU",
            frequencyform: 0,
            registerdate: "2020-03-25T19:01:35.000Z",
            status: 1
          },
          {
            businessid: 6895493,
            linetoken: "Uab6817bd574cfb5a241e374019021333",
            email: "earth424242@gmail.com",
            displayname: "Meaw",
            fullname: "thanapat",
            lastname: "taweerat",
            tel: 87377277,
            statusmassage: "シ",
            picture:
              "https://profile.line-scdn.net/0hXDUWGpBHB2toLizFyMx4PFRrCQYfAAEjEBtNCBorDAkQTUY5VhxLWk4nDV0RHhU4VUkYDBgoWAgV",
            frequencyform: 1,
            registerdate: "2020-03-25T19:03:31.000Z",
            status: 1
          },
          {
            businessid: 8069118,
            linetoken: "U34854b16de48d84b63c751717c9d2771",
            email: "sippakorn.prem@gmail.com",
            displayname: "P.R.E.M.I.O.R",
            fullname: "Sippakorn",
            lastname: "Suphapinyo",
            tel: 806760057,
            statusmassage: "UI/UX Developer at PDS Co.,Ltd.",
            picture:
              "https://profile.line-scdn.net/0hPyKQa5SXD1Z2KCciVYpwAUptATsBBgkeDh0UNVooWDJcT05USkhFY1F9AW9dEU8CShsUN1N7UmUJ",
            frequencyform: 3,
            registerdate: "2020-03-09T21:35:27.000Z",
            status: 1
          }
        ];
        setBusiness({
          list: thisList,
          count: thisList.length
        });
      },
      () => {
        getBaseList(businessType);
      }
    );
  }, [businessPage]);

  return (
    <div style={{ padding: 12 }}>
      <div style={{ display: "flex", marginBottom: 24 }}>
        <Typography variant="h5" style={{ marginRight: 16 }}>
          รายชื่อผู้ขาย
        </Typography>
        <FormControl size="small">
          <Select
            value={businessType}
            onChange={handleChange}
            variant="outlined"
          >
            <MenuItem value={10}>ทั้งหมด</MenuItem>
            <MenuItem value={1}>ใช้งานอยู่</MenuItem>
            <MenuItem value={0}>ไม่ได้ใช้งานแล้ว</MenuItem>
          </Select>
        </FormControl>
      </div>
      {business ? (
        business.list.length > 0 ? (
          business.list.map((d: any) => (
            <BusinessItem
              key={d.businessid}
              data={d}
              {...{ business, businessType }}
              {...props}
            />
          ))
        ) : (
          <Typography style={{ marginTop: 24 }} align="center">
            ไม่มีรายการ
          </Typography>
        )
      ) : (
        <Progress />
      )}
      {business && Math.ceil(business.count / 10) > 1 && (
        <div
          style={{ marginTop: 16, display: "flex", justifyContent: "center" }}
        >
          <Pagination
            count={Math.ceil(business.count / 10)}
            page={businessPage}
            variant="outlined"
            shape="rounded"
            onChange={paginationChange}
          />
        </div>
      )}
    </div>
  );
};

const BusinessList: React.FC<BusinessListProps> = ({ match }) => {
  return (
    <div>
      <Route exact path={match.path} component={DefaultComponent} />
      <Route path={`${match.path}/:businessid`} component={BusinessDetail} />
    </div>
  );
};

export default withRouter(props => <BusinessList {...props} />);
