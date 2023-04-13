import { Loading, Table, Text } from "@nextui-org/react";
import { UilEditAlt, UilEye, UilTrash } from "@iconscout/react-unicons";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default () => {
  const { data, isLoading } = useSWR("/tags", fetcher);
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 mt-14">
        <Text h2>Tags</Text>
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
                  Follows
                </Text>
              </Table.Column>
              <Table.Column>
                <Text size="$lg" className="mx-4" color="gray">
                  Clicks
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
              {isLoading ? (
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
                data?.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <Text size="$lg">{item.name}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="$lg" className="mx-0 md:mx-4">
                        {" "}
                        {item.followers?.length}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="$lg" className="mx-0 md:mx-4">
                        {item.clicks}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-end gap-2">
                        <UilEye color="#C1550B" size="24" />
                        <UilEditAlt color="#C1550B" size="24" />
                        <UilTrash color="#C1550B" size="24" />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
            <Table.Pagination align="center" rowsPerPage={5} color="primary" />
          </Table>
        </div>
      </div>
    </div>
  );
};
