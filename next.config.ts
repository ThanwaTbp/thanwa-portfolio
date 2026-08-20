import type { NextConfig } from 'next'

function getAppwriteImagePattern() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT

  if (!endpoint) return null

  try {
    const appwriteUrl = new URL(endpoint)
    const protocol = appwriteUrl.protocol === 'http:' ? 'http' : 'https'

    return {
      protocol,
      hostname: appwriteUrl.hostname,
      pathname: '/v1/storage/buckets/**',
    } as const
  } catch {
    return null
  }
}

const appwriteImagePattern = getAppwriteImagePattern()

const nextConfig: NextConfig = {
  images: {
    remotePatterns: appwriteImagePattern ? [appwriteImagePattern] : [],
  },
}

export default nextConfig
