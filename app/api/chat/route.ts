import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "https://doctor-booking-backend-28a3.onrender.com";

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

        // Call Python backend on Render
        const response = await fetch(`${BACKEND_URL}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            console.error(`Backend error: ${response.status} ${response.statusText}`);
            throw new Error(`Backend returned ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error("API Error:", error);

        // Return user-friendly error message
        return NextResponse.json(
            {
                type: "chat",
                message: "Sorry, I'm having trouble connecting to the backend. Please try again in a moment.",
            },
            { status: 200 } // Return 200 so frontend doesn't break
        );
    }
}
