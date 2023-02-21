import { Layout } from '@/components';
import { StateContext } from '@/Context/StateContext';
import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { ReactElement } from 'react';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps): ReactElement<any, any> {
  const AnyComponent = Component as any;
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <AnyComponent {...pageProps} />
      </Layout>
    </StateContext>
  );
}
