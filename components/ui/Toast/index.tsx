import { ToastProps, useToast } from "./context"

const Toast = () => {
  const { toasts } = useToast()

  if (!toasts.length) return null

  return (
    <>
      {toasts.map((toast: ToastProps) => (
        <div key={`toast-${toast.id}`} className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>{toast.message}</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default Toast
