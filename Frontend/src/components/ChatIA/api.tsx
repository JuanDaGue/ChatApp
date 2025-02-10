// src/api.js

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCBMWZDy6IoTKSpsYG8ycvyQ7iezSaNjPk"; // Ensure this environment variable is set
console.log(API_URL);
export const fetchAIResponse = async (message) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: message}]
                }]
            })
        });

        if (!response.ok) {
            // Handle non-2xx HTTP responses
            console.error("HTTP error:", response.status, response.statusText);
            return "Error fetching response.";
        }

        const data = await response.json().catch(() => {
            // Handle JSON parsing errors
            console.error("Error parsing JSON response");
            return null;
        });

        if (!data) {
            return "Error fetching response.";
        }

        const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond.";
        return botReply;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Error fetching response.";
    }
};
