"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    theme="dark"
    className="toaster group"
    icons={{
      success: <CircleCheckIcon className="text-success size-8" />,
      info: <InfoIcon className="text-info size-8" />,
      warning: <TriangleAlertIcon className="text-warning size-8" />,
      error: <OctagonXIcon className="text-error size-8" />,
      loading: <Loader2Icon className="size-8 animate-spin" />,
    }}
    style={
      {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)",
        "--width": "500px",
      } as React.CSSProperties
    }
    toastOptions={{
      classNames: {
        toast: "cn-toast text-sm! font-light! gap-8!",
      },
    }}
    {...props}
  />
)

export { Toaster }
