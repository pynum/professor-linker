'use client';
import { Box, Button, Typography, AppBar, Toolbar, IconButton, Card, CardContent, CardMedia, Container } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import logo from '../public/logo.png';
import illustration from '../public/illustration.png';
import feature1 from '../public/feature1.png';
import feature2 from '../public/feature2.png';
import feature3 from '../public/feature3.png';
import { useState, useEffect } from 'react';
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
  padding: '10px 20px',
  [theme.breakpoints.down('sm')]: {
    padding: '10px',
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px',
  textAlign: 'left',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    textAlign: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px',
  },
}));

const Illustration = styled(Image)({
  width: '100%',
  maxWidth: '500px',
  height: 'auto',
  borderRadius: '30px',
  marginBottom: '20px',
  border: '5px solid #BB86FC'
});

const FeaturesSection = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '20px',
  padding: '20px 50px',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    padding: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px',
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  maxWidth: '100%',
  borderRadius: '10px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 6px 30px rgba(0, 0, 0, 0.3)',
  },
}));

const FeatureImage = styled(CardMedia)(({ theme }) => ({
  height: 100,
  width: 100,
  borderRadius: '50%',
  objectFit: 'cover',
}));

const HomePage = () => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo" href="/">
            <Image src={logo} alt="ProfAdvisor Logo" width={50} height={50} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, marginLeft: 2 }}>
            ProfAdvisor
          </Typography>
          <SignedOut>
              <Button color="primary" variant="contained" href="/sign-in" sx={{ marginRight: 2 }}>Login</Button>
              <Button color="primary" variant="contained" href="/sign-up">Sign Up</Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </Toolbar>
      </Header>

      <MainContent>
        <Box flex="1" padding="20px">
          <Typography variant="h3" component="h1" gutterBottom fontWeight="850">
            Welcome to ProfAdvisor
          </Typography>
          <Typography variant="h6" component="p" gutterBottom fontWeight="550">
            Your go-to platform for rating and reviewing professors.
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Join our community and share your experiences to help others make informed decisions.
          </Typography>
          <Button variant="contained" color="primary" href="/generate" sx={{ marginTop: 2 }}>
            Get Started
          </Button>
        </Box>
        <Illustration src={illustration} alt="ProfAdvisor Illustration" width={600} height={400} />
      </MainContent>

      <FeaturesSection sx={{
        paddingBottom: 6
      }}>
        <FeatureCard>
          <FeatureImage
            component="img"
            alt="Real-time Reviews"
            image={feature1.src}
            sx={{ margin: 2, width: 160, height: 160 }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Real-time Reviews
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Get instant feedback and ratings from students about their professors, helping you make better decisions about your education.
            </Typography>
          </CardContent>
        </FeatureCard>
        <FeatureCard>
          <FeatureImage
            component="img"
            alt="Easy Search"
            image={feature2.src}
            sx={{ margin: 2, width: 160, height: 160 }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Easy Search
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Find and compare professors based on their ratings, subjects, and student reviews with our intuitive search feature.
            </Typography>
          </CardContent>
        </FeatureCard>
        <FeatureCard>
          <FeatureImage
            component="img"
            alt="Community Insights"
            image={feature3.src}
            sx={{ margin: 2, width: 160, height: 160 }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Community Insights
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Engage with a community of students and share your own experiences and recommendations to help others make informed choices.
            </Typography>
          </CardContent>
        </FeatureCard>
      </FeaturesSection>

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
    </ThemeProvider>
  );
};

export default HomePage;
