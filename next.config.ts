import type { NextConfig } from "next"
const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol:"https", hostname:"lh3.googleusercontent.com" },
      { protocol:"https", hostname:"firebasestorage.googleapis.com" },
    ],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: "FinVest Pro",
  },
}
export default config