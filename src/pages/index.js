import Head from "next/head";
import axios from "axios";
export default function Home({ data }) {
  return (
      <>
        <Head>
          <title>{data.title}</title>
          <meta name="description" content={data.description} />
          <link rel="icon" href={data.favicon} />
          <meta name="robots" content="all" />
        </Head>
        <div></div>
      </>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  const json = await axios.get("/general/config");
  const data = await json.data;
  return {
    props: {
      data,
    },
  };
}