import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
import { AuthContext } from "@/context/auth";
import { useContext, useState } from "react";

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

export async function getServerSideProps({ params: { slug } }) {
  const json = await axios.get("/articles/");
  const data = await json.data.data;
  const article = data.find(
    (article) => article.slug.toString() === slug.toString()
  );
  return { props: { article } };
}

export default ({ article }) => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible] = useState(false);
  const { isUserAuthenticated } = useContext(AuthContext);
  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };
  const metaTitle = "Edit Article";
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
      <SidebarDashBoard toggleCollapse={toggleCollapse}/>
      <DetailsArticle article={article} metaTitle={metaTitle} />
    </>
  );
};
