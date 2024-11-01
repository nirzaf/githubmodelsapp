import OpenAI from 'openai';
import type { Message } from './types';

const ENDPOINT = 'https://models.inference.ai.azure.com';
const MODELS = ['o1-mini', 'gpt-4o'];

export async function sendMessage(messages: Message[]): Promise<string> {
  const token = localStorage.getItem('github_token');
  if (!token) {
    throw new Error('Please set your API token first');
  }

  const client = new OpenAI({ 
    baseURL: ENDPOINT, 
    apiKey: token,
    dangerouslyAllowBrowser: true
  });

  // Try each model in sequence until one works
  for (const model of MODELS) {
    try {
      const response = await client.chat.completions.create({
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        model,
        temperature: 0.7,
        max_tokens: 1000
      });

      return response.choices[0]?.message?.content || '';
    } catch (error: any) {
      // If this is the last model in our list, throw the error
      if (model === MODELS[MODELS.length - 1]) {
        console.error('API Error:', error);
        throw new Error(
          error?.error?.message || 
          'Failed to get response from AI. All available models failed.'
        );
      }
      // Otherwise, continue to the next model
      console.warn(`Model ${model} failed, trying next model...`);
    }
  }

  // This should never be reached due to the error handling above
  throw new Error('No available models could process the request');
}