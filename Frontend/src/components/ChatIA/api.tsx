// Asegúrate de que la variable de entorno VITE_API_URL esté configurada en tu archivo .env
const API_URL = import.meta.env.VITE_API_URL;

import { AIResponse } from "../../types/types";

/**
 * Función `fetchAIResponse`: Obtiene una respuesta de la API de IA basada en el mensaje del usuario.
 * - Realiza una solicitud POST a la API con el mensaje del usuario.
 * - Maneja errores de red, respuestas HTTP no exitosas y errores de análisis JSON.
 * - Devuelve la respuesta de la IA o un mensaje de error en caso de fallo.
 *
 * @param {string} message - El mensaje del usuario.
 * @returns {Promise<string>} - La respuesta de la IA o un mensaje de error.
 */
export const fetchAIResponse = async (message: string): Promise<string> => {
    try {
        // Realiza la solicitud POST a la API
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: message }],
                }],
            }),
        });

        // Maneja respuestas HTTP no exitosas (fuera del rango 2xx)
        if (!response.ok) {
            console.error("HTTP error:", response.status, response.statusText);
            return "Error fetching response.";
        }

        // Parsea la respuesta JSON
        const data: AIResponse | null = await response.json().catch(() => {
            console.error("Error parsing JSON response");
            return null;
        });

        // Maneja respuestas inválidas o vacías
        if (!data) {
            return "Error fetching response.";
        }

        // Extrae la respuesta de la IA
        const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond.";
        return botReply;
    } catch (error) {
        // Maneja errores inesperados
        console.error("Error fetching AI response:", error);
        return "Error fetching response.";
    }
};