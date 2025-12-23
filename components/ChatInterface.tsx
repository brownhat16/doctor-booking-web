"use client";

import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import DoctorCard from "./DoctorCard";
import SlotsDisplay from "./SlotsDisplay";
import ConsultationToggle from "./ConsultationToggle";
import SpecialtiesGrid from "./SpecialtiesGrid";
import { Send, Sparkles, Stethoscope, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "assistant";
    content: string;
    doctors?: any[];
    schedule?: any;
    type?: string;
    id: string; // Added ID for reliable keys
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "init",
            role: "assistant",
            content:
                "Hello! I'm your AI health assistant. 👋\n\nBefore we begin, would you prefer a Video Consultation 📹 or an In-Clinic Visit 🏥?\n\nYou can select your preference using the toggle above, then choose a specialty to get started!",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [consultationMode, setConsultationMode] = useState<"video" | "clinic">("clinic");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleBookSlot = (date: string, slotId: string) => {
        const modeText = consultationMode === "video" ? "video consultation" : "in-clinic visit";
        const bookingMessage = `Book appointment on ${date} for slot ${slotId} for ${modeText}`;
        setInput(bookingMessage);
    };

    const processMessage = async (messageText: string) => {
        if (!messageText.trim() || isLoading) return;

        const userMessage: Message = {
            role: "user",
            content: messageText,
            id: Date.now().toString(),
        };
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
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content:
                    data.message || "I'm sorry, I encountered an error. Please try again.",
                doctors: data.data?.doctors,
                schedule: data.type === "slots" ? data.data : undefined,
                type: data.type,
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
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

    const handleCardAction = (action: "slots" | "book", doctorName: string) => {
        if (action === "slots") {
            processMessage(`What are the slots for ${doctorName}?`);
        } else if (action === "book") {
            processMessage(
                `I want to book an appointment with ${doctorName}. Show me available slots.`
            );
        }
    };

    const handleSpecialtySelect = (specialty: string) => {
        const query = `I am looking for a ${specialty} for ${consultationMode === 'video' ? 'video consultation' : 'in-clinic consultation'}.`;
        processMessage(query);
    };

    return (
        <div className="flex h-[80vh] w-full max-w-6xl mx-auto overflow-hidden bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 ring-1 ring-black/5">
            {/* Sidebar - Desktop */}
            <div className="hidden md:flex w-64 flex-col bg-slate-50 border-r border-slate-100 p-4">
                <div className="flex items-center gap-2 mb-8 px-2">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <Stethoscope className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-gray-800 tracking-tight">HealthAI</span>
                </div>

                <div className="flex-1 space-y-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">Capabilities</p>
                    {['Find Specialists', 'Check Availability', 'Instant Booking', 'Price Comparison'].map((item) => (
                        <div key={item} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 bg-white rounded-lg border border-slate-100 shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                            {item}
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-xs text-blue-800/80 leading-relaxed">
                        "Find me a cardiologist under ₹1000 available today"
                    </p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col relative bg-white/50">
                <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">

                    {/* Dashboard Mode (Only show when just default message exists) */}
                    {messages.length === 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <div className="text-center mb-8 mt-4">
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">How can we help you today?</h1>
                                <p className="text-gray-500">Select a specialty or describe your symptoms below</p>
                            </div>

                            <ConsultationToggle mode={consultationMode} onModeChange={setConsultationMode} />
                            <SpecialtiesGrid onSelect={handleSpecialtySelect} />
                        </motion.div>
                    )}

                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={cn(
                                    "flex gap-4 max-w-4xl mx-auto",
                                    msg.role === "user" ? "justify-end" : "justify-start"
                                )}>
                                    {msg.role === 'assistant' && (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg mt-1">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                    )}

                                    <div className="flex-1 max-w-[85%]">
                                        <MessageBubble message={msg} />

                                        {msg.doctors && msg.doctors.length > 0 && (
                                            <div className="mt-6 flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent -mx-4 px-4 md:-mx-2 md:px-2">
                                                {msg.doctors.map((doctor: any, dIdx: number) => (
                                                    <div key={dIdx} className="min-w-[280px] max-w-[280px] flex-shrink-0">
                                                        <DoctorCard
                                                            doctor={doctor}
                                                            onAction={handleCardAction}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {msg.type === "slots" && msg.schedule && (
                                            <div className="mt-4 max-w-xl">
                                                <SlotsDisplay
                                                    data={msg.schedule}
                                                    onBookSlot={handleBookSlot}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-3 max-w-4xl mx-auto"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="px-4 py-3 bg-white rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex gap-1.5 items-center">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 md:p-6 bg-white/80 backdrop-blur-md border-t border-gray-100">
                    <form
                        onSubmit={sendMessage}
                        className="flex gap-2 max-w-4xl mx-auto relative group"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Describe your symptoms or ask for a doctor..."
                            className="flex-1 pl-6 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 placeholder:text-gray-400 shadow-sm group-hover:shadow-md"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Powered by DeepSeek V3</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
