import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { HTMLAttributes, useState } from 'react'
import { FieldError, UseFormRegisterReturn, useForm } from 'react-hook-form'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { PageTitle } from '@/components/PageTitle'
import { SuccessDialog } from '@/components/SuccessDialog'
import {
  CreateConsultationRequestInput,
  createConsultationRequestSchema,
} from '@/schemas/contact'
import { trpc } from '@/utils/trpc'

type SectionTitleProps = {
  title: string
  description: string
} & HTMLAttributes<HTMLDivElement>

const SectionTitle = ({ title, description, ...props }: SectionTitleProps) => (
  <div {...props}>
    <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
    <p className="mt-1 text-sm text-gray-500">{description}</p>
  </div>
)

type ErrorAlertProps = {
  message: string
  description?: string
}

const ErrorAlert = ({ message, description }: ErrorAlertProps) => (
  <div className="rounded-md bg-red-50 p-4">
    <div className="flex">
      <div className="flex-shrink-0">
        <ExclamationCircleIcon
          className="h-5 w-5 text-red-400"
          aria-hidden="true"
        />
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-red-800">{message}</h3>
        {description && (
          <div className="mt-2 text-sm text-red-700">{description}</div>
        )}
      </div>
    </div>
  </div>
)

type TextInputProps = {
  id: string
  label: string
  autoComplete: string
  register: UseFormRegisterReturn
  error?: FieldError
} & HTMLAttributes<HTMLDivElement>

const TextInput = ({
  id,
  label,
  autoComplete,
  register,
  error,
  ...props
}: TextInputProps) => (
  <div {...props}>
    <label
      htmlFor={id}
      className={clsx(
        'block text-sm font-medium',
        error ? 'text-red-600' : 'text-gray-700'
      )}
    >
      {label}
    </label>
    <div className="mt-1 relative">
      <input
        type="text"
        id={id}
        autoComplete={autoComplete}
        {...register}
        className={clsx(
          'shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md',
          error ? 'border-red-600' : 'border-gray-300'
        )}
      />
      {error && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-600"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
    {error && <p className="mt-2 text-xs text-red-600">{error.message}</p>}
  </div>
)

type RadioButtonProps = {
  id: string
  label: string
  description: string
  register: UseFormRegisterReturn
} & HTMLAttributes<HTMLDivElement>

const RadioButton = ({
  id,
  label,
  description,
  register,
  ...props
}: RadioButtonProps) => (
  <div {...props}>
    <div className="flex items-center h-5">
      <input
        id={id}
        value={id}
        type="radio"
        {...register}
        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
      />
    </div>
    <div className="ml-3 text-sm">
      <label htmlFor={id} className="font-medium text-gray-700">
        {label}
      </label>
      <p className="text-gray-500">{description}</p>
    </div>
  </div>
)

function Schedule() {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateConsultationRequestInput>({
    defaultValues: { email: router.query.email as string },
    mode: 'onBlur',
    resolver: zodResolver(createConsultationRequestSchema),
  })
  const addRequest = trpc.useMutation(['contact.create-consultation-request'])

  const [successDialogOpen, setSuccessDialogOpen] = useState(false)

  function onSubmit(values: CreateConsultationRequestInput) {
    addRequest.mutate(values, {
      onSuccess: () => {
        reset()
        setSuccessDialogOpen(true)
      },
    })
  }

  return (
    <>
      <Head>
        <title>Jones&apos; Guide - Schedule a Consultation</title>
      </Head>
      <SuccessDialog
        title="Thank you!"
        description="Thank you for submitting your request for an initial consultation. We'll be in touch once we've matched you with a coach."
        actionTitle="Back to Jones' Guide"
        open={successDialogOpen}
        onClose={() => {
          router.push('/')
        }}
      />
      <Container>
        <PageTitle
          title="Schedule a consultation"
          tracker="Get Started"
          subtitle="Our experienced coaches are ready to start strategizing"
        />
        <div className="max-w-xl mx-auto mb-16">
          {addRequest.isError ? (
            <ErrorAlert
              message="There was an issue submitting your request"
              description="Please check the form below and try again. Please email us directly for help if the issue continues."
            />
          ) : null}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 divide-y divide-gray-200"
          >
            <div className="space-y-8 divide-y divide-gray-200">
              <div className="pt-8">
                <SectionTitle
                  title="Personal Information"
                  description="Tell us a bit about yourself. We keep your information confidential and only use it to serve you and track your relationship with Jones' Guide."
                />
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <TextInput
                    id="firstName"
                    label="First name"
                    autoComplete="given-name"
                    register={register('firstName')}
                    error={errors.firstName}
                    className="sm:col-span-1"
                  />
                  <TextInput
                    id="lastName"
                    label="Last name"
                    autoComplete="family-name"
                    register={register('lastName')}
                    error={errors.lastName}
                    className="sm:col-span-1"
                  />
                  <TextInput
                    id="email"
                    label="Email address"
                    autoComplete="email"
                    register={register('email')}
                    error={errors.email}
                    className="sm:col-span-1"
                  />
                  <TextInput
                    id="phone"
                    label="Phone number"
                    autoComplete="phone"
                    register={register('phone')}
                    error={errors.phone}
                    className="sm:col-span-1"
                  />
                </div>
              </div>

              <div className="pt-8">
                <SectionTitle
                  title="Topic"
                  description="Tell us a bit about how we can serve you. We'll use this information to match you to a coach with complementary experience and expertise."
                />
                <div className="mt-6">
                  <fieldset>
                    <legend className="sr-only">
                      What are you working on?
                    </legend>
                    <div
                      className={clsx(
                        'text-base font-medium',
                        errors.topic ? 'text-red-600' : 'text-gray-900'
                      )}
                      aria-hidden="true"
                    >
                      What are you working on?
                      <p className="text-xs font-normal">
                        {errors.topic && errors.topic.message}
                      </p>
                    </div>
                    <div className="mt-4 space-y-4">
                      <RadioButton
                        id="offerNegotiation"
                        label="Negotiating an offer"
                        description="Build a plan for negotiating compensation, terms, and benefits"
                        register={register('topic')}
                        className="relative flex items-start"
                      />
                      <RadioButton
                        id="raisePromotion"
                        label="A raise or promotion"
                        description="Prepare to ask for a raise or promotion from your current employer"
                        register={register('topic')}
                        className="relative flex items-start"
                      />
                      <RadioButton
                        id="alternatives"
                        label="Job selection"
                        description="Evaluate multiple alternative opportunities to select the best fit for you"
                        register={register('topic')}
                        className="relative flex items-start"
                      />
                      <RadioButton
                        id="other"
                        label="Something else"
                        description="Another topic related to a current or potential job"
                        register={register('topic')}
                        className="relative flex items-start"
                      />
                    </div>
                  </fieldset>
                  <div className="mt-6">
                    <label
                      htmlFor="comments"
                      className="contents text-base font-medium text-gray-900"
                    >
                      Comments
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="comments"
                        rows={3}
                        defaultValue={''}
                        {...register('comments')}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Tell us a bit about how we can help.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div
                className={clsx(
                  'flex justify-center',
                  addRequest.isLoading && 'animate-pulse'
                )}
              >
                <Button
                  type="submit"
                  color="blue"
                  disabled={addRequest.isLoading}
                >
                  Submit consultation request
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </>
  )
}

export default Schedule
