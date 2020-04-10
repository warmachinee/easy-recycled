import React, { useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../AppContext";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { green, red, grey } from "@material-ui/core/colors";
import Progress from "../../component/Utils/Progress";
import { Search, Clear } from "@material-ui/icons";
import SearchBox from "../../component/Utils/SearchBox";

const useStyles = makeStyles((theme) => ({}));

export interface MarketListProps extends RouteComponentProps<{}> {}

const MarketItem: React.FC<any> = (props) => {
  const { _dateToString, _parseLocation } = useContext(AppContext);
  const { data, history, match, setSearch } = props;

  return (
    <React.Fragment>
      <ListItem
        button
        onClick={() => {
          if (data.accessremain !== 0) {
            setSearch("");
            history.replace(`${match.path}/${data.formid}`);
          }
        }}
        {...(data.accessremain === 0 && {
          style: { opacity: 0.7, backgroundColor: grey[200] },
        })}
      >
        <ListItemText
          primary={
            <Typography style={{ whiteSpace: "pre-line" }} component="span">
              {data.product.map((d: any) => d.product).join(", ")}
            </Typography>
          }
          secondary={
            <span style={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="body1"
                color="textSecondary"
                component="span"
              >
                {_parseLocation(data.location).label}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  color: data.price ? red[600] : green[600],
                  fontWeight: 700,
                }}
                component="span"
              >
                {data.price ? `ราคาเข้าชม ${data.price} บาท` : `เข้าชมฟรี`}
              </Typography>
            </span>
          }
        />
        {data.price && (
          <ListItemText
            style={{ flex: "none" }}
            primary={`${data.accessremain}/${data.accesstotal}`}
          />
        )}
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

const MarketList: React.FC<MarketListProps | any> = (props) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    _xhrGet,
    profileData,
    checkSession,
    marketList,
    _parseLocation,
  } = useContext(AppContext);
  const { history, location } = props;
  const [search, setSearch] = useState<any>("");

  function onSearch(item: any) {
    return (
      item.product
        .map((pd: any) => pd.product)
        .join(", ")
        .search(search) !== -1 ||
      _parseLocation(item.location).label.search(search) !== -1 ||
      item.price.search(search) !== -1
    );
  }

  return (
    <List>
      {marketList && !("status" in marketList) && marketList.length > 0 && (
        <React.Fragment>
          <Divider />
          <SearchBox {...{ search, setSearch }} label="ค้นหาสินค้า" />
          <Divider />
        </React.Fragment>
      )}
      {marketList ? (
        !("status" in marketList) &&
        (marketList.filter(onSearch).length > 0 ? (
          marketList
            .filter(onSearch)
            .map((d: any) => (
              <MarketItem
                key={d.formid}
                data={d}
                {...props}
                {...{ setSearch }}
              />
            ))
        ) : (
          <Typography
            style={{ margin: "24px 0" }}
            align="center"
            variant="h4"
            color="textSecondary"
          >
            ไม่มีรายการ
          </Typography>
        ))
      ) : (
        <Progress />
      )}
    </List>
  );
};
export default withRouter((props) => <MarketList {...props} />);
