import { provideCore, VerticalSearchResponse } from "@yext/answers-core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home({ apiKey }) {
  const core = provideCore({
    apiKey, // example: 3517add824e992916861b76e456724d9
    experienceKey: "answers-help-site", // example: answers-js-docs
    locale: "en",
    experienceVersion: "PRODUCTION",
  });

  const [query, setQuery] = useState("");
  const [
    searchResponse,
    setSearchResponse,
  ] = useState<VerticalSearchResponse>();
  const [loading, setLoading] = useState(false);

  const runSearch = async () => {
    setLoading(true);
    const res = await core.verticalSearch({
      query,
      verticalKey: "help_articles",
      retrieveFacets: true,
    });
    setLoading(false);
    setSearchResponse(res);
  };

  useEffect(() => {
    runSearch();
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-xl font-medium mb-4">
        Answers with Secured API Calls Demo
      </h1>
      <p>
        Here is the API Key being used on this page. The key was generated on
        page load using the token endpoint. This key is scoped per user and
        expires in 60 minutes. This key also encodes the user permissions.
      </p>
      <p className="mt-4">
        There are 4 total articles in this{" "}
        <a href="https://www.yext.com/s/3460778/entities#selectedSavedFilterId=-1&isSelectedSavedFilterWithoutHash=false">
          account
        </a>
        . However, due to the API Token having context you will only see 3 out
        of the 4 articles. Specifcally on this page you can only see articles
        that have `DEF` as a userGroupID
      </p>
      <code className="w-full break-words text-xs bg-gray-50 text-gray-500 p-4 border rounded block my-4">
        {apiKey}
      </code>
      <hr className="my-2" />
      <p className="mt-4">Try running a search here</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          runSearch();
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search here..."
          className="border w-full rounded-md px-4 py-1"
        />
      </form>
      {loading && <div>Loading...</div>}
      {searchResponse && (
        <div className="grid grid-cols-2 gap-4">
          <div className="py-4 text-sm">
            <div className="uppercase tracking-wider text-gray-600 text-xs">
              Facets (NOT FUNCTIONAL)
            </div>
            {searchResponse.facets
              .filter((f) => f.options.length > 0)
              .map((f) => (
                <div>
                  <div className="my-2 border-b">{f.displayName}</div>
                  {f.options.map((o) => (
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" />
                        <div className="ml-2">{o.displayName}</div>
                      </label>
                    </div>
                  ))}
                </div>
              ))}
          </div>
          <div className=" py-4">
            <div className="text-xs mb-4 text-gray-600">
              Showing {searchResponse.verticalResults.results.length} of{" "}
              {searchResponse.verticalResults.resultsCount} articles
            </div>
            {searchResponse.verticalResults.results.map((r) => (
              <div
                key={r.id}
                className="px-4 py-2 text-xs border-b mb-2 border text-gray-600"
              >
                {r.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`https://liveapi.yext.com/v2/tokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: "fbfdf891f19cfe377b0506ec5ec0b1b8",
      expires_in: 60,
      auth_identifier: "25423",
      fixed_query_params: {
        context: {
          userGroupID: "DEF",
        },
      },
      signing_algorithm: "HS256",
    }),
  });
  const data = await res.json();

  return {
    props: {
      apiKey: data.body.token,
    },
  };
};
