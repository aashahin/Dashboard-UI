import Head from "next/head";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import qs from "qs";
import { useState } from "react";
import Image from "next/image";
import { Button, Input, Text } from "@nextui-org/react";
import { UilArrowRight } from "@iconscout/react-unicons";

export default () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(0);
  const [passwordConfirmation, setPasswordConfirmation] = useState(0);
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/user/signup`,
        qs.stringify({
          firstName,
          lastName,
          email,
          password,
          passwordConfirmation,
        })
      );
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("Successfully created an account.");
        setTimeout(() => {
          window.location.href = "/auth/account-confirmation";
        }, 1000);
      }
    } catch (error) {
      if (error.response.data.error[0]) {
        if (error.response.data.error[0].msg === "User Already exist.") {
          return toast.error("Email already exists.");
        } else if (
          error.response.data.error[0].msg ===
          "Password confirmation does not match password"
        ) {
          return toast.error("Password confirmation does not match password");
        }
      }
      if (error.response.data.message === "Password is not strong enough") {
        return toast.error("Password is not strong enough");
      }
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <div className="h-screen w-full flex items-center justify-center bg-zinc-200 dark:bg-gray-900">
        <div className="max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-zinc-900 dark:text-white">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              Sign up
            </h1>
            <Text className="text-gray-500 dark:text-gray-400">
              Create an account to get started.
            </Text>
          </div>
          <form onSubmit={formSubmit} className="max-w-md">
            <div className="flex flex-col gap-4 mb-4 mt-8">
              <div className="flex flex-row gap-4 mb-6">
                <Input
                  bordered
                  color="primary"
                  id="firstName"
                  type="text"
                  size="lg"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                  labelPlaceholder="First Name"
                />
                <Input
                  bordered
                  color="primary"
                  id="lastName"
                  type="text"
                  size="lg"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                  labelPlaceholder="Last Name"
                />
              </div>
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
              <div className="flex flex-row gap-4 mt-6">
                <Input
                  bordered
                  color="primary"
                  id="password"
                  type="password"
                  size="lg"
                  required
                  minlength="8"
                  onChange={(e) => setPassword(e.target.value)}
                  labelPlaceholder="Password"
                />
                <Input
                  bordered
                  color="primary"
                  id="passwordConfirmation"
                  type="password"
                  size="lg"
                  required
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  labelPlaceholder="Confirm Password"
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
                Sign up
              </Button>
            </div>
            <div className="flex flex-row gap-2 mt-4">
              <Text size="$lg">Already have an account?</Text>
              <Link
                href="/auth/login"
                className="text-orange-500 text-lg hover:text-orange-600"
              >
                Login
              </Link>
            </div>
          </form>
          <div className="flex flex-row gap-2 mt-2">
            <Text size="$lg">
              By signing up, you agree to our {"  "}
              <Link
                href="/terms"
                className="text-orange-500 text-lg hover:text-orange-600"
              >
                Terms of Service {"   "}
              </Link>
              and {"    "}
              <Link
                href="/privacy"
                className="text-orange-500 hover:text-orange-600"
              >
                Privacy Policy
              </Link>
            </Text>
          </div>
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
