// openaiService.js
import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Gets therapeutic advice from OpenAI based on journal entry text.
 */
export async function getTherapeuticAdvice(journalEntry) {
    try {
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are a compassionate therapist who helps individuals understand and manage their emotions. When a user provides a journal entry, analyze the text to extract the underlying emotions. Offer friendly, empathetic advice on how to navigate these feelings, including practical suggestions and mental health techniques like mindfulness, self-care, and stress management. Ensure your tone is gentle, supportive, and non-judgmental, and provide guidance for how to feel better and build resilience for future challenges.`,
                },
                { role: "user", content: journalEntry },
            ],
        });
        if (completion?.choices?.[0]?.message?.content) {
            return completion.choices[0].message.content;
        } else { throw new Error("Invalid response structure from AI service."); }
    } catch (error) { throw error; }
}

/**
 * Lists available OpenAI models (for debugging).
 */
export async function listModels() {
    try {
        const models = await client.models.list();
        console.log("Available models:", models.data.map(m => m.id)); // Log only IDs for cleaner output
    } catch(error) { console.error("Error listing OpenAI models:", error); }
}
