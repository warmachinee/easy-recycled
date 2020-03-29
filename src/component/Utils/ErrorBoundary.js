import React, { Component } from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import AppButton from "../../AppComponent/AppButton";
import { green } from "@material-ui/core/colors";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errMsg: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.setState({
      errMsg: {
        error: error,
        stack: info.componentStack
      }
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Paper
          style={{
            padding: 16,
            maxWidth: 360,
            width: "100%",
            margin: "36px auto"
          }}
          elevation={4}
        >
          <Typography variant="h4" align="center" style={{ marginTop: 36 }}>
            มีบางอย่างผิดพลาด
          </Typography>
          <div
            style={{
              margin: "24px 0",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <AppButton
              buttonColor={green}
              variant="outlined"
              onClick={() => window.location.reload()}
            >
              ลองใหม่
            </AppButton>
          </div>
        </Paper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
