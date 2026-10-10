
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
      <div></div>{user ? (
       <div className="absolute right-4
       top-4 -translate-y-1/2 flex items-center gap-3 text-sm">
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
                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-700">
                  {user.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
          </div>

          <h2>{user.name}</h2>

          <button
            onClick={handleSignout}
            className="btn btn-error"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link href="/signin">
            <button className="btn btn-ghost text-neutral-700 transition-colors hover:text-red-700 font-medium">
              সাইন ইন
            </button>
          </Link>

          <Link href="/signup">
            <button className="btn bg-red-700 px-4 py-1.5 font-semibold text-white hover:bg-red-800 rounded">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default UserInfo;

