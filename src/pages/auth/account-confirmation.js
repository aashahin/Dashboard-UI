import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import qs from "qs";
import Head from "next/head";
import { UilArrowRight, UilInfoCircle } from "@iconscout/react-unicons";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Button, Input } from "@nextui-org/react";

export default () => {
  const [verifyCode, setVerifyCode] = useState("");
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.APIBACKEND}/api/v1/user/verify-account`,
        qs.stringify({ verifyCode })
      );
      if (data) {
        toast.success("Successfully verified your account.");
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 2000);
      }
    } catch (error) {
      toast.error("The verification code is failed or has been expired.");
    }
  };
  const resendCode = async () => {
    try {
      const { data } = await axios.get(`/user/account-verify-code`);
      if (data) {
        toast.success("Successfully resend your verification code.");
        setTimeout(() => {
          window.location.href = "/auth/account-confirmation";
        }, 2000);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  return (
    <>
      <Head>
        <title>Account Confirmation</title>
      </Head>
      <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-200 dark:bg-gray-900">
        <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-zinc-900 dark:text-white">
          <form onSubmit={formSubmit}>
            <div
              className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50"
              role="alert"
            >
              <UilInfoCircle className="mr-2" size="66" />
              <span className="sr-only">Info</span>
              <div className="text-lg">
                A verification code has been sent to your email address. If you
                don't see it in your inbox, check your spam folder.
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-lg font-bold mb-2 dark:text-white"
                htmlFor="verifyCode"
              >
                Verify Code
              </label>
              <Input
                bordered
                color="primary"
                className="border w-full"
                id="verifyCode"
                type="text"
                size="lg"
                required
                onChange={(e) => setVerifyCode(e.target.value)}
                placeholder="Verify Code"
              />
            </div>
            <div className="flex items-center justify-between">
              <Button
                auto
                bordered
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 hover:text-white text-white font-bold border-0"
                type="submit"
              >
                Complete
              </Button>
            </div>
          </form>
          <div className="flex items-center justify-between mt-4">
            <p className="text-gray-700 text-lg dark:text-gray-400">
              Verification code not received?
            </p>
            <button className="text-orange-500 text-lg" onClick={resendCode}>
              Resend
            </button>
          </div>
        </div>
        <div className="absolute margin-auto bottom-[60px] hidden md:block">
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
