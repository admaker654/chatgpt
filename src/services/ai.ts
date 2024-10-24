import { Message } from '../types';

const API_KEY = '3aaff47435b8645908df30500a2a0764ac4b0b66e63da1247769fec16db8f7f6';
const API_URL = 'https://api.together.xyz/v1/chat/completions';

export class AIError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'AIError';
  }
}

async function makeAPIRequest(messages: { role: string; content: string; }[]) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meta-llama/Llama-2-11b-chat-hf',
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new AIError(
      errorData.error?.message || `API request failed with status ${response.status}`,
      response.status
    );
  }

  const data = await response.json();
  if (!data.choices?.[0]?.message?.content) {
    throw new AIError('Invalid response format from API');
  }

  return data.choices[0].message.content.trim();
}

export async function generateAIResponse(messages: Message[]): Promise<string> {
  try {
    const formattedMessages = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

    return await makeAPIRequest(formattedMessages);
  } catch (error) {
    if (error instanceof AIError) {
      throw error;
    }
    throw new AIError('Failed to generate AI response: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}

export async function analyzeImage(imageUrl: string, prompt: string): Promise<string> {
  try {
    const messages = [
      {
        role: 'user',
        content: `[Image: ${imageUrl}]\n${prompt}`,
      }
    ];

    return await makeAPIRequest(messages);
  } catch (error) {
    if (error instanceof AIError) {
      throw error;
    }
    throw new AIError('Failed to analyze image: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}