import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth";
import { Text } from "@nextui-org/react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";

const NavDashBoard = dynamic(
  () => import("@/components/dashboard/layout/Nav"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);
const SidebarDashBoard = dynamic(
  () => import("@/components/dashboard/layout/Sidebar"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);
const Content = dynamic(() => import("@/pages/wsq/dashboard/tags/content"), {
  ssr: false,
  loading: () => <Loading />,
});
export default () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible] = useState(false);
  const { isUserAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };
  return (
    <>
      <Head>
        <title>Tags</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      {loading ? (
        <Loading />
      ) : isUserAuthenticated() ? (
        <>
          <NavDashBoard
            isCollapsible={isCollapsible}
            toggleCollapse={toggleCollapse}
            handleSidebarToggle={handleSidebarToggle}
          />
          <SidebarDashBoard toggleCollapse={toggleCollapse} />
          <Content />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <Text className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            You are not authorized to view this page.
          </Text>
        </div>
      )}
    </>
  );
};
