import { FiCheckCircle, FiXCircle } from "react-icons/fi"

import { useToast } from "./context"

const Toast = () => {
  const { toasts, removeToast } = useToast()

  if (!Object.values(toasts).length) return null

  return (
    <>
      {Object.values(toasts).map((toast) => (
        <div
          key={`toast-${toast.id}`}
          className={`toast toast-top toast-end ${toast.visible ? "open" : ""}`}
        >
          <div className="alert flex-col flex items-start">
            <div className="flex gap-2 items-center">
              {toast.variant === "success" && <FiCheckCircle size={24} />}
              {toast.variant === "error" && <FiXCircle size={24} />}
              <span className="title mr-8">{toast.title}</span>
            </div>

            <span>{toast.message}</span>
          </div>

          <button className="close" onClick={() => removeToast(toast.id || "")}>
            ✕
          </button>
        </div>
      ))}
    </>
  )
}

export default Toast
