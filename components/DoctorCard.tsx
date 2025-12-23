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
    onAction?: (action: 'slots' | 'book', doctorName: string) => void;
}

export default function DoctorCard({ doctor, onAction }: DoctorCardProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-2">
                <div>
                    <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                </div>
                <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-medium text-gray-700">{doctor.rating}</span>
                </div>
            </div>

            <div className="space-y-1 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                    <span>💰</span>
                    <span>₹{doctor.fees}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{doctor.distance}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{doctor.next_available}</span>
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onAction?.('slots', doctor.name)}
                    className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                >
                    View Slots
                </button>
                <button
                    onClick={() => onAction?.('book', doctor.name)}
                    className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
}
