import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 1. Grab the URL or element data sent from your frontend workspace
    const { url, elements } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // 2. Fetch directly from Anthropic's Messages API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01", // Anthropic's required API version header
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022", // Using Claude 3.5 Sonnet
        max_tokens: 1500,
        system: "You are an expert web accessibility auditor specialized in WCAG 2.2 guidelines. Analyze the provided website or components and return a structured assessment detailing contrast issues, screen reader structural faults, interactive target sizing, and actionable fixes.",
        messages: [
          {
            role: "user",
            content: `Please run an accessibility evaluation for the following target layout: ${url}. If any mock DOM components are attached, evaluate them: ${JSON.stringify(elements || {})}`
          }
        ],
      }),
    });

    // 3. Handle Anthropic API errors (like running out of credits)
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error?.message || "Anthropic API communication error" },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // 4. Send Claude's expert response back to your client-side UI
    return NextResponse.json({ report: data.content[0].text });

  } catch (error) {
    console.error("Audit API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}