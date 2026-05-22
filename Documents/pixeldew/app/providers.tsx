"use client";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Cursor />
      <Loader />
      {children}
    </>
  );
}
