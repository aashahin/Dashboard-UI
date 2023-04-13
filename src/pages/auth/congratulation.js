import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";

export default () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }, []);
  return (
    <>
      <Head>
        <title>Account Confirmation</title>
      </Head>
      <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-200">
        <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-black">Congratulation!</h1>
            <p className="text-gray-500">
              Your account has been created successfully.
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-500">
              You will be redirected to the home page in 2 seconds.
            </p>
          </div>
        </div>

        <div className="absolute right-auto bottom-[60px] hidden md:block">
          <Link href="/">
            <Image
              src="https://pub-ebc3292441104a07b54e254192a1b246.r2.dev/default-monochrome-black.svg"
              width={100}
              height={100}
              alt="signup"
            />
          </Link>
        </div>
      </div>
    </>
  );
};
