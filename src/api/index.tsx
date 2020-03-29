import * as Handler from "./Handler";
const api: any = {
  /**---------- /user ----------*/
  session: "/user/session",
  login: "/user/login",
  logout: "/user/logout",
  register: "/user/register",
  loadusersystem: "/user/loadusersystem",
  loadregister: "/user/loadregister",
  usersystem: "/user/usersystem",
  /**---------- /form ----------*/
  loadform: "/form/loadform",
  formsystem: "/form/formsystem",
  /**---------- /admin ----------*/
  asession: "/admin/session",
  alogout: "/admin/logout",
  alogin: "/admin/login",
  aregister: "/admin/register",
  aloadusersystem: "/admin/loadusersystem",
  ausersystem: "/admin/usersystem",
  aloadcustomer: "/admin/loadcustomer",
  acustomersystem: "/admin/customersystem",
  aloadbusiness: "/admin/loadbusiness",
  abusinesssystem: "/admin/businesssystem",
  aloadtopup: "/admin/loadtopup",
  atopupsystem: "/admin/topupsystem",
  "": "/"
};

const apiUrl = (url: string) => {
  return window.location.origin + api[url];
};

function _xhrGet(url: string) {
  return new Promise(resolve => {
    var req = new XMLHttpRequest();
    req.open("GET", apiUrl(url), false);
    req.send(null);
    resolve({
      csrf: req.getResponseHeader("csrf-token"),
      data: JSON.parse(req.responseText)
    });
  });
}

interface _xhrPostProps {
  csrf: any;
  url: any;
  body?: any;
}
function _xhrPost(props: _xhrPostProps) {
  return new Promise(resolve => {
    const { csrf, url, body } = props;
    var req = new XMLHttpRequest();
    req.open("POST", apiUrl(url), true);
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Cache-Control", "no-cache");
    req.onreadystatechange = () => {
      if (req.readyState !== 4) return;
      if (req.status >= 200 && req.status < 300) {
        if (req.responseText) {
          resolve({
            csrf: req.getResponseHeader("csrf-token"),
            data: JSON.parse(req.responseText)
          });
        } else {
          console.log(req.responseText);
        }
      }
    };
    req.send(
      JSON.stringify({
        _csrf: csrf,
        ...body
      })
    );
  });
}

interface _fetchFileProps {
  url: string;
  csrf: string;
  headers?: any;
  body?: any;
}
function _fetchFile(props: _fetchFileProps) {
  return new Promise(async resolve => {
    const { url, csrf, headers, body } = props;
    const formData = new FormData();
    const objKeys = Object.keys(body)[0];
    formData.append(objKeys, body[objKeys]);
    const options = {
      async: true,
      crossDomain: true,
      method: "post",
      headers,
      body: formData
    };
    // console.log(options);
    const res = await fetch(`${apiUrl(url)}?_csrf=${csrf}`, options);
    const json = await res.json();
    const thisCsrf: any = await getCSRF();
    resolve({
      csrf: thisCsrf,
      data: json
    });
  });
}

interface _fetchFileMultipleProps {
  url: string;
  csrf: string;
  headers?: any;
  body?: any;
}
function _fetchFileMultiple(props: _fetchFileMultipleProps) {
  return new Promise(async resolve => {
    const { url, csrf, headers, body } = props;
    const formData = new FormData();
    const objKeys = Object.keys(body)[0];
    // formData.append(objKeys, body[objKeys]);

    const imageArr = Array.from(body[objKeys]);
    imageArr.forEach((image: any) => {
      formData.append(objKeys, image);
    });

    const options = {
      async: true,
      crossDomain: true,
      method: "post",
      headers,
      body: formData
    };
    // console.log(options);
    const res = await fetch(`${apiUrl(url)}?_csrf=${csrf}`, options);
    const json = await res.json();
    const thisCsrf: any = await getCSRF();
    resolve({
      csrf: thisCsrf,
      data: json
    });
  });
}

function getCSRF() {
  return new Promise(resolve => {
    var req = new XMLHttpRequest();
    req.open("GET", window.location.origin, false);
    req.send(null);
    resolve(req.getResponseHeader("csrf-token"));
  });
}

export const exportApi = {
  ...Handler,
  apiUrl,
  _xhrGet,
  _xhrPost,
  _fetchFile,
  _fetchFileMultiple
};
