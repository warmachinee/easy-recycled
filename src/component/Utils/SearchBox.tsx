import React from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Search, Clear } from "@material-ui/icons";

const SearchBox: React.FC<any> = (props) => {
  const { search, setSearch, label, padding } = props;

  return (
    <div style={{ padding: padding ? padding : 16 }}>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        label={label}
        value={search}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: search !== "" && (
            <InputAdornment position="start">
              <IconButton onClick={() => setSearch("")} style={{ padding: 4 }}>
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e: any) => setSearch(e.target.value)}
      />
    </div>
  );
};
export default SearchBox;
