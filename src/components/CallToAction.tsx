import Image from 'next/image'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-schedule.jpg'

type CTAFormInput = {
  email: string
}

function CallToAction({ id }: { id: string }) {
  const { register, handleSubmit } = useForm<CTAFormInput>()
  const router = useRouter()

  function onSubmit(values: CTAFormInput) {
    router.push({ pathname: '/schedule', query: { email: values.email } })
  }

  return (
    <section id={id} aria-labelledby="schedule-title">
      <h2 id="schedule-title" className="sr-only">
        Schedule an initial consultation
      </h2>
      <Container>
        <div className="relative -mx-4 overflow-hidden bg-blue-50 py-20 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:rounded-4xl md:px-16 xl:px-24 xl:py-36">
          <div className="absolute left-1/2 top-0 -translate-x-[50%] -translate-y-[20%]">
            <Image
              src={backgroundImage}
              alt=""
              layout="fixed"
              width={1558}
              height={946}
              unoptimized
            />
          </div>
          <div className="relative mx-auto grid max-w-2xl grid-cols-1 gap-x-32 gap-y-14 xl:max-w-none xl:grid-cols-2">
            <div>
              <p className="font-display text-4xl font-medium tracking-tighter text-blue-900 sm:text-5xl">
                Get started today
              </p>
              <p className="mt-4 text-lg tracking-tight text-blue-900">
                Our experienced coaches are available for a free initial
                consultation to start building your negotiation strategy
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className="text-lg font-semibold tracking-tight text-blue-900">
                Schedule a consultation <span aria-hidden="true">↓</span>
              </h3>
              <div className="mt-5 flex rounded-3xl bg-white py-2.5 pr-2.5 shadow-xl shadow-blue-900/5 focus-within:ring-2 focus-within:ring-blue-900">
                <label htmlFor="" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Email address"
                  {...register('email')}
                  className="-my-2.5 flex-auto bg-transparent ring-0 border-0 focus:border-0 focus:ring-0 pl-6 pr-2.5 text-base text-slate-900 placeholder:text-slate-400"
                />
                <Button type="submit">
                  <span className="sr-only sm:not-sr-only">Get started</span>
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 sm:hidden"
                    fill="none"
                  >
                    <path
                      d="m14 7 5 5-5 5M19 12H5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}

export { CallToAction }
