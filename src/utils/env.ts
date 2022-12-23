export function getEnvVar(key: string) {
  if (!(key in process.env)) {
    throw new Error(`Required environment variable ${key} not set`)
  }
  return process.env[key]
}

export const isDevelopment = process.env.NODE_ENV === 'development'

export const isTest = process.env.NODE_ENV == 'test'

export const isProduction = !(isDevelopment || isTest)

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return ''
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  if (
    process.env.NODE_ENV === 'development' &&
    process.env.GITPOD_WORKSPACE_URL
  ) {
    return `https://${process.env.GITPOD_WORKSPACE_URL}`
  }

  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:${process.env.PORT ?? 3000}`
  }

  throw new Error('Invalid configuration, missing base url')
}

export const baseUrl = getBaseUrl()
