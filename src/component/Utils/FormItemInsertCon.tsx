import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { TextField, Typography, IconButton } from "@material-ui/core";
import AppButton from "../../AppComponent/AppButton";
import { green } from "@material-ui/core/colors";
import { AppContext } from "../../AppContext";
import { Create } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  textField: {
    maxWidth: 450,
    marginRight: 16
  }
}));

const FormItemInsertCon: React.FC<any> = ({ rawData, onClick }) => {
  const classes = useStyles();
  const { _onEnter } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [state, setState] = useState<any>(rawData[0]);
  const isTextEqual = rawData[0] === state;

  function onSubmit() {
    onClick({ state, setIsEditing });
  }

  return (
    <div>
      <div style={{ display: "flex", marginBottom: 16 }}>
        <Typography variant="h6" style={{ marginRight: 4 }}>
          เงื่อนไขและข้อตกลง
        </Typography>
        <IconButton
          style={{ marginBottom: 6, marginLeft: 8, padding: 4 }}
          onClick={() => setIsEditing(prev => !prev)}
        >
          <Create />
        </IconButton>
      </div>
      {isEditing ? (
        <React.Fragment>
          <TextField
            className={classes.textField}
            fullWidth
            autoFocus={isEditing}
            variant="outlined"
            size="small"
            value={state}
            onChange={e => setState(e.target.value)}
            multiline
            rowsMax="10"
          />
          <AppButton
            buttonColor={green}
            variant="contained"
            onClick={onSubmit}
            disabled={isTextEqual || state === ""}
            style={{ marginBottom: "auto" }}
          >
            บันทึก
          </AppButton>
          <AppButton
            buttonColor={green}
            variant="text"
            onClick={() => setIsEditing(false)}
            style={{ marginBottom: "auto", marginRight: 16 }}
          >
            ยกเลิก
          </AppButton>
        </React.Fragment>
      ) : (
        <Typography style={{ flex: 1, maxWidth: 600, whiteSpace: "pre-line" }}>
          {state}
        </Typography>
      )}
    </div>
  );
};
export default FormItemInsertCon;
