import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Initialize the official SDK with your secure environment key
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    const { url, elements } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Optional: Temporary safe key check logging (delete after verification)
    const key = process.env.ANTHROPIC_API_KEY;
    console.log("Key check:", key ? `${key.slice(0, 12)}...${key.slice(-4)}` : "NOT SET");

    // Execute the request using the updated production model catalog
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6", 
      max_tokens: 1500,
      system: "You are an expert web accessibility auditor specialized in WCAG 2.2 guidelines. Analyze the provided website or components and return a structured assessment detailing contrast issues, screen reader structural faults, interactive target sizing, and actionable fixes.",
      messages: [
        {
          role: "user",
          content: `Please run an accessibility evaluation for the following target layout: ${url}. If any mock DOM components are attached, evaluate them: ${JSON.stringify(elements || {})}`
        }
      ],
    });

    // Safely look for the text content block in the response array
    const textBlock = response.content.find(block => block.type === "text");
    if (!textBlock) {
      return NextResponse.json({ error: "No structured text response returned from the AI gateway." }, { status: 500 });
    }

    return NextResponse.json({ report: textBlock.text });

  } catch (error) {
    console.error("Audit API Error:", error);
    
    // Check if the error came directly from the Anthropic SDK engine
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: error.message || "Anthropic SDK internal routing error." },
        { status: error.status || 500 }
      );
    }
    
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}