import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const getTheme = () => {
  let theme = createTheme({
    palette: {
      secondary: {
        main: grey[600],
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 376,
        md: 769,
        lg: 1027,
        xl: 1401,
      },
    },
  });
  // add responsive to headers elements
  theme = responsiveFontSizes(theme);
  return theme;
};

export default getTheme;
