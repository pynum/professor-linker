'use client'

import React from 'react';
import logo from '/public/logo.png';
import Image from 'next/image';
import { Container, Box, Typography, AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { SignUp } from '@clerk/nextjs';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1E1E1E',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#B0B0B0',
        },
        primary: {
            main: '#BB86FC',
        },
        secondary: {
            main: '#03DAC6',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
        h3: {
            fontSize: '2rem',
        },
        h6: {
            fontSize: '1.25rem',
        },
        body1: {
            fontSize: '1rem',
        },
    },
});

const Header = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: 'none',
    padding: '10px 0px',
    [theme.breakpoints.down('sm')]: {
        padding: '10px',
    },
}));

export default function SignUpPage() {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="100vw" sx={{ backgroundColor: theme.palette.background.paper }}>
                <Header position="static" color="transparent" elevation={0}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="logo" href="/">
                            <Image src={logo} alt="ProfAdvisor Logo" width={50} height={50} />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, marginLeft: 2 }}>
                            ProfAdvisor
                        </Typography>
                        <SignedOut>
                            <Button color="primary" variant="outlined" href="/sign-in" sx={{ marginRight: 2 }}>Login</Button>
                            <Button color="primary" variant="contained" href="/sign-up">Sign Up</Button>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </Toolbar>
                </Header>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ textAlign: 'center', my: 4, backgroundColor: theme.palette.background.paper }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mx: 'auto',
                            p: 4,
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: '12px',
                            width: '100%',
                            maxWidth: '500px',
                        }}
                    >
                        <SignUp />
                    </Box>
                </Box>
                <Box sx={{
                    padding: '30px 10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: theme.palette.background.paper,
                    borderTop: '1px solid #333',
                }}>
                    <Container maxWidth="lg">
                        <Typography variant="body2" color="textSecondary" align="center">
                            © {new Date().getFullYear()} ProfAdvisor. All rights reserved.
                        </Typography>
                    </Container>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
