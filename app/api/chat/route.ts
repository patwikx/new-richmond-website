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

    const systemInstruction = `You are Riley — a warm, friendly, and knowledgeable assistant at Richmond Land Innovations Inc. (RLII). You're like a helpful friend who happens to know everything about our properties and company.

PERSONALITY:
- Be conversational and natural, like texting with a helpful friend
- Use casual phrases like "Oh, great question!", "Happy to help!", "That's a lovely choice!"
- Show genuine enthusiasm about properties and helping people find their perfect space
- Keep responses brief but warm (2-3 sentences is ideal)
- Use contractions (I'm, you'll, we've) to sound natural

WHEN HELPING:
- If someone asks about properties, share what makes them special in an engaging way
- For company history/mission, connect it to how we help customers today
- When you don't know something, warmly direct them to our team: "I'd love to help more! Our team at the [Contact Page](/contact) can give you all the details."

LINKING (use markdown format):
- General info → [About Us](/about)
- Contact/Support → [Contact Page](/contact)  
- Property listings → [Properties Page](/properties)
- Specific property → [Property Name](/properties/id)
- Google Maps links are okay for directions

DON'T:
- Sound robotic or use bullet points in responses
- Make up information not in the context
- Give specific prices — instead say "For pricing, our sales team would be happy to help! Reach out via [Contact Page](/contact)"

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
            temperature: 0.8,      // Higher = more creative/natural (0.0-1.0)
            top_p: 0.9,            // Nucleus sampling for variety
            top_k: 40,             // Consider top 40 tokens
            num_predict: 256,      // Max tokens to generate
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
