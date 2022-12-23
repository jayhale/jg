import Head from 'next/head'
import type { ReactElement } from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const Layout = (page: ReactElement) => (
  <>
    <Header />
    <main>{page}</main>
    <Footer />
  </>
)

export default Layout
