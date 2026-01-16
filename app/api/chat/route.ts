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

    const ollamaUrl = `${OLLAMA_BASE_URL}/api/chat`;

    // Call Ollama API with streaming enabled
    const response = await fetch(ollamaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma3:4b",
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
        stream: true, // Enable streaming
        options: {
          temperature: 0.3,
          top_p: 0.8,
          top_k: 20,
          num_predict: 100,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ollama API error:", errorText);
      return new Response(
        JSON.stringify({ error: `Failed to get response from AI: ${response.status}` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Stream the response back to the client
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            // Decode the chunk and parse each line (Ollama sends NDJSON)
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n").filter(line => line.trim());

            for (const line of lines) {
              try {
                const json = JSON.parse(line);
                // Extract the content from the message
                const content = json.message?.content || "";
                if (content) {
                  // Send the text chunk to the client
                  controller.enqueue(encoder.encode(content));
                }
              } catch {
                // Skip invalid JSON lines
              }
            }
          }
        } catch (error) {
          console.error("Stream error:", error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process message" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
