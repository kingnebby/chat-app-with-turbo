import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from "react";


export default function MyApp({
  Component,
  pageProps,
}: AppProps) {
  return <Component {...pageProps} />;
}
