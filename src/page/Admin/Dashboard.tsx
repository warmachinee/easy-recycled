import React, { useEffect, useContext, useState } from "react";
import Loadable from "react-loadable";
import { ResponsivePie } from "@nivo/pie";
import { makeStyles } from "@material-ui/styles";
import { Theme, Typography, useTheme, Paper } from "@material-ui/core";
import { RouteComponentProps, withRouter, Route } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { red, green, grey } from "@material-ui/core/colors";

const AdminList = Loadable({
  loader: () => import(/* webpackChunkName: 'AdminList' */ "./Other/AdminList"),
  loading: () => null
});

const AdminHeader = Loadable({
  loader: () => import(/* webpackChunkName: 'AdminHeader' */ "./AdminHeader"),
  loading: () => null
});

const AdminSideNav = Loadable({
  loader: () => import(/* webpackChunkName: 'AdminSideNav' */ "./AdminSideNav"),
  loading: () => null
});

const Topup = Loadable({
  loader: () => import(/* webpackChunkName: 'Topup' */ "./Other/Topup"),
  loading: () => null
});

const GoodsList = Loadable({
  loader: () => import(/* webpackChunkName: 'GoodsList' */ "./Other/GoodsList"),
  loading: () => null
});

const SetupForm = Loadable({
  loader: () => import(/* webpackChunkName: 'SetupForm' */ "./Other/SetupForm"),
  loading: () => null
});

const CustomerList = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'CustomerList' */ "./Customer/CustomerList"),
  loading: () => null
});

const CustomerForm = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'CustomerForm' */ "./Customer/CustomerForm"),
  loading: () => null
});

const BusinessList = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'BusinessList' */ "./Business/BusinessList"),
  loading: () => null
});

const BusinessForm = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'BusinessForm' */ "./Business/BusinessForm"),
  loading: () => null
});

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginLeft: 240
  },
  contentChild: {
    height: `calc(100vh - ${64 + 24 * 2}px)`,
    maxWidth: 1200,
    margin: "auto"
  },
  pieChartGrid: { minWidth: 600, position: "relative" },
  pieChart: { height: 400, width: "auto" },
  chartLabel: { position: "absolute", bottom: 16, width: "100%" }
}));

export type DashboardProps = RouteComponentProps<{}>;

const chartTheme = {
  labels: {
    text: {
      fontSize: 16,
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(",")
    }
  }
};

const defs = [
  {
    id: "total",
    type: "patternDots",
    background: "inherit",
    color: red[400],
    size: 4,
    padding: 1,
    stagger: true
  },
  {
    id: "free",
    type: "patternLines",
    background: "inherit",
    color: green[400],
    rotation: -45,
    lineWidth: 6,
    spacing: 7
  }
];

function getFill(data: any) {
  let variant = "";
  switch (data.status) {
    case "total":
      variant = "total";
      break;
    case "free":
      variant = "free";
      break;
    default:
      variant = "free";
  }
  return {
    match: {
      id: data.id
    },
    id: variant
  };
}

const AdminGrid: React.FC<any> = ({ children }) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.contentChild}>{children}</div>
    </main>
  );
};

const ChartTooltip: React.FC<any> = ({ label, value }) => {
  const theme = useTheme();
  return (
    <div style={{ display: "flex" }}>
      <Typography
        variant="body1"
        style={{
          color: theme.palette.grey[900],
          fontWeight: 400,
          marginRight: 16
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        style={{
          color: theme.palette.grey[900],
          fontWeight: 700,
          marginRight: 8
        }}
      >
        {value}
      </Typography>
    </div>
  );
};

const DefaultComponent: React.FC<any> = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { csrf, setCsrf, _xhrPost, _thousandSeperater, sess } = useContext(
    AppContext
  );
  const [dashboard, setDashboard] = useState<any>(null);

  async function getDashboardData() {
    const res = await _xhrPost({
      csrf,
      url: "aloadusersystem",
      body: {
        action: "dashboard"
      }
    });

    setCsrf(res.csrf);
    setDashboard({
      ...res.data,
      diskspace: {
        data: res.data.disk,
        chart: [
          {
            id: "พื้นที่เหลือใช้",
            label: "พื้นที่เหลือใช้",
            value: res.data.disk.free,
            status: "free"
          },
          {
            id: "ใช้ไปแล้ว",
            label: "ใช้ไปแล้ว",
            value: res.data.disk.use,
            status: "total"
          }
        ]
      }
    });
  }

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div>
      {sess && sess.type === "main_admin" && dashboard && (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={classes.pieChartGrid}>
              <div className={classes.pieChart}>
                <ResponsivePie
                  data={dashboard.diskspace.chart}
                  radialLabel={(d: any) =>
                    `${d.label} (${(d.value / 1000).toFixed(2)} GB)`
                  }
                  sliceLabel={d =>
                    `${(
                      (d.value / dashboard.diskspace.data.size) *
                      100
                    ).toFixed(1)}%`
                  }
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0}
                  padAngle={0.7}
                  cornerRadius={3}
                  borderWidth={1}
                  borderColor={{ theme: "grid.line.stroke" }}
                  radialLabelsSkipAngle={9}
                  radialLabelsTextXOffset={6}
                  radialLabelsTextColor={theme.palette.text.primary}
                  radialLabelsLinkOffset={0}
                  radialLabelsLinkDiagonalLength={16}
                  radialLabelsLinkHorizontalLength={24}
                  radialLabelsLinkStrokeWidth={1}
                  radialLabelsLinkColor={theme.palette.text.primary}
                  slicesLabelsTextColor={grey[900]}
                  slicesLabelsSkipAngle={12}
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                  defs={defs}
                  fill={dashboard.diskspace.chart.map((d: any) => {
                    return getFill(d);
                  })}
                  tooltip={d => {
                    const val = d.value
                      .toFixed(2)
                      .toString()
                      .split(".");
                    return (
                      <ChartTooltip
                        label={d.label}
                        value={`${_thousandSeperater(val[0])}.${val[1]}`}
                      />
                    );
                  }}
                  theme={chartTheme}
                />
              </div>
              <Typography
                variant="h6"
                align="center"
                className={classes.chartLabel}
              >
                พื้นที่จัดเก็บข้อมูล
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 240
              }}
            >
              <Paper
                elevation={3}
                style={{
                  padding: 16,
                  margin: 16,
                  width: "100%",
                  boxSizing: "border-box"
                }}
              >
                <Typography style={{ marginBottom: 24 }}>
                  ลูกค้าในระบบ
                </Typography>
                <div style={{ display: "flex" }}>
                  <Typography
                    variant="h6"
                    style={{
                      color: green[600],
                      fontWeight: 600,
                      flex: 1,
                      marginRight: 16
                    }}
                    align="right"
                  >
                    {_thousandSeperater(dashboard.total.customer)}
                  </Typography>
                  <Typography variant="h6">คน</Typography>
                </div>
              </Paper>
              <Paper
                elevation={3}
                style={{
                  padding: 16,
                  margin: 16,
                  width: "100%",
                  boxSizing: "border-box"
                }}
              >
                <Typography style={{ marginBottom: 24 }}>
                  เจ้าของกิจการในระบบ
                </Typography>
                <div style={{ display: "flex" }}>
                  <Typography
                    variant="h6"
                    style={{
                      color: green[600],
                      fontWeight: 600,
                      flex: 1,
                      marginRight: 16
                    }}
                    align="right"
                  >
                    {_thousandSeperater(dashboard.total.business)}
                  </Typography>
                  <Typography variant="h6">คน</Typography>
                </div>
              </Paper>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ width: "100%", maxWidth: 500 }}>
              <Typography variant="h6" style={{ margin: "0 16px" }}>
                รายวัน
              </Typography>
              <div style={{ display: "flex" }}>
                <Paper
                  elevation={3}
                  style={{ padding: 16, margin: 16, flex: 1 }}
                >
                  <Typography style={{ marginBottom: 16 }}>
                    ผู้ใช้งานใหม่
                  </Typography>
                  <div style={{ display: "flex" }}>
                    <Typography
                      variant="h6"
                      style={{
                        color: green[600],
                        fontWeight: 600,
                        flex: 1,
                        marginRight: 16
                      }}
                      align="right"
                    >
                      {_thousandSeperater(dashboard.day.newuser)}
                    </Typography>
                    <Typography variant="h6">คน</Typography>
                  </div>
                </Paper>
                <div style={{ padding: 16, margin: 16, flex: 1 }} />
              </div>
              <div style={{ display: "flex" }}>
                <Paper
                  elevation={3}
                  style={{ padding: 16, margin: 16, flex: 1 }}
                >
                  <Typography style={{ marginBottom: 16 }}>ลงสินค้า</Typography>
                  <div style={{ display: "flex" }}>
                    <Typography
                      variant="h6"
                      style={{
                        color: green[600],
                        fontWeight: 600,
                        flex: 1,
                        marginRight: 16
                      }}
                      align="right"
                    >
                      {_thousandSeperater(dashboard.day.createform)}
                    </Typography>
                    <Typography variant="h6">ครั้ง</Typography>
                  </div>
                </Paper>
                <Paper
                  elevation={3}
                  style={{ padding: 16, margin: 16, flex: 1 }}
                >
                  <Typography style={{ marginBottom: 16 }}>
                    เข้าดูสินค้า
                  </Typography>
                  <div style={{ display: "flex" }}>
                    <Typography
                      variant="h6"
                      style={{
                        color: green[600],
                        fontWeight: 600,
                        flex: 1,
                        marginRight: 16
                      }}
                      align="right"
                    >
                      {_thousandSeperater(dashboard.day.accessform)}
                    </Typography>
                    <Typography variant="h6">ครั้ง</Typography>
                  </div>
                </Paper>
              </div>
              <div style={{ display: "flex" }}>
                <Paper
                  elevation={3}
                  style={{ padding: 16, margin: 16, flex: 1 }}
                >
                  <Typography style={{ marginBottom: 16 }}>จบการขาย</Typography>
                  <div style={{ display: "flex" }}>
                    <Typography
                      variant="h6"
                      style={{
                        color: green[600],
                        fontWeight: 600,
                        flex: 1,
                        marginRight: 16
                      }}
                      align="right"
                    >
                      {_thousandSeperater(dashboard.day.endofsale)}
                    </Typography>
                    <Typography variant="h6">ครั้ง</Typography>
                  </div>
                </Paper>
                <Paper
                  elevation={3}
                  style={{ padding: 16, margin: 16, flex: 1 }}
                >
                  <Typography style={{ marginBottom: 16 }}>เติมเงิน</Typography>
                  <div style={{ display: "flex" }}>
                    <Typography
                      variant="h6"
                      style={{
                        color: green[600],
                        fontWeight: 600,
                        flex: 1,
                        marginRight: 16
                      }}
                      align="right"
                    >
                      {_thousandSeperater(dashboard.day.topup)}
                    </Typography>
                    <Typography variant="h6">ครั้ง</Typography>
                  </div>
                </Paper>
              </div>
            </div>
            <div style={{ width: "100%", maxWidth: 500 }}>
              <Typography variant="h6" style={{ margin: "0 16px" }}>
                รายเดือน
              </Typography>
              <div style={{ display: "flex" }}>
                <Paper
                  elevation={3}
                  style={{ padding: 16, margin: 16, flex: 1 }}
                >
                  <Typography style={{ marginBottom: 16 }}>
                    ผู้ใช้งานใหม่
                  </Typography>
                  <div style={{ display: "flex" }}>
                    <Typography
                      variant="h6"
                      style={{
                        color: green[600],
                        fontWeight: 600,
                        flex: 1,
                        marginRight: 16
                      }}
                      align="right"
                    >
                      {_thousandSeperater(dashboard.month.newuser)}
                    </Typography>
                    <Typography variant="h6">คน</Typography>
                  </div>
                </Paper>
                <div style={{ padding: 16, margin: 16, flex: 1 }} />
              </div>
              <div style={{ display: "flex" }}>
                <Paper
                  elevation={3}
                  style={{ padding: 16, margin: 16, flex: 1 }}
                >
                  <Typography style={{ marginBottom: 16 }}>ลงสินค้า</Typography>
                  <div style={{ display: "flex" }}>
                    <Typography
                      variant="h6"
                      style={{
                        color: green[600],
                        fontWeight: 600,
                        flex: 1,
                        marginRight: 16
                      }}
                      align="right"
                    >
                      {_thousandSeperater(dashboard.month.createform)}
                    </Typography>
                    <Typography variant="h6">ครั้ง</Typography>
                  </div>
                </Paper>
                <Paper
                  elevation={3}
                  style={{ padding: 16, margin: 16, flex: 1 }}
                >
                  <Typography style={{ marginBottom: 16 }}>
                    เข้าดูสินค้า
                  </Typography>
                  <div style={{ display: "flex" }}>
                    <Typography
                      variant="h6"
                      style={{
                        color: green[600],
                        fontWeight: 600,
                        flex: 1,
                        marginRight: 16
                      }}
                      align="right"
                    >
                      {_thousandSeperater(dashboard.month.accessform)}
                    </Typography>
                    <Typography variant="h6">ครั้ง</Typography>
                  </div>
                </Paper>
              </div>
              <div style={{ display: "flex" }}>
                <Paper
                  elevation={3}
                  style={{ padding: 16, margin: 16, flex: 1 }}
                >
                  <Typography style={{ marginBottom: 16 }}>จบการขาย</Typography>
                  <div style={{ display: "flex" }}>
                    <Typography
                      variant="h6"
                      style={{
                        color: green[600],
                        fontWeight: 600,
                        flex: 1,
                        marginRight: 16
                      }}
                      align="right"
                    >
                      {_thousandSeperater(dashboard.month.endofsale)}
                    </Typography>
                    <Typography variant="h6">ครั้ง</Typography>
                  </div>
                </Paper>
                <Paper
                  elevation={3}
                  style={{ padding: 16, margin: 16, flex: 1 }}
                >
                  <Typography style={{ marginBottom: 16 }}>เติมเงิน</Typography>
                  <div style={{ display: "flex" }}>
                    <Typography
                      variant="h6"
                      style={{
                        color: green[600],
                        fontWeight: 600,
                        flex: 1,
                        marginRight: 16
                      }}
                      align="right"
                    >
                      {_thousandSeperater(dashboard.month.topup)}
                    </Typography>
                    <Typography variant="h6">ครั้ง</Typography>
                  </div>
                </Paper>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ match, history, location }) => {
  const { csrf, setCsrf, _xhrPost, sess } = useContext(AppContext);
  const passingProps: any = {
    ...useContext(AppContext),
    sess
  };

  async function getInfo() {
    const res = await _xhrPost({
      csrf,
      url: "aloadusersystem",
      body: {
        action: "info"
      }
    });

    setCsrf(res.csrf);
  }

  useEffect(() => {
    if (sess && sess.status === "need login before") {
      history.replace(match.path);
    }
    getInfo();
  }, []);

  return (
    <AppContext.Provider value={...passingProps}>
      <div>
        <AdminHeader />
        {sess && <AdminSideNav {...{ sess }} />}
        <AdminGrid>
          <Route exact path={match.path} component={DefaultComponent} />
          <Route path={`${match.path}/topup`} component={Topup} />
          <Route path={`${match.path}/goods_list`} component={GoodsList} />
          <Route path={`${match.path}/admin_list`} component={AdminList} />
          <Route path={`${match.path}/setup`} component={SetupForm} />

          <Route
            path={`${match.path}/customer_list`}
            component={CustomerList}
          />
          <Route
            path={`${match.path}/customer_form`}
            component={CustomerForm}
          />

          <Route
            path={`${match.path}/business_list`}
            component={BusinessList}
          />
          <Route
            path={`${match.path}/business_form`}
            component={BusinessForm}
          />
        </AdminGrid>
      </div>
    </AppContext.Provider>
  );
};

export default withRouter(props => <Dashboard {...props} />);
