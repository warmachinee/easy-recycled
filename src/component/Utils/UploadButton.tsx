import React from "react";
import { makeStyles } from "@material-ui/styles";
import { PhotoCamera } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({}));

const UploadButton: React.FC<any> = props => {
  const { slip, setSlip, setSlipDisplay, label, fullWidth = false } = props;
  const classes = useStyles();

  function handlePicture(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.files);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileSize = file.size;
      setSlip(file);
      if (setSlipDisplay) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          setSlipDisplay(reader.result);
        };
      }
    } else {
      setSlip(null);
      if (setSlipDisplay) {
        setSlipDisplay(null);
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
              style={{ ...(!slip && { color: "white" }) }}
            />
          }
          variant="contained"
          color={!slip ? "primary" : "default"}
          style={{
            ...(fullWidth && { width: "100%" }),
            ...(!slip && { color: "white" })
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
export default UploadButton;
