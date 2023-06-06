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
            <span className="title">{toast.title}</span>
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
