import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { PhotoCamera } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";
import { AppContext } from "../../AppContext";

const useStyles = makeStyles((theme) => ({}));

const UploadAlbum: React.FC<any> = (props) => {
  const {
    album,
    setAlbum,
    albumDisplay,
    setAlbumDisplay,
    label,
    fullWidth = false,
    editting,
  } = props;
  const classes = useStyles();
  const { _isSupportMultipleFile } = useContext(AppContext);

  function handlePicture(event: React.ChangeEvent<HTMLInputElement>) {
    const isSupport = false;
    if (isSupport) {
      if (event.target.files && event.target.files.length > 0) {
        const files = event.target.files;
        setAlbum(files);
        if (setAlbumDisplay) {
          const tempImgArr: any = [];
          const imageArr = Array.from(files);
          imageArr.forEach((image: any, i: number) => {
            tempImgArr.push(URL.createObjectURL(image));
          });
          setAlbumDisplay(tempImgArr);
        }
      } else {
        setAlbum(null);
        if (setAlbumDisplay) {
          setAlbumDisplay(null);
        }
      }
    } else {
      if (event.target.files && event.target.files.length > 0) {
        const files = event.target.files[0];
        const thisAlbum = album ? [...album] : [];
        thisAlbum.push(files);
        setAlbum(thisAlbum);
        // console.log({ files, album, thisAlbum });
        if (setAlbumDisplay) {
          var reader = new FileReader();
          reader.readAsDataURL(files);
          reader.onloadend = function () {
            const thisAlbumDisplay = albumDisplay ? [...albumDisplay] : [];
            thisAlbumDisplay.push(reader.result);
            setAlbumDisplay(thisAlbumDisplay);
            // console.log({ albumDisplay, thisAlbumDisplay });
          };
        }
      } else {
        setAlbum(null);
        if (setAlbumDisplay) {
          setAlbumDisplay(null);
        }
      }
    }
  }

  const isDis: any = /*!album || */ album && album.length > 10;

  return (
    <div style={{ ...(fullWidth && { width: "100%" }) }}>
      <input
        // multiple={_isSupportMultipleFile()}
        accept="image/*"
        style={{ display: "none" }}
        id="contained-button-file"
        type="file"
        onChange={handlePicture}
      />
      <label htmlFor="contained-button-file">
        <Button
          startIcon={
            <PhotoCamera
              fontSize="large"
              style={{
                ...(!isDis && { color: "white" }),
              }}
            />
          }
          disabled={isDis}
          variant="contained"
          color={isDis ? "default" : "primary"}
          style={{
            ...(fullWidth && { width: "100%" }),
            ...(!isDis && { color: "white" }),
          }}
          size="large"
          component="span"
        >
          {label}
        </Button>
      </label>
    </div>
  );
};
export default UploadAlbum;
