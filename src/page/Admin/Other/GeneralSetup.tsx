import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../../AppContext";
import FormSetupPaper from "../../../component/Utils/FormSetupPaper";
import { Typography, TextField, Divider } from "@material-ui/core";
import FormItemRowGen from "../../../component/Utils/FormItemRowGen";
import FormItemRowGenNum from "../../../component/Utils/FormItemRowGenNum";

const useStyles = makeStyles(theme => ({}));

export interface GeneralSetupProps {}

const GeneralSetup: React.FC<GeneralSetupProps> = () => {
  const classes = useStyles();
  const { csrf, setCsrf, _xhrPost, _onLocalhostFn, sess } = useContext(
    AppContext
  );
  const [formPrice, setFormPrice] = useState<any>({
    price: [],
    balancewarning: 0,
    topup: ""
  });
  const per1 =
    sess.permission &&
    sess.permission.permission.some((item: any) => item === 1);
  const per2 =
    sess.permission &&
    sess.permission.permission.some((item: any) => item === 2);
  const per3 =
    sess.permission &&
    sess.permission.permission.some((item: any) => item === 3);
  const per4 =
    sess.permission &&
    sess.permission.permission.some((item: any) => item === 4);
  const per5 =
    sess.permission &&
    sess.permission.permission.some((item: any) => item === 5);

  async function getFormPrice() {
    const res = await _xhrPost({
      csrf,
      url: "aloadusersystem",
      body: {
        action: "formprice"
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
    setFormPrice(res.data);
  }

  async function onEditWarning({ text, afterEdit }: any) {
    const sendObj = {
      action: "setup",
      type: "balancewarning",
      balancewarning: parseInt(text)
    };

    const res = await _xhrPost({
      csrf,
      url: "ausersystem",
      body: sendObj
    });
    console.log(res.data);
    setCsrf(res.csrf);
    afterEdit();
    getFormPrice();
  }

  async function onEditBank({ text, afterEdit }: any) {
    const sendObj = {
      action: "setup",
      type: "topup",
      condition: text
    };
    const res = await _xhrPost({
      csrf,
      url: "ausersystem",
      body: sendObj
    });
    console.log(res.data);
    setCsrf(res.csrf);
    afterEdit();
    getFormPrice();
  }

  useEffect(() => {
    getFormPrice();
  }, []);

  return (
    <FormSetupPaper>
      <Typography variant="h5" style={{ marginBottom: 16 }}>
        ตั้งค่าทั่วไป
      </Typography>
      <Divider style={{ margin: "16px 0" }} />
      {formPrice && (
        <React.Fragment>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <Typography variant="h6" style={{ marginRight: 16 }}>
              แจ้งเตือนเมื่อเงินต่ำกว่า
            </Typography>
            <FormItemRowGenNum
              text={formPrice.balancewarning}
              onEdit={(obj: any) => onEditWarning(obj)}
            />
          </div>
          {per3 && (
            <FormItemRowGen
              text={formPrice.topup}
              onEdit={(obj: any) => onEditBank(obj)}
            />
          )}
        </React.Fragment>
      )}
    </FormSetupPaper>
  );
};
export default GeneralSetup;
