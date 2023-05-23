type Props = {
  isOpen: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ isOpen, title, onClose, children }: Props) => {
  if (!isOpen) return null

  return (
    <dialog open={isOpen} className="bg-black border-white border rounded pt-0">
      <div className="flex items-center justify-between">
        {title && <h1 className="text-white">{title}</h1>}

        <button onClick={onClose} className="text-white text-4xl">
          &times;
        </button>
      </div>

      {children}
    </dialog>
  )
}

export default Modal
