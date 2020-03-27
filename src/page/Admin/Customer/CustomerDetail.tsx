import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../../AppContext";

const useStyles = makeStyles(theme => ({}));

export interface CustomerDetailProps {}

const CustomerDetail: React.FC<CustomerDetailProps | any> = props => {
  const classes = useStyles();
  const { match } = props;
  const { csrf, setCsrf, _xhrPost, _onLocalhostFn } = useContext(AppContext);
  const [detail, setDetail] = useState<any>(null);

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
    getBaseDetail();
  }, []);

  return <div></div>;
};
export default CustomerDetail;
