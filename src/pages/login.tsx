import Head from 'next/head'
import Link from 'next/link'
import type { ReactElement } from 'react'

import { AuthLayout } from '@/components/AuthLayout'
import { Input } from '@/components/Input'
import { Logo } from '@/components/Logo'

import type { NextPageWithLayout } from './_app'

const Login: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Sign In - Jones&apos; Guide</title>
    </Head>
    <div className="flex flex-col items-start justify-start">
      <Link href="/">
        <a>
          <Logo className="mb-2 h-10 w-auto" />
        </a>
      </Link>
      <h2 className="mt-16 text-lg font-semibold text-gray-900">Sign in</h2>
      <p className="mt-2 text-sm text-gray-700">
        Access your relationships dashboard by signing in
      </p>
    </div>
    <div className="mt-10">
      <div className="mt-6">
        <form action="#" method="POST" className="space-y-7">
          <Input
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <div className="pt-1">
            <button
              type="submit"
              className="w-full rounded-full border border-transparent bg-blue-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign in <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
)

Login.getLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>

export default Login
