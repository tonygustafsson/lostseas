import { AnimatePresence, m as motion } from "framer-motion"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { FiCheckCircle, FiXCircle } from "react-icons/fi"

import { useToast } from "./context"

const Toast = () => {
  const { toasts, removeToast } = useToast()

  if (!Object.values(toasts).length) return null

  return (
    <>
      {Object.values(toasts).map((toast, idx) => (
        <AnimatePresence key={`toast-${toast.id}`}>
          {toast.visible && (
            <motion.div
              initial={{ opacity: 0, translateX: "100%" }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{ opacity: 0, translateX: "100%" }}
              className={`toast toast-end`}
              style={{ top: `${idx * 140}px` }}
            >
              <div className="alert flex-col flex items-start gap-1 lg:gap-2">
                <div className="flex gap-2 items-center">
                  {toast.variant === "success" && (
                    <FiCheckCircle size={32} className="text-success" />
                  )}
                  {toast.variant === "error" && (
                    <FiXCircle size={32} className="text-error" />
                  )}
                  <span className="title mr-8">{toast.title}</span>
                </div>

                <span>{toast.message}</span>
              </div>

              <button
                className="close"
                onClick={() => removeToast(toast.id || "")}
              >
                <AiOutlineCloseCircle className="h-7 w-7" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </>
  )
}

export default Toast
