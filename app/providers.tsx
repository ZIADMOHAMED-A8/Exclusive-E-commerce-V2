"use client";

import { PropsWithChildren } from "react";
import QueryProvider from "@/context/query.provider";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: PropsWithChildren) {
  return <QueryProvider>
<Toaster  position="bottom-right"></Toaster>
    {children}

  </QueryProvider>;
}
