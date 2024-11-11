import { modifyJsonWithPrompt } from "@/utils/jsonEditor";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const body = await req.json();
  const { prompt } = body;

  if (!prompt) {
    return NextResponse.json({ message: 'Prompt is required' }, { status: 400 });
  }

  try {
    // Call function to process prompt and update JSON
    const updatedJson = await modifyJsonWithPrompt(prompt);
    return NextResponse.json({ updatedJson }, { status: 200 });
  } catch (error) {
    console.error('Error processing prompt:', error);
    return NextResponse.json({ message: 'Error updating JSON', error: (error as Error).message }, { status: 500 });
  }}