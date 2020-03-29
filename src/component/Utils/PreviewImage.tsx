import React, { useContext, useState } from "react";
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    margin: "16px 0"
  },
  gridList: {
    height: 240,
    flexWrap: "nowrap",
    transform: "translateZ(0)"
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
  const [fullscreenItem, setFullscreenItem] = useState<any>(null);

  function handleOpen(image: any) {
    setOpen(true);
    setFullscreenItem(image);
  }

  function handleClose() {
    setOpen(false);
    setFullscreenItem(null);
  }

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={1.25}>
        {[...(editting ? files : Array.from(files))].map(
          (image: any, i: number) => (
            <img
              key={i}
              style={{ height: "100%", width: "auto", boxSizing: "border-box" }}
              src={image}
              alt={`${i}`}
              onClick={() => handleOpen(i)}
            />
          )
        )}
      </GridList>
      <FullscreenImage open={open} onClose={handleClose} fullScreen>
        <div style={{ position: "relative" }}>
          <IconButton
            style={{
              position: "absolute",
              left: 0,
              top: "calc(50% - 12px)",
              backgroundColor: "white",
              opacity: 0.8
            }}
            disabled={fullscreenItem === 0}
            onClick={() => setFullscreenItem((item: any) => item - 1)}
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
            disabled={fullscreenItem === files.length - 1}
            onClick={() => setFullscreenItem((item: any) => item + 1)}
          >
            <ArrowForwardIos />
          </IconButton>
          <img
            style={{ width: "100%" }}
            src={files[fullscreenItem]}
            alt={`full`}
          />
        </div>
      </FullscreenImage>
    </div>
  );
};
export default PreviewImage;
