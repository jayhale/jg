import * as trpcNext from '@trpc/server/adapters/next'

import { createContext } from '@/server/createContext'
import { appRouter } from '@/server/router'

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error('tRPC internal error', error)
    }
  },
  batching: {
    enabled: true,
  },
})
