import { createMuiTheme } from "@material-ui/core/styles";

// Only use for custom global styles
const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#005E86",
    },
    secondary: {
      main: "#007EB4",
    },
  },
});

export default customTheme;
