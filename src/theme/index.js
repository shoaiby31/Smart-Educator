// src/theme/index.js

import { createTheme } from "@mui/material/styles";

import palette from "./palette";
import typography from "./typography";
import shadows from "./shadows";
import customShadows from "./customShadows";
import components from "./components";

const theme = createTheme({
  palette,
  typography,
  shadows,
  shape: {
    borderRadius: 12,
  },
  components,
});

// Attach custom theme values
theme.customShadows = customShadows;

export default theme;