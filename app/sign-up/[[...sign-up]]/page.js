'use client';

import React from 'react';
import Image from 'next/image';
import logo from '/public/logo.png';
import { Container, Box, Typography, AppBar, Toolbar, Button, IconButton, Grid } from '@mui/material';
import { SignUp } from '@clerk/nextjs';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { motion } from 'framer-motion';

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

const HeroSection = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(45deg, #E6F3FF 0%, #FFFFFF 100%)',
    padding: '120px 0 160px',
}));

const StyledSignUpContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    mx: 'auto',
    p: 4,
    borderRadius: '12px',
    width: '100%',
    maxWidth: '500px',
    backgroundColor: 'transparent', // Make background transparent
    boxShadow: 'none', // Remove any box shadow if applied
}));

const Footer = styled(Box)(({ theme }) => ({
    bgcolor: '#D1E8FF',
    py: 4,
}));

export default function SignUpPage() {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="100vw" sx={{ backgroundColor: theme.palette.background.default }}>
                <StyledAppBar position="fixed">
                    <Container>
                        <Toolbar disableGutters>
                            <IconButton edge="start" color="inherit" aria-label="logo" href="/">
                                <Image src={logo} alt="ProfAdvisor Logo" width={50} height={50} />
                            </IconButton>
                            <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 700, ml: 2 }}>
                                ProfLink
                            </Typography>
                            <SignedOut>
                                <Button color="primary" variant="outlined" href="/sign-in" sx={{ mr: 2 }}>Login</Button>
                                <Button color="secondary" variant="contained" href="/sign-up">Sign Up</Button>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </Toolbar>
                    </Container>
                </StyledAppBar>

                <HeroSection>
                    <Container>
                        <Grid container spacing={8} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <Typography variant="h1" gutterBottom sx={{ color: '#333333', mb: 4 }}>
                                        Join the ProfLink Community
                                    </Typography>
                                    <Typography variant="h4" paragraph sx={{ color: '#666666', mb: 4 }}>
                                        Discover insights and connect with peers through our platform.
                                    </Typography>
                                </motion.div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <StyledSignUpContainer>
                                    <SignUp />
                                </StyledSignUpContainer>
                            </Grid>
                        </Grid>
                    </Container>
                </HeroSection>

                <Footer>
                    <Container>
                        <Typography variant="body1" color="textSecondary" align="center">
                            © {new Date().getFullYear()} ProfLink. All rights reserved.
                        </Typography>
                    </Container>
                </Footer>
            </Container>
        </ThemeProvider>
    );
}
