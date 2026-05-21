"use client";
import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Cursor from "@/components/Cursor";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Cursor />
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}>
        {children}
      </div>
    </>
  );
}
