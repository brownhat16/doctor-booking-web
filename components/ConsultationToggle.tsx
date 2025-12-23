import { Video, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConsultationToggleProps {
    mode: "video" | "clinic";
    onModeChange: (mode: "video" | "clinic") => void;
}

export default function ConsultationToggle({ mode, onModeChange }: ConsultationToggleProps) {
    return (
        <div className="flex bg-gray-100 p-1.5 rounded-xl self-center max-w-md w-full mx-auto mb-6">
            <button
                onClick={() => onModeChange("video")}
                className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200",
                    mode === "video"
                        ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                )}
            >
                <Video className="w-4 h-4" />
                Video Consultation
            </button>
            <button
                onClick={() => onModeChange("clinic")}
                className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200",
                    mode === "clinic"
                        ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5 border border-gray-100"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                )}
            >
                <MapPin className="w-4 h-4" />
                In-Clinic Consultation
            </button>
        </div>
    );
}
