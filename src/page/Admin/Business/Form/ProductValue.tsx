import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import FormSetupPaper from "../../../../component/Utils/FormSetupPaper";
import { Typography } from "@material-ui/core";
import { AppContext } from "../../../../AppContext";
import FormItemInsert from "../../../../component/Utils/FormItemInsert";
import FormItemRow from "../../../../component/Utils/FormItemRow";

const useStyles = makeStyles(theme => ({}));

export interface ProductValueProps {
  data: any[];
}

const ProductValue: React.FC<ProductValueProps> = ({ data }) => {
  const classes = useStyles();
  const { onInserForm, onDeleteForm, onEditForm } = useContext(AppContext);

  return (
    <FormSetupPaper>
      <Typography variant="h6" style={{ marginBottom: 16 }}>
        ปริมาณ หรือ น้ำหนักของวัสดุ
      </Typography>
      <FormItemInsert
        rawData={data}
        textFieldLabel="เพิ่มปริมาณ หรือ น้ำหนักของวัสดุ"
        buttonLabel="เพิ่ม"
        onClick={(obj: any) => onInserForm({ ...obj, type: "productvalue" })}
      />
      {data.map((d: any) => (
        <FormItemRow
          key={d}
          text={d}
          onDelete={(text: string) =>
            onDeleteForm({ text, type: "productvalue" })
          }
          onEdit={(obj: any) => onEditForm({ ...obj, type: "productvalue" })}
        />
      ))}
    </FormSetupPaper>
  );
};
export default ProductValue;
