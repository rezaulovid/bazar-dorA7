import Image from "next/image";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";


const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  console.log(date)

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo and Title Section */}
          <div className=" flex items-center gap-3">
            <Image
              className="w-10 h-10 bg-green-600  object-contain"
              height={40}
              width={40}
              src="/Logo.png"
              alt="/"
            />

            <div className="flex flex-col items-center sm:items-start">
              <span className="text-xl font-bold tracking-tight text-black">
                বাজার দর
              </span>
              <span className="text-xs text-neutral-500
               font-medium">{date}</span>
            </div>
          </div>
          {/* Auth Buttons Section */}
        <div className="flex flex-col items-center sm:items-start"><UserInfo/></div>
        </div>
      </div>
     <div className="border-t border-gray-100 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2" >
         <NavLinks/>
      </div>
     </div>
    </header>
  );
};

export default Header;