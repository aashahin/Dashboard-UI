import { Text, User } from "@nextui-org/react";

export default ({ usersData, reportsData }) => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-4 mb-4">
      <div className="flex rounded bg-gray-100 p-8  dark:bg-zinc-900">
        <div className="flex flex-col gap-4">
          <Text h2 size="$2xl">
            Last Users
          </Text>
          <div className="flex flex-col gap-4">
            {usersData?.length > 0 ? (
              usersData?.slice(0, 4).map((user) => (
                <User
                  squared
                  src={user.profilePhoto}
                  name={<Text size="$lg">{user.firstName}</Text>}
                  css={{ p: 0, zIndex: 1 }}
                  key={user._id}
                >
                  <Text size="$sm" color="gray">
                    {user.email}
                  </Text>
                </User>
              ))
            ) : (
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                No users
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex rounded bg-gray-100 p-8  dark:bg-zinc-900">
        <div className="flex flex-col gap-4">
          <Text h2 size="$2xl">
            Last Reports
          </Text>
          <div className="flex flex-col gap-4">
            {reportsData?.length > 0 ? (
              reportsData?.slice(0, 4).map((user) => (
                <User
                  squared
                  src={user.profilePhoto}
                  name={<Text size="$lg">{user.firstName}</Text>}
                  css={{ p: 0 }}
                  key={user._id}
                >
                  <Text size="$sm" color="gray">
                    {user.email}
                  </Text>
                </User>
              ))
            ) : (
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                No users
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
