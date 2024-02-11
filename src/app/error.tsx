"use client";

import Lottie from "lottie-react";
import animationData from "~/assets/animations/error.json"; // Import your animation JSON file

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex h-body-screen flex-col items-center justify-evenly p-24">
      <Lottie animationData={animationData} loop autoplay className="w-2/3" />

      <div className="text-xl">{error.message}</div>
    </div>
  );
};

export default ErrorPage;
