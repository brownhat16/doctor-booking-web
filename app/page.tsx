"use client";

import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏥 Doctor Booking Assistant
          </h1>
          <p className="text-gray-600">
            Find, schedule, and book appointments with top doctors in Pune
          </p>
        </div>
        
        <ChatInterface />
      </div>
    </main>
  );
}
