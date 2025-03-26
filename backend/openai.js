// openaiService.js
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function listModels() {
    const models = await client.models.list();
    console.log("Available models:", models);
}

// This function sends a chat request to the OpenAI API.
// It uses a system prompt that instructs the model to act as a compassionate therapist.
export async function getTherapeuticAdvice(journalEntry) {
    try {
        const completion = await client.chat.completions.create({
            // Use the cheapest available chat model. (gpt-3.5-turbo is typically the most cost-effective option.)
            model: "gpt-4o-mini",
            messages: [
                // System prompt to set the behavior of the assistant
                {
                    role: "system",
                    content: `You are a compassionate therapist who helps individuals understand and manage their emotions. When a user provides a journal entry, analyze the text to extract the underlying emotions. Offer friendly, empathetic advice on how to navigate these feelings, including practical suggestions and mental health techniques like mindfulness, self-care, and stress management. Ensure your tone is gentle, supportive, and non-judgmental, and provide guidance for how to feel better and build resilience for future challenges.`,
                },
                // User prompt (the journal entry)
                {
                    role: "user",
                    content: journalEntry,
                },
            ],
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching therapeutic advice:", error);
        throw error;
    }
}
