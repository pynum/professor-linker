'use client';
import { Box, Button, Typography, AppBar, Toolbar, IconButton, Container } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import logo from '/public/logo.png';
import { SignIn } from '@clerk/nextjs';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#E6F3FF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    primary: {
      main: '#FF6B6B',
    },
    secondary: {
      main: '#4ECDC4',
    },
  },
  typography: {
    fontFamily: '"Righteous", "Roboto", cursive',
    h1: {
      fontSize: '4rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.1rem',
      fontFamily: '"Fredoka One", cursive',
    },
    button: {
      fontFamily: '"Fredoka One", cursive',
    },
  },
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(230, 243, 255, 0.8)',
  boxShadow: 'none',
  padding: '20px 0',
  backdropFilter: 'blur(10px)',
}));

const SignInSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(45deg, #E6F3FF 0%, #FFFFFF 100%)',
}));

const SignInPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledAppBar position="fixed">
        <Container>
          <Toolbar disableGutters>
            <IconButton edge="start" color="inherit" aria-label="logo" href="/">
              <Image src={logo} alt="ProfLink Logo" width={40} height={40} />
            </IconButton>
            <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 700, ml: 2, color: '#333333' }}>
              ProfLink
            </Typography>
            <SignedOut>
              <Button color="inherit" href="/sign-in" sx={{ mr: 2 }}>Login</Button>
              <Button variant="contained" color="secondary" href="/sign-up">Sign Up</Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </Container>
      </StyledAppBar>

      <SignInSection>
        <Container>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              mx: 'auto',
              p: 4,
              backgroundColor: 'transparent', // Remove the white box
              borderRadius: '12px',
              width: '100%',
              maxWidth: '500px',
            }}
          >
            <SignIn />
          </Box>
        </Container>
      </SignInSection>
    </ThemeProvider>
  );
};

export default SignInPage;
