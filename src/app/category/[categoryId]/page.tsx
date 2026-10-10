import React from "react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

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
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}

export default async function CategoryProduct({
    params,
}: {
    params: Promise<{ categoryId: string }>;
}) {
    const { categoryId } = await params;
    const decodedCategoryId = decodeURIComponent(categoryId || "").toLowerCase().trim();

    let products: Item[] = [];

    try {
        const res = await fetch(
            "https://api.api-store.workers.dev/api/bazardor/products",
            {
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error(`API Error: ${res.status}`);
        }

        const data = await res.json();

        const items: Item[] = Array.isArray(data)
            ? data
            : Array.isArray(data.data)
            ? data.data
            : Array.isArray(data.products)
            ? data.products
            : Array.isArray(data.items)
            ? data.items
            : [];

        products = items.filter((item: Item) => {
            const itemCategory = String(item.category || "").toLowerCase().trim();
            const itemSlug = String(item.slug || "").toLowerCase().trim();
            const itemCategoryName = String(item.categoryNameBn || "").toLowerCase().trim();

            return (
                itemCategory === decodedCategoryId ||
                itemSlug === decodedCategoryId ||
                itemCategoryName.includes(decodedCategoryId)
            );
        });
    } catch (error) {
        console.error("ডেটা ফেচ করতে সমস্যা হয়েছে:", error);
    }

    if (products.length === 0) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-12 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    পণ্য পাওয়া যায়নি
                </h1>
                <p className="text-gray-500 mb-6">
                    এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ডেটা লোড করা যায়নি।
                </p>
                <Link
                    href="/"
                    className="bg-[#15803d] hover:bg-[#166534] text-white font-medium px-6 py-3 rounded-xl transition-colors inline-block"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        );
    }

    const categoryTitle = products[0]?.categoryNameBn || categoryId;
    const categoryIcon = products[0]?.categoryIcon || "🍚";

    return (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* ১. টপ হেডার কার্ড (স্ক্রিনশটের মতো) */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-4 flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center text-3xl">
                    {categoryIcon}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 capitalize">
                        {categoryTitle}
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </div>

            {/* ২. ফিল্টার বা সাজানোর বার (Sort Bar) */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-600 font-medium">
                    মোট {products.length}টি পণ্য দেখানো হচ্ছে
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-xs text-gray-500">সাজান</span>
                    <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-1.5 outline-none focus:border-green-600">
                        <option value="default">ডিফল্ট</option>
                        <option value="low-high">দাম: কম থেকে বেশি</option>
                        <option value="high-low">দাম: বেশি থেকে কম</option>
                    </select>
                </div>
            </div>

            {/* ৩. প্রোডাক্ট গ্রিড লিস্ট */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>

        </main>
    );
}

// import React from "react";
// import ProductCard from "@/components/ProductCard";
// import Link from "next/link";

// interface Item {
//     id: number;
//     slug: string;
//     nameBn: string;
//     category: string;
//     categoryNameBn: string;
//     categoryIcon: string;
//     unit: string;
//     image: string;
//     today: number;
//     change: {
//         dir: "up" | "down" | "flat";
//         pct: number;
//     };
// }

// export default async function CategoryProduct({
//     params,
// }: {
//     params: Promise<{ categoryId: string }>;
// }) {
//     const { categoryId } = await params;
//     // URL-এর প্যারামিটার ডিকোড করে নিরাপদ করা
//     const decodedCategoryId = decodeURIComponent(categoryId || "").toLowerCase().trim();

//     let products: Item[] = [];

//     try {
//         const res = await fetch(
//             "https://api.api-store.workers.dev/api/bazardor/products",
//             {
//                 cache: "no-store",
//             }
//         );

//         if (!res.ok) {
//             throw new Error(`API Error: ${res.status}`);
//         }

//         const contentType = res.headers.get("content-type");

//         if (!contentType?.includes("application/json")) {
//             const responseText = await res.text();
//             console.error(
//                 "API returned HTML instead of JSON:",
//                 responseText.slice(0, 300)
//             );
//             throw new Error("API থেকে JSON ডেটা পাওয়া যায়নি");
//         }

//         const data = await res.json();

//         const items: Item[] = Array.isArray(data)
//             ? data
//             : Array.isArray(data.data)
//             ? data.data
//             : Array.isArray(data.products)
//             ? data.products
//             : Array.isArray(data.items)
//             ? data.items
//             : [];

//         // আরও নিখুঁতভাবে ফিল্টার করার জন্য ছোট হাতের অক্ষরে রূপান্তর করে মেলানো
//         products = items.filter((item: Item) => {
//             const itemCategory = String(item.category || "").toLowerCase().trim();
//             const itemSlug = String(item.slug || "").toLowerCase().trim();
//             const itemCategoryName = String(item.categoryNameBn || "").toLowerCase().trim();

//             return (
//                 itemCategory === decodedCategoryId ||
//                 itemSlug === decodedCategoryId ||
//                 itemCategoryName.includes(decodedCategoryId)
//             );
//         });
//     } catch (error) {
//         console.error("ডেটা ফেচ করতে সমস্যা হয়েছে:", error);
//     }

//     if (products.length === 0) {
//         return (
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
//                 <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                     ৪০০ - পণ্য পাওয়া যায়নি
//                 </h1>
//                 <p className="text-gray-500 mb-6">
//                     এই ক্যাটাগরিতে ({categoryId}) কোনো পণ্য নেই অথবা ডেটা লোড করা যায়নি।
//                 </p>
//                 <Link
//                     href="/"
//                     className="bg-[#15803d] hover:bg-[#166534] text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-sm inline-block"
//                 >
//                     হোম পেজে ফিরে যান
//                 </Link>
//             </div>
//         );
//     }

//     const categoryTitle = products[0]?.categoryNameBn || categoryId;
//     const categoryIcon = products[0]?.categoryIcon || "📁";

//     return (
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <div className="flex items-center gap-3 mb-8">
//                 <span className="text-3xl bg-gray-50 p-2.5 rounded-2xl border border-gray-100 flex items-center justify-center">
//                     {categoryIcon}
//                 </span>

//                 <div>
//                     <h1 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">
//                         {categoryTitle}
//                     </h1>
//                     <p className="text-sm text-gray-500 mt-0.5">
//                         এই ক্যাটাগরির বর্তমান বাজার দর তালিকা
//                     </p>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
//                 {products.map((item) => (
//                     <ProductCard key={item.id} item={item} />
//                 ))}
//             </div>
//         </main>
//     );
// }