import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
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
  change?: {
    dir?: "up" | "down" | "flat";
    pct?: number;
  };
  markets: Market[];
}

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  // Login Protection
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
  }

  let product: Item | undefined;

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    const products: Item[] = Array.isArray(data)
      ? data
      : Array.isArray(data.data)
      ? data.data
      : Array.isArray(data.products)
      ? data.products
      : Array.isArray(data.items)
      ? data.items
      : [];

    product = products.find((item) => item.slug === slug);
  } catch (error) {
    console.error("Product fetch error:", error);
  }

  if (!product) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          পণ্য পাওয়া যায়নি
        </h1>

        <Link
          href="/"
          className="inline-block bg-green-700 text-white px-6 py-3 rounded-xl font-medium"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  const minPrices = product.markets?.map((m) => m.min) || [0];
  const maxPrices = product.markets?.map((m) => m.max) || [0];

  const lowestMarketPrice = Math.min(...minPrices);
  const highestMarketPrice = Math.max(...maxPrices);

  const avgMarketPrice = Math.round(
    (lowestMarketPrice + highestMarketPrice) / 2
  );

  const changeDir = product.change?.dir || "flat";
  const changePct = product.change?.pct ?? 0;

  const unitText =
    product.unit === "kg"
      ? "প্রতি কেজি"
      : product.unit === "litre"
      ? "প্রতি লিটার"
      : product.unit === "dozen"
      ? "প্রতি ডজন"
      : `প্রতি ${product.unit}`;

  return (
    <main className="bg-gray-50 min-h-screen py-6 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">

        <div className="text-xs text-gray-500 mb-3 flex items-center gap-2">
          <Link href="/" className="hover:underline">
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:underline"
          >
            {product.categoryNameBn || product.category}
          </Link>

          <span>›</span>

          <span className="text-gray-800 font-medium">
            {product.nameBn}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-4xl">
                {product.image || product.categoryIcon || "🛒"}
              </div>

              <div>
                <span className="text-xs text-gray-400 block">
                  {unitText} - {product.categoryNameBn || product.category}
                </span>

                <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
                  {product.nameBn}
                </h1>

                <p className="text-xs text-gray-500 mt-1">
                  ব্যবসায়ীদের মূল্যায়নে আজ দাম{" "}
                  {changeDir === "up"
                    ? "বেড়েছে"
                    : changeDir === "down"
                    ? "কমেছে"
                    : "অপরিবর্তিত"}{" "}
                  - {changePct}%
                </p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center min-w-[130px]">
              <span className="text-[11px] text-gray-500 block">
                আজকের দাম
              </span>

              <span className="text-2xl font-bold text-red-600">
                {product.today}
              </span>

              <span className="text-[11px] text-gray-600 block">
                টাকা / {product.unit}
              </span>

              <span
                className={`text-xs font-semibold mt-0.5 block ${
                  changeDir === "up" ? "text-red-500" : "text-emerald-500"
                }`}
              >
                {changeDir === "up" ? "▲" : "▼"} {changePct}%
              </span>
            </div>
          </div>

          {/* price sumary */}
          <div className="p-6 bg-white grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-100">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <span className="text-xs text-gray-500 block">
                সর্বনিম্ন দাম
              </span>

              <span className="text-lg font-bold text-emerald-600">
                {lowestMarketPrice} টাকা
              </span>

              <span className="text-xs text-gray-400 block mt-1">
                সবচেয়ে কম দামের বাজার
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <span className="text-xs text-gray-500 block">
                সর্বোচ্চ দাম
              </span>

              <span className="text-lg font-bold text-red-600">
                {highestMarketPrice} টাকা
              </span>

              <span className="text-xs text-gray-400 block mt-1">
                সবচেয়ে বেশি দামের বাজার
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <span className="text-xs text-gray-500 block">
                গড় দাম
              </span>

              <span className="text-lg font-bold text-gray-800">
                {avgMarketPrice} টাকা
              </span>

              <span className="text-xs text-gray-400 block mt-1">
                প্রেক্ষাপটভিত্তিক গড়ের হিসাব
              </span>
            </div>
          </div>

          {/* todays price */}
          <div className="p-6">
            <h3 className="font-bold text-gray-800 mb-4 text-base">
              বাজারভিত্তিক আজকের দাম
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-xs text-gray-500 bg-gray-50">
                    <th className="p-3.5 font-medium">বাজার</th>
                    <th className="p-3.5 font-medium">বিভাগ</th>
                    <th className="p-3.5 font-medium">সর্বনিম্ন</th>
                    <th className="p-3.5 font-medium">সর্বোচ্চ</th>
                    <th className="p-3.5 font-medium">গড়</th>
                  </tr>
                </thead>

                <tbody className="text-sm divide-y divide-gray-100">
                  {product.markets?.map((m, index) => {
                    const marketAvg = Math.round((m.min + m.max) / 2);

                    return (
                      <tr key={index} className="hover:bg-gray-50/50">
                        <td className="p-3.5 font-medium text-gray-800">
                          {m.market}
                        </td>

                        <td className="p-3.5 text-gray-600">
                          {m.division}
                        </td>

                        <td className="p-3.5 text-gray-600">
                          {m.min} টাকা
                        </td>

                        <td className="p-3.5 text-gray-600">
                          {m.max} টাকা
                        </td>

                        <td className="p-3.5 text-gray-900 font-semibold">
                          {marketAvg} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
