import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-3.5-turbo',
        prompt: body.prompt,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    console.error('Error processing prompt:', error);
    if (error instanceof Error) {
      const axiosError = error as AxiosError;
      return NextResponse.json(
        { message: axiosError.response?.data || 'An error occurred with the OpenAI API request.' },
        { status: axiosError.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { message: 'An unknown error occurred.' },
      { status: 500 }
    );
  }
}
