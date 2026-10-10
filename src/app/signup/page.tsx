
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";

interface IUserForm {
  name: string;
  email: string;
  password: string;
}

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(
      formData.get("confirmPassword") || ""
    );

    if (!name || !email || !password || !confirmPassword) {
      toast.error("সবগুলো তথ্য পূরণ করুন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    const user: IUserForm = { name, email, password };

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      if (data) {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে");
        router.push("/signin");
        router.refresh();
      }
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (
    provider: "google" | "github"
  ) => {
    try {
      setLoading(true);

      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Social login ব্যর্থ হয়েছে");
        setLoading(false);
      }
    } catch {
      toast.error("Social login করা যায়নি");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f0f5f0] px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#202b24]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-gray-200 bg-[#fbfdfb] p-5 sm:p-6 shadow-sm"
        >
          <fieldset disabled={loading} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                নাম
              </label>
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-600"
                placeholder="যেমন: রহিম উদ্দিন"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                ইমেইল
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-600"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                পাসওয়ার্ড
              </label>
              <input
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-600"
                placeholder="কমপক্ষে ৮ অক্ষর"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-600"
                placeholder="আবার লিখুন"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-green-700 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </fieldset>

          <div className="my-5 flex items-center gap-3 text-sm text-gray-500">
            <div className="h-px flex-1 bg-gray-200" />
            অথবা
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialSignIn("google")}
              className="flex items-center justify-center gap-2 rounded-lg 
              border border-gray-200 px-3 py-2.5 text-sm 
              font-medium hover:bg-gray-50 disabled:opacity-60"
            >
              <span className="font-bold text-blue-600"> <Image
              className="w-10 h-10 object-contain"
              height={5}
              width={5}
              src="/google.png"
              alt="/"
            /></span>
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialSignIn("github")}
              className="flex items-center justify-center 
              gap-2 rounded-lg border border-gray-200 px-3
               py-2.5 text-sm font-medium hover:bg-gray-50 
               disabled:opacity-60"
            >
              <span className="font-bold"><span className="font-bold text-blue-600"> <Image
              className="w-10 h-10 object-contain"
              height={5}
              width={5}
              src="/git.png"
              alt="/"
            /></span></span>
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-5 text-center 
          text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-medium text-green-700
               hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </form>

        <Link
          href="/"
          className="mt-5 block text-center text-sm
           text-gray-500 hover:text-green-700"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;