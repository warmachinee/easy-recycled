import React, { ReactNode } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton
} from "@material-ui/core";

import { Close as CloseIcon } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

export interface GeneralDialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string | null;
  actions?: ReactNode;
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl";
  fullScreen?: boolean;
  dividers?: boolean;
  contentStyle?: any;
  other?: any;
}

const GeneralDialog: React.FC<GeneralDialogProps> = props => {
  const classes = useStyles();
  const {
    open = false,
    onClose,
    children,
    title,
    actions,
    maxWidth = "xs",
    fullScreen = false,
    dividers = true,
    contentStyle,
    other
  } = props;
  return (
    <Dialog
      scroll="body"
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      fullScreen={fullScreen}
      {...other}
    >
      <DialogTitle>
        {title}
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers={dividers} style={{ ...contentStyle }}>
        {children}
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};
export default GeneralDialog;
