import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../AppContext";
import {
  List,
  Divider,
  ListItemText,
  Typography,
  ListItem,
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";
import { red, green } from "@material-ui/core/colors";
import { RouteComponentProps, withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({}));

export interface MarketHistoryProps extends RouteComponentProps<{}> {}

const MarketItem: React.FC<any> = props => {
  const { _dateToString } = useContext(AppContext);
  const { data, history, match } = props;

  return (
    <React.Fragment>
      <ListItem
        button
        onClick={() =>
          history.replace(`/market/${data.formid}?formid=${data.formid}`)
        }
      >
        <ListItemText
          primary={data.business_name}
          secondary={
            <span>
              <span style={{ display: "flex" }}>
                <Typography
                  component="span"
                  variant="body2"
                  style={{ width: 96 }}
                >
                  วันนัดดูสินค้า
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  style={{ fontWeight: 600 }}
                >
                  {`${_dateToString(data.appointment)}`}
                </Typography>
              </span>
              <span style={{ display: "flex" }}>
                <Typography
                  component="span"
                  variant="body2"
                  style={{ width: 96 }}
                >
                  วันนัดประมูล
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  style={{ fontWeight: 600 }}
                >
                  {`${_dateToString(data.auctiondate)}`}
                </Typography>
              </span>
            </span>
          }
        />
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

const MarketHistory: React.FC<MarketHistoryProps> = props => {
  const classes = useStyles();
  const { csrf, setCsrf, profileData, _xhrPost, _onLocalhostFn } = useContext(
    AppContext
  );
  const [marketList, setMarketList] = useState<any>(null);
  const [endOfSale, setEndOfSale] = useState<any>(0);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEndOfSale(event.target.value as string);
  };

  async function getAccess() {
    const res = await _xhrPost({
      csrf,
      url: "loadusersystem",
      body: {
        action: "accessformlist",
        linetoken: profileData.userId,
        type: "customer"
      }
    });
    console.log(res.data);
    setCsrf(res.csrf);
    setMarketList(res.data);
  }

  useEffect(() => {
    _onLocalhostFn(
      () => {
        setMarketList([
          {
            formid: 2315022,
            business_name: "PDS",
            appointment: "2020-03-30T17:00:00.000Z",
            auctiondate: "2020-04-22T17:00:00.000Z",
            endofsale: 0
          },
          {
            formid: 3014238,
            business_name: "KLxHunter",
            appointment: "2020-03-25T17:00:00.000Z",
            auctiondate: "2020-03-25T17:00:00.000Z",
            endofsale: 0
          }
        ]);
      },
      () => {
        if (profileData) {
          getAccess();
        }
      }
    );
  }, [profileData]);

  return (
    <React.Fragment>
      <FormControl style={{ padding: 16 }}>
        <Select value={endOfSale} onChange={handleChange} variant="outlined">
          <MenuItem value={0}>กำลังขาย</MenuItem>
          <MenuItem value={1}>จบการขายแล้ว</MenuItem>
        </Select>
      </FormControl>
      <List>
        {marketList && marketList.length > 0 ? (
          <React.Fragment>
            <Divider />
            {marketList
              .filter((item: any) => item.endofsale === endOfSale)
              .map((d: any) => (
                <MarketItem key={d.formid} data={d} {...props} />
              ))}
          </React.Fragment>
        ) : (
          <Typography variant="h6" style={{ margin: "24px 0" }} align="center">
            ไม่มีรายการ
          </Typography>
        )}
      </List>
    </React.Fragment>
  );
};
export default withRouter(props => <MarketHistory {...props} />);
