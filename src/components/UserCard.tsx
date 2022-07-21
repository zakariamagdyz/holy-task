import React from "react";
import { UserResponseWithLikes } from "../types/store";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "../store/store-context";
import {
  deleteUserAction,
  setEditModeOn,
  toggleLikeAction,
} from "../store/actions";

const UserInfo = styled(Stack)`
  display: "flex";
  flex-direction: column;
`;

////////////////////////////////////////////////////////////
type Props = {
  user: UserResponseWithLikes;
};
const UserCard: React.FC<Props> = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ backgroundColor: "#eee" }}
        component="img"
        height="240"
        image={`https://avatars.dicebear.com/v2/avataaars/${user.name}.svg?options[mood][]=happy`}
        alt={user.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.name}
        </Typography>
        <UserInfo spacing={0.5} data-testid="userInfo">
          <Stack direction="row" spacing={1}>
            <MailOutlineIcon />
            <Typography>{user.email}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <PhoneEnabledOutlinedIcon />
            <Typography>{user.phone}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <LanguageIcon />
            <Typography
              component="a"
              href={user.website}
              sx={{ textDecoration: "none", color: "text.primary" }}
            >
              {user.website}
            </Typography>
          </Stack>
        </UserInfo>
      </CardContent>
      <CardActions>
        <ButtonGroup
          variant="text"
          aria-label="text button group"
          fullWidth
          color="secondary"
          data-testid="actionBtns"
        >
          <Button onClick={() => dispatch(toggleLikeAction(user.id))}>
            {user.hasLike ? (
              <FavoriteOutlinedIcon color="error" data-testid="liked" />
            ) : (
              <FavoriteBorderOutlinedIcon color="error" data-testid="notLike" />
            )}
          </Button>
          <Button onClick={() => dispatch(setEditModeOn(user))}>
            <EditIcon />
          </Button>
          <Button onClick={() => dispatch(deleteUserAction(user.id))}>
            <DeleteIcon />
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default UserCard;
