import { NextComponentType, NextPageContext } from "next";
import { appWithTranslation } from "next-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@/styles/main.css";
import "@company/frontend-shared/main.css";

import React from "react";

import { trpc } from "@/trpc";

const queryClient = new QueryClient();

type AppProps = {
    pageProps: any;
    Component: NextComponentType<NextPageContext, any, any> & {
        protected?: boolean;
    };
};

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default trpc.withTRPC(appWithTranslation(MyApp));
