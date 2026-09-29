"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { SignupModal } from "./signup-modal"

interface SignupContextValue {
  openSignup: () => void
}

const SignupContext = createContext<SignupContextValue | null>(null)

export function useSignup() {
  const ctx = useContext(SignupContext)
  if (!ctx) throw new Error("useSignup must be used within SignupProvider")
  return ctx
}

export function SignupProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openSignup = useCallback(() => setOpen(true), [])
  const closeSignup = useCallback(() => setOpen(false), [])

  return (
    <SignupContext.Provider value={{ openSignup }}>
      {children}
      <SignupModal open={open} onClose={closeSignup} />
    </SignupContext.Provider>
  )
}
