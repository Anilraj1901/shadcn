import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import Lottie from "lottie-react";
import noInternetGif from "@/assets/lottiefiles/no-network.json";
import connectingGif from "@/assets/lottiefiles/connecting.json";

export default function NetworkError() {
  const router = useRouter();
  const location : any = useLocation();

  // Return to last known route or homepage
  const returnTo = location?.state?.returnTo || "/";

  const [loading, setLoading] = useState(false);

  const handleRetry = async () => {
    setLoading(true);

    const isOnline = navigator.onLine;
    const delay = isOnline ? 2000 : 3500;

    await new Promise((res) => setTimeout(res, delay));

    if (isOnline) {
      toast.success("Back Online");

      router.navigate({
        to: returnTo,
        replace: true,
      });
    } else {
      toast.error("Still No Internet Connection");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      {loading ? (
        <Lottie
          animationData={connectingGif}
          style={{ width: 400, height: 600, marginBottom: 24 }}
        />
      ) : (
        <Lottie
          animationData={noInternetGif}
          style={{ width: 600, height: 600, marginBottom: 24 }}
        />
      )}

      <p className="text-2xl font-bold text-red-600 mb-6">
        Please check your connection and try again.
      </p>

      <Button
        onClick={handleRetry}
        className="px-6 py-3 text-sm"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" size={20} />
            Checking...
          </span>
        ) : (
          "Retry"
        )}
      </Button>
    </div>
  );
}
