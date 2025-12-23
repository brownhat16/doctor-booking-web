import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
    message: {
        role: "user" | "assistant";
        content: string;
    };
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === "user";

    return (
        <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
            <div
                className={cn(
                    "max-w-full px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm",
                    isUser
                        ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-none"
                        : "bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]"
                )}
            >
                <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
        </div>
    );
}
