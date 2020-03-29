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

const CustomerDetail = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'CustomerDetail' */ "./CustomerDetail"),
  loading: () => null
});

const useStyles = makeStyles((theme: Theme) => ({
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

export interface CustomerListProps extends RouteComponentProps<{}> {}

const CustomersItem: React.FC<any> = props => {
  const classes = useStyles();
  const { _thousandSeperater } = useContext(AppContext);
  const { match, data, history, customerType } = props;
  const checkStatus = data.status ? data.status : customerType;

  return (
    <ButtonBase
      className={classes.itemGrid}
      onClick={() => history.replace(`${match.path}/${data.customerid}`)}
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
        <Typography style={{ flex: 1, fontWeight: 600 }} align="left">
          {checkStatus === 1 ? "" : "(ไม่ได้ใช้งานแล้ว)"}
          {`${data.fullname} ${data.lastname} ( ${data.displayname} )`}
        </Typography>
        <Typography align="left">เงินคงเหลือ</Typography>
        <Typography
          variant="h6"
          style={{ width: 100, marginRight: 16 }}
          align="right"
        >
          {_thousandSeperater(data.balance)}
        </Typography>
        <Typography>บาท</Typography>
      </Paper>
    </ButtonBase>
  );
};

const DefaultComponent: React.FC<any> = props => {
  const classes = useStyles();
  const { location, match, history } = props;
  const { csrf, setCsrf, _xhrPost, _onLocalhostFn } = useContext(AppContext);
  const [customers, setCustomers] = useState<any>(null);
  const [customerPage, setCustomerPage] = useState(getHash());
  const [customerType, setCustomerType] = useState<any>(10);

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
    setCustomerPage(value);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCustomerType(event.target.value as string);
    getBaseList(event.target.value);
  };

  async function getBaseList(status?: any) {
    const sendObj = {
      action: "base_list",
      startindex: (customerPage - 1) * 10,
      lastindex: customerPage * 10,
      ...(status !== 10 && { status })
    };
    if (status === 0) {
      setCustomers(null);
    }
    const res = await _xhrPost({
      csrf,
      url: "aloadcustomer",
      body: sendObj
    });
    console.log(res.data);
    setCsrf(res.csrf);
    setCustomers(res.data);
  }

  useEffect(() => {
    _onLocalhostFn(
      () => {
        const thisList = [
          {
            customerid: 1728881,
            linetoken: "U1e84a64d2648d5dfa1c3c113e6c1d37c",
            displayname: "Imagery.bag",
            fullname: "Sippakorn",
            lastname: "Suphapinyo",
            picture:
              "https://profile.line-scdn.net/0hcuLOUwB5PFpxNhey7D5DDU1zMjcGGDoSCVN1aFMxMmNdBHNcGAN0blc_az8JUX0JH1EmaAczYGxU",
            balance: 0,
            status: 1
          },
          {
            customerid: 8671952,
            linetoken: "Uab6817bd574cfb5a241e374019021333",
            displayname: "Meaw",
            fullname: "Thanapat",
            lastname: "Taweerat",
            picture:
              "https://profile.line-scdn.net/0hXDUWGpBHB2toLizFyMx4PFRrCQYfAAEjEBtNCBorDAkQTUY5VhxLWk4nDV0RHhU4VUkYDBgoWAgV",
            balance: 0,
            status: 1
          },
          {
            customerid: 9154507,
            linetoken: "U34854b16de48d84b63c751717c9d2771",
            displayname: "P.R.E.M.I.O.R",
            fullname: "Sippakorn",
            lastname: "Suphapinyo",
            picture:
              "https://profile.line-scdn.net/0hPyKQa5SXD1Z2KCciVYpwAUptATsBBgkeDh0UNVooWDJcT05USkhFY1F9AW9dEU8CShsUN1N7UmUJ",
            balance: 335,
            status: 1
          }
        ];
        setCustomers({
          list: thisList,
          count: thisList.length
        });
      },
      () => {
        getBaseList(customerType);
      }
    );
  }, [customerPage]);

  return (
    <div style={{ padding: 12 }}>
      <div style={{ display: "flex", marginBottom: 24 }}>
        <Typography variant="h5" style={{ marginRight: 16 }}>
          รายชื่อลูกค้า
        </Typography>
        <FormControl size="small">
          <Select
            value={customerType}
            onChange={handleChange}
            variant="outlined"
          >
            <MenuItem value={10}>ทั้งหมด</MenuItem>
            <MenuItem value={1}>ใช้งานอยู่</MenuItem>
            <MenuItem value={0}>ไม่ได้ใช้งานแล้ว</MenuItem>
          </Select>
        </FormControl>
      </div>
      {customers ? (
        customers.list.length > 0 ? (
          customers.list.map((d: any) => (
            <CustomersItem
              key={d.customerid}
              data={d}
              {...{ customers, customerType }}
              {...props}
            />
          ))
        ) : (
          <Typography
            style={{ margin: "24px 0" }}
            align="center"
            variant="h4"
            color="textSecondary"
          >
            ไม่มีรายการ
          </Typography>
        )
      ) : (
        <Progress />
      )}
      {customers && Math.ceil(customers.count / 10) > 1 && (
        <div
          style={{ marginTop: 16, display: "flex", justifyContent: "center" }}
        >
          <Pagination
            count={Math.ceil(customers.count / 10)}
            page={customerPage}
            variant="outlined"
            shape="rounded"
            onChange={paginationChange}
          />
        </div>
      )}
    </div>
  );
};

const CustomerList: React.FC<CustomerListProps> = ({ match }) => {
  return (
    <div>
      <Route exact path={match.path} component={DefaultComponent} />
      <Route path={`${match.path}/:customerid`} component={CustomerDetail} />
    </div>
  );
};

export default withRouter(props => <CustomerList {...props} />);
