import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Calendar, Clock, ChevronRight } from "lucide-react";

interface Slot {
    id: string;
    time: string;
}

interface DaySchedule {
    date: string;
    slots: Slot[];
}

interface ScheduleData {
    doctor: string;
    schedule: DaySchedule[];
}

interface SlotsDisplayProps {
    data: ScheduleData;
    onBookSlot?: (date: string, slotId: string) => void;
}

export default function SlotsDisplay({ data, onBookSlot }: SlotsDisplayProps) {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-blue-900/5 overflow-hidden">
            <div className="bg-slate-50/50 px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <h3 className="font-semibold text-gray-800">
                    Available Slots for {data.doctor}
                </h3>
            </div>

            <div className="p-5 space-y-6">
                {data.schedule.map((day, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group"
                    >
                        <h4 className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-3 px-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:scale-125 transition-transform" />
                            {formatDate(day.date)}
                        </h4>

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                            {day.slots.map((slot) => (
                                <button
                                    key={slot.id}
                                    onClick={() => onBookSlot && onBookSlot(day.date, slot.id)}
                                    className="group/btn relative px-2 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-blue-50 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                    <Clock className="w-3.5 h-3.5 relative z-10 transition-transform group-hover/btn:rotate-12" />
                                    <span className="relative z-10 text-xs font-bold">{slot.time}</span>
                                </button>
                            ))}
                        </div>

                        {day.slots.length === 0 && (
                            <div className="px-4 py-3 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center">
                                <p className="text-xs font-medium text-gray-400 italic">No slots available for this day</p>
                            </div>
                        )}

                        {idx !== data.schedule.length - 1 && (
                            <div className="h-px bg-gray-100 mt-6" />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
