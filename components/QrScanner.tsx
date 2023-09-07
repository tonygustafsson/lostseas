import jsQR from "jsqr"
import { useCallback, useEffect, useRef, useState } from "react"
import { AiOutlineQrcode } from "react-icons/ai"

import { usePlayer } from "@/hooks/queries/usePlayer"

import { useModal } from "./ui/Modal/context"

const QrScanner = () => {
  const { setModal } = useModal()
  const { login } = usePlayer()

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasElementRef = useRef<HTMLCanvasElement>(null)
  const canvasContext = canvasElementRef.current?.getContext("2d")

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const drawCanvasAndReadImageData = () => {
    if (!videoRef.current || !canvasElementRef.current) {
      return
    }

    canvasContext?.drawImage(
      videoRef.current,
      0,
      0,
      canvasElementRef.current.width,
      canvasElementRef.current.height
    )
    const imageData = canvasContext?.getImageData(
      0,
      0,
      canvasElementRef.current.width,
      canvasElementRef.current.height
    )

    return imageData
  }

  const verifyPlayerIdFromImageData = useCallback(() => {
    if (!videoRef.current || !canvasElementRef.current) {
      return
    }

    const imageData = drawCanvasAndReadImageData()

    if (!imageData) return

    const playerId = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    })

    if (playerId) {
      login(playerId.data)
    }

    requestAnimationFrame(verifyPlayerIdFromImageData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasElementRef, canvasContext])

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
          <canvas className="hidden" ref={canvasElementRef}></canvas>
        </>
      ),
    })
  }

  useEffect(() => {
    if (!modalIsOpen) return

    const videoElement = videoRef.current

    // Start capturing video
    window.navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (!videoElement) return

        videoElement.srcObject = stream
        videoElement.setAttribute("playsinline", "true") // required to tell iOS safari we don't want fullscreen
        videoElement.play()

        requestAnimationFrame(verifyPlayerIdFromImageData)
      })

    return () => {
      // Stop capturing video if modal is closed
      videoElement?.pause()
      videoElement!.srcObject = null
    }
  }, [modalIsOpen, verifyPlayerIdFromImageData])

  return (
    <button onClick={openQrScannerModal} className="btn btn-secondary flex-1">
      <AiOutlineQrcode size={24} />
      Scan QR Code
    </button>
  )
}

export default QrScanner
