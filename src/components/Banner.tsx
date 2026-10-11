"use client";
import Image from 'next/image';

export default function Banner() {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  const handleScrollToProducts = () => {
    const element = document.getElementById("সব-পণ্য");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f0f4f1] border border-[#e2e8e4] rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-sm">
          
          {/* Left Side: Text Content */}
          <div className="flex-1 space-y-4 text-left z-10">
            <div className="inline-flex items-center gap-2 bg-[#dcfce7] text-[#15803d] px-3 py-1 rounded-full text-xs md:text-sm font-medium">
              <span>{date}</span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-sm md:text-base max-w-xl leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* Action Button */}
            <div className="pt-2">
              <button 
                onClick={handleScrollToProducts}
                className="bg-[#15803d] hover:bg-[#166534] text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm cursor-pointer"
              >
                সব পণ্য দেখুন
              </button>
            </div>
          </div>

          {/* Right Side: Basket Image */}
          <div className="mt-6 md:mt-0 flex-shrink-0 z-10 flex justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <Image 
                src="/bazar-hero.png" 
                alt="Bazar Hero" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}