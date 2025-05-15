import "@/styles/globals.css";
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '../context/ThemeContext';
import { useTheme } from '../context/ThemeContext';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <ThemedApp Component={Component} pageProps={pageProps} />
    </ThemeProvider>
  );
}

function ThemedApp({ Component, pageProps }) {
  const { isDarkMode } = useTheme();

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </MUIThemeProvider>
  );
}
