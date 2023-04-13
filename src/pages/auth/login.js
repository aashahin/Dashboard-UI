import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import qs from "qs";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button, Input, Text } from "@nextui-org/react";
export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/user/login",
        qs.stringify({ email, password })
      );
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("Successfully logged in.");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (err) {
      toast.error("The email or password is incorrect.");
    }
  };
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="h-screen w-full flex items-center justify-center bg-zinc-200 dark:bg-gray-900">
        <div className="max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-zinc-900 dark:text-white">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              Login
            </h1>
          </div>
          <form onSubmit={formSubmit} className="max-w-md">
            <div className="flex flex-col gap-4 mb-4 mt-8">
              <div className="flex flex-row gap-4 mt-6">
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
                <Input
                  bordered
                  color="primary"
                  id="password"
                  type="password"
                  size="lg"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  labelPlaceholder="Password"
                />
              </div>
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
                Login
              </Button>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <Text size="$lg">
                Forgot your password? {"  "}
                <Link
                  href="/auth/forgot-password"
                  className="text-orange-500 text-lg hover:text-orange-600"
                >
                  Reset
                </Link>
              </Text>
              <Text size="$lg">
                You don't have an account? {"  "}
                <Link
                  href="/auth/signup"
                  className="text-orange-500 text-lg hover:text-orange-600"
                >
                  Sign up
                </Link>
              </Text>
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
