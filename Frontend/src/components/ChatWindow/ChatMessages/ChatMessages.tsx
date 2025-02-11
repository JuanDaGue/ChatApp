import React from 'react';
import { ChatMessagesProps } from "../../../types/types";

/**
 * Componente `ChatMessages`: Muestra la lista de mensajes en un chat.
 * - Renderiza los mensajes enviados por el cliente y el agente.
 * - Muestra un indicador de carga cuando se está procesando una respuesta.
 * - Muestra un indicador de "escribiendo" cuando el cliente está escribiendo.
 *
 * @param {ChatMessagesProps} props - Propiedades del componente:
 *   - messages: Lista de mensajes a mostrar.
 *   - isLoading: Indica si se está cargando una respuesta.
 *   - isTyping: Indica si el cliente está escribiendo.
 */
const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading, isTyping }) => (

    <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-2 md:space-y-4">
        {/* Renderiza cada mensaje */}
        {messages.map((msg, index) => (
            <div
                key={index}
                className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`} // Alinea los mensajes según el remitente
            >
                <p
                    className={`px-2 md:px-4 py-1 md:py-2 rounded-lg max-w-xs md:max-w-md ${
                        msg.sender === "agent"
                            ? "bg-gray-800 text-white" // Estilo para mensajes del agente
                            : "bg-gray-200 text-gray-900" // Estilo para mensajes del cliente
                    }`}
                >
                    {msg.text}
                </p>
            </div>
        ))}

        {/* Muestra un indicador de carga */}
        {isLoading && <p className="text-gray-500">Thinking...</p>}

        {/* Muestra un indicador de "escribiendo" */}
        {isTyping && (
            <div className="flex justify-start">
                <div className="px-2 md:px-4 py-1 md:py-2 rounded-lg bg-gray-300 text-gray-900 italic flex items-center">
                    <span>Client is typing</span>
                    <span className="animate-pulse ml-1">...</span> {/* Animación de puntos suspensivos */}
                </div>
            </div>
        )}
    </div>
);

export default ChatMessages;