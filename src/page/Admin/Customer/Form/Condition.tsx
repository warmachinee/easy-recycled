import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import FormSetupPaper from "../../../../component/Utils/FormSetupPaper";
import { Typography, Divider } from "@material-ui/core";
import { AppContext } from "../../../../AppContext";
import FormItemRow from "../../../../component/Utils/FormItemRow";
import FormItemInsertCon from "../../../../component/Utils/FormItemInsertCon";

const useStyles = makeStyles(theme => ({}));

export interface ConditionProps {
  data: any[];
}

const Condition: React.FC<ConditionProps> = ({ data }) => {
  const classes = useStyles();
  const { csrf, setCsrf, _xhrPost, handleFetch } = useContext(AppContext);

  async function onInserForm({ state, setIsEditing }: any) {
    const res = await _xhrPost({
      csrf,
      url: "ausersystem",
      body: {
        action: "setup",
        type: "customer_condition",
        condition: state
      }
    });

    setCsrf(res.csrf);
    setIsEditing(false);
    handleFetch();
  }

  return (
    <FormSetupPaper>
      <FormItemInsertCon
        rawData={data}
        onClick={(obj: any) => onInserForm(obj)}
      />
    </FormSetupPaper>
  );
};
export default Condition;
