"use client";

import { PropsWithChildren } from "react";
import QueryProvider from "@/context/query.provider";

export default function Providers({ children }: PropsWithChildren) {
  return <QueryProvider>{children}</QueryProvider>;
}
