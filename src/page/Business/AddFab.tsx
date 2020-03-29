import React from "react";
import { Fab } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";

const AddFab: React.FC<any> = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 8,
        left: "calc(50% - 28px)"
      }}
    >
      <Fab color="primary" style={{ color: "white" }}>
        <AddIcon />
      </Fab>
    </div>
  );
};
export default AddFab;
