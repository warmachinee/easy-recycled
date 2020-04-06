import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Divider,
  Typography,
  Button,
  ListItem,
  ListItemText,
  Theme
} from "@material-ui/core";
import { AppContext } from "../../AppContext";
import { red } from "@material-ui/core/colors";
import GeneralDialog from "../Dialog/GeneralDialog";
import GoodsDetail from "../../page/Admin/Other/GoodsDetail";

const useStyles = makeStyles((theme: Theme) => ({
  content: { flexGrow: 1, padding: "16px 16px 68px 16px", overflow: "auto" },
  buttonGroup: {
    display: "flex",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.default
  }
}));

const NotificationsList: React.FC<any> = ({ type }) => {
  const classes = useStyles();
  const { setNotiPage, notifications, _dateToString, _notiText } = useContext(
    AppContext
  );
  const [goodsDetail, setGoodsDetail] = useState<any>(null);
  const [goodsDetailState, setGoodsDetailState] = useState<boolean>(false);

  const arr = "list" in notifications ? notifications.list : notifications;

  function onClickGoodsDetail(formid: any) {
    setGoodsDetail({ formid });
    setGoodsDetailState(true);
  }

  function onCloseGoodsDetail() {
    setGoodsDetail(null);
    setGoodsDetailState(false);
  }

  return (
    <React.Fragment>
      <Divider />
      {notifications && arr.length > 0 ? (
        arr.map((d: any, i: number) => {
          const isButton: any =
            type !== "customer" &&
            type !== "business" &&
            d.activity &&
            d.activity.method === "edit form";

          return (
            <React.Fragment key={i}>
              <ListItem
                button={isButton}
                onClick={() =>
                  isButton ? onClickGoodsDetail(d.reflink) : console.log()
                }
              >
                <ListItemText
                  primary={
                    <Typography
                      component="span"
                      style={{
                        ...(_notiText({ obj: d, type }).warning && {
                          color: red[600]
                        })
                      }}
                    >
                      {_notiText({ obj: d, type }).primary}
                    </Typography>
                  }
                  secondary={
                    <span style={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        component="span"
                        color="textSecondary"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {_notiText({ obj: d, type }).secondary}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                      >
                        {_dateToString(d.createdate)}
                      </Typography>
                    </span>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })
      ) : (
        <Typography
          style={{ margin: "24px 0" }}
          align="center"
          variant="h4"
          color="textSecondary"
        >
          ไม่มีการแจ้งเตือน
        </Typography>
      )}
      {notifications && arr.length >= 10 && (
        <div className={classes.buttonGroup}>
          <Button
            style={{ width: "calc(100% - 16px)", margin: 8, fontSize: 14 }}
            color="primary"
            variant="text"
            onClick={() => setNotiPage((num: any) => num + 1)}
          >
            โหลดเพิ่ม
          </Button>
        </div>
      )}
      {goodsDetail && (
        <GeneralDialog
          open={goodsDetailState}
          onClose={onCloseGoodsDetail}
          title="รายละเอียดสินค้า"
          maxWidth="sm"
        >
          <GoodsDetail detail={goodsDetail} />
        </GeneralDialog>
      )}
    </React.Fragment>
  );
};
export default NotificationsList;
