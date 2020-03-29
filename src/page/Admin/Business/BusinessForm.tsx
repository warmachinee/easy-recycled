import React, { useEffect, useContext, useState } from "react";
import Loadable from "react-loadable";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../../AppContext";

const Condition = Loadable({
  loader: () => import(/* webpackChunkName: 'Condition' */ "./Form/Condition"),
  loading: () => null
});

const Position = Loadable({
  loader: () => import(/* webpackChunkName: 'Position' */ "./Form/Position"),
  loading: () => null
});

const Product = Loadable({
  loader: () => import(/* webpackChunkName: 'Product' */ "./Form/Product"),
  loading: () => null
});

const ProductValue = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'ProductValue' */ "./Form/ProductValue"),
  loading: () => null
});

const useStyles = makeStyles(theme => ({}));

export interface BusinessFormProps {}

const FormComponent: React.FC<any> = ({ form }) => {
  const { form_condition, position, product, productvalue } = form;
  const { sess } = useContext(AppContext);

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

  return (
    <React.Fragment>
      {per4 && (
        <React.Fragment>
          <Condition data={form_condition} />
          <Position data={position} />
        </React.Fragment>
      )}
      {per3 && (
        <React.Fragment>
          <Product data={product} />
          <ProductValue data={productvalue} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const BusinessForm: React.FC<BusinessFormProps> = () => {
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

  async function handleFetch() {
    const resRe = await _xhrPost({
      csrf,
      url: "aloadbusiness",
      body: {
        action: "business_register"
      }
    });
    const res = await _xhrPost({
      csrf: resRe.csrf,
      url: "aloadbusiness",
      body: {
        action: "business_form"
      }
    });
    const thisRegis = resRe.data;
    const thisForm = res.data;
    setCsrf(res.csrf);
    setForm({
      ...thisRegis,
      ...thisForm
    });
    console.log({
      ...thisRegis,
      ...thisForm
    });
  }

  useEffect(() => {
    _onLocalhostFn(() => {
      const thisRegis = { dcondition: "<แก้ไข เงื่อนไขและข้อตกลง>" };
      const thisForm = {
        form_condition: ["<แก้ไข เงื่อนไขและข้อตกลง>"],
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
      };
      setForm({
        ...thisRegis,
        ...thisForm
      });
    }, handleFetch);
  }, []);

  return (
    <AppContext.Provider value={...passingProps}>
      <div>{form && <FormComponent {...{ form }} />}</div>
    </AppContext.Provider>
  );
};
export default BusinessForm;
