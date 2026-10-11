
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

const UserInfo = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleSignout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed!");
        return;
      }

      toast.success("Logout successful!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout করতে সমস্যা হয়েছে!");
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="skeleton h-10 w-10 rounded-full"></div>
        <div className="skeleton h-4 w-20"></div>
      </div>
    );
  }

  return (
    <>
      {user ? (
        <div className="dropdown dropdown-end">
          
          

          <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer m-1">
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring-2 ring-offset-2 overflow-hidden relative flex items-center justify-center bg-gray-200">
                {user?.image ? (
                  <Image
                    alt="User avatar"
                    src={user.image}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-700 font-semibold">
                    {user.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>
            </div>
            <span className="text-sm font-medium text-gray-800 hidden sm:inline">{user.name}</span>
          </div>

          
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow-xl bg-white rounded-box w-64 border border-gray-100 mt-2"
          >
            <div className="px-4 py-2 border-b border-gray-100 mb-1">
              <p className="text-sm font-bold
               text-gray-900 truncate">{user.name}</p>
              <p className="text-xs
               text-gray-500 truncate mt-0.5">{user.email}</p>
            </div>
            <li>
              <Link href={'/profile'} className="text-sm
               text-gray-700 hover:bg-gray-100 rounded-lg">
                আমার প্রোফাইল
              </Link>
            </li>
            <div className="border-t border-gray-100 my-1"></div>
            <li>
              <button
                onClick={handleSignout}
                className="text-sm text-rose-600 hover:bg-rose-50 rounded-lg w-full text-left"
              >
                সাইন আউট
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/signin">
            <button className="btn 
            btn-ghost text-neutral-700 
            transition-colors font-medium">
              সাইন ইন
            </button>
          </Link>

          <Link href="/signup">
            <button className="btn px-4 py-1.5 font-semibold
             text-white bg-green-700
              hover:bg-green-800 rounded border-none">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default UserInfo;



// "use client";

// import { authClient } from "@/lib/auth-client";
// import Link from "next/link";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// const UserInfo = () => {
//   const { data: session, isPending } = authClient.useSession();
//   const user = session?.user;
//   const router = useRouter();

//   const handleSignout = async () => {
//     try {
//       const { error } = await authClient.signOut();

//       if (error) {
//         toast.error(error.message || "Logout failed!");
//         return;
//       }

//       toast.success("Logout successful!");
//       router.push("/");
//       router.refresh();
//     } catch (error) {
//       console.error("Logout error:", error);
//       toast.error("Logout করতে সমস্যা হয়েছে!");
//     }
//   };

//   if (isPending) {
//     return (
//       <div className="flex items-center gap-2">
//         <div className="skeleton h-10 w-10 rounded-full"></div>
//         <div className="skeleton h-4 w-20"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div></div>{user ? (
//        <div className="absolute right-4 top-4  flex items-center gap-3 text-sm">
//      <Link href={'/profile'} >
//       <div className="avatar">
//         <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring-2 ring-offset-2 overflow-hidden relative flex items-center justify-center bg-gray-200">
//           {user?.image ? (
//             <Image
//               alt="User avatar"
//               src={user.image}
//               width={40}
//               height={40}
//               className="object-cover w-full h-full"/>
//               ) : (<div className="flex h-full w-full 
//                 items-center justify-center bg-gray-200 text-gray-700">
//                   {user.name?.charAt(0) || "U"}
//                 </div>
//               )}
//             </div>
//           </div>
//      </Link>

//           <h2>{user.name}</h2>

//           {/* <button
//             onClick={handleSignout}
//             className="btn btn-error"
//           >
//             Logout
//           </button> */}
//         </div>
//       ) : (
//         <div>
//           <Link href="/signin">
//             <button className="btn btn-ghost text-neutral-700
//              transition-colors  font-medium">
//               সাইন ইন
//             </button>
//           </Link>

//           <Link href="/signup">
//             <button className="btn px-4 py-1.5 
//             font-semibold text-white bg-green-700 
//                hover:bg-green-800 rounded">
//               সাইন আপ
//             </button>
//           </Link>
//         </div>
//       )}
//     </>
//   );
// };

// export default UserInfo;

