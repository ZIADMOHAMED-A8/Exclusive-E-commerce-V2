"use client";
import { usePathname } from "next/navigation";
import TopBar from "./topBar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  return (
    <>
      <TopBar />
      {children}
    </>
  );
}
