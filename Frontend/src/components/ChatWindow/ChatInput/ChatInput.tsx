import React, { useState } from "react";
import { io } from "socket.io-client";
import { fetchAIResponse } from "../../ChatIA/api";
import { ChatInputProps, Message } from "../../../types/types";
import { useChat } from "../../../context/ChatContext";

// Inicialización de la conexión con Socket.IO
const socket = io("/");

const ChatInput: React.FC<ChatInputProps> = ({ selectedChat, setIsTyping, setLoading, setMessages }) => {
    const { setChats } = useChat();
    const [message, setMessage] = useState<string>("");

    // Función para enviar mensajes
    const sendMessage = async () => {
        if (message.trim() === "") return; // Evita enviar mensajes vacíos

        // Crear un nuevo mensaje con el remitente correcto
        const newMessage: Message = { text: message, sender: selectedChat.isAIChat ? "client" : "agent" };
        setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);

        // Si el chat es con IA, manejar la respuesta del bot
        if (selectedChat.isAIChat) {
            socket.emit("message", { text: message, chatId: selectedChat.id });
            setChats((prevChats) =>
                prevChats.map((chat) =>
                    chat.id === selectedChat.id ? { ...chat, messages: [...chat.messages, newMessage] } : chat
                )
            );
            setMessage("");

            try {
                setLoading(true);
                const botReply = await fetchAIResponse(message);
                const botMessage: Message = { text: botReply, sender: "agent" };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
                setChats((prevChats) =>
                    prevChats.map((chat) =>
                        chat.id === selectedChat.id ? { ...chat, messages: [...chat.messages, botMessage] } : chat
                    )
                );
            } catch (error) {
                console.error("Error obteniendo respuesta de la IA:", error);
            } finally {
                setLoading(false);
            }
        } else {
            // Si el chat no es con IA, enviar el mensaje normalmente
            socket.emit("message", { text: message, chatId: selectedChat.id });
            setChats((prevChats) =>
                prevChats.map((chat) =>
                    chat.id === selectedChat.id ? { ...chat, messages: [...chat.messages, newMessage] } : chat
                )
            );
            setMessage("");
        }

        setIsTyping(false); // Indicar que el usuario ha dejado de escribir
    };

    // Manejo del evento de escritura para notificar a otros usuarios
    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
        if (e.target.value.length > 0) {
            socket.emit("typing");
        }
    };

    return (
        <div className="p-4 border-t flex">
            <input
                type="text"
                className="flex-1 p-2 border rounded-lg"
                placeholder="Escribe un mensaje..."
                value={message}
                onChange={handleTyping}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
                onClick={sendMessage}
                className="ml-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900"
            >
                Enviar
            </button>
        </div>
    );
};

export default ChatInput;
