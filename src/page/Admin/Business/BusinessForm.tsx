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
  }

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <AppContext.Provider value={...passingProps}>
      <div>{form && <FormComponent {...{ form }} />}</div>
    </AppContext.Provider>
  );
};
export default BusinessForm;
