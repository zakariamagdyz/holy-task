import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import { Paper, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useEditMode } from "../store/store-context";
import { setEditModeOff, updateUserAction } from "../store/actions";
import EditInputs from "./EditInputs";
import { isEmptyValue } from "../store/utils";

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // check for empty values to stop execution
    const isEmpty = isEmptyValue(state);
    if (isEmpty) return;
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
        <EditInputs formValues={state} handleInputChange={handleInputChange} />
        <Footer>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => dispatch(setEditModeOff())}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Ok
          </Button>
        </Footer>
      </form>
    </StyledPaper>
  );
};

export default EditView;
