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
        sm: 375,
        md: 768,
        lg: 1026,
        xl: 1400,
      },
    },
  });
  // add responsive to headers elements
  theme = responsiveFontSizes(theme);
  return theme;
};

export default getTheme;
