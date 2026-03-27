"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-8 text-green-600" />,
        info: <InfoIcon className="size-8 text-blue-600" />,
        warning: <TriangleAlertIcon className="size-8 text-yellow-600" />,
        error: <OctagonXIcon className="size-8 text-red-600" />,
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
}

export { Toaster }
