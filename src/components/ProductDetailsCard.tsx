"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

interface Change {
    dir: "up" | "down" | "flat";
    pct: number;
}

interface Item {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change?: Change;
    markets: Market[];
}

export default function ProductDetailsPage() {
    const [product, setProduct] = useState<Item | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    "https://openapi.programming-hero.com/api/bazardor/products"
                );

                if (!response.ok) {
                    throw new Error("ডেটা ফেচ করতে সমস্যা হয়েছে!");
                }

                const result = await response.json();
                const productData = Array.isArray(result)
                    ? result
                    : Array.isArray(result.data)
                    ? result.data
                    : Array.isArray(result.products)
                    ? result.products
                    : Array.isArray(result.items)
                    ? result.items
                    : [];

                if (productData.length > 0) {
                    setProduct(productData[0]); 
                }
            } catch (err: unknown) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "কোথাও কোনো ত্রুটি ঘটেছে।"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-500 text-lg">লোড হচ্ছে...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-red-500 text-lg">ত্রুটি: {error || "প্রডাক্ট পাওয়া যায়নি"}</p>
            </div>
        );
    }

    // API 
    const minPrices = product.markets?.map((m) => m.min) || [0];
    const maxPrices = product.markets?.map((m) => m.max) || [0];
    const lowestMarketPrice = Math.min(...minPrices);
    const highestMarketPrice = Math.max(...maxPrices);
    const avgMarketPrice = Math.round((lowestMarketPrice + highestMarketPrice) / 2);

    return (
        <div className="bg-gray-50 min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                
                {/* product */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border overflow-hidden">
                            <Image src={product.image || "/product-placeholder.png"} alt={product.nameBn} className="w-12 h-12 object-contain" />
                        </div>
                        <div>
                            <span className="text-xs text-gray-500">প্রতি {product.unit} - {product.categoryNameBn}</span>
                            <h1 className="text-xl font-bold text-gray-800">{product.nameBn}</h1>
                            <p className="text-xs text-gray-500 mt-1">
                                ব্যবসায়ীদের মূল্যায়নে আজ দাম {product.change?.dir === "up" ? "বেড়েছে" : product.change?.dir === "down" ? "কমেছে" : "পরিবর্তিত"} - {product.change?.pct || 0}%
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center min-w-[120px]">
                        <span className="text-xs text-gray-500 block">আজকের দাম</span>
                        <span className="text-2xl font-bold text-red-600">{product.today}</span>
                        <span className="text-xs text-gray-600 block">টাকা / {product.unit}</span>
                        <span className={`text-xs font-medium ${product.change?.dir === "up" ? "text-red-500" : "text-emerald-500"}`}>
                            {product.change?.dir === "up" ? "▲" : "▼"} {product.change?.pct || 0}%
                        </span>
                    </div>
                </div>
                {/* (Price Summary Cards) */}
                <div className="p-6 bg-white grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-100">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <span className="text-xs text-gray-500 block">সর্বনিম্ন দাম</span>
                        <span className="text-lg font-bold text-emerald-600">{lowestMarketPrice} টাকা</span>
                        <span className="text-xs text-gray-500 block mt-1">সবচেয়ে কম দামের বাজার</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <span className="text-xs text-gray-500 block">সর্বোচ্চ দাম</span>
                        <span className="text-lg font-bold text-red-600">{highestMarketPrice} টাকা</span>
                        <span className="text-xs text-gray-500 block mt-1">সবচেয়ে বেশি দামের বাজার</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <span className="text-xs text-gray-500 block">গড় দাম</span>
                        <span className="text-lg font-bold text-gray-800">{avgMarketPrice} টাকা</span>
                        <span className="text-xs text-gray-500 block mt-1">প্রেক্ষাপটভিত্তিক গড়ের হিসাব</span>
                    </div>
                </div>
                {/*  (Table Section - API) */}
                <div className="p-6">
                    <h3 className="font-bold text-gray-800 mb-4">বাজারভিত্তিক আজকের দাম</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 text-xs text-gray-500 bg-gray-50">
                                    <th className="p-3">বাজার</th>
                                    <th className="p-3">বিভাগ</th>
                                    <th className="p-3">সর্বনিম্ন</th>
                                    <th className="p-3">সর্বোচ্চ</th>
                                    <th className="p-3">গড়</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                                {product.markets?.map((m, index) => {
                                    const marketAvg = Math.round((m.min + m.max) / 2);
                                    return (
                                        <tr key={index}>
                                            <td className="p-3 font-medium text-gray-800">{m.market}</td>
                                            <td className="p-3 text-gray-600">{m.division}</td>
                                            <td className="p-3 text-gray-600">{m.min} টাকা</td>
                                            <td className="p-3 text-gray-600">{m.max} টাকা</td>
                                            <td className="p-3 text-gray-800 font-medium">{marketAvg} টাকা</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}