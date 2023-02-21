import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
  ;
import React from 'react';

export default function MyApp({
  Component,
  pageProps,
}: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  // TODO: DOES NOT WORK
  const { session } = pageProps
  console.log('_app.tsx session', session)
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}
