"use client";

import { motion } from "framer-motion";
import { TestTube, Home, Clock, Star, Beaker, MapPin, Award, ChevronDown } from "lucide-react";
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
    const [showDropdown, setShowDropdown] = useState(false);

    // Safety check: ensure labs_offering exists and is an array
    const labsOffering = Array.isArray(test.labs_offering) ? test.labs_offering : [];

    // Sort labs by price (cheapest first)
    const sortedLabs = labsOffering.length > 0
        ? [...labsOffering].sort((a, b) => a.price - b.price)
        : [];
    const cheapestPrice = sortedLabs[0]?.price || 0;
    const labCount = labsOffering.length;

    const handleAddToCart = () => {
        console.log('🛒 Add to cart clicked!', { selectedLab, test: test.id });
        if (selectedLab && onAddToCart) {
            onAddToCart(test.id, selectedLab.lab_id);
            setShowDropdown(false);
        } else {
            console.warn('⚠️ Cannot add to cart:', { selectedLab, onAddToCart });
        }
    };

    // If no labs available, show error state
    if (labCount === 0) {
        console.warn('No labs_offering for test:', test.name);
    }

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
            {labCount > 0 ? (
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
            ) : (
                <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                        ⚠️ No lab pricing available for this test yet.
                    </p>
                </div>
            )}

            {/* Lab Selection Dropdown */}
            {labCount > 0 && (
                <div className="mb-4 relative">
                    <button
                        onClick={() => {
                            console.log('🔽 Dropdown toggled');
                            setShowDropdown(!showDropdown);
                        }}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-between hover:border-purple-500 transition-colors"
                    >
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {selectedLab ? `${selectedLab.lab_name} - ₹${selectedLab.price}` : 'Select a lab'}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-600 rounded-xl shadow-2xl max-h-96 overflow-y-auto">
                            {sortedLabs.map((lab, idx) => (
                                <div
                                    key={lab.lab_id}
                                    onClick={() => {
                                        console.log('🏥 Lab selected:', lab.lab_name);
                                        setSelectedLab(lab);
                                        setShowDropdown(false);
                                    }}
                                    className={`p-4 cursor-pointer border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors ${selectedLab?.lab_id === lab.lab_id ? 'bg-purple-100 dark:bg-purple-900/30' : ''
                                        }`}
                                >
                                    {/* Lab Card */}
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-base text-gray-900 dark:text-white">
                                                    {lab.lab_name}
                                                </span>
                                                {idx === 0 && (
                                                    <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                                                        Best Price
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                                <MapPin className="w-3 h-3" />
                                                <span>{lab.lab_location}</span>
                                                <span className="text-gray-300">|</span>
                                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                <span className="font-medium">{lab.lab_rating}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-purple-600">
                                                ₹{lab.price}
                                            </p>
                                        </div>
                                    </div>

                                    {/* TAT and Home Collection - Prominent */}
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                                            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                                                {lab.turnaround_time}
                                            </span>
                                        </div>
                                        {lab.home_collection_available ? (
                                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700">
                                                <Home className="w-3.5 h-3.5 text-green-600" />
                                                <span className="text-xs font-semibold text-green-700 dark:text-green-300">
                                                    Home Sample +₹{lab.home_collection_fee}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                                <Home className="w-3.5 h-3.5 text-gray-400" />
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    Visit Only
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-700">
                                            <Award className="w-3.5 h-3.5 text-purple-600" />
                                            <span className="text-xs font-semibold text-purple-700 dark:text-purple-300">
                                                {lab.accreditation}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Action Button */}
            <div>
                {labCount === 0 ? (
                    <button
                        disabled
                        className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-400 rounded-xl font-semibold cursor-not-allowed"
                    >
                        No Labs Available
                    </button>
                ) : (
                    <button
                        onClick={handleAddToCart}
                        disabled={!selectedLab}
                        className={`w-full px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 ${selectedLab
                            ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:shadow-xl hover:scale-105'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {selectedLab ? `Add ${test.name} from ${selectedLab.lab_name}` : 'Select a lab to add to cart'}
                    </button>
                )}
            </div>
        </motion.div>
    );
}
