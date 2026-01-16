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

    const systemInstruction = `You are Riley, the AI assistant for Richmond Land Innovations Inc. (RLII).
      
YOUR GOAL:
Provide intelligent, human-like assistance using ONLY the provided context.

CORE BEHAVIORS:
1. **Analyze Sentiment:** assess if the user is frustrated, curious, urgent, or casual and reply accordingly.
2. **Understand Intent:** Address the underlying need. If they ask about the company history, use the MILESTONES data. If they ask about our goals, use the MISSION & VISION data.
3. **Natural Conversation:** Sound like a helpful human assistant. Use natural transitions.

CRITICAL INSTRUCTIONS FOR LINKS:
1. **Internal Linking:** When answering a question that is covered by a specific page on our website, ALWAYS include the link in your response.
   - For General Info/History -> [About Us](/about)
   - For Contact/Support -> [Contact Page](/contact)
   - For Property Listings -> [Properties Page](/properties)
   - For Specific Property -> [Property Name](/properties/id)
2. **External Linking:** The ONLY allowed external links are the provided Google Maps URLs.
3. **Format:** Always use the markdown format [Link Label](URL). NEVER show raw URLs.

STRICT RULES:
1. ONLY use the provided Context. If you don't know, politely suggest contacting our team via the [Contact Page](/contact).
2. For PRICING or specific TENANTS, kindly direct them to the [Contact Page](/contact) or sales team. Do not give specific prices if they aren't in the context.
3. Keep it concise but polite (approx 2-4 sentences).

CONTEXT:
${contextData}`;

    // Call Ollama API using the chat endpoint
    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
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
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ollama API error:", errorText);
      return NextResponse.json(
        { error: "Failed to get response from AI" },
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
