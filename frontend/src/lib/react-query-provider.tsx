"use client";

import { QueryClientProvider, queryClient } from "@/lib/query-client";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const ReactQueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
