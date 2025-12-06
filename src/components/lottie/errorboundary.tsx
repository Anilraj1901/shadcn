/* eslint-disable @typescript-eslint/no-explicit-any */
import Lottie from "lottie-react";

export default function ErrorBoundary({ icon, style }: any) {
  return (
    <div
      className="controlled"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Lottie style={style} animationData={icon} loop={true} autoplay={true} />
    </div>
  );
}
