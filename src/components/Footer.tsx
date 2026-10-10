import React from 'react';

const Footer = () => {
    return (
        <div>
         <footer className="footer flex items-center justify-between bg-base-300 text-base-content p-5">
{/* Left Text Box */}
          <div className="bg-white   px-4 py-2.5 ">
            <span>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
          </div>

<div className="bg-white   px-4 py-2.5 ">
            <span>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</span>
          </div>

</footer>   
        </div>
    );
};

export default Footer;