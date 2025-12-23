```typescript
import { MapPin, Star, Clock, IndianRupee, BadgeCheck, ExternalLink, Calendar } from "lucide-react";
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
    
    // Trigger parent action
    onAction(action, doctor.name);
    
    // Reset loading state after a delay (or rely on parent to remount, but safe to reset)
    setTimeout(() => setLoadingAction(null), 2000);
  };

  return (
    <div className="group bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 relative overflow-hidden">
      {/* Top Banner accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
      
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="flex items-center gap-1.5 font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
            {doctor.name}
            <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-50" />
          </h3>
          <p className="text-sm font-medium text-blue-600/80 uppercase tracking-wide text-[10px] mt-0.5">
            {doctor.specialty}
          </p>
        </div>
        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold text-amber-700">{doctor.rating}</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="p-1.5 bg-gray-50 rounded-md">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <span className="font-medium">{doctor.distance}</span>
          </div>
          <div className="flex items-center gap-1 font-semibold text-gray-900">
            <IndianRupee className="w-3.5 h-3.5 text-gray-400" />
            {doctor.fees}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
           <Clock className="w-3.5 h-3.5" />
           Available {doctor.next_available}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => handleAction("slots")}
          disabled={!!loadingAction}
          className={cn(
            "flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold rounded-lg transition-all active:scale-95",
            loadingAction === "slots" 
                ? "bg-blue-50 text-blue-400 cursor-wait"
                : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
            )}
        >
          {loadingAction === "slots" ? (
             <span className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-500 rounded-full animate-spin" />
          ) : (
            <>
              <Calendar className="w-3.5 h-3.5" />
              Availability
            </>
          )}
        </button>
        
        <button
          onClick={() => handleAction("book")}
          disabled={!!loadingAction}
          className={cn(
            "flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-white rounded-lg transition-all shadow-md shadow-blue-500/20 active:scale-95",
            loadingAction === "book"
                ? "bg-blue-700 cursor-wait"
                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
          )}
        >
          {loadingAction === "book" ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
               Book Now
               <ExternalLink className="w-3 h-3" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
```
