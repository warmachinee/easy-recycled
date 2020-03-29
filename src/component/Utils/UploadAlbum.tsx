import React from "react";
import { makeStyles } from "@material-ui/styles";
import { PhotoCamera } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({}));

const UploadAlbum: React.FC<any> = props => {
  const {
    album,
    setAlbum,
    albumDisplay,
    setAlbumDisplay,
    label,
    fullWidth = false
  } = props;
  const classes = useStyles();

  function handlePicture(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      setAlbum(files);
      if (setAlbumDisplay) {
        const tempImgArr: any = [];
        const imageArr = Array.from(files);
        imageArr.forEach((image: any, i: number) => {
          // var reader = new FileReader();
          // reader.readAsDataURL(image);
          // reader.onloadend = function() {
          //   tempImgArr.push(reader.result);
          // };
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
  }

  const isDis: any = !album || (album && album.length > 10);

  return (
    <div style={{ ...(fullWidth && { width: "100%" }) }}>
      <input
        multiple
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
                ...(isDis && { color: "white" })
              }}
            />
          }
          variant="contained"
          color={isDis ? "primary" : "default"}
          style={{
            ...(fullWidth && { width: "100%" }),
            ...(isDis && { color: "white" })
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
