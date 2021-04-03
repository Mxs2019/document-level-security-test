import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App 2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-xl font-medium mb-4">
        Answers with Secured API Calls Demo
      </h1>
      <p>
        This is a demo that showcases using a secured API token to generate
        answers search results in a secure way. To simulate this demo we will
        use first different pages - each with simular a different user.
      </p>

      <div className="mt-4 border-t pt-4">
        <Link href="/def">
          <a className="border px-2 py-2 rounded-md hover:bg-gray-50 hover:shadow-md">
            User 1 - DEF
          </a>
        </Link>
      </div>
    </div>
  );
}

// export async function getStaticProps() {}
