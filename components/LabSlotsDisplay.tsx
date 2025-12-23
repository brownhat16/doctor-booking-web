"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Home, Building2, CheckCircle } from "lucide-react";
import { useState } from "react";

interface LabSlot {
    slot_id: string;
    date: string;
    time: string;
    lab_name: string;
    lab_address: string;
}

interface LabSlotsDisplayProps {
    data: {
        slots: LabSlot[];
        cart: {
            cart: any[];
            cart_total: number;
            cart_count: number;
        };
    };
    onBookSlot: (date: string, time: string, collectionType: string) => void;
}

export default function LabSlotsDisplay({ data, onBookSlot }: LabSlotsDisplayProps) {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [collectionType, setCollectionType] = useState<"lab_visit" | "home_collection">("lab_visit");

    // Group slots by date
    const slotsByDate: { [date: string]: LabSlot[] } = {};
    data.slots.forEach(slot => {
        if (!slotsByDate[slot.date]) {
            slotsByDate[slot.date] = [];
        }
        slotsByDate[slot.date].push(slot);
    });

    const dates = Object.keys(slotsByDate).slice(0, 5);
    const uniqueTimes = selectedDate && slotsByDate[selectedDate]
        ? [...new Set(slotsByDate[selectedDate].map(s => s.time))]
        : [];

    const canBook = selectedDate && selectedTime;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        if (date.toDateString() === today.toDateString()) return "Today";
        if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
        return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                    <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Select Date & Time</h3>
                    <p className="text-sm text-gray-500">{data.cart.cart_count} test(s) • ₹{data.cart.cart_total}</p>
                </div>
            </div>

            {/* Collection Type */}
            <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Sample Collection</p>
                <div className="flex gap-3">
                    <button onClick={() => setCollectionType("lab_visit")}
                        className={`flex-1 px-4 py-3 rounded-xl border-2 flex items-center justify-center gap-2 ${
                            collectionType === "lab_visit" ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" : "border-gray-200 dark:border-gray-700"
                        }`}>
                        <Building2 className="w-4 h-4" /><span className="font-medium">Lab Visit</span>
                    </button>
                    <button onClick={() => setCollectionType("home_collection")}
                        className={`flex-1 px-4 py-3 rounded-xl border-2 flex items-center justify-center gap-2 ${
                            collectionType === "home_collection" ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-gray-200 dark:border-gray-700"
                        }`}>
                        <Home className="w-4 h-4" /><span className="font-medium">Home +₹50</span>
                    </button>
                </div>
            </div>

            {/* Date Selection */}
            <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Select Date</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {dates.map((date) => (
                        <button key={date} onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                            className={`px-4 py-3 rounded-xl border-2 min-w-[90px] ${
                                selectedDate === date ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" : "border-gray-200 dark:border-gray-700"
                            }`}>
                            <p className={`text-sm font-bold ${selectedDate === date ? "text-purple-600" : "text-gray-900 dark:text-white"}`}>
                                {formatDate(date)}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
                <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Select Time</p>
                    <div className="grid grid-cols-2 gap-2">
                        {uniqueTimes.map((time) => (
                            <button key={time} onClick={() => setSelectedTime(time)}
                                className={`px-4 py-3 rounded-xl border-2 flex items-center justify-center gap-2 ${
                                    selectedTime === time ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" : "border-gray-200 dark:border-gray-700"
                                }`}>
                                <Clock className="w-4 h-4" />
                                <span className="font-medium">{time}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Book Button */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                {canBook && (
                    <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center gap-2 text-green-700">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">{formatDate(selectedDate!)} at {selectedTime}</span>
                    </div>
                )}
                <button onClick={() => canBook && onBookSlot(selectedDate!, selectedTime!, collectionType)} disabled={!canBook}
                    className={`w-full py-4 rounded-xl font-bold text-lg ${
                        canBook ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg hover:scale-[1.02]" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}>
                    {canBook ? `Confirm Booking • ₹${data.cart.cart_total + (collectionType === "home_collection" ? 50 : 0)}` : "Select date and time"}
                </button>
            </div>
        </motion.div>
    );
}
