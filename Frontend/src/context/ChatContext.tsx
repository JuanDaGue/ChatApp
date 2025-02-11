import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Chat, ChatContextType } from "../types/types";
import { defaultChats } from "./defaultChats";

// Crear el contexto para el chat
const ChatContext = createContext<ChatContextType | undefined>(undefined);

/**
 * Componente `ChatProvider`: Provee el contexto de chat a toda la aplicación.
 * - Gestiona el estado de los chats y el chat seleccionado.
 * - Persiste los chats en el `localStorage` para mantenerlos entre recargas de la página.
 *
 * @param {ReactNode} children - Componentes hijos que tendrán acceso al contexto.
 */
export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Estado para la lista de chats, inicializado desde el localStorage o con valores por defecto
    const [chats, setChats] = useState<Chat[]>(() => {
        const savedChats = localStorage.getItem("chats");
        return savedChats ? JSON.parse(savedChats) : defaultChats;
    });

    // Estado para el chat seleccionado
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

    // Efecto para guardar los chats en el localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem("chats", JSON.stringify(chats));
    }, [chats]);

    // Proveer el contexto a los componentes hijos
    return (
        <ChatContext.Provider value={{ chats, setChats, selectedChat, setSelectedChat }}>
            {children}
        </ChatContext.Provider>
    );
};

/**
 * Hook `useChat`: Permite acceder al contexto de chat desde cualquier componente.
 * - Lanza un error si se usa fuera de un `ChatProvider`.
 *
 * @returns {ChatContextType} - El contexto de chat.
 */
export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) throw new Error("useChat must be used within a ChatProvider");
    return context;
};