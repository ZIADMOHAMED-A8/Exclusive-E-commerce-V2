"use client";

import { PropsWithChildren } from "react";
import QueryProvider from "@/context/query.provider";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store/store";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ReduxProvider store={store}>
      <QueryProvider>
        <Toaster position="bottom-right"></Toaster>
        {children}
      </QueryProvider>
    </ReduxProvider>
  );
}
