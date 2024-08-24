import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';

const API_KEY = process.env.GROQ_API_KEY;
const pineconeApiKey = process.env.PINECONE_API_KEY;
const groq = new Groq({ apiKey: API_KEY });

const systemPrompt = `
You are a rate my professor agent to help students find classes, that takes in user questions and answers them.
For every user question, the top 3 professors that match the user question are returned.
Use them to answer the question if needed.
`;

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid messages format');
    }

    const pc = new Pinecone({ apiKey: pineconeApiKey });
    const index = await pc.index('rag');

    // Extracting the last user message
    const lastMessage = messages[messages.length - 1].content;

    // Convert lastMessage to vector (assuming you have a function for this)
    const vector = await convertTextToVector(lastMessage);

    // Generate embedding using Pinecone
    const queryResponse = await index.query({
      vector,
      topK: 5,
      includeMetadata: true,
    });

    // Prepare the Pinecone results for Groq API
    let resultString = '';
    queryResponse.matches.forEach((match) => {
      resultString += `
      Returned Results:
      Professor: ${match.id}
      Review: ${match.metadata.review}
      Subject: ${match.metadata.subject}
      Stars: ${match.metadata.stars}
      \n\n`;
    });

    const updatedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages,
      { role: 'user', content: resultString },
    ];

    // Generate response using Groq API
    const response = await groq.chat.completions.create({
      model: 'mixtral-8x7b-32768',
      messages: updatedMessages,
      max_tokens: 800,
    });

    if (!response || !response.choices || response.choices.length === 0) {
      throw new Error('Invalid API response');
    }

    const assistantMessage = response.choices[0].message.content;

    return NextResponse.json({ content: assistantMessage });
  } catch (error) {
    console.error('Error in /api/chat route:', error);
    return NextResponse.json({ error: 'Error generating response' }, { status: 500 });
  }
}

// Dummy function for converting text to vector; replace with your actual implementation
async function convertTextToVector(text) {
  // Implement your vector conversion logic here
  return new Array(1536).fill(0).map(() => Math.random()); // Placeholder
}