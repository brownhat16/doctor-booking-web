"use client";

import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import DoctorCard from "./DoctorCard";
import SlotsDisplay from "./SlotsDisplay";

interface Message {
    role: "user" | "assistant";
    content: string;
    doctors?: any[];
    schedule?: any; // Added schedule field
    type?: string;
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hello! I'm your doctor booking assistant. I can help you find doctors, check their availability, and book appointments. How can I help you today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleBookSlot = (date: string, slotId: string) => {
        // Automatically send a booking message when a slot is clicked
        const bookingMessage = `Book appointment on ${date} for slot ${slotId}`;
        setInput(bookingMessage);
        // We could auto-submit here, but letting the user see/edit is often safer.
        // For a smoother UX, we can just populate the input.
    };

    const processMessage = async (messageText: string) => {
        if (!messageText.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content: messageText };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: messageText,
                    history: messages.map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                    userLocation: {
                        lat: 18.5204,
                        lng: 73.8567,
                    },
                }),
            });

            const data = await response.json();

            const assistantMessage: Message = {
                role: "assistant",
                content: data.message || "I'm sorry, I encountered an error. Please try again.",
                doctors: data.data?.doctors,
                schedule: data.type === "slots" ? data.data : undefined, // Capture schedule data
                type: data.type,
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Sorry, I encountered an error. Please try again.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        await processMessage(input);
        setInput("");
    };

    const handleCardAction = (action: 'slots' | 'book', doctorName: string) => {
        if (action === 'slots') {
            processMessage(`What are the slots for ${doctorName}?`);
        } else if (action === 'book') {
            // For now, asking for slots is safer than auto-booking first slot
            processMessage(`I want to book an appointment with ${doctorName}. Show me available slots.`);
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
            {/* Chat Messages */}
            <div className="h-[600px] overflow-y-auto p-6 space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx}>
                        <MessageBubble message={msg} />

                        {/* Render Doctor Cards */}
                        {msg.doctors && msg.doctors.length > 0 && (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {msg.doctors.slice(0, 3).map((doctor, dIdx) => (
                                    <DoctorCard
                                        key={dIdx}
                                        doctor={doctor}
                                        onAction={handleCardAction}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Render Slots Display */}
                        {msg.type === "slots" && msg.schedule && (
                            <div className="max-w-md">
                                <SlotsDisplay
                                    data={msg.schedule}
                                    onBookSlot={handleBookSlot}
                                />
                            </div>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-center gap-2 text-gray-500">
                        <div className="animate-pulse">●</div>
                        <div className="animate-pulse animation-delay-200">●</div>
                        <div className="animate-pulse animation-delay-400">●</div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={sendMessage} className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message... (e.g., 'I have fever', 'under ₹500')"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}
