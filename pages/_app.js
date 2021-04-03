import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="max-w-screen-md mx-auto p-4">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
