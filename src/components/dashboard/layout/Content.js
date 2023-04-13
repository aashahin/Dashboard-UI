import { dataBar, dataPie, options } from "@/components/dashboard/utils/chart";
import { Bar, Pie } from "react-chartjs-2";
import { Text, User } from "@nextui-org/react";
import { translation } from "@/translation/english/main";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Loading = dynamic(() => import("@/components/Loading"), {
  ssr: false,
});

// Components
const FirstTopContent = dynamic(
  () => import("@/components/dashboard/overview/FirstTopContent"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);
const MiddleContent = dynamic(
  () => import("@/components/dashboard/overview/MiddleContent"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);
const BottomContent = dynamic(
  () => import("@/components/dashboard/overview/BottomContent"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);
export default function ContentDashBoard({
  tags: tagsData,
  articles: article,
  comments: commentsData,
  users: user,
}) {
  const { articles, comments, tags, pages, users, reports } =
    translation.dashboard.content.top;
  const [loading, setLoading] = useState(true);
  const usersData = user?.users;
  const articlesData = article?.count;
  const reportsData = tagsData;
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <>
      {
        <div className="p-4 sm:ml-64">
          <div className="p-4 mt-14">
            <FirstTopContent
              tagsData={tagsData}
              usersData={usersData}
              articlesData={articlesData}
              commentsData={commentsData}
              reportsData={reportsData}
              users={users}
              articles={articles}
              comments={comments}
              reports={reports}
              pages={pages}
              tags={tags}
            />
            <MiddleContent />
            <BottomContent usersData={usersData} reportsData={commentsData} />
          </div>
        </div>
      }
    </>
  );
}
