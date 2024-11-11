  // Import Axios
  import axios from 'axios';
  import { NextRequest, NextResponse } from 'next/server';

  export default async function handler(req: NextRequest) {
    try {
      const body = await req.json();
      // Make the API call to OpenAI with headers for authentication
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003', // or whichever model you're using
          prompt: body.prompt,
          max_tokens: 150, // Adjust based on your needs
          temperature: 0.7, // Adjust for desired creativity level
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      // Send the response back to the client
      return NextResponse.json(response.data, { status: 200 });
    } catch (error: unknown) {
      console.error('Error processing prompt:', error);
      if (axios.isAxiosError(error) && error.response) {
        return NextResponse.json(
          { message: error.response.data || 'An error occurred with the OpenAI API request.' },
          { status: error.response.status || 500 }
        );
      }
      return NextResponse.json(
        { message: 'An unknown error occurred.' },
        { status: 500 }
      );
    }
  }
