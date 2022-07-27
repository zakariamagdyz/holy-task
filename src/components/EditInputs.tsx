import { TextField } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "2.4em 1em",
  gap: "1.8em",

  [theme.breakpoints.up("sm")]: {
    padding: "2.4em 2em",
  },
  [theme.breakpoints.up("md")]: {
    padding: "2.4em 3em",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "2.4em 6em",
  },
}));

type Props = {
  formValues: EditState;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const EditInputs: React.FC<Props> = ({ formValues, handleInputChange }) => {
  return (
    <Container>
      {Object.entries(formValues).map(([key, value]) => (
        <TextField
          key={key}
          name={key}
          value={value}
          onChange={handleInputChange}
          required
          id="outlined-required"
          label={key}
          data-testid="formInput"
        />
      ))}
    </Container>
  );
};

export default React.memo(EditInputs);
