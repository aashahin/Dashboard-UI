import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import qs from "qs";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { Button, Input, Text } from "@nextui-org/react";
export default () => {
  const [email, setEmail] = useState("");

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/user/forget-password",
        qs.stringify({ email })
      );
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("Successfully sent an verification code to your email.");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (err) {
      toast.error("The email is incorrect.");
    }
  };
  return (
    <>
      <Head>
        <title>Forget Password</title>
      </Head>
      <div className="h-screen w-full flex items-center justify-center bg-zinc-200 dark:bg-gray-900">
        <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-zinc-900 dark:text-white">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              Forget Password
            </h1>
            <Text size="$lg" color="gray">
              Enter your email address and we'll send you a link to reset your
              password.
            </Text>
          </div>
          <form onSubmit={formSubmit} className="max-w-md">
            <div className="mb-4 mt-8">
              <Input
                bordered
                color="primary"
                id="email"
                type="email"
                size="lg"
                required
                onChange={(e) => setEmail(e.target.value)}
                labelPlaceholder="Email"
              />
            </div>
            <div className="flex flex-row gap-4 mt-8">
              <Button
                auto
                type="submit"
                color="primary"
                size="lg"
                bordered
                className="bg-orange-500 hover:bg-orange-600 hover:text-white text-white font-bold border-0"
              >
                Send
              </Button>
            </div>
            <div className="flex flex-row gap-2 mt-4">
              <Text size="$lg">You don't have an account? {"  "}</Text>
              <Link
                href="/auth/signup"
                className="text-orange-500 text-lg hover:text-orange-600"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
        <Link href="/" className="absolute bottom-8 mb-4 mr-4">
          <Image
            src={
              "https://pub-ebc3292441104a07b54e254192a1b246.r2.dev/default-monochrome-black.svg"
            }
            alt={"WSQ"}
            width={100}
            height={100}
          />
        </Link>
      </div>
    </>
  );
};
