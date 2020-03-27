import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import FormSetupPaper from "../../../../component/Utils/FormSetupPaper";
import { Typography } from "@material-ui/core";
import { AppContext } from "../../../../AppContext";
import FormItemInsert from "../../../../component/Utils/FormItemInsert";
import FormItemRow from "../../../../component/Utils/FormItemRow";

const useStyles = makeStyles(theme => ({}));

export interface TransportProps {
  data: any[];
}

const Transport: React.FC<TransportProps> = ({ data }) => {
  const classes = useStyles();
  const { onInserForm, onDeleteForm, onEditForm } = useContext(AppContext);

  return (
    <FormSetupPaper>
      <Typography variant="h6" style={{ marginBottom: 16 }}>
        รถที่ใช้ขนส่ง/ทำงาน
      </Typography>
      <FormItemInsert
        rawData={data}
        textFieldLabel="เพิ่มรถ"
        buttonLabel="เพิ่ม"
        onClick={(obj: any) => onInserForm({ ...obj, type: "transport" })}
      />
      {data.map((d: any) => (
        <FormItemRow
          key={d}
          text={d}
          onDelete={(text: string) => onDeleteForm({ text, type: "transport" })}
          onEdit={(obj: any) => onEditForm({ ...obj, type: "document" })}
        />
      ))}
    </FormSetupPaper>
  );
};
export default Transport;
