import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <p className="text-9xl font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tighter sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg leading-7">
            Sorry, we could not find page you are looking for
          </p>
          <Link to="/" className="btn mt-10 btn-secondary">
            Go back to home
          </Link>
        </div>
      </main>
    );
  }

  return <p className="mt-6 text-lg leading-7 text-center">Sorry, there was an error.</p>;
};
export default Error;
