import React, { useContext, useEffect, useState } from "react";
import Loadable from "react-loadable";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../../AppContext";

const GeneralSetup = Loadable({
  loader: () => import(/* webpackChunkName: 'GeneralSetup' */ "./GeneralSetup"),
  loading: () => null
});

const OrganizeSize = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'OrganizeSize' */ "./Form/OrganizeSize"),
  loading: () => null
});

const Document = Loadable({
  loader: () => import(/* webpackChunkName: 'Document' */ "./Form/Document"),
  loading: () => null
});

const Transport = Loadable({
  loader: () => import(/* webpackChunkName: 'Transport' */ "./Form/Transport"),
  loading: () => null
});

const useStyles = makeStyles(theme => ({}));

const FormComponent: React.FC<any> = ({ form }) => {
  const { sess } = useContext(AppContext);
  const { org_size, document, transport } = form;
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
      <GeneralSetup />
      {per4 && <OrganizeSize data={org_size} />}
      <Document data={document} />
      <Transport data={transport} />
    </React.Fragment>
  );
};

const SetupForm: React.FC<any> = () => {
  const classes = useStyles();
  const { csrf, setCsrf, _xhrPost, _onLocalhostFn } = useContext(AppContext);
  const [form, setForm] = useState<any>(null);
  const passingProps: any = {
    ...useContext(AppContext),
    form,
    getCustomerRegister,
    onInserForm,
    onDeleteForm,
    onEditForm
  };

  async function getCustomerRegister() {
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
    const sendObj = {
      action: "setup",
      type,
      setaction: "insert",
      newtext: state
    };
    const res = await _xhrPost({
      csrf,
      url: "ausersystem",
      body: sendObj
    });

    setCsrf(res.csrf);
    setState("");
    getCustomerRegister();
  }

  async function onDeleteForm({ text, type }: any) {
    const sendObj = {
      action: "setup",
      type,
      setaction: "delete",
      oldtext: text
    };
    const res = await _xhrPost({
      csrf,
      url: "ausersystem",
      body: sendObj
    });

    setCsrf(res.csrf);
    getCustomerRegister();
  }

  async function onEditForm({ oldtext, newtext, type, afterEdit }: any) {
    const sendObj = {
      action: "setup",
      type,
      setaction: "edit",
      oldtext,
      newtext
    };
    const res = await _xhrPost({
      csrf,
      url: "ausersystem",
      body: sendObj
    });

    setCsrf(res.csrf);
    afterEdit();
    getCustomerRegister();
  }

  useEffect(() => {
    getCustomerRegister();
  }, []);

  return (
    <AppContext.Provider value={...passingProps}>
      <div>{form && <FormComponent {...{ form }} />}</div>
    </AppContext.Provider>
  );
};
export default SetupForm;
