import Head from 'next/head'
import type { ReactElement } from 'react'

import { CallToAction } from '@/components/CallToAction'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Testimonials } from '@/components/Testimonials'
import { WhatWeDo } from '@/components/WhatWeDo'

import type { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Jones&apos; Guide</title>
      <meta
        name="description"
        content="We’re experienced job seekers, recruiters, managers and people leaders on a mission to level the field between employees and employers. Jones’ Guide provides support, coaching, and advice to individuals looking for new opportunities or looking to get more from a current job."
      />
    </Head>
    <Header />
    <main>
      <Hero />
      <WhatWeDo id="what-we-do" />
      <Testimonials id="testimonials" />
      <CallToAction id="schedule" />
    </main>
    <Footer />
  </>
)

Home.getLayout = (page: ReactElement) => page

export default Home
