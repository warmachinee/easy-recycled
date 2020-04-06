import React, { useState, useContext } from "react";
import Loadable from "react-loadable";
import { makeStyles } from "@material-ui/styles";
import { Typography, Divider, IconButton, TextField } from "@material-ui/core";
import { Delete, Create } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";
import { AppContext } from "../../AppContext";

const AppButton = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'AppButton' */ "../../AppComponent/AppButton"),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    maxWidth: 600,
    alignItems: "center"
  }
}));

export interface FormItemRowGenProps {
  text: string;
}

const FormItemRowGen: React.FC<any> = ({ text, onEdit }) => {
  const classes = useStyles();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>(text);

  React.useEffect(() => {
    setTextValue(text);
  }, [text]);

  return (
    <React.Fragment>
      <div style={{ display: "flex", maxWidth: 600, alignItems: "baseline" }}>
        <Typography variant="h6">รายละเอียดบัญชีที่ใช้รับโอนเงิน</Typography>
        <IconButton
          onClick={() => {
            setIsEditing(prev => !prev);
            setTextValue(text);
          }}
        >
          <Create />
        </IconButton>
      </div>
      <div
        className={classes.root}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {isEditing ? (
          <div style={{ display: "flex", flex: 1 }}>
            <TextField
              style={{ marginRight: 16 }}
              fullWidth
              autoFocus={isEditing}
              value={textValue}
              multiline
              rowsMax="6"
              variant="outlined"
              onChange={e => setTextValue(e.target.value)}
            />
            <AppButton
              variant="contained"
              buttonColor={green}
              disabled={text === textValue}
              style={{ marginRight: 8, marginBottom: "auto" }}
              onClick={() =>
                onEdit({
                  text: textValue,
                  afterEdit: () => {
                    setIsEditing(false);
                  }
                })
              }
            >
              บันทึก
            </AppButton>
            <AppButton
              variant="text"
              buttonColor={green}
              style={{ marginBottom: "auto" }}
              onClick={() => {
                setIsEditing(false);
                setTextValue(text);
              }}
            >
              ยกเลิก
            </AppButton>
          </div>
        ) : (
          <Typography style={{ flex: 1 }}>{text} บาท</Typography>
        )}
      </div>
    </React.Fragment>
  );
};
export default FormItemRowGen;
