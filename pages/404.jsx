import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="px-8">
      <main className="h-screen flex-1 flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-6xl text-center mb-12">
          404 - Page Not Found
        </h1>

        <Link href="/" passHref>
          <a className="transition ease-in-out duration-300 text-xl font-semibold hover:opacity-80">
            Home page
          </a>
        </Link>
      </main>
    </div>
  );
};

export default Custom404;
