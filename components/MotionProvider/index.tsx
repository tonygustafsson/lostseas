"use client"

import { LazyMotion } from "framer-motion"

const domAnimation = () => import("./MotionFeatures").then((res) => res.default)

const MotionProvider = ({ children }: { children: React.ReactNode }) => (
  <LazyMotion strict features={domAnimation}>
    {children}
  </LazyMotion>
)

export default MotionProvider
