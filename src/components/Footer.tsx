import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t
         border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 
            lg:px-8 py-8 flex flex-col sm:flex-row
             justify-between items-center text-xs
              text-gray-500 gap-2">
                <span>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে.</span>
                <span>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়.</span>
            </div>
        </footer>
    );
};

export default Footer;