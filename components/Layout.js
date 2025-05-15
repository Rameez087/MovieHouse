import Head from 'next/head';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Container, Box, Button, IconButton } from '@mui/material';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

export default function Layout({ children, title = 'Movie House' }) {
  const { isDarkMode } = useTheme();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      bgcolor: isDarkMode ? 'grey.900' : 'grey.50',
      color: isDarkMode ? 'grey.50' : 'grey.900'
    }}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Movie House - Browse and discover movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Movie House
            </Link>
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} href="/movies">
              Movies
            </Button>
            <Button color="inherit" component={Link} href="/genres">
              Genres
            </Button>
            <Button color="inherit" component={Link} href="/directors">
              Directors
            </Button>
            <Button color="inherit" component={Link} href="/help">
              Help
            </Button>
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>

      <Box component="footer" sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto', 
        bgcolor: isDarkMode ? 'grey.800' : 'grey.200',
        color: isDarkMode ? 'grey.50' : 'grey.900'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2
          }}>
            <Typography variant="body2">
              © {new Date().getFullYear()} Movie House. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                color="inherit" 
                component={Link} 
                href="/help/privacy"
                size="small"
              >
                Privacy Policy
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                href="/help/contact"
                size="small"
              >
                Contact
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}