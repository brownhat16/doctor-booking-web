"use client";

import { motion } from "framer-motion";
import { TestTube, Home, Clock, Star, Beaker } from "lucide-react";

interface LabTestCardProps {
    test: {
        id: string;
        name: string;
        category: string;
        price: number;
        home_collection_available: boolean;
        home_collection_fee: number;
        sample_type: string;
        fasting_required: boolean;
        preparation_instructions: string;
        turnaround_time: string;
        parameters_count: number;
        rating: number;
        booking_count: number;
    };
    index: number;
}

export default function LabTestCard({ test, index }: LabTestCardProps) {
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

                {/* Rating */}
                <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm text-gray-900 dark:text-white">
                        {test.rating}
                    </span>
                </div>
            </div>

            {/* Test Details */}
            <div className="space-y-3 mb-4">
                {/* Sample Type & Parameters */}
                <div className="flex items-center gap-2 text-sm">
                    <TestTube className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                        {test.sample_type} • {test.parameters_count} parameters
                    </span>
                </div>

                {/* Turnaround Time */}
                <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                        Results in {test.turnaround_time}
                    </span>
                </div>

                {/* Home Collection */}
                {test.home_collection_available && (
                    <div className="flex items-center gap-2 text-sm">
                        <Home className="w-4 h-4 text-orange-600" />
                        <span className="text-gray-700 dark:text-gray-300">
                            Home collection available +₹{test.home_collection_fee}
                        </span>
                    </div>
                )}

                {/* Fasting */}
                {test.fasting_required && (
                    <div className="bg-amber-50 dark:bg-amber-900/30 px-3 py-2 rounded-lg">
                        <p className="text-xs text-amber-800 dark:text-amber-200 font-medium">
                            ⚠️ {test.preparation_instructions}
                        </p>
                    </div>
                )}
            </div>

            {/* Price & Booking */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ₹{test.price}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {test.booking_count}+ booked
                    </p>
                </div>

                <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
                    Book Now
                </button>
            </div>
        </motion.div>
    );
}
