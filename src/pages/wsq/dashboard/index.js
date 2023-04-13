import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth";
import { Text } from "@nextui-org/react";
import dynamic from "next/dynamic";
import axios from "axios";

const ContentDashBoard = dynamic(
  () => import("@/components/dashboard/layout/Content"),
  {
    ssr: false,
  }
);
const NavDashBoard = dynamic(
  () => import("@/components/dashboard/layout/Nav"),
  {
    ssr: false,
  }
);

const SidebarDashBoard = dynamic(
  () => import("@/components/dashboard/layout/Sidebar"),
  {
    ssr: false,
  }
);
const Loading = dynamic(() => import("@/components/Loading"), {
  ssr: false,
});

export default function Dashboard({ tags, articles, users, comments }) {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isUserAuthenticated } = useContext(AuthContext);
  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <Head>
        <title>Dashboard</title>
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
          <ContentDashBoard
            tags={tags}
            articles={articles}
            users={users}
            comments={comments}
          />
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
}

export async function getServerSideProps() {
  const tags = await axios.get("/tags").then((res) => res.data);
  const articles = await axios.get("/articles").then((res) => res.data);
  const users = await axios.get("/user").then((res) => res.data);
  const comments = await axios.get("/comments").then((res) => res.data);

  return {
    props: {
      tags,
      articles,
      users,
      comments,
    },
  };
}
