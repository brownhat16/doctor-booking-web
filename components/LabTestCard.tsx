"use client";

import { motion } from "framer-motion";
import { TestTube, Home, Clock, Star, Beaker, MapPin, Award } from "lucide-react";
import { useState } from "react";

interface LabOffering {
    lab_id: string;
    lab_name: string;
    lab_rating: number;
    lab_location: string;
    price: number;
    home_collection_available: boolean;
    home_collection_fee: number;
    turnaround_time: string;
    accreditation: string;
}

interface LabTestCardProps {
    test: {
        id: string;
        name: string;
        category: string;
        sample_type: string;
        fasting_required: boolean;
        preparation_instructions: string;
        parameters_count: number;
        rating: number;
        booking_count: number;
        labs_offering: LabOffering[];
    };
    index: number;
}

export default function LabTestCard({ test, index }: LabTestCardProps) {
    const [selectedLab, setSelectedLab] = useState<LabOffering | null>(null);
    const [showAllLabs, setShowAllLabs] = useState(false);

    // Sort labs by price (cheapest first)
    const sortedLabs = [...test.labs_offering].sort((a, b) => a.price - b.price);
    const cheapestLab = sortedLabs[0];
    const mostExpensiveLab = sortedLabs[sortedLabs.length - 1];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100/50 dark:border-blue-800/30"
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <Beaker className="w-5 h-5 text-purple-600" />
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                            {test.name}
                        </h3>
                    </div>
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                        {test.category}
                    </p>
                </div>
            </div>

            {/* Test Details */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                    <TestTube className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                        {test.sample_type} • {test.parameters_count} parameters
                    </span>
                </div>

                {test.fasting_required && (
                    <div className="bg-amber-50 dark:bg-amber-900/30 px-3 py-2 rounded-lg">
                        <p className="text-xs text-amber-800 dark:text-amber-200 font-medium">
                            ⚠️ {test.preparation_instructions}
                        </p>
                    </div>
                )}
            </div>

            {/* Lab Offerings */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                        Available at {test.labs_offering.length} labs
                    </h4>
                    <span className="text-xs text-gray-500">
                        ₹{cheapestLab.price} - ₹{mostExpensiveLab.price}
                    </span>
                </div>

                {/* Show first lab by default, all on expand */}
                <div className="space-y-2">
                    {(showAllLabs ? sortedLabs : [sortedLabs[0]]).map((lab, idx) => (
                        <div
                            key={lab.lab_id}
                            className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${selectedLab?.lab_id === lab.lab_id
                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                                } ${idx === 0 ? 'bg-green-50/50 dark:bg-green-900/10' : ''}`}
                            onClick={() => setSelectedLab(lab)}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm text-gray-900 dark:text-white">
                                        {lab.lab_name}
                                    </span>
                                    {idx === 0 && (
                                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                                            Cheapest
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs font-semibold">{lab.lab_rating}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3 text-gray-500" />
                                    <span className="text-gray-600 dark:text-gray-400">{lab.lab_location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-gray-500" />
                                    <span className="text-gray-600 dark:text-gray-400">{lab.turnaround_time}</span>
                                </div>
                                {lab.home_collection_available && (
                                    <div className="flex items-center gap-1">
                                        <Home className="w-3 h-3 text-orange-500" />
                                        <span className="text-gray-600 dark:text-gray-400">
                                            +₹{lab.home_collection_fee}
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1">
                                    <Award className="w-3 h-3 text-blue-500" />
                                    <span className="text-gray-600 dark:text-gray-400">{lab.accreditation}</span>
                                </div>
                            </div>

                            <div className="mt-2 text-right">
                                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    ₹{lab.price}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {test.labs_offering.length > 1 && !showAllLabs && (
                    <button
                        onClick={() => setShowAllLabs(true)}
                        className="mt-2 w-full text-xs text-purple-600 dark:text-purple-400 hover:underline"
                    >
                        + Show {test.labs_offering.length - 1} more lab{test.labs_offering.length > 2 ? 's' : ''}
                    </button>
                )}

                {showAllLabs && (
                    <button
                        onClick={() => setShowAllLabs(false)}
                        className="mt-2 w-full text-xs text-gray-600 dark:text-gray-400 hover:underline"
                    >
                        Show less
                    </button>
                )}
            </div>

            {/* Action Button */}
            <button
                className={`w-full px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 ${selectedLab
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                disabled={!selectedLab}
            >
                {selectedLab ? `Add from ${selectedLab.lab_name}` : 'Select a lab to add'}
            </button>
        </motion.div>
    );
}
