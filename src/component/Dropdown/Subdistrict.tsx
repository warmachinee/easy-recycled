import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../../AppContext";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18
    }
  }
}));

export interface SubdistrictProps {}

interface SubdistrictType {
  id: number;
  name: string;
}

const Subdistrict: React.FC<SubdistrictProps | any> = props => {
  const classes = useStyles();
  const { subdistrict, district, setSubdistrict } = props;
  const { csrf, setCsrf, _xhrGetP } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<SubdistrictType[]>([]);
  const loading = open && options.length === 0;

  function onChange(event: object, value: any) {
    setSubdistrict(value);
  }

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const res = await _xhrGetP(
        `https://easyrecycle.ml/user/location?type=subdistricts&districtsid=${district.id}`
      );
      setCsrf(res.csrf);

      if (active) {
        setOptions(res.data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, district]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      style={{ width: "100%", marginBottom: 12 }}
      classes={{
        option: classes.option
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={subdistrict}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}
      onChange={onChange}
      noOptionsText="ไม่มีตำบลที่คุณค้นหา"
      renderInput={params => (
        <TextField
          {...params}
          label="ตำบล"
          variant="outlined"
          size="small"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password" // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};
export default Subdistrict;
