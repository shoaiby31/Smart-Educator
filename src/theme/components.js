// src/theme/components.js

const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: "#F8FAFC",
      },
    },
  },

  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },

    styleOverrides: {
      root: {
        borderRadius: 12,
        fontWeight: 600,
        textTransform: "none",
        padding: "10px 20px",
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 20,
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 20,
        overflow: "hidden",
      },
    },
  },

  MuiTextField: {
    defaultProps: {
      variant: "outlined",
      fullWidth: true,
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 12,
      },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        fontWeight: 600,
      },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: {
        fontWeight: 700,
      },
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 20,
      },
    },
  },

  MuiTableContainer: {
    styleOverrides: {
      root: {
        borderRadius: 16,
      },
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: 8,
        fontSize: "0.8rem",
      },
    },
  },
};

export default components;