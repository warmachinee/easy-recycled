import React, { useContext, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles } from "@material-ui/styles";
import { Theme, GridList, IconButton } from "@material-ui/core";
import {
  Close,
  Fullscreen as FullscreenIcon,
  ArrowBackIos,
  ArrowForwardIos,
} from "@material-ui/icons";
import { AppContext } from "../../AppContext";
import FullscreenImage from "../Dialog/FullscreenImage";
import { grey, red } from "@material-ui/core/colors";
import AppButton from "../../AppComponent/AppButton";
import ConfirmDialog from "../Dialog/ConfirmDialog";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    margin: "16px 0",
  },
  slider: {
    position: "relative",
    width: "100%",
  },
  itemGrid: {
    height: 300,
    backgroundColor: grey[900],
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  item: {
    maxHeight: 300,
    width: "100%",
    display: "block",
    objectFit: "contain",
  },
}));

export interface PreviewImageProps {}

const PreviewImage: React.FC<PreviewImageProps | any> = ({
  files,
  editting,
  rawAlbum,
  loadBusinessForm,
  thisFormId,
}) => {
  const classes = useStyles();
  const {
    csrf,
    setCsrf,
    _xhrPost,
    addSnackbar,
    _openFullScreen,
    _closeFullscreen,
    profileData,
  } = useContext(AppContext);
  const [open, setOpen] = useState<any>(false);
  const [fullscreenItem, setFullscreenItem] = useState<any>(0);
  const imgArr = [...(editting ? files : Array.from(files))];
  const [onDeleteState, setOnDeleteState] = useState<any>(false);

  function handleOpen(image: any) {
    setOpen(true);
    setFullscreenItem(image);
  }

  function handleClose() {
    setOpen(false);
  }

  function onBack() {
    setFullscreenItem((item: any) => {
      if (item - 1 >= 0) {
        return (item - 1) % imgArr.length;
      } else {
        return (item - 1 + imgArr.length) % imgArr.length;
      }
    });
  }

  function onNext() {
    setFullscreenItem((item: any) => (item + 1) % imgArr.length);
  }

  function onDeleteImage() {
    setOnDeleteState(true);
  }

  function onCancelDelete() {
    setOnDeleteState(false);
  }

  async function onDeletePic() {
    const sendObj = {
      action: "delpic",
      formid: thisFormId,
      linetoken: profileData.userId,
      picpath: rawAlbum[fullscreenItem],
    };
    console.log(sendObj);
    const res = await _xhrPost({
      csrf,
      url: "formsystem",
      body: sendObj,
    });
    setCsrf(res.csrf);
    if (res.data.status === "success") {
      addSnackbar({ message: "ลบรูปสำเร็จ", variant: "success" });
      loadBusinessForm();
      onCancelDelete();
      onBack();
    } else {
      addSnackbar({ message: "ลบรูปไม่สำเร็จ", variant: "error" });
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.slider}>
        <SwipeableViews index={fullscreenItem} className={classes.item}>
          {imgArr.map((image: any, i: number) => (
            <div key={i} className={classes.itemGrid}>
              <img
                className={classes.item}
                src={image}
                alt={`${i}`}
                onClick={() => handleOpen(i)}
              />
            </div>
          ))}
        </SwipeableViews>
        {imgArr.length > 1 && (
          <React.Fragment>
            <IconButton
              style={{
                position: "absolute",
                left: 0,
                top: "calc(50% - 12px)",
                backgroundColor: "white",
                opacity: 0.8,
              }}
              onClick={onBack}
            >
              <ArrowBackIos />
            </IconButton>
            <IconButton
              style={{
                position: "absolute",
                right: 0,
                top: "calc(50% - 12px)",
                backgroundColor: "white",
                opacity: 0.8,
              }}
              onClick={onNext}
            >
              <ArrowForwardIos />
            </IconButton>
          </React.Fragment>
        )}
        {rawAlbum && profileData && (
          <AppButton
            buttonColor={red}
            variant="contained"
            size="small"
            style={{
              position: "absolute",
              right: 4,
              bottom: 4,
            }}
            onClick={onDeleteImage}
          >
            ลบรูป
          </AppButton>
        )}
      </div>
      <FullscreenImage open={open} onClose={handleClose} fullScreen>
        <div
          className={classes.slider}
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <SwipeableViews index={fullscreenItem}>
            {imgArr.map((image: any, i: number) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    maxHeight: window.innerHeight - 48,
                    objectFit: "contain",
                  }}
                  src={image}
                  alt={`${i}`}
                />
              </div>
            ))}
          </SwipeableViews>
          {imgArr.length > 1 && (
            <React.Fragment>
              <IconButton
                style={{
                  position: "absolute",
                  left: 0,
                  top: "calc(50% - 12px)",
                  backgroundColor: "white",
                  opacity: 0.8,
                }}
                onClick={onBack}
              >
                <ArrowBackIos />
              </IconButton>
              <IconButton
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(50% - 12px)",
                  backgroundColor: "white",
                  opacity: 0.8,
                }}
                onClick={onNext}
              >
                <ArrowForwardIos />
              </IconButton>
            </React.Fragment>
          )}
        </div>
      </FullscreenImage>
      {rawAlbum && profileData && (
        <ConfirmDialog
          type="delete"
          open={onDeleteState}
          onClose={onCancelDelete}
          onCancel={onCancelDelete}
          onSubmit={onDeletePic}
          title="คุณแน่ใจหรือไม่ว่าต้องการจะลบรูป ?"
        >
          <img
            style={{ width: "100%" }}
            src={imgArr[fullscreenItem]}
            alt={rawAlbum[fullscreenItem]}
          />
        </ConfirmDialog>
      )}
    </div>
  );
};
export default PreviewImage;
