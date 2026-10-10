
"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Banner from "@/components/Banner";

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

export default function Home() {
    const [products, setProducts] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    "https://api.api-store.workers.dev/api/bazardor/products"
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

                setProducts(
                    productData.filter(
                        (item: Item | null | undefined): item is Item =>
                            item != null && typeof item === "object"
                    )
                );
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

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-500 text-lg">লোড হচ্ছে...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-red-500 text-lg">ত্রুটি: {error}</p>
            </div>
        );
    }

    const topRisers = products
        .filter((item) => item.change?.dir === "up")
        .slice(0, 6);

    const topFallers = products
        .filter((item) => item.change?.dir === "down")
        .slice(0, 6);

    return (
        <main className="min-h-screen bg-[#f4f7f5] pb-12">
            {/* ব্যানার সেকশন */}
            <Banner />

            {/* Section A — আজ দাম বেড়েছে */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="text-red-500">▲</span>
                        আজ দাম বেড়েছে
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topRisers.map((item) => (
                        <ProductCard key={item.id} item={item} />
                    ))}
                </div>
            </section>

            {/* Section B — আজ দাম কমেছে */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="text-green-600">▼</span>
                        আজ দাম কমেছে
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topFallers.map((item) => (
                        <ProductCard key={item.id} item={item} />
                    ))}
                </div>
            </section>

            {/* Section C — সব পণ্য */}
            <section
                id="সব-পণ্য"
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 scroll-mt-6"
            >
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        সব পণ্য
                    </h2>
                    <p className="text-sm text-gray-500">
                        বাজারের সকল পণ্যের আজকের আপডেট মূল্য তালিকা
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {products.map((item, index) => (
                        <ProductCard
                            key={item.id ?? index}
                            item={item}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
