// queryClient.js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 300000, // 5 minutes
            refetchOnWindowFocus: false,
        },
    },
});

export { queryClient, QueryClientProvider };
