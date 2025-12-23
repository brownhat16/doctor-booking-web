import {
    Stethoscope,
    Syringe,
    Leaf,
    Bone,
    Sprout,
    Smile,
    Baby,
    Ear,
    Brain,
    Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SpecialtiesGridProps {
    onSelect: (specialty: string) => void;
}

const specialties = [
    { id: 'physician', name: 'General Physician', icon: Stethoscope, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'derma', name: 'Dermatologist', icon: Syringe, color: 'text-pink-500', bg: 'bg-pink-50' },
    { id: 'homeo', name: 'Homeopathy', icon: Leaf, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'ortho', name: 'Orthopaedic', icon: Bone, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'ayurveda', name: 'Ayurveda', icon: Sprout, color: 'text-green-600', bg: 'bg-green-50' },
    { id: 'dentist', name: 'Dentist', icon: Smile, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { id: 'gynae', name: 'Gynaecologist', icon: Activity, color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 'ent', name: 'Ear, Nose, Throat', icon: Ear, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { id: 'pediatric', name: 'Paediatrician', icon: Baby, color: 'text-sky-500', bg: 'bg-sky-50' },
    { id: 'psych', name: 'Psychiatrist', icon: Brain, color: 'text-purple-500', bg: 'bg-purple-50' },
];

export default function SpecialtiesGrid({ onSelect }: SpecialtiesGridProps) {
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4 px-1">
                <h3 className="font-bold text-gray-800 text-lg">All specialties</h3>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {specialties.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item.name)}
                        className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all group"
                    >
                        <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110",
                            item.bg
                        )}>
                            <item.icon className={cn("w-6 h-6", item.color)} />
                        </div>
                        <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
                            {item.name}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
