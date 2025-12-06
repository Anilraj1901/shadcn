/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorBoundary from "@/components/lottie/errorboundary";
import { useRouter } from "@tanstack/react-router";
import Error from "@/assets/lottiefiles/error.json";

function GeneralError() {
  const error: any = useRouter();
  console.log("error from router", error);

  return (
    <div>
      <main className="flex items-center justify-center m-10">
        <div>
          <h1 className="text-6xl font-bold mb-4">Oops!</h1>
          <p className="text-xl mb-2">
            Sorry, an unexpected error has occurred ,
          </p>
          <p className="text-lg">Please contact the developers</p>
        </div>
      </main>

      <ErrorBoundary icon={Error} style={{ height: "70vh", width: "100vw" }} />
    </div>
  );
}

export default GeneralError;
