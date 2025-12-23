import { MapPin, Star, Clock, IndianRupee, Calendar } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    fees: number;
    rating: number;
    distance: string;
    next_available: string;
  };
  onAction?: (action: "slots" | "book", doctorName: string) => void;
}

export default function DoctorCard({ doctor, onAction }: DoctorCardProps) {
  const [loadingAction, setLoadingAction] = useState<"slots" | "book" | null>(null);

  const handleAction = async (action: "slots" | "book") => {
    if (loadingAction || !onAction) return;
    setLoadingAction(action);
    onAction(action, doctor.name);
    setTimeout(() => setLoadingAction(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-1">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">
            {doctor.name}
          </h3>
          <p className="text-sm text-gray-500 font-medium">
            {doctor.specialty}
          </p>
        </div>
        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
          <Star className="w-3.5 h-3.5 text-green-600 fill-green-600" />
          <span className="text-xs font-bold text-green-700">{doctor.rating}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-3 mb-5">
        <div className="flex items-center gap-3 text-sm">
          <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
            <IndianRupee className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <span className="text-gray-600 font-medium">₹{doctor.fees} <span className="text-gray-400 font-normal">consultation</span></span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <span className="text-gray-600 font-medium">{doctor.distance}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <span className="text-gray-600 font-medium">Available {doctor.next_available}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleAction("slots")}
          disabled={!!loadingAction}
          className={cn(
            "flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold rounded-xl transition-all active:scale-95 border",
            "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100 hover:border-blue-200"
          )}
        >
          {loadingAction === "slots" ? (
            <span className="w-4 h-4 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              View Slots
            </>
          )}
        </button>

        <button
          onClick={() => handleAction("book")}
          disabled={!!loadingAction}
          className={cn(
            "flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold text-white rounded-xl transition-all shadow-md active:scale-95",
            "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
          )}
        >
          {loadingAction === "book" ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              Book Now
            </>
          )}
        </button>
      </div>
    </div>
  );
}
