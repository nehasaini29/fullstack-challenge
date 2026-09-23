import { ApolloProvider } from "@apollo/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { ReactNode } from "react";
import { apolloClient } from "@/lib/apollo";

const theme = createTheme({
  palette: {
    primary: { main: "#246bfd" },
    background: { default: "#f4f6f8", paper: "#ffffff" },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
    h3: { letterSpacing: "-0.035em" },
  },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: "none", fontWeight: 650 } } },
    MuiCard: { styleOverrides: { root: { borderColor: "#dde2e7" } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
  },
});

/**
 * Wraps the app in its global providers. Add more here (error boundary,
 * feature flags, i18n) as needed.
 */
export const AppProvider = ({ children }: { children: ReactNode }) => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </ApolloProvider>
);
