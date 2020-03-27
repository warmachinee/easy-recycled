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
    // console.log(event.target.files);
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      setAlbum(files);
      if (setAlbumDisplay) {
        const tempFile: any = [];
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          if (!file.type.match("image")) continue;
          var picReader = new FileReader();
          picReader.addEventListener("load", function(event) {
            var picFile: any = event.target;
            tempFile.push(<img src={picFile.result} alt={picFile.result} />);
          });
          //Read the image
          picReader.readAsDataURL(file);
        }
        console.log(tempFile);
        setAlbumDisplay(tempFile);
      }
    } else {
      setAlbum(null);
      if (setAlbumDisplay) {
        setAlbumDisplay(null);
      }
    }
  }

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
              style={{ ...(!album && { color: "white" }) }}
            />
          }
          variant="contained"
          color={!album ? "primary" : "default"}
          style={{
            ...(fullWidth && { width: "100%" }),
            ...(!album && { color: "white" })
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
