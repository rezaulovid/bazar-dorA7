import React from "react";

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
    change: Change;
    markets: Market[];
}

interface PriceDownProps {
    items?: Item[];
    title?: string;
}

const PriceDown: React.FC<PriceDownProps> = ({ items = [], title = "আজকের দাম কমেছে যে পণ্যের" }) => {
    // (down) 
    const downItems = items.filter(item => item.change.dir === "down");

    return (
        <div className="w-full bg-gray-50 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-green-600">▼</span> {title}
                </h2>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {downItems.length === 0 ? (
                    <p className="text-gray-500 text-sm">কোনো ডেটা পাওয়া যায়নি।</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {downItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex flex-col justify-between"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-xl">
                                            {item.image || item.categoryIcon || "🛒"}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{item.nameBn}</h3>
                                            <p className="text-xs text-gray-400">প্রতি {item.unit === "kg" ? "কেজি" : item.unit}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold px-2 py-1 rounded text-green-600 bg-green-50">
                                        ▼ {Math.abs(item.change.pct)}%
                                    </span>
                                </div>

                                <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center text-sm">
                                    <span className="text-gray-400 text-xs">আজকের দাম</span>
                                    <span className="font-bold text-gray-900">{item.today} টাকা</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PriceDown;