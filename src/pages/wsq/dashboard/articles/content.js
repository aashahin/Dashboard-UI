import { Loading, Badge, Table, Text, User } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { UilEditAlt, UilEye, UilTrash } from "@iconscout/react-unicons";
import axios from "axios";
import Link from "next/link";

export default () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getArticles();
  }, []);
  const [search, setSearch] = useState("");
  const getArticles = () => {
    axios.get(`/articles`).then((res) => {
      setData(res.data);
      setLoading(true);
    });
  };
  const count = data?.count;
  const pages = Math.ceil(count / 8);
  const handlePagination = (e) => {
    if (search) {
      axios
        .get(`/articles?page=${e}&search=${search}`)
        .then((res) => setData(res.data));
    }
    axios.get(`/articles?page=${e}`).then((res) => setData(res.data));
  };
  const handleSearch = (e) => {
    e.preventDefault();
    axios.get(`/articles?search=${search}`).then((res) => setData(res.data));
  };
  return (
    <div className="p-4 sm:ml-64">
      <div className="mt-20">
        <div className="flex justify-between">
          <div className="flex gap-4 md:mt-4 ml-5 flex-col md:flex-row">
            <form className="flex gap-4" onSubmit={handleSearch}>
              <input
                type="text"
                className="w-64 px-4 py-2 border-0 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50"
              >
                Search
              </button>
            </form>
            <Link
              href="/wsq/dashboard/articles/add"
              className="px-4 py-2 bg-orange-600 text-center text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50"
            >
              Add Article
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-col gap-4 mb-4 border-0 mt-10 relative z-10">
        <Table
          bordered
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
            <Table.Column>
              <Text size="$lg" color="gray">
                Name
              </Text>
            </Table.Column>
            <Table.Column>
              <Text size="$lg" color="gray">
                Clicks
              </Text>
            </Table.Column>
            <Table.Column>
              <Text size="$lg" className="mx-4" color="gray">
                Status
              </Text>
            </Table.Column>
            <Table.Column>
              <Text
                size="$lg"
                className="flex justify-end mr-8 gap-4"
                color="gray"
              >
                Actions
              </Text>
            </Table.Column>
          </Table.Header>
          <Table.Body>
            {!loading ? (
              <Table.Row>
                <Table.Cell>
                  <Loading />
                </Table.Cell>
                <Table.Cell>
                  <Loading />
                </Table.Cell>
                <Table.Cell>
                  <Loading />
                </Table.Cell>
                <Table.Cell>
                  <Loading />
                </Table.Cell>
              </Table.Row>
            ) : (
              data?.data.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <User
                      size="lg"
                      squared
                      src={item.image}
                      name={`${item.user.firstName} ${item.user.lastName}`}
                      css={{ p: 0 }}
                    >
                      <Text size="$lg">{item.title}</Text>
                    </User>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="$lg" className="mx-0 md:mx-4">
                      {" "}
                      {item?.numViews}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    {item.status === "published" ? (
                      <Badge
                        type={item.status}
                        size="lg"
                        color="success"
                        className="mx-0 md:mx-4"
                      >
                        {item.status}
                      </Badge>
                    ) : (
                      <Badge
                        type={item.status}
                        size="lg"
                        color="primary"
                        className="mx-0 md:mx-4"
                      >
                        {item.status}
                      </Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex justify-end gap-2">
                      <UilEye color="#C1550B" size="24" />
                      <Link href={`/wsq/dashboard/articles/edit/${item.slug}`}>
                        <UilEditAlt color="#C1550B" size="24" />
                        </Link>
                      <UilTrash color="#C1550B" size="24" />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
          <Table.Pagination
            align="center"
            rowsPerPage={8}
            total={pages}
            color="primary"
            onChange={(page) => handlePagination(page)}
          />
        </Table>
      </div>
    </div>
  );
};
