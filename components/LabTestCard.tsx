"use client";

import { motion } from "framer-motion";
import { TestTube, Home, Clock, Star, Beaker, MapPin, Award, ChevronRight } from "lucide-react";
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
    onAddToCart?: (testId: string, labId: string) => void;
}

export default function LabTestCard({ test, index, onAddToCart }: LabTestCardProps) {
    const [selectedLab, setSelectedLab] = useState<LabOffering | null>(null);
    const [showLabs, setShowLabs] = useState(false);

    // Sort labs by price (cheapest first)
    const sortedLabs = [...test.labs_offering].sort((a, b) => a.price - b.price);
    const cheapestPrice = sortedLabs[0]?.price || 0;
    const labCount = test.labs_offering.length;

    const handleAddToCart = () => {
        if (selectedLab && onAddToCart) {
            onAddToCart(test.id, selectedLab.lab_id);
        }
    };

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

            {/* Price and Lab Info */}
            <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-baseline justify-between">
                    <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Starts at</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            ₹{cheapestPrice}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-600 dark:text-gray-400">Available at</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {labCount} labs
                        </p>
                    </div>
                </div>
            </div>

            {/* Lab Selector - Horizontal Scroll */}
            {showLabs && (
                <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Choose your preferred lab:
                    </p>
                    <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        {sortedLabs.map((lab, idx) => (
                            <div
                                key={lab.lab_id}
                                onClick={() => setSelectedLab(lab)}
                                className={`flex-shrink-0 w-64 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedLab?.lab_id === lab.lab_id
                                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg scale-105'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 hover:shadow-md'
                                    } ${idx === 0 ? 'bg-green-50/50 dark:bg-green-900/10' : ''}`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-sm text-gray-900 dark:text-white">
                                            {lab.lab_name}
                                        </span>
                                        {idx === 0 && (
                                            <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                                                Best Price
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-1.5 mb-3">
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            <span className="font-semibold">{lab.lab_rating}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                            <MapPin className="w-3 h-3" />
                                            <span>{lab.lab_location}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                            <Clock className="w-3 h-3" />
                                            <span>{lab.turnaround_time}</span>
                                        </div>
                                        {lab.home_collection_available && (
                                            <div className="flex items-center gap-1 text-orange-600">
                                                <Home className="w-3 h-3" />
                                                <span>+₹{lab.home_collection_fee}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {lab.accreditation}
                                    </span>
                                    <span className="text-xl font-bold text-purple-600">
                                        ₹{lab.price}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
                {!showLabs ? (
                    <button
                        onClick={() => setShowLabs(true)}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        Select Lab
                        <ChevronRight className="w-4 h-4" />
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() => {
                                setShowLabs(false);
                                setSelectedLab(null);
                            }}
                            className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddToCart}
                            disabled={!selectedLab}
                            className={`flex-1 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 ${selectedLab
                                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:shadow-xl hover:scale-105'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {selectedLab ? `Add from ${selectedLab.lab_name}` : 'Select a lab first'}
                        </button>
                    </>
                )}
            </div>
        </motion.div>
    );
}
