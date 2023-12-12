"use client";

import {
  QueryClientProvider,
  queryClient as previousQueryClient,
} from "@/lib/query-client";
import React from "react";

type Props = {
  children?: React.ReactNode;
  queryClient?: typeof previousQueryClient;
};

const ReactQueryProvider = ({ queryClient, children }: Props) => {
  return (
    <QueryClientProvider
      client={queryClient ? queryClient : previousQueryClient}
    >
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
