import {
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
} from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { createBrowserHistory } from "history";
import * as React from "react";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import RootWrapper from "./wrappers/RootWrapper";
import configs from "./constants/config";

export const history = createBrowserHistory();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: 24 * 3600 * 1000, // cache for 1 day
      retry: false,
      placeholderData: keepPreviousData,
    },
  },
});

const App = () => {
  return (
    <TonConnectUIProvider
      manifestUrl={`${configs.DOMAIN_WEB}/tonconnect-manifest.json`}
    >
      <QueryClientProvider client={queryClient}>
        <HistoryRouter history={history}>
          <React.Suspense fallback={null}>
            <RootWrapper />
          </React.Suspense>
        </HistoryRouter>
      </QueryClientProvider>
    </TonConnectUIProvider>
  );
};

export default App;
