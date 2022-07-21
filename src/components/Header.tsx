import React from "react";
import { AppBar, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useDarkMode, useDispatch } from "../store/store-context";
import { toggleDarkMode } from "../store/actions";

const Container = styled("header")`
  display: flex;
  padding: 1em 2em;
  justify-content: space-between;
`;
const Header = () => {
  const dispatch = useDispatch();
  const darkMode = useDarkMode();

  return (
    <AppBar position="static" color="inherit">
      <Container>
        <Typography variant="h4">HollyDesk Task</Typography>
        <Button onClick={() => dispatch(toggleDarkMode())}>
          {darkMode === "ON" ? (
            <Brightness7Icon data-testid="light" />
          ) : (
            <Brightness4Icon data-testid="dark" />
          )}
        </Button>
      </Container>
    </AppBar>
  );
};

export default Header;
