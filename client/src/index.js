import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@material-ui/core/styles";
import customTheme from "./customTheme";

ReactDOM.render(
   
      <ThemeProvider theme={customTheme}>
        <App />
      </ThemeProvider>

  ,
  document.getElementById("root")
);
