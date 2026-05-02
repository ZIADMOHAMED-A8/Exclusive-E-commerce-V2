"use client";
import { usePathname } from "next/navigation";
import TopBar from "./topBar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const isAuthRoute = pathName === '/login' || pathName === '/signup';

  return (
    <>
      {!isAuthRoute && <TopBar />}
      {children}
    </>
  );
}
