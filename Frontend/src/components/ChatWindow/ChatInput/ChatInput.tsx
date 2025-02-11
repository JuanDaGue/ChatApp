import React, { useState } from 'react';
import { io } from "socket.io-client";
import { fetchAIResponse } from "../../ChatIA/api";
import { ChatInputProps } from "../../../types/types";
import { useChat } from "../../../context/ChatContext";

// Conexión al servidor de Socket.IO
const socket = io("/");

/**
 * Componente `ChatInput`: Maneja la entrada de mensajes del usuario y la comunicación con el servidor.
 * - Envía mensajes a chats regulares o chats con IA.
 * - Actualiza el estado de los chats en tiempo real.
 * - Maneja el estado de "escribiendo" y "cargando".
 *
 * @param {ChatInputProps} props - Propiedades del componente:
 *   - selectedChat: Chat seleccionado actualmente.
 *   - setIsTyping: Función para actualizar el estado de "escribiendo".
 *   - setLoading: Función para actualizar el estado de "cargando".
 */
const ChatInput: React.FC<ChatInputProps> = ({ selectedChat, setIsTyping, setLoading }) => {
    const { setChats } = useChat(); // Contexto de chat para actualizar la lista de chats
    const [message, setMessage] = useState(""); // Estado del mensaje actual
    console.log(message);
    /**
     * Función `sendMessage`: Envía un mensaje al chat seleccionado.
     * - Si el chat es con IA, obtiene una respuesta de la API de IA.
     * - Si es un chat regular, envía el mensaje directamente.
     */
    const sendMessage = async () => {
        if (message.trim() === "") return; // Ignora mensajes vacíos

        if (selectedChat.isAIChat) {
            // Chat con IA
            socket.emit("message", { text: message, chatId: selectedChat.id }); // Envía el mensaje al servidor
            setChats(prevChats =>
                prevChats.map(chat =>
                    chat.id === selectedChat.id
                        ? { ...chat, messages: [...chat.messages, { text: message, sender: "client" }] } // Agrega el mensaje del cliente
                        : chat
                )
            );
            setMessage(""); // Limpia el campo de entrada

            try {
                setLoading(true); // Activa el estado de "cargando"
                const botReply = await fetchAIResponse(message); // Obtiene la respuesta de la IA
                setChats(prevChats =>
                    prevChats.map(chat =>
                        chat.id === selectedChat.id
                            ? { ...chat, messages: [...chat.messages, { text: botReply, sender: "agent" }] } // Agrega la respuesta de la IA
                            : chat
                    )
                );
            } catch (error) {
                console.error("Error fetching AI response:", error); // Maneja errores de la API
            } finally {
                setLoading(false); // Desactiva el estado de "cargando"
            }
        } else {
            // Chat regular
            socket.emit("message", { text: message, chatId: selectedChat.id }); // Envía el mensaje al servidor
            setChats(prevChats =>
                prevChats.map(chat =>
                    chat.id === selectedChat.id
                        ? { ...chat, messages: [...chat.messages, { text: message, sender: "agent" }] } // Agrega el mensaje del agente
                        : chat
                )
            );
            setMessage(""); // Limpia el campo de entrada
        }

        setIsTyping(false); // Desactiva el estado de "escribiendo"
    };

    /**
     * Función `handleTyping`: Actualiza el estado del mensaje y notifica cuando el usuario está escribiendo.
     * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio en el campo de entrada.
     */
    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value); // Actualiza el estado del mensaje
        if (e.target.value.length > 0) {
            socket.emit("typing"); // Notifica que el usuario está escribiendo
        }
    };

    return (
        <div className="p-4 border-t flex">
            {/* Campo de entrada para el mensaje */}
            <input
                type="text"
                className="flex-1 p-2 border rounded-lg"
                placeholder="Type a message..."
                value={message}
                onChange={handleTyping}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Envía el mensaje al presionar Enter
            />
            {/* Botón para enviar el mensaje */}
            <button
                onClick={sendMessage}
                className="ml-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900"
            >
                Send
            </button>
        </div>
    );
};

export default ChatInput;