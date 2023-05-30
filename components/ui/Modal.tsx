import { forwardRef } from "react"

type Props = {
  id: string
  title?: string
  children: React.ReactNode
}

const Modal = forwardRef<HTMLInputElement, Props>(
  ({ id, title, children }, ref) => (
    <>
      <input type="checkbox" id={id} className="modal-toggle" ref={ref} />

      <label htmlFor={id} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor={id}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          {title && <h3 className="font-bold text-xl mb-4">{title}</h3>}

          <div className="py-4">{children}</div>
        </label>
      </label>
    </>
  )
)

Modal.displayName = "Modal"

export default Modal
