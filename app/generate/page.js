'use client';
import Image from 'next/image';
import logo from '/public/logo.png';
import { Box, Button, Stack, TextField, Typography, Container, AppBar, Toolbar, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
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
    fontFamily: '"Inter", "Arial", sans-serif',
  },
});

const Header = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: 'none',
  padding: '5px',
}));

const Footer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  borderTop: '1px solid #333',
}));

const ChatBox = styled(Stack)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  height: '70vh', // Adjusted height
  border: '1px solid #333',
  borderRadius: '10px',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
}));

const MessageBubble = styled(Box)(({ theme, role }) => ({
  backgroundColor: role === 'assistant' ? '#333' : '#444',
  color: theme.palette.text.primary,
  borderRadius: '20px',
  padding: '10px 20px',
  maxWidth: '80%',
  marginBottom: '10px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
}));

const InputContainer = styled(Stack)(({ theme }) => ({
  padding: '10px',
  borderTop: '1px solid #333',
  backgroundColor: theme.palette.background.default,
}));

const Logo = styled(Image)({
  borderRadius: '50%',
});

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser()
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Rate My Professor support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (message.trim() === '') return;
    setMessage('');
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

    const response = fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, { role: 'user', content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = '';

      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
        return reader.read().then(processText);
      });
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  return (
    <ThemeProvider theme={theme}>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        bgcolor={theme.palette.background.default}
      >
        <Header position="static" color="transparent" elevation={0}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="logo" href="/">
              <Image src={logo} alt="ProfAdvisor Logo" width={50} height={50} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, marginLeft: 2 }}>
              ProfAdvisor
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
          <ChatBox
            direction="column"
            spacing={2}
          >
            <Stack
              direction="column"
              spacing={2}
              flexGrow={1}
              overflow="auto"
              p={2}
            >
              {messages.map((message, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
                >
                  <MessageBubble role={message.role}>
                    {message.content}
                  </MessageBubble>
                </Box>
              ))}
            </Stack>
            <InputContainer
              direction="row"
              spacing={2}
            >
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
              <Button
                variant="contained"
                onClick={sendMessage}
                color="primary"
              >
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
              © {new Date().getFullYear()} ProfAdvisor. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
