// src/api.js

const API_URL = import.meta.env.VITE_API_URL; // Ensure this environment variable is set
interface AIResponse {
    candidates: {
        content: {
            text: string;
        }[];
    }[];
}

export const fetchAIResponse = async (message: string): Promise<string> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: message }]
                }]
            })
        });

        if (!response.ok) {
            // Handle non-2xx HTTP responses
            console.error("HTTP error:", response.status, response.statusText);
            return "Error fetching response.";
        }

        const data: AIResponse | null = await response.json().catch(() => {
            // Handle JSON parsing errors
            console.error("Error parsing JSON response");
            return null;
        });

        if (!data) {
            return "Error fetching response.";
        }

        const botReply = data?.candidates?.[0]?.content?.[0]?.text || "I'm not sure how to respond.";
        return botReply;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Error fetching response.";
    }
};
