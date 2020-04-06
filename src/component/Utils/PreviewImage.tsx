import React, { useContext, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles } from "@material-ui/styles";
import { Theme, GridList, IconButton } from "@material-ui/core";
import {
  Close,
  Fullscreen as FullscreenIcon,
  ArrowBackIos,
  ArrowForwardIos
} from "@material-ui/icons";
import { AppContext } from "../../AppContext";
import FullscreenImage from "../Dialog/FullscreenImage";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    margin: "16px 0"
  },
  slider: {
    position: "relative",
    width: "100%"
  },
  itemGrid: {
    height: 240,
    backgroundColor: grey[900],
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  item: {
    maxHeight: 240,
    width: "100%",
    display: "block"
  }
}));

export interface PreviewImageProps {}

const PreviewImage: React.FC<PreviewImageProps | any> = ({
  files,
  editting
}) => {
  const classes = useStyles();
  const { _openFullScreen, _closeFullscreen } = useContext(AppContext);
  const [open, setOpen] = useState<any>(false);
  const [fullscreenItem, setFullscreenItem] = useState<any>(0);
  const imgArr = [...(editting ? files : Array.from(files))];

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
        <IconButton
          style={{
            position: "absolute",
            left: 0,
            top: "calc(50% - 12px)",
            backgroundColor: "white",
            opacity: 0.8
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
            opacity: 0.8
          }}
          onClick={onNext}
        >
          <ArrowForwardIos />
        </IconButton>
      </div>
      <FullscreenImage open={open} onClose={handleClose} fullScreen>
        <div
          className={classes.slider}
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <SwipeableViews index={fullscreenItem}>
            {imgArr.map((image: any, i: number) => (
              <img key={i} style={{ width: "100%" }} src={image} alt={`${i}`} />
            ))}
          </SwipeableViews>
          <IconButton
            style={{
              position: "absolute",
              left: 0,
              top: "calc(50% - 12px)",
              backgroundColor: "white",
              opacity: 0.8
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
              opacity: 0.8
            }}
            onClick={onNext}
          >
            <ArrowForwardIos />
          </IconButton>
        </div>
      </FullscreenImage>
    </div>
  );
};
export default PreviewImage;
