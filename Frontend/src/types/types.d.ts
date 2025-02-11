// Define types and interfaces for your application

export type Message = {
    text: string;
    sender: "agent" | "client";
};

export type Chat = {
    id: string;
    clientName: string;
    lastMessage: string;
    timestamp: string;
    avatar: string;
    messages: Message[];
    isAIChat: boolean; 
};

export type ChatContextType = {
    chats: Chat[];
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
    selectedChat: Chat | null;
    setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>;
};

export interface ChatInputProps {
    selectedChat: Chat;
    setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export interface ChatHeaderProps {
    selectedChat: Chat;
}

export interface ChatMessagesProps {
    messages: Message[];
    isLoading: boolean;
    isTyping: boolean;
}


export interface Part {
    text: string;
}

export interface Content {
    parts: Part[];
    role: string;
}

export interface Candidate {
    content: Content;
    finishReason: string;
    avgLogprobs: number;
}

export interface UsageMetadata {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
    promptTokensDetails: TokenDetail[];
    candidatesTokensDetails: TokenDetail[];
}

export interface TokenDetail {
    modality: string;
    tokenCount: number;
}

export interface AIResponse {
    candidates: Candidate[];
    usageMetadata: UsageMetadata;
    modelVersion: string;
}
