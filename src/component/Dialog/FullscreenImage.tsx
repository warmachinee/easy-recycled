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
    right: 0,
    top: 0,
    color: theme.palette.grey[500],
    zIndex: 1500
  }
}));

export interface FullscreenImageProps {
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

const FullscreenImage: React.FC<FullscreenImageProps> = props => {
  const classes = useStyles();
  const {
    open = false,
    onClose,
    children,
    title,
    actions,
    maxWidth = "xs",
    fullScreen = false,
    dividers = false,
    contentStyle,
    other
  } = props;
  return (
    <Dialog
      scroll="paper"
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      fullScreen={fullScreen}
      {...other}
    >
      <DialogTitle style={{ ...(!title && { backgroundColor: "black" }) }}>
        {title}
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers={dividers}
        style={{
          ...contentStyle,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          backgroundColor: "black"
        }}
      >
        {children}
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};
export default FullscreenImage;
