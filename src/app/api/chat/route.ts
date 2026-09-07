import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: message,
    });

    return NextResponse.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error("OpenAI error:", error);

    return NextResponse.json(
      { error: "Failed to get response from OpenAI" },
      { status: 500 }
    );
  }
}
