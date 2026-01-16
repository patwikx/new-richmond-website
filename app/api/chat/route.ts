import { NextResponse } from "next/server";
import { PROPERTIES, COMPANY_INFO, ABOUT_VALUES, MILESTONES, NAV_LINKS } from "@/lib/data";

// Use environment variable for flexibility with SSL/HTTP configuration
const OLLAMA_BASE_URL = process.env.OLLAMA_URL;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Construct the context with links and About Us info
    const contextData = `
      COMPANY: ${COMPANY_INFO.name} (${COMPANY_INFO.shortName})
      TAGLINE: ${COMPANY_INFO.tagline}
      ADDRESS: ${COMPANY_INFO.address.full}
      CONTACT: ${COMPANY_INFO.contact.phone.join(", ")}, ${COMPANY_INFO.contact.email.join(", ")}
      
      SITE NAVIGATION (Use these links):
      ${NAV_LINKS.map(link => `- ${link.name}: ${link.href}`).join("\n")}

      MISSION & VISION:
      ${ABOUT_VALUES.map(v => `- ${v.title}: ${v.description}`).join("\n")}

      HISTORY & MILESTONES:
      ${MILESTONES.map(m => `- ${m.year}: ${m.title} - ${m.description}`).join("\n")}

      PROPERTIES:
      ${PROPERTIES.map(p => `
        - Name: ${p.title}
        - Page Link: /properties/${p.id}
        - Google Maps Link: https://www.google.com/maps/search/?api=1&query=${p.coordinates[0]},${p.coordinates[1]}
        - Category: ${p.category}
        - Location: ${p.location}
        - Description: ${p.description}
        - Price: ${p.stats.price}
        - Nearby Landmarks: ${p.nearbyLandmarks?.map(l => l.name).join(", ")}
      `).join("\n")}
    `;

    const systemInstruction = `You are Riley, a friendly assistant for Richmond Land Innovations Inc.

RULES (VERY IMPORTANT):
1. ONLY answer using the CONTEXT below. NEVER make up facts, coordinates, or details.
2. Keep answers SHORT - max 2 sentences.
3. If info isn't in the CONTEXT, say: "I don't have that info, but our team can help! [Contact Page](/contact)"
4. Always link to relevant pages using markdown: [Page Name](/path)
5. Be friendly and natural, use contractions.

LINKS:
- About/History: [About Us](/about)
- Contact: [Contact Page](/contact)
- All properties: [Properties](/properties)
- Specific property: [Property Name](/properties/id)

CONTEXT:
${contextData}`;

    // Log the URL being called for debugging
    const ollamaUrl = `${OLLAMA_BASE_URL}/api/chat`;
    console.log("Calling Ollama API at:", ollamaUrl);

    // Call Ollama API using the chat endpoint
    let response: Response;
    try {
      response = await fetch(ollamaUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemma3:1b",
          messages: [
            {
              role: "system",
              content: systemInstruction,
            },
            {
              role: "assistant",
              content: "Hello! I'm Riley, your assistant here at Richmond Land. Whether you're looking for your next home, a business space like [RD City](/properties/rd-city), or want to learn more about our journey on our [About Page](/about), I'm here to help. What can I do for you today?",
            },
            {
              role: "user",
              content: message,
            },
          ],
          stream: false,
          options: {
            temperature: 0.3,      // Lower = more accurate, less hallucination
            top_p: 0.8,
            top_k: 20,
            num_predict: 100,      // Short responses = faster
          },
        }),
      });
    } catch (fetchError) {
      // This catches network-level errors (DNS, SSL, connection refused, etc.)
      console.error("Fetch error to Ollama:", fetchError);
      console.error("Error name:", (fetchError as Error).name);
      console.error("Error message:", (fetchError as Error).message);
      return NextResponse.json(
        { error: `Network error connecting to AI: ${(fetchError as Error).message}` },
        { status: 500 }
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ollama API error:", errorText);
      console.error("Response status:", response.status, response.statusText);
      return NextResponse.json(
        { error: `Failed to get response from AI: ${response.status} ${response.statusText}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log("Ollama response data:", JSON.stringify(data, null, 2));
    
    const text = data.message?.content;
    
    if (!text) {
      console.error("No content in Ollama response. Full data:", data);
      return NextResponse.json(
        { error: "No response content from AI", response: null },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
