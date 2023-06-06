import { useEffect } from "react"

import { useToast } from "./context"

const Toast = () => {
  const { toasts } = useToast()

  useEffect(() => {
    console.log({ toasts })
  }, [toasts])

  if (!Object.values(toasts).length) return null

  return (
    <>
      {Object.values(toasts).map((toast) => (
        <div
          key={`toast-${toast.id}`}
          className={`toast toast-top toast-end ${toast.visible ? "open" : ""}`}
        >
          <div className="alert flex-col flex items-start">
            <span className="title">{toast.title}</span>
            <span>{toast.message}</span>
          </div>

          <button className="close">✕</button>
        </div>
      ))}
    </>
  )
}

export default Toast
