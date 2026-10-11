import React from "react";
import Link from "next/link";
import { toBengaliNumber } from "@/utils/numberToBangla";

interface Change {
    dir: "up" | "down" | "flat";
    pct?: number;
}

interface Item {
    id: number;
    slug: string;
    nameBn: string;
    unit: string;
    image: string;
    categoryIcon: string;
    today: number;
    change?: Change;
}

interface ProductCardProps {
    item: Item;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    // Safe defaults when change or pct is missing
    const dir = item.change?.dir ?? "flat";
    const pct = item.change?.pct ?? 0;

    let badgeColor = "text-gray-500 bg-gray-50";
    let symbol = "—";
    if (dir === "up") {
        badgeColor = "text-red-500 bg-red-50";
        symbol = "▲";
    } else if (dir === "down") {
        badgeColor = "text-green-600 bg-green-50";
        symbol = "▼";
    }

    const unitText =
        item.unit === "kg"
            ? "প্রতি কেজি"
            : item.unit === "litre"
            ? "প্রতি লিটার"
            : item.unit === "dozen"
            ? "প্রতি ডজন"
            : `প্রতি ${item.unit}`;

    return (
        <Link href={`/products/${item.slug}`} className="block">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-xl">
                            {item.image || item.categoryIcon || "🛒"}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">
                                {item.nameBn}
                            </h3>
                            <p className="text-xs text-gray-400">{unitText}</p>
                        </div>
                    </div>
                    <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${badgeColor}`}
                    >
                        {symbol} {toBengaliNumber(Math.abs(pct))}%
                    </span>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center text-sm">
                    <span className="text-gray-400 text-xs">আজকের দাম</span>
                    <span className="font-bold text-gray-900">
                        {toBengaliNumber(item.today)} টাকা
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;

// import React from "react";
// import Link from "next/link";
// import { toBengaliNumber } from "@/utils/numberToBangla";
// interface change {
//    dir: "up" | "down" | "flat";
//         pct?: number;
// }
// interface  Item {
//     id: number;
//     slug: string;
//     nameBn: string;
//     unit: string;
//     image: string;
//     categoryIcon: string;
//     today: number;
//     change?:change
     
   
// }

// interface ProductCardProps {
//     item: Item;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
//     const { dir, pct } = item.change;

 
//     let badgeColor = "text-gray-500 bg-gray-50";
//     let symbol = "—";
//     if (dir === "up") {
//         badgeColor = "text-red-500 bg-red-50"; 
//         symbol = "▲";
//     } else if (dir === "down") {
//         badgeColor = "text-green-600 bg-green-50";
//         symbol = "▼";
//     }

//     const unitText = item.unit === "kg" ? "প্রতি কেজি" : item.unit === "litre" ?
//      "প্রতি লিটার" : item.unit === "dozen" ? "প্রতি ডজন" : `প্রতি ${item.unit}`;

//     return (
//         <Link href={`/products/${item.slug}`} className="block">
//             <div className="bg-white rounded-xl p-4 border
//              border-gray-100 shadow-sm flex flex-col justify-between 
//              hover:shadow-md transition-shadow cursor-pointer h-full">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-gray-50 rounded-full 
//                         flex items-center justify-center text-xl">
//                             {item.image || item.categoryIcon || "🛒"}
//                         </div>
//                         <div>
//                             <h3 className="font-semibold text-gray-900">
//                                 {item.nameBn}</h3>
//                             <p className="text-xs text-gray-400">{unitText}</p>
//                         </div>
//                     </div>
//                     <span className={`text-xs font-semibold px-2 py-1
//                          rounded ${badgeColor}`}>
//                         {symbol} {toBengaliNumber(Math.abs(pct))}%
//                     </span>
//                 </div>

//                 <div className="mt-4 pt-3 border-t border-gray-50 
//                 flex justify-between items-center text-sm">
//                     <span className="text-gray-400 text-xs">আজকের দাম</span>
//                     <span className="font-bold text-gray-900">
//                         {toBengaliNumber(item.today)} টাকা</span>
//                 </div>
//             </div>
//         </Link>
//     );
// };

// export default ProductCard;