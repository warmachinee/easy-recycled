import React, { useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../AppContext";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography
} from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { green, red, grey } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({}));

export interface MarketListProps extends RouteComponentProps<{}> {}

const MarketItem: React.FC<any> = props => {
  const { _dateToString } = useContext(AppContext);
  const { data, history, match } = props;

  return (
    <React.Fragment>
      <ListItem
        button
        onClick={() =>
          data.accessremain === 0
            ? console.log()
            : history.replace(`${match.path}/${data.formid}`)
        }
        {...(data.accessremain === 0 && {
          style: { opacity: 0.7, backgroundColor: grey[200] }
        })}
      >
        <ListItemText
          primary={data.business_name}
          secondary={
            <Typography
              variant="body2"
              style={{
                color: data.price ? red[600] : green[600],
                fontWeight: 700
              }}
            >
              {data.price ? `ราคาเข้าชม ${data.price} บาท` : `เข้าชมฟรี`}
            </Typography>
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

const MarketList: React.FC<MarketListProps | any> = props => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    _xhrGet,
    profileData,
    checkSession,
    passedFormid,
    marketList
  } = useContext(AppContext);
  const { history, location } = props;

  return (
    <List style={{ marginTop: 16 }}>
      <Divider />
      {marketList &&
        !("status" in marketList) &&
        marketList.map((d: any) => (
          <MarketItem key={d.formid} data={d} {...props} />
        ))}
    </List>
  );
};
export default withRouter(props => <MarketList {...props} />);
