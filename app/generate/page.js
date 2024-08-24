'use client';
import Image from 'next/image';
import logo from '/public/logo.png';
import { Box, Button, Stack, TextField, Typography, Container, AppBar, Toolbar, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { UserButton } from "@clerk/nextjs";

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
    h6: {
      fontSize: '1.5rem',
      fontWeight: 700,
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

const Header = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(230, 243, 255, 0.8)',
  color: theme.palette.text.primary,
  boxShadow: 'none',
  padding: '20px 0',
  backdropFilter: 'blur(10px)',
}));

const ChatBox = styled(Stack)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  height: '70vh', 
  border: '1px solid #333',
  borderRadius: '20px',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
}));

const MessageBubble = styled(Box)(({ theme, role }) => ({
  backgroundColor: role === 'assistant' ? '#F7F7F7' : '#EFEFEF',
  color: theme.palette.text.primary,
  borderRadius: '20px',
  padding: '10px 20px',
  maxWidth: '80%',
  marginBottom: '10px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
}));

const InputContainer = styled(Stack)(({ theme }) => ({
  padding: '10px',
  borderTop: '1px solid #333',
  backgroundColor: theme.palette.background.paper,
}));

const ThinkingBubble = styled(Box)(({ theme }) => ({
  backgroundColor: '#F7F7F7',
  color: theme.palette.text.secondary,
  borderRadius: '20px',
  padding: '10px 20px',
  maxWidth: '80%',
  marginBottom: '10px',
  fontStyle: 'italic',
  fontSize: '1.1rem',
}));

export default function Generate() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    setMessage('');
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: message },
    ]);

    setIsThinking(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: message }] }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: data.content },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: 'Sorry, there was an error processing your request.' },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        bgcolor={theme.palette.background.default}
      >
        <Header position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="logo" href="/">
              <Image src={logo} alt="ProfAdvisor Logo" width={50} height={50} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, marginLeft: 2 }}>
              ProfLink
            </Typography>
            <UserButton />
          </Toolbar>
        </Header>

        <Box
          flexGrow={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding={2}
        >
          <ChatBox direction="column" spacing={2}>
            <Stack direction="column" spacing={2} flexGrow={1} overflow="auto" p={2}>
              {messages.map((message, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
                >
                  <MessageBubble role={message.role}>{message.content}</MessageBubble>
                </Box>
              ))}
              {isThinking && (
                <Box display="flex" justifyContent="flex-start">
                  <ThinkingBubble>...thinking</ThinkingBubble>
                </Box>
              )}
            </Stack>
            <InputContainer direction="row" spacing={2}>
              <TextField
                label="Message"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                variant="outlined"
                size="small"
                multiline
                rows={2}
              />
              <Button variant="contained" onClick={sendMessage} color="primary">
                Send
              </Button>
            </InputContainer>
          </ChatBox>
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
              © {new Date().getFullYear()} ProfLink. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
