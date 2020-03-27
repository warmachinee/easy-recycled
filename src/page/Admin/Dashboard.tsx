import React, { useEffect, useContext, useState } from "react";
import Loadable from "react-loadable";
import { ResponsivePie } from "@nivo/pie";
import { makeStyles } from "@material-ui/styles";
import { Theme, Typography, useTheme } from "@material-ui/core";
import { RouteComponentProps, withRouter, Route } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { red, green, grey } from "@material-ui/core/colors";

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
    margin: "auto",
    overflowX: "auto"
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
  const { csrf, setCsrf, _xhrPost, _thousandSeperater } = useContext(
    AppContext
  );
  const [dashboard, setDashboard] = useState<any>(null);

  async function getDashboardData() {
    const res = await _xhrPost({
      csrf,
      url: "aloadusersystem",
      body: {
        action: "diskspace"
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
    setDashboard({
      diskspace: {
        data: res.data,
        chart: [
          {
            id: "พื้นที่เหลือใช้",
            label: "พื้นที่เหลือใช้",
            value: res.data.free,
            status: "free"
          },
          {
            id: "ใช้ไปแล้ว",
            label: "ใช้ไปแล้ว",
            value: res.data.size - res.data.free,
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
      {dashboard && (
        <React.Fragment>
          <div className={classes.pieChartGrid}>
            <div className={classes.pieChart}>
              <ResponsivePie
                data={dashboard.diskspace.chart}
                radialLabel={(d: any) =>
                  `${d.label} (${(d.value / 100).toFixed(2)} GB)`
                }
                sliceLabel={d =>
                  `${((d.value / dashboard.diskspace.data.size) * 100).toFixed(
                    1
                  )}%`
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
        </React.Fragment>
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
    console.log(res.data);
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
        <AdminSideNav />
        <AdminGrid>
          <Route exact path={match.path} component={DefaultComponent} />
          <Route path={`${match.path}/topup`} component={Topup} />
          <Route path={`${match.path}/goods_list`} component={GoodsList} />
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
