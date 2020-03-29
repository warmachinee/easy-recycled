import React from "react";
import { makeStyles } from "@material-ui/styles";
import { PhotoCamera } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({}));

const UploadDocs: React.FC<any> = props => {
  const { docs, setDocs, setDocsDisplay, label, fullWidth = false } = props;
  const classes = useStyles();

  function handlePicture(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileSize = file.size;
      setDocs(file);
      if (setDocsDisplay) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          setDocsDisplay(reader.result);
        };
      }
    } else {
      setDocs(null);
      if (setDocsDisplay) {
        setDocsDisplay(null);
      }
    }
  }

  return (
    <div style={{ ...(fullWidth && { width: "100%" }) }}>
      <input
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
              style={{ ...(!docs && { color: "white" }) }}
            />
          }
          variant="contained"
          color={!docs ? "primary" : "default"}
          style={{
            ...(fullWidth && { width: "100%" }),
            ...(!docs && { color: "white" })
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
export default UploadDocs;
