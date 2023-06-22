import "@/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import { ProtectedLayout } from "@/components/layouts/protected";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: {
    getLayout?: (page: ReactElement) => ReactNode;
    requireAuth: boolean;
  };
  session: any;
};

const queryClient = new QueryClient();
export default function App({
  Component,
  pageProps,
  session
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  const router = useRouter();

  return getLayout(
    <QueryClientProvider client={queryClient}>
      {Component.requireAuth ? (
        <ProtectedLayout>
   
          
            {/* <ProtectedLayout> */}
            <Component {...pageProps} />

            {/* </ProtectedLayout> */}

        </ProtectedLayout>
      ) : (
      
          <Component {...pageProps} />

    
      )}
    </QueryClientProvider>
  );
}
