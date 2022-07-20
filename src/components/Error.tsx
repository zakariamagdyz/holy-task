import { styled } from "@mui/material/styles";
export const ErrorImageOverlay = styled("div")({
  height: "60vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

interface ImageProps {
  imageurl: string;
}

export const ErrorImageContainer = styled("div")<ImageProps>(
  ({ imageurl }) => ({
    display: "inline-block",
    backgroundImage: `url(${imageurl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "40vh",
    height: "40vh",
  })
);

export const ErrorImageText = styled("h2")({
  fontSize: "2rem",
  color: "#2f8e89",
  marginTop: "3rem",
  fontFamily: "monospace",
});

// types
interface Props {
  message: string;
  imageurl?: string;
}

const Error: React.FC<Props> = ({ message, imageurl }) => {
  return (
    <ErrorImageOverlay>
      <ErrorImageContainer
        imageurl={imageurl || "https://i.imgur.com/yW2W9SC.png"}
      />
      <ErrorImageText>{message}</ErrorImageText>
    </ErrorImageOverlay>
  );
};

export default Error;
