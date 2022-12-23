import * as trpc from '@trpc/server'

import type { Context } from '@/server/createContext'
import { transformer } from '@/utils/trpc'

export function createRouter() {
  return trpc.router<Context>().transformer(transformer)
}
