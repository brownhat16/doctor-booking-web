import { NextRequest, NextResponse } from "next/server";

// In production, this would call the Python backend
// For now, we'll create a simplified version that mimics the backend

interface ChatRequest {
    message: string;
    history: Array<{ role: string; content: string }>;
    userLocation: {
        lat: number;
        lng: number;
    };
}

export async function POST(request: NextRequest) {
    try {
        const body: ChatRequest = await request.json();
        const { message, history, userLocation } = body;

        // Here we would normally call the Python backend
        // For now, let's create a simple mock response

        // Check if it's a greeting
        if (message.toLowerCase().match(/^(hello|hi|hey)/)) {
            return NextResponse.json({
                type: "chat",
                message: "Hello! I'm your doctor booking assistant. I can help you find doctors, check their availability, and book appointments. Try saying 'I have fever' or 'Find a cardiologist'.",
            });
        }

        // Check if we have doctors in history (for filter intent)
        const hasDoctorsInHistory = history.some((h) =>
            h.content.includes("Found") || h.content.includes("doctors")
        );

        // Simple keyword matching for demonstration
        // In production, this would call DeepSeek via Python
        if (message.toLowerCase().includes("fever") ||
            message.toLowerCase().includes("cold") ||
            message.toLowerCase().includes("headache")) {

            // Mock doctors data
            const mockDoctors = [
                {
                    id: "doc_1",
                    name: "Dr. Patel",
                    specialty: "General Physician",
                    fees: 800,
                    rating: 4.8,
                    distance: "2.3 km",
                    next_available: "Today",
                },
                {
                    id: "doc_2",
                    name: "Dr. Gupta",
                    specialty: "General Physician",
                    fees: 1000,
                    rating: 4.6,
                    distance: "3.1 km",
                    next_available: "Today",
                },
                {
                    id: "doc_3",
                    name: "Dr. Sharma",
                    specialty: "General Physician",
                    fees: 1200,
                    rating: 4.5,
                    distance: "4.5 km",
                    next_available: "Tomorrow",
                },
            ];

            return NextResponse.json({
                type: "search",
                message: `I found ${mockDoctors.length} General Physicians near you. Here are the top options:`,
                data: {
                    doctors: mockDoctors,
                    count: mockDoctors.length,
                },
            });
        }

        // Handle filter intents (e.g., "under ₹1000")
        if (hasDoctorsInHistory && (
            message.toLowerCase().includes("under") ||
            message.toLowerCase().includes("cheaper") ||
            message.toLowerCase().includes("available")
        )) {
            const mockFiltered = [
                {
                    id: "doc_1",
                    name: "Dr. Patel",
                    specialty: "General Physician",
                    fees: 800,
                    rating: 4.8,
                    distance: "2.3 km",
                    next_available: "Today",
                },
            ];

            return NextResponse.json({
                type: "filter",
                message: `Refined to ${mockFiltered.length} doctor matching your criteria.`,
                data: {
                    doctors: mockFiltered,
                    count: mockFiltered.length,
                },
            });
        }

        // Default response
        return NextResponse.json({
            type: "chat",
            message: "I can help you find doctors. Try telling me your symptoms or the specialty you're looking for!",
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
