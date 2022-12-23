import { z } from 'zod'

import { createRouter } from '@/server/createRouter'

import { contactRouter } from './contact'

export const appRouter = createRouter()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      }
    },
  })
  .merge('contact.', contactRouter)

export type AppRouter = typeof appRouter
