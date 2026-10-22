import "server-only"

import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

import {
  GOD_MODE_COOKIE_NAME,
  GOD_MODE_LIFETIME_SECONDS,
} from "@/constants/system"

/** God mode is off unless the secret is set. */
export const getGodModeSecret = () => process.env.GOD_MODE_SECRET || undefined

const sign = (value: string, secret: string) =>
  createHmac("sha256", secret).update(value).digest("hex")

const safeEqual = (a: string, b: string) => {
  const bufferA = Buffer.from(a)
  const bufferB = Buffer.from(b)

  return bufferA.length === bufferB.length && timingSafeEqual(bufferA, bufferB)
}

export const isPassphraseValid = (passphrase: unknown, secret: string) =>
  typeof passphrase === "string" &&
  safeEqual(sign(passphrase, secret), sign(secret, secret))

export const createGodModeToken = (secret: string) => {
  const expires = String(Date.now() + GOD_MODE_LIFETIME_SECONDS * 1000)

  return `${expires}.${sign(expires, secret)}`
}

const isTokenValid = (token: string | undefined, secret: string) => {
  const [expires, signature] = token?.split(".") ?? []

  return (
    !!expires &&
    !!signature &&
    Number(expires) > Date.now() &&
    safeEqual(signature, sign(expires, secret))
  )
}

export const hasGodModeAccess = async () => {
  const secret = getGodModeSecret()

  if (!secret) return false

  const cookieStore = await cookies()

  return isTokenValid(cookieStore.get(GOD_MODE_COOKIE_NAME)?.value, secret)
}
