import React from "react";

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
    // Format date helper
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="mt-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">
                Available Slots for {data.doctor}
            </h3>

            <div className="space-y-4">
                {data.schedule.map((day, idx) => (
                    <div key={idx} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                            {formatDate(day.date)}
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                            {day.slots.map((slot) => (
                                <button
                                    key={slot.id}
                                    onClick={() => onBookSlot && onBookSlot(day.date, slot.id)}
                                    className="px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-center font-medium"
                                >
                                    {slot.time}
                                </button>
                            ))}
                        </div>
                        {day.slots.length === 0 && (
                            <p className="text-sm text-gray-400 italic">No slots available</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
