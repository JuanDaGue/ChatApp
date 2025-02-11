import React, { useState, useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMessages from "./ChatMessages/ChatMessages";
import ChatInput from "./ChatInput/ChatInput";
import { io } from "socket.io-client";

// Conexión al servidor de Socket.IO
const socket = io("/");

/**
 * Componente `ChatWindow`: Representa la ventana de chat.
 * - Muestra el encabezado, los mensajes y la entrada de chat.
 * - Escucha eventos de Socket.IO para actualizar los mensajes y el estado de "escribiendo".
 */
const ChatWindow: React.FC = () => {
    const { selectedChat, setChats } = useChat(); // Contexto de chat para acceder al chat seleccionado y actualizar la lista de chats
    const [isTyping, setIsTyping] = useState(false); // Estado para indicar si el usuario está escribiendo
    const [loading, setLoading] = useState(false); // Estado para indicar si se está cargando una respuesta

    /**
     * Efecto para manejar eventos de Socket.IO.
     * - Escucha mensajes entrantes y actualiza la lista de chats.
     * - Escucha el evento "typing" para mostrar el estado de "escribiendo".
     */
    useEffect(() => {
        // Maneja mensajes entrantes
        const handleMessage = (data: { text: string; chatId: string }) => {
            setChats(prevChats =>
                prevChats.map(chat =>
                    chat.id === data.chatId
                        ? { ...chat, messages: [...chat.messages, { text: data.text, sender: "client" }] } // Agrega el mensaje recibido
                        : chat
                )
            );
        };

        // Escucha el evento "message" para recibir mensajes
        socket.on("message", handleMessage);

        // Escucha el evento "typing" para mostrar el estado de "escribiendo"
        socket.on("typing", () => {
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 2000); // Desactiva el estado después de 2 segundos
        });

        // Limpia los listeners al desmontar el componente
        return () => {
            socket.off("message", handleMessage);
            socket.off("typing");
        };
    }, [setChats]);

    // Si no hay un chat seleccionado, muestra un mensaje para seleccionar uno
    if (!selectedChat) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500 text-lg md:text-xl">
                Select a chat to start messaging
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            {/* Encabezado del chat */}
            <ChatHeader selectedChat={selectedChat} />

            {/* Lista de mensajes */}
            <ChatMessages
                messages={selectedChat.messages}
                isLoading={loading}
                isTyping={isTyping}
            />

            {/* Entrada de chat */}
            <ChatInput
                selectedChat={selectedChat}
                setIsTyping={setIsTyping}
                setLoading={setLoading}
            />
        </div>
    );
};

export default ChatWindow;