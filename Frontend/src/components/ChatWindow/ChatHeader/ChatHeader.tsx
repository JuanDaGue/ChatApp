import React from 'react';
import { Chat } from "../../../types/types";

/**
 * Interfaz `ChatHeaderProps`: Define las propiedades del componente `ChatHeader`.
 * @property {Chat} selectedChat - El chat seleccionado que contiene la información del cliente.
 */
interface ChatHeaderProps {
  selectedChat: Chat;
}

/**
 * Componente `ChatHeader`: Muestra el encabezado de un chat.
 * - Incluye el avatar y el nombre del cliente.
 * - Tiene un diseño fijo en la parte superior de la ventana de chat.
 *
 * @param {ChatHeaderProps} props - Propiedades del componente:
 *   - selectedChat: Objeto que contiene la información del chat seleccionado.
 */
const ChatHeader: React.FC<ChatHeaderProps> = ({ selectedChat }) => (
    <div
        className="sticky top-0 z-10 p-4 border-b flex items-center gap-3"
        style={{ backgroundColor: '#242424' }} // Fondo oscuro para el encabezado
    >
        {/* Avatar del cliente */}
        <img
            src={selectedChat.avatar}
            alt={selectedChat.clientName}
            className="w-12 h-12 rounded-full object-cover"
        />

        {/* Nombre del cliente */}
        <h2 className="text-xl font-semibold text-white">
            {selectedChat.clientName}
        </h2>
    </div>
);

export default ChatHeader;