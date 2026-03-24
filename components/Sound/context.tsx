import React from "react"

// The sound state has been migrated to a zustand store at /app/stores/useSound
// To keep compatibility with existing imports from this file, re-export a
// small adapter around the store and keep a trivial provider for the app.

export { default as useSound } from "@/app/stores/useSound"

export const SoundProvider = ({ children }: { children: React.ReactNode }) => (
  // provider kept for compatibility with existing layout usage
  <>{children}</>
)

export const ManagedSoundContext = ({
  children,
}: {
  children: React.ReactNode
}) => <SoundProvider>{children}</SoundProvider>
