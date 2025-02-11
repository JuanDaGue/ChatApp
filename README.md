# React + TypeScript + Vite Chat App express and socket.io

# Proyecto de Chat: Cliente-Agente y Chatbot

Este proyecto es una aplicación de chat que permite la comunicación entre un cliente y un agente, así como la interacción con un chatbot. Está construido con una arquitectura full-stack, utilizando **React** para el frontend y **Node.js** con **Socket.IO** para el backend.

---

## Tabla de Contenidos
1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Frontend](#frontend)
   - [Chat entre Cliente y Agente](#chat-entre-cliente-y-agente)
   - [Chat con Chatbot](#chat-con-chatbot)
5. [Backend](#backend)
   - [Configuración del Servidor](#configuración-del-servidor)
   - [Socket.IO para Comunicación en Tiempo Real](#socketio-para-comunicación-en-tiempo-real)
6. [Ejecución del Proyecto](#ejecución-del-proyecto)
7. [Contribución](#contribución)
8. [Licencia](#licencia)

---

## Requisitos

- **Node.js** (v16 o superior)
- **npm** o **yarn** (para gestionar dependencias)
- **React** (v18 o superior)
- **Socket.IO** (para comunicación en tiempo real)
- **TypeScript** (opcional, pero recomendado)

---

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/proyecto-chat.git
   cd proyecto-chat

   ## Instalación de dependencias

   npm install
   ```  
### Estructura del Proyecto
---
```bash
proyecto-chat/
├── frontend/                  # Código del frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── components/        # Componentes de React
│   │   ├── context/           # Contextos de React
│   │   ├── types/             # Tipos de TypeScript
│   │   ├── api/               # Lógica de llamadas a la API
│   │   └── App.tsx            # Componente principal
│   └── package.json
├── backend/                   # Código del backend (Node.js)
│   ├── server/                # Configuración del servidor
│   ├── socket/                # Lógica de Socket.IO
│   ├── app.js                 # Punto de entrada del backend
│   └── package.json
└── README.md                  # Este archivo
```
### Socket.IO para Comunicación en Tiempo Real
El proyecto está dividido en dos partes: el frontend y el backend. El frontend se encuentra en la carpeta `frontend`, mientras que el backend se encuentra en la carpeta `server`.

El backend se encarga de manejar las conexiones entre el cliente y el agente, así como la interacción con el chatbot. El backend utiliza **Socket.IO** para establecer una conexión en tiempo real entre el cliente y el agente.

El frontend se encarga de mostrar la interfaz de usuario y manejar la comunicación entre el cliente y el agente. El frontend utiliza **React** para construir la interfaz de usuario y **Socket.IO** para establecer la conexión en tiempo real entre el cliente y el agente.

3. Chat entre Cliente y Agente
---

En este chat, el cliente y el agente se comunican directamente, sin necesidad de un chatbot. El cliente envía mensajes al agente y el agente responde con mensajes.

4. Chat con Chatbot
---

En este chat, el cliente y el agente se comunican con un chatbot. El cliente envía mensajes al chatbot y el chatbot responde con mensajes.

5. Backend
---

### Configuración del Servidor

Para configurar el servidor, sigue estos pasos:

1. Abre el archivo `server/index.js` y cambia la variable `PORT` a la puerta que deseas utilizar para el servidor.

2. Abre el archivo `.env` y cambia la variable `PORT` a la puerta que deseas utilizar para el servidor.


### Frontend

Para configurar el frontend, sigue estos pasos:

1. Abre el archivo `frontend/src/App.tsx` y cambia la ruta de la API de la variable `API_URL` a la URL de la API que deseas utilizar.

2. Abre el archivo `frontend/src/api.ts` y cambia la ruta de la API de la variable `API_URL` a la URL de la API que deseas utilizar.


El chat entre cliente y agente permite la comunicación en tiempo real entre dos usuarios.  
Utiliza **Socket.IO** para enviar y recibir mensajes instantáneamente.

## Componentes Principales

- **ChatList**: Muestra la lista de chats disponibles.  
- **ChatWindow**: Muestra la ventana de chat con los mensajes.  
- **ChatInput**: Permite al usuario escribir y enviar mensajes.  
- **ChatHeader**: Muestra el encabezado del chat con el nombre del cliente/agente.  

## Flujo de Trabajo

1. El cliente selecciona un chat desde la lista.  
2. Los mensajes se envían y reciben en tiempo real a través de **Socket.IO**.  
3. Los mensajes se almacenan en el estado global de **React** (usando `useContext`).  

---

# Chat con Chatbot

El chat con el chatbot permite a los usuarios interactuar con un asistente virtual.  
Utiliza una **API de IA** (por ejemplo, OpenAI) para generar respuestas automáticas.

## Flujo de Trabajo

1. El usuario escribe un mensaje.  
2. El mensaje se envía a la **API de IA**.  
3. La respuesta del chatbot se muestra en la ventana de chat.  
