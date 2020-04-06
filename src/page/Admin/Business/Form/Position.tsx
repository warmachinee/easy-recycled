import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import FormSetupPaper from "../../../../component/Utils/FormSetupPaper";
import { Typography } from "@material-ui/core";
import { AppContext } from "../../../../AppContext";
import FormItemInsert from "../../../../component/Utils/FormItemInsert";
import FormItemRow from "../../../../component/Utils/FormItemRow";

const useStyles = makeStyles(theme => ({}));

export interface PositionProps {
  data: any[];
}

const Position: React.FC<PositionProps> = ({ data }) => {
  const classes = useStyles();
  const { onInserForm, onDeleteForm, onEditForm } = useContext(AppContext);

  return (
    <FormSetupPaper>
      <Typography variant="h6" style={{ marginBottom: 16 }}>
        ผู้ให้ข้อมูล
      </Typography>
      <FormItemInsert
        rawData={data}
        textFieldLabel="เพิ่มผู้ให้ข้อมูล"
        buttonLabel="เพิ่ม"
        onClick={(obj: any) => onInserForm({ ...obj, type: "position" })}
      />
      {data.map((d: any) => (
        <FormItemRow
          key={d}
          text={d}
          onDelete={(text: string) => onDeleteForm({ text, type: "position" })}
          onEdit={(obj: any) => onEditForm({ ...obj, type: "position" })}
        />
      ))}
    </FormSetupPaper>
  );
};
export default Position;
