import jsQR from "jsqr"
import { useCallback, useEffect, useRef, useState } from "react"
import { AiOutlineQrcode } from "react-icons/ai"

import { usePlayer } from "@/hooks/queries/usePlayer"

import { useModal } from "./ui/Modal/context"

const QrScanner = () => {
  const { setModal } = useModal()
  const { login } = usePlayer()

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasElement = useRef<HTMLCanvasElement>(null)
  const canvas = canvasElement.current?.getContext("2d")

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const tick = useCallback(() => {
    // Draw the video frame to the canvas
    if (!videoRef.current || !canvasElement.current) {
      return
    }

    canvas?.drawImage(
      videoRef.current,
      0,
      0,
      canvasElement.current.width,
      canvasElement.current.height
    )
    const imageData = canvas?.getImageData(
      0,
      0,
      canvasElement.current.width,
      canvasElement.current.height
    )

    if (!imageData) return

    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    })

    if (code) {
      login(code.data)
    }

    requestAnimationFrame(tick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasElement, canvas])

  useEffect(() => {
    if (!modalIsOpen) return

    const videoElement = videoRef.current

    window.navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (!videoElement) return

        videoElement.srcObject = stream
        videoElement.setAttribute("playsinline", "true") // required to tell iOS safari we don't want fullscreen
        videoElement.play()

        requestAnimationFrame(tick)
      })

    return () => {
      // Stop capturing video if modal is closed
      videoElement?.pause()
      videoElement!.srcObject = null
    }
  }, [modalIsOpen, tick])

  const openQrScannerModal = () => {
    setModalIsOpen(true)

    setModal({
      id: "qrScanner",
      title: "Scan QR code",
      onClose: () => setModalIsOpen(false),
      content: (
        <>
          <p className="mb-4">Scan the QR code to sign in</p>

          <video width={500} height={500} ref={videoRef} />
          <canvas className="hidden" ref={canvasElement}></canvas>
        </>
      ),
    })
  }

  return (
    <button onClick={openQrScannerModal} className="btn btn-secondary flex-1">
      <AiOutlineQrcode size={24} />
      Scan QR Code
    </button>
  )
}

export default QrScanner
