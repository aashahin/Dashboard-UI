import {
  UilCommentAltChartLines,
  UilCopyAlt,
  UilFileGraph,
  UilFolderOpen,
  UilNewspaper,
  UilUsersAlt,
} from "@iconscout/react-unicons";

export default ({
  users,
  articles,
  comments,
  reports,
  pages,
  tags,
  usersData,
  tagsData,
  articlesData,
  commentsData,
  reportsData,
}) => {
  return (
    <>
      <div className="grid flex-col md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center text-white gap-8 shadow-xl justify-center h-48 rounded bg-orange-500 dark:bg-zinc-900">
          <UilNewspaper size={80} className="text-white dark:text-orange-500" />
          <p className="text-lg ">
            <span className="pb-2 block text-5xl font-bold">
              {articlesData}
            </span>
            <span className="text-xl text-gray-200">{articles}</span>
          </p>
        </div>
        <div className="flex items-center text-white gap-8 shadow-xl justify-center h-48 rounded bg-orange-500 dark:bg-zinc-900">
          <UilFolderOpen
            size={80}
            className="text-white dark:text-orange-500"
          />
          <p className="text-lg ">
            <span className="pb-2 block text-5xl font-bold">
              {tagsData?.length}
            </span>
            <span className="text-xl text-gray-200">{tags}</span>
          </p>
        </div>
        <div className="flex items-center text-white gap-8 shadow-xl justify-center h-48 rounded bg-orange-500 dark:bg-zinc-900">
          <UilCommentAltChartLines
            size={80}
            className="text-white dark:text-orange-500"
          />
          <p className="text-lg ">
            <span className="pb-2 block text-5xl font-bold">
              {commentsData?.length > 0 ? commentsData?.length : 0}
            </span>
            <span className="text-xl text-gray-200">{comments}</span>
          </p>
        </div>
      </div>
      <div className="grid flex-col md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center text-white gap-8 shadow-xl justify-center h-48 rounded bg-orange-500 dark:bg-zinc-900">
          <UilCopyAlt size={80} className="text-white dark:text-orange-500" />
          <p className="text-lg ">
            <span className="pb-2 block text-5xl font-bold">
              {articlesData?.length > 0 ? articlesData?.length : 0}
            </span>
            <span className="text-xl text-gray-200">{pages}</span>
          </p>
        </div>
        <div className="flex items-center text-white gap-8 shadow-xl justify-center h-48 rounded bg-orange-500 dark:bg-zinc-900">
          <UilUsersAlt size={80} className="text-white dark:text-orange-500" />
          <p className="text-lg ">
            <span className="pb-2 block text-5xl font-bold">
              {usersData?.length > 0 ? usersData?.length : 0}
            </span>
            <span className="text-xl text-gray-200">{users}</span>
          </p>
        </div>
        <div className="flex items-center text-white gap-8 shadow-xl justify-center h-48 rounded bg-orange-500 dark:bg-zinc-900">
          <UilFileGraph size={80} className="text-white dark:text-orange-500" />
          <p className="text-lg ">
            <span className="pb-2 block text-5xl font-bold">
              {commentsData?.length > 0 ? commentsData?.length : 0}
            </span>
            <span className="text-xl text-gray-200">{reports}</span>
          </p>
        </div>
      </div>
    </>
  );
};
