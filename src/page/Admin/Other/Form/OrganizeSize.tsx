import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import FormSetupPaper from "../../../../component/Utils/FormSetupPaper";
import { Typography } from "@material-ui/core";
import { AppContext } from "../../../../AppContext";
import FormItemInsert from "../../../../component/Utils/FormItemInsert";
import FormItemRow from "../../../../component/Utils/FormItemRow";

const useStyles = makeStyles(theme => ({}));

export interface OrganizeSizeProps {
  data: any[];
}

const OrganizeSize: React.FC<OrganizeSizeProps> = ({ data }) => {
  const classes = useStyles();
  const { onInserForm, onDeleteForm, onEditForm } = useContext(AppContext);

  return (
    <FormSetupPaper>
      <Typography variant="h6" style={{ marginBottom: 16 }}>
        ขนาดองค์กร
      </Typography>
      <FormItemInsert
        rawData={data}
        textFieldLabel="เพิ่มขนาดองค์กร"
        buttonLabel="เพิ่ม"
        onClick={(obj: any) => onInserForm({ ...obj, type: "org_size" })}
      />
      {data.map((d: any) => (
        <FormItemRow
          key={d}
          text={d}
          onDelete={(text: string) => onDeleteForm({ text, type: "org_size" })}
          onEdit={(obj: any) => onEditForm({ ...obj, type: "document" })}
        />
      ))}
    </FormSetupPaper>
  );
};
export default OrganizeSize;
