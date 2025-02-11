import React from "react";
import { useChat } from "../../context/ChatContext";

/**
 * Componente `ChatList`: Muestra la lista de chats disponibles.
 * - Permite seleccionar un chat para ver sus mensajes.
 * - Muestra el avatar, nombre del cliente y la última marca de tiempo del chat.
 * - Si no hay chats activos, muestra un mensaje indicando que no hay chats disponibles.
 */
const ChatList: React.FC = () => {
    const { chats, setSelectedChat } = useChat(); // Contexto de chat para acceder a la lista de chats y seleccionar uno

    return (
        <div className="p-2 sm:p-3" style={{ backgroundColor: '#242424' }}>
            {/* Encabezado de la lista de chats */}
            <div className="sticky top-0 z-10 p-2 sm:p-3 border-b bg-[#242424]">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-gray-100">
                    Chats
                </h2>
            </div>

            {/* Lista de chats */}
            {chats.length === 0 ? (
                // Mensaje si no hay chats activos
                <p className="text-sm sm:text-base text-gray-200">No active chats</p>
            ) : (
                // Renderiza cada chat
                chats.map((chat) => (
                    <div
                        key={chat.id}
                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border-b cursor-pointer hover:bg-gray-200 rounded-lg transition-all"
                        onClick={() => setSelectedChat(chat)} // Selecciona el chat al hacer clic
                    >
                        {/* Avatar del cliente */}
                        <img
                            src={chat.avatar}
                            alt={chat.clientName}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        />

                        {/* Nombre del cliente y marca de tiempo */}
                        <div className="flex-1">
                            <p className="font-semibold text-sm sm:text-base text-gray-400">
                                {chat.clientName}
                            </p>
                            <p className="max-w-xs sm:max-w-sm text-xs sm:text-sm text-gray-400">
                                {chat.timestamp}
                            </p>
                        </div>

                        {/* Marca de tiempo adicional (opcional) */}
                        <p className="text-xs sm:text-sm text-gray-400">
                            {chat.timestamp}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ChatList;