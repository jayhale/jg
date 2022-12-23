import {
  AcademicCapIcon,
  BadgeCheckIcon,
  ChatAlt2Icon,
  ChevronDoubleUpIcon,
  CurrencyDollarIcon,
  DocumentReportIcon,
  PlusCircleIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/outline'
import { ElementType } from 'react'

import { Container } from '@/components/Container'

const features = [
  {
    name: 'Graduates',
    description:
      'Support for students and recent graduates navigating their first offer negotiations.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Promotions',
    description:
      'Strategy for requesting and securing a promotion from a current employer.',
    icon: ChevronDoubleUpIcon,
  },
  {
    name: 'Raises',
    description:
      'Compensation comparisions and approach for securing increases in your current role.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Offers',
    description:
      'Negotiaton strategy and support for job seekers with an offer in hand.',
    icon: ChatAlt2Icon,
  },
  {
    name: 'Internships',
    description:
      'Approach for selecting internships and entry-level opportunities for the best career trajectory',
    icon: PlusCircleIcon,
  },
  {
    name: 'Job Selection',
    description: 'Framework for selecting between alternative opportunities.',
    icon: SwitchHorizontalIcon,
  },
  {
    name: 'Reviews',
    description:
      'Support for leveraging performance reviews to accelerate career trajectory.',
    icon: BadgeCheckIcon,
  },
  {
    name: 'Benchmarking',
    description:
      'Fact-based comparison of employment terms, benefits, and compensation.',
    icon: DocumentReportIcon,
  },
]

type FeatureProps = {
  feature: {
    name: string
    description: string
    icon: ElementType
  }
}

const Feature = ({ feature }: FeatureProps) => (
  <div>
    <div>
      <span className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
      </span>
    </div>
    <div className="mt-6">
      <h3 className="text-lg font-medium text-white">{feature.name}</h3>
      <p className="mt-2 text-base text-indigo-200">{feature.description}</p>
    </div>
  </div>
)

const WhatWeDo = ({ id }: { id: string }) => (
  <section id={id} className="bg-blue-600 py-12 md:py-20">
    <Container>
      <div className="mx-auto max-w-2xl md:text-center">
        <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
          What we do
        </h2>
        <p className="mt-4 text-lg tracking-tight text-white">
          We love helping job seekers and employees get the most from both new
          opportunities and their current work.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
        {features.map((feature, featureIndex) => (
          <Feature feature={feature} key={featureIndex} />
        ))}
      </div>
    </Container>
  </section>
)

export { WhatWeDo }
