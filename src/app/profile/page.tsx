"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client"; // আপনার প্রজেক্টের পাথ অনুযায়ী এটি ঠিক করে নেবেন
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
    const router = useRouter();
    
    // BetterAuth থেকে সেশন ফেচ করা
    const { data: session, isPending } = authClient.useSession();
    
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // সেশন থেকে ইউজারের নাম ডেটা ফর্মে সেট করা
    useEffect(() => {
        if (session?.user?.name) {
            setName(session.user.name);
        }
    }, [session]);

    // সাইন-আউট হ্যান্ডলার
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/signin"); // লগআউট হওয়ার পর সাইন-ইন পেজে রিডাইরেক্ট করবে
                },
            },
        });
    };

    // প্রোফাইল আপডেট হ্যান্ডলার
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            // BetterAuth দিয়ে ইউজার আপডেট করার রিকোয়েস্ট
            const { error } = await authClient.updateUser({
                name: name,
            });

            if (error) {
                setMessage(error.message || "আপডেট করতে সমস্যা হয়েছে।");
            } else {
                setMessage("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
            }
        } catch (err) {
            console.error(err);
            setMessage("কোথাও কোনো ত্রুটি ঘটেছে।");
        } finally {
            setLoading(false);
        }
    };

    if (isPending) {
        return <div className="text-center py-20">লোড হচ্ছে...</div>;
    }

    return (
        <main className="max-w-3xl mx-auto px-4 py-10">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h1 className="text-2xl font-bold
                 text-gray-900 mb-1">আমার প্রোফাইল</h1>
                <p className="text-sm
                 text-gray-500 mb-6">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন ও পরিবর্তন করুন।</p>

                {/* ডাইনামিক ইউজার কার্ড */}
                <div className="flex items-center justify-between border border-gray-100 bg-gray-50/50 p-4 rounded-xl mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg overflow-hidden">
                            {session?.user?.image ? (
                                <Image src={session.user.image} 
                                alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <span>{session?.user?.name?.[0] || "U"}</span>
                            )}
                        </div>
                        <div>
                            <h2 className="font-semibold
                             text-gray-900">{session?.user?.name || "ইউজার"}</h2>
                            <p className="text-xs
                             text-gray-500">{session?.user?.email || "email@example.com"}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="border border-red-200
                         text-red-600 hover:bg-red-50 
                         text-xs font-medium px-4 py-2 rounded-lg 
                         transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                        <span>←</span> সাইন আউট
                    </button>
                </div>

                {/* আপডেট ফর্ম */}
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium
                         text-gray-700 mb-1.5">নাম</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2.5 border
                             border-gray-200 rounded-xl text-sm 
                             focus:outline-none focus:border-emerald-600 transition-colors"
                            placeholder="আপনার নাম লিখুন"
                            required
                        />
                    </div>

                    {message && (
                        <p className={`text-xs ${message.includes("সফল") ?
                         "text-emerald-600" : "text-red-500"}`}>
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#15803d] 
                        hover:bg-[#166534] text-white
                         font-medium py-3 rounded-xl
                          transition-colors shadow-sm
                           text-sm cursor-pointer"
                    >
                        {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
                    </button>
                </form>
            </div>
        </main>
    );
}