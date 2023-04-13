import Head from "next/head";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
import {AuthContext} from "@/context/auth";
import {useContext, useState} from "react";

const SidebarDashBoard = dynamic(
  () => import("@/components/dashboard/layout/Sidebar"),
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
const DetailsArticle = dynamic(
  () => import("@/components/dashboard/article/detailsArticle"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);
export default () => {
  const metaTitle = "Create Article";
    const [toggleCollapse, setToggleCollapse] = useState(false);
    const [isCollapsible] = useState(false);
    const { isUserAuthenticated } = useContext(AuthContext);
    const handleSidebarToggle = () => {
        setToggleCollapse(!toggleCollapse);
    };
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
      </Head>
      <NavDashBoard
        isCollapsible={isCollapsible}
        toggleCollapse={toggleCollapse}
        handleSidebarToggle={handleSidebarToggle}
      />
      <SidebarDashBoard toggleCollapse={toggleCollapse} />{" "}
      <DetailsArticle metaTitle={metaTitle} article={""} />
    </>
  );
};
