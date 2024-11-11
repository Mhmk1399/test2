// utils/jsonEditor.ts

import OpenAI from 'openai';

// Configure OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Sample JSON structure template
const initialJson = {
  type: "layout",
  settings: { /* settings structure */ },
  sections: { /* sections structure */ },
  // other initial JSON properties...
};

export async function modifyJsonWithPrompt(prompt: any) {
  // Define initial JSON structure or fetch current JSON from your database or storage
  let jsonStructure = { ...initialJson };

  // Send prompt and JSON structure to OpenAI API
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are an assistant that modifies JSON files based on commands.' },
      { role: 'user', content: `Here is the JSON file: ${JSON.stringify(jsonStructure)}. Now, make the following changes: ${prompt}` }
    ]
  });

  // Parse and return the modified JSON
  const modifiedJson = JSON.parse(response.choices[0].message.content || '{}');
  return modifiedJson;
}