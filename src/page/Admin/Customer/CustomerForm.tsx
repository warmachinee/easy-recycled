import React, { useContext, useEffect, useState } from "react";
import Loadable from "react-loadable";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../../AppContext";

const Condition = Loadable({
  loader: () => import(/* webpackChunkName: 'Condition' */ "./Form/Condition"),
  loading: () => null
});

const BusinessType = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'BusinessType' */ "./Form/BusinessType"),
  loading: () => null
});

const useStyles = makeStyles(theme => ({}));

export interface CustomerFormProps {}

const FormComponent: React.FC<any> = ({ form }) => {
  const { customer_condition, business_type } = form;
  return (
    <React.Fragment>
      <Condition data={customer_condition} />
      <BusinessType data={business_type} />
    </React.Fragment>
  );
};

const CustomerForm: React.FC<CustomerFormProps> = () => {
  const classes = useStyles();
  const { csrf, setCsrf, _xhrPost, _onLocalhostFn } = useContext(AppContext);
  const [form, setForm] = useState<any>(null);
  const passingProps: any = {
    ...useContext(AppContext),
    form,
    handleFetch,
    onInserForm,
    onDeleteForm,
    onEditForm
  };

  async function handleFetch() {
    const res = await _xhrPost({
      csrf,
      url: "aloadcustomer",
      body: {
        action: "customer_register"
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
    setForm(res.data);
  }

  async function onInserForm({ state, setState, type }: any) {
    const res = await _xhrPost({
      csrf,
      url: "ausersystem",
      body: {
        action: "setup",
        type,
        setaction: "insert",
        newtext: state
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
    setState("");
    handleFetch();
  }

  async function onDeleteForm({ text, type }: any) {
    const res = await _xhrPost({
      csrf,
      url: "ausersystem",
      body: {
        action: "setup",
        type,
        setaction: "delete",
        oldtext: text
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
    handleFetch();
  }

  async function onEditForm({ oldtext, newtext, type, afterEdit }: any) {
    const res = await _xhrPost({
      csrf,
      url: "ausersystem",
      body: {
        action: "setup",
        type,
        setaction: "edit",
        oldtext,
        newtext
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
    afterEdit();
    handleFetch();
  }

  useEffect(() => {
    _onLocalhostFn(() => {
      setForm({
        customer_condition: ["<แก้ไข เงื่อนไขและข้อตกลง>"],
        business_type: [
          "บุคคลธรรมดา",
          "รถรับซื้อของเก่า/ซาเล้ง",
          "ร้านรับซื้อของเก่า",
          "นิติบุคคล(บริษัท/หจก)"
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
    }, handleFetch);
  }, []);

  return (
    <AppContext.Provider value={...passingProps}>
      <div>{form && <FormComponent {...{ form }} />}</div>
    </AppContext.Provider>
  );
};
export default CustomerForm;
