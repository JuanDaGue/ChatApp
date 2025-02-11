import React from "react";
import { ChatList } from "../ChatList";
import { ChatWindow } from "../ChatWindow";

/**
 * Componente `ChatLayout`: Define la estructura principal del layout de la aplicación de chat.
 * - Divide la pantalla en dos secciones: una barra lateral para la lista de chats y una ventana principal para el chat seleccionado.
 * - Es responsivo: en dispositivos móviles, la lista de chats y la ventana de chat se apilan verticalmente; en pantallas más grandes, se muestran en horizontal.
 */
const ChatLayout: React.FC = () => {
    return (
        <div className="flex flex-col h-screen w-full md:flex-row">
            {/* Barra lateral para la lista de chats */}
            <aside className="w-full md:w-1/4 border-r p-3 overflow-y-auto h-full">
                <ChatList />
            </aside>

            {/* Ventana principal para el chat seleccionado */}
            <main className="w-full md:w-3/4 p-4 flex flex-col overflow-y-auto h-full">
                <div className="flex-1 flex justify-center items-center">
                    <ChatWindow />
                </div>
            </main>
        </div>
    );
};

export default ChatLayout;