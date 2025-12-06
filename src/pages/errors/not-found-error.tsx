/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorBoundary from "@/components/lottie/errorboundary";
import { useRouter } from "@tanstack/react-router";
import Error from "@/assets/lottiefiles/notFound.json";

function NotFoundPage() {
  const error: any = useRouter();
  console.log("error from router", error);

  return (
    <div>
     <main className="flex flex-col items-center justify-center m-10 text-center">
        <div>
          <h1 className="text-6xl font-bold mb-4">Oops!</h1>
          <p className="text-xl mb-2">
            The page you’re looking for was not found or you don’t have access to it.
          </p>
          <p className="text-md text-gray-600">
            Please contact your administrator or the development team for assistance.
          </p>
        </div>
      </main>

      <ErrorBoundary icon={Error} style={{ height: "70vh", width: "100vw" }} />
    </div>
  );
}

export default NotFoundPage;
