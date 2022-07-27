import React, { ChangeEvent, FormEvent, useState } from "react";
import { Paper, Typography, Button, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useEditMode } from "../store/store-context";
import { setEditModeOff, updateUserAction } from "../store/actions";
import EditInputs from "./EditInputs";
import useFormError from "../hooks/useFormError";
import validator from "validator";

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "90%",
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  [theme.breakpoints.up("sm")]: {
    width: "70%",
  },
  [theme.breakpoints.up("md")]: {
    width: "60%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "50%",
  },
  [theme.breakpoints.up("xl")]: {
    width: "40%",
  },
}));

const Header = styled("div")`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  border-bottom: 1px solid #ccc;
`;

const Footer = styled("div")`
  display: flex;
  justify-content: flex-end;
  padding: 1em;
  border-top: 1px solid #ccc;
  gap: 0.5em;
`;

const EditView = () => {
  const dispatch = useDispatch();
  const { currentInfo } = useEditMode();
  // throw error if currentInfo dons't exist for not null types
  if (!currentInfo) throw new Error("Something went wrong");

  const [state, setState] = useState<EditState>({
    name: currentInfo.name,
    email: currentInfo.email,
    website: currentInfo.website,
    phone: currentInfo.phone,
  });

  const [error, setError] = useFormError(state);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // check for email & website validation
    if (!validator.isEmail(state.email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!validator.isURL(state.website)) {
      setError("Please enter a valid URL");
      return;
    }

    if (error)
      // check for error
      return;
    // update user and turn edit mode to off
    dispatch(updateUserAction({ ...state, id: currentInfo.id }));
    dispatch(setEditModeOff());
  };
  return (
    <StyledPaper>
      <Header>
        <Typography variant="h5">Edit user info</Typography>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => dispatch(setEditModeOff())}
        >
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Header>

      <form onSubmit={handleSubmit}>
        {error && (
          <Alert
            variant="filled"
            severity="error"
            data-testid="form-error"
            sx={{ margin: "1em 1em 0 1em" }}
          >
            {error}
          </Alert>
        )}
        <EditInputs formValues={state} handleInputChange={handleInputChange} />
        <Footer>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => dispatch(setEditModeOff())}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={!!error}>
            Ok
          </Button>
        </Footer>
      </form>
    </StyledPaper>
  );
};

export default EditView;
