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
    padding: "0 16px",
    maxWidth: 600,
    alignItems: "center"
  }
}));

export interface FormItemRowGenNumProps {
  text: string;
}

const FormItemRowGenNum: React.FC<any> = ({ text, onEdit }) => {
  const classes = useStyles();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>(`${text}`);

  return (
    <React.Fragment>
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
              type="number"
              onChange={e => setTextValue(e.target.value)}
              onKeyPress={e => {
                if (e.key === "Enter" && text !== textValue) {
                  onEdit({
                    text: textValue,
                    afterEdit: () => {
                      setIsEditing(false);
                    }
                  });
                }
              }}
            />
            <AppButton
              variant="contained"
              buttonColor={green}
              disabled={text === textValue}
              style={{ marginRight: 8 }}
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
              onClick={() => setIsEditing(false)}
            >
              ยกเลิก
            </AppButton>
          </div>
        ) : (
          <Typography style={{ flex: 1 }}>{text}</Typography>
        )}
        {!isEditing && isHover ? (
          <React.Fragment>
            <IconButton onClick={() => setIsEditing(true)}>
              <Create />
            </IconButton>
          </React.Fragment>
        ) : (
          <div style={{ padding: 12, height: 24 }} />
        )}
      </div>
    </React.Fragment>
  );
};
export default FormItemRowGenNum;
