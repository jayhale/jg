import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { withTRPC } from '@trpc/next'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'

import Layout from '@/components/Layout'
import { AppRouter } from '@/server/router'
import '@/styles/tailwind.css'
import { baseUrl } from '@/utils/env'
import { transformer } from '@/utils/trpc'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => JSX.Element
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function JonesGuideApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? Layout

  return getLayout(<Component {...pageProps} />)
}

export default withTRPC<AppRouter>({
  config() {
    return {
      links: [
        loggerLink(),
        httpBatchLink({
          url: `${baseUrl}/api`,
        }),
      ],
      transformer: transformer,
    }
  },
  ssr: false,
})(JonesGuideApp)
