"use client";
import { ToggleTheme } from "@/components/ToggleTheme";
import Link from "next/link";
import { UilBars } from "@iconscout/react-unicons";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";
import { Dropdown, Text, User } from "@nextui-org/react";

export default function NavDashBoard({ handleSidebarToggle }) {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("user");
    router.replace("/").then((r) => setUser({}));
  };
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-900 dark:focus:ring-gray-600"
              onClick={handleSidebarToggle}
            >
              <UilBars size={24} />
            </button>
            <Link href="/" className="flex ml-2 md:mr-24 mx-4">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                WSQ
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ml-3">
              <div className="relative ml-3 px-4">
                <ToggleTheme />
              </div>
              <Dropdown placement="bottom-left">
                <Dropdown.Trigger>
                  <User
                    bordered
                    size="lg"
                    as="button"
                    color="primary"
                    src={user.info.profilePhoto}
                    name={user.info.firstName || "User"}
                  />
                </Dropdown.Trigger>
                <Dropdown.Menu color="warning">
                  <Dropdown.Item
                    key="profile"
                    css={{ height: "$18" }}
                    textValue="Profile"
                  >
                    <Text b color="inherit" css={{ d: "flex" }}>
                      Signed in as
                    </Text>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      {user.info.email}
                    </Text>
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="settings"
                    withDivider
                    textValue="My Settings"
                  >
                    My Settings
                  </Dropdown.Item>

                  <Dropdown.Item key="analytics" textValue="Analytics">
                    Analytics
                  </Dropdown.Item>
                  <Dropdown.Item key="system" textValue="Settings">
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="configurations"
                    textValue="Configurations"
                  >
                    Configurations
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="help_and_feedback"
                    withDivider
                    textValue="Help"
                  >
                    Help & Feedback
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="logout"
                    color="error"
                    withDivider
                    textValue="Logout"
                  >
                    <Link href="/" onClick={logout}>
                      Logout
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
