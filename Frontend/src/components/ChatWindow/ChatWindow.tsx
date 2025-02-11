import React, { useState, useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMessages from "./ChatMessages/ChatMessages";
import ChatInput from "./ChatInput/ChatInput";
import { io } from "socket.io-client";
import { Chat, Message } from "../../types/types";

// Establece la conexión con el servidor de Socket.IO
const socket = io("/");

const ChatWindow: React.FC = () => {
    const { selectedChat, setChats } = useChat();
    
    // Estado para gestionar si el usuario está escribiendo
    const [isTyping, setIsTyping] = useState<boolean>(false);
    // Estado para manejar la carga de mensajes
    const [loading, setLoading] = useState<boolean>(false);
    // Estado para almacenar los mensajes del chat actual
    const [messages, setMessages] = useState<Message[]>([]);

    console.log("Mensajes: ", messages);

    // Cargar los mensajes del chat seleccionado
    useEffect(() => {
        if (selectedChat) {
            setMessages(selectedChat.messages);
        }
    }, [selectedChat]);

    useEffect(() => {
        // Maneja la recepción de nuevos mensajes
        const handleMessage = (data: { text: string; chatId: string }) => {
            setChats((prevChats: Chat[]) =>
                prevChats.map((chat: Chat) =>
                    chat.id === data.chatId
                        ? { ...chat, messages: [...chat.messages, { text: data.text, sender: "client" }] }
                        : chat
                )
            );
        };

        // Escucha eventos de mensajes y escritura desde el servidor
        socket.on("message", handleMessage);
        socket.on("typing", () => {
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 2000);
        });

        // Limpia los eventos cuando el componente se desmonta
        return () => {
            socket.off("message", handleMessage);
            socket.off("typing");
        };
    }, [setChats]);

    // Si no hay un chat seleccionado, muestra un mensaje al usuario
    if (!selectedChat) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500 text-lg md:text-xl">
                Selecciona un chat para empezar a enviar mensajes
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <ChatHeader selectedChat={selectedChat} />
            <ChatMessages messages={messages} isLoading={loading} isTyping={isTyping} />
            <ChatInput
                selectedChat={selectedChat}
                setIsTyping={setIsTyping}
                setLoading={setLoading}
                setMessages={setMessages}
            />
        </div>
    );
};

export default ChatWindow;