import React from "react";
import { UserResponseWithLikes } from "../types/store";
import UserCard from "./UserCard";
import withChecks from "./utils/withChecks";
import { styled } from "@mui/material/styles";

const Container = styled("div")(({ theme }) => ({
  padding: "3rem 1rem",
  display: "grid",
  gap: "1rem",
  justifyContent: "center",
  justifyItems: "center",

  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "2rem",
  },
  [theme.breakpoints.up("xl")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
}));

type Props = {
  data: UserResponseWithLikes[];
};
const Users: React.FC<Props> = ({ data: users }) => {
  return (
    <Container>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Container>
  );
};

export default withChecks(Users);
