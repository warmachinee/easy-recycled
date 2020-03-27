import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { TextField } from "@material-ui/core";
import AppButton from "../../AppComponent/AppButton";
import { green } from "@material-ui/core/colors";
import { AppContext } from "../../AppContext";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    marginBottom: 16
  },
  textField: {
    maxWidth: 450,
    marginRight: 16
  }
}));

const FormItemInsert: React.FC<any> = ({
  rawData,
  onClick,
  textFieldLabel = "textFieldLabel",
  buttonLabel = "buttonLabel"
}) => {
  const classes = useStyles();
  const { _onEnter } = useContext(AppContext);
  const [state, setState] = useState<any>("");
  const isTextEqual = rawData.filter((item: any) => item === state).length > 0;

  function onSubmit() {
    onClick({ state, setState });
  }

  return (
    <div className={classes.root}>
      <TextField
        className={classes.textField}
        fullWidth
        label={textFieldLabel}
        variant="outlined"
        size="small"
        value={state}
        {...(isTextEqual && {
          error: true,
          helperText: "กรุณาอย่ากรอกข้อมูลซ้ำ"
        })}
        onChange={e => setState(e.target.value)}
        onKeyPress={isTextEqual ? console.log() : _onEnter(onSubmit)}
      />
      <AppButton
        buttonColor={green}
        variant="contained"
        onClick={onSubmit}
        disabled={isTextEqual || state === ""}
        style={{ marginBottom: "auto" }}
      >
        {buttonLabel}
      </AppButton>
    </div>
  );
};
export default FormItemInsert;
