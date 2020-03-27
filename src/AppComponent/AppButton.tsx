import React from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import { Button, useTheme, ButtonProps, Color } from "@material-ui/core";

export interface AppButtonProps extends ButtonProps {
  buttonColor?: Color;
  light?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  children,
  variant,
  buttonColor: color,
  light = false,
  ...props
}: AppButtonProps) => {
  const theme = useTheme();

  function styleFromVariant(variant?: "text" | "contained" | "outlined") {
    switch (variant) {
      case "text":
        return {
          color: color ? color[600] : theme.palette.text.primary,
          "&:hover": {
            backgroundColor: color
              ? color[light ? 100 : 50]
              : theme.palette.action.hover
          }
        };
      case "contained":
        return {
          color: color
            ? theme.palette.getContrastText(color[light ? 700 : 600])
            : theme.palette.text.primary,
          backgroundColor: color
            ? color[light ? 600 : 500]
            : theme.palette.background.default,
          "&:hover": {
            backgroundColor: color
              ? color[light ? 800 : 700]
              : theme.palette.action.hover
          }
        };
      case "outlined":
        return {
          color: color ? color[600] : theme.palette.text.primary,
          border: `1px solid ${
            color ? color[600] : theme.palette.text.primary
          }`,
          "&:hover": {
            backgroundColor: color
              ? color[light ? 100 : 50]
              : theme.palette.action.hover
          }
        };
      default:
        return {
          color: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: theme.palette.action.hover
          }
        };
    }
  }

  const StyledButton = withStyles((theme: Theme) => ({
    root: { ...styleFromVariant(variant) }
  }))(Button);

  return (
    <StyledButton {...props} variant={variant}>
      {children}
    </StyledButton>
  );
};
export default AppButton;
