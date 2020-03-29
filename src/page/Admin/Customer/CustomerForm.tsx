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
          <Condition data={customer_condition} />
          <BusinessType data={business_type} />
        </React.Fragment>
      )}
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

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <AppContext.Provider value={...passingProps}>
      <div>{form && <FormComponent {...{ form }} />}</div>
    </AppContext.Provider>
  );
};
export default CustomerForm;
