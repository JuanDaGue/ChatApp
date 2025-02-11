import { Server as socketIO } from "socket.io";

/**
 * Función `setupSocket`: Configura y maneja la lógica de Socket.IO para la comunicación en tiempo real.
 * - Crea una instancia de Socket.IO y configura los eventos de conexión, desconexión y mensajes.
 * - Emite eventos a todos los clientes conectados para mantener la sincronización en tiempo real.
 *
 * @param {Object} server - El servidor HTTP/HTTPS al que se conectará Socket.IO.
 * @returns {Object} - La instancia de Socket.IO configurada.
 */
const setupSocket = (server) => {
    // Crear una nueva instancia de Socket.IO
    const io = new socketIO(server);

    // Manejar la conexión de un nuevo cliente
    io.on("connection", (socket) => {
        console.log("Un usuario se ha conectado");

        // Manejar la desconexión del cliente
        socket.on("disconnect", () => {
            console.log("Un usuario se ha desconectado");
        });

        // Manejar el evento 'chat' (mensajes de chat)
        socket.on("chat", (data) => {
            console.log("Mensaje de chat recibido:", data);
            // Reenviar el mensaje a todos los clientes excepto al remitente
            socket.broadcast.emit("chat", data);
        });

        // Manejar el evento 'message' (mensajes generales)
        socket.on("message", (data) => {
            console.log("Mensaje recibido:", data);
            // Reenviar el mensaje a todos los clientes excepto al remitente
            socket.broadcast.emit("message", data);
        });

        // Manejar el evento 'typing' (indicador de que un usuario está escribiendo)
        socket.on("typing", (data) => {
            console.log("Evento de escritura recibido:", data);
            // Reenviar el evento a todos los clientes excepto al remitente
            socket.broadcast.emit("typing", data);
        });
    });

    // Retornar la instancia de Socket.IO configurada
    return io;
};

export default setupSocket;