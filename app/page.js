'use client';
import { Box, Button, Typography, AppBar, Toolbar, IconButton, Paper, Grid, Container } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import logo from '../public/logo.png';
import illustration from '../public/dez.png';
import feature1 from '../public/f1.png';
import feature2 from '../public/f2.png';
import feature3 from '../public/f3.jpg';
import { useState, useEffect } from 'react';
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

const FeatureSection = styled(Box)(({ theme }) => ({
  padding: '120px 0',
  background: theme.palette.background.default,
}));

const FeatureItem = styled(motion(Paper))(({ theme }) => ({
  padding: '40px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  borderRadius: '20px',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  },
}));

const StyledImage = styled(Image)({
  borderRadius: '20px',
 
  background: 'transparent', // Ensure no background is applied
});

const MotionContainer = styled(motion.div)({
  width: '100%',
  height: '100%', // Ensure all boxes have the same height
});

const HomePage = () => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

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
                  Level Up Your College Game
                </Typography>
                <Typography variant="h4" paragraph sx={{ color: '#666666', mb: 4 }}>
                  Get the inside scoop on profs with ProfLink and our insightful ratings and reviews.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  href="/generate"
                  sx={{ 
                    py: 2, 
                    px: 4, 
                    borderRadius: '50px', 
                    fontSize: '1.3rem',
                    boxShadow: '0 10px 20px rgba(255, 107, 107, 0.4)',
                  }}
                >
                  Jump In
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <StyledImage src={illustration} alt="ProfLink Illustration" width={600} height={400} />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <FeatureSection>
        <Container>
          <Typography variant="h2" align="center" gutterBottom sx={{ mb: 8 }}>
            Why ProfLink Rocks
          </Typography>
          <Grid container spacing={6}>
            {[
              { title: "Epic Insights", image: feature1, description: "Dive into the deets with our in-depth prof evaluations and course reviews." },
              { title: "Easy-Peasy Platform", image: feature2, description: "Navigate like a pro through our super intuitive interface." },
              { title: "Student Squad", image: feature3, description: "Tap into the hive mind of diverse student experiences and perspectives." }
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <MotionContainer
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <FeatureItem elevation={3} whileHover={{ scale: 1.05 }}>
                    <Image src={feature.image} alt={feature.title} width={100} height={100} style={{ marginBottom: '20px' }} />
                    <Typography variant="h5" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1">
                      {feature.description}
                    </Typography>
                  </FeatureItem>
                </MotionContainer>
              </Grid>
            ))}
          </Grid>
        </Container>
      </FeatureSection>

      <Box sx={{ bgcolor: '#D1E8FF', py: 4 }}>
        <Container>
          <Typography variant="body1" color="textSecondary" align="center">
            © {new Date().getFullYear()} ProfLink. Empowering Students with Awesome Knowledge.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
