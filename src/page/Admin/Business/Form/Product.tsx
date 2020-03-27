import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import FormSetupPaper from "../../../../component/Utils/FormSetupPaper";
import { Typography } from "@material-ui/core";
import { AppContext } from "../../../../AppContext";
import FormItemInsert from "../../../../component/Utils/FormItemInsert";
import FormItemRow from "../../../../component/Utils/FormItemRow";

const useStyles = makeStyles(theme => ({}));

export interface ProductProps {
  data: any[];
}

const Product: React.FC<ProductProps> = ({ data }) => {
  const classes = useStyles();
  const { onInserForm, onDeleteForm, onEditForm } = useContext(AppContext);

  return (
    <FormSetupPaper>
      <Typography variant="h6" style={{ marginBottom: 16 }}>
        วัสดุเหลือใช้
      </Typography>
      <FormItemInsert
        rawData={data}
        textFieldLabel="เพิ่มวัสดุเหลือใช้"
        buttonLabel="เพิ่ม"
        onClick={(obj: any) => onInserForm({ ...obj, type: "product" })}
      />
      {data.map((d: any) => (
        <FormItemRow
          key={d}
          text={d}
          onDelete={(text: string) => onDeleteForm({ text, type: "product" })}
          onEdit={(obj: any) => onEditForm({ ...obj, type: "product" })}
        />
      ))}
    </FormSetupPaper>
  );
};
export default Product;
