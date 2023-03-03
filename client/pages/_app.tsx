import '../styles/globals.css';
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from '@mantine/notifications';
import type { AppProps } from "next/app";
import { NextPage } from "next"
import { ReactElement, ReactNode } from "react";  
import { QueryClient, QueryClientProvider } from "react-query";
import { MeContextProvider } from '../context/me';

const queryClient = new QueryClient();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <Head>
        <title>Application TypeScript Next and Node</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS 
        theme={{
          colorScheme: "light",
        }}
      >
      <NotificationsProvider>
        <QueryClientProvider client={queryClient}>
         <MeContextProvider>
          {getLayout(
          <main>
            <Component {...pageProps} />
          </main>
          )}
          </MeContextProvider>
        </QueryClientProvider>
        
      </NotificationsProvider>
      </MantineProvider>
    </>
    
  )
}

