import jsQR from "jsqr"
import { useCallback, useEffect, useRef, useState } from "react"
import { AiOutlineQrcode } from "react-icons/ai"

import useModal from "@/app/stores/modals"
import { usePlayer } from "@/hooks/queries/usePlayer"

import { Button } from "./ui/button"

const QrScanner = () => {
  const { setModal } = useModal()
  const { login } = usePlayer()

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasElementRef = useRef<HTMLCanvasElement>(null)

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [playerId, setPlayerId] = useState<string | null>(null)

  const drawCanvasAndReadImageData = () => {
    if (!videoRef.current || !canvasElementRef.current) {
      return
    }

    const ctx = canvasElementRef.current.getContext("2d")

    if (!ctx) return

    ctx.drawImage(
      videoRef.current,
      0,
      0,
      canvasElementRef.current.width,
      canvasElementRef.current.height
    )

    const imageData = ctx.getImageData(
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
      setPlayerId(playerId.data)
      return
    }

    requestAnimationFrame(verifyPlayerIdFromImageData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasElementRef])

  const openQrScannerModal = () => {
    setModalIsOpen(true)

    setModal({
      id: "qrScanner",
      title: "Scan QR code",
      onClose: async () => {
        setModalIsOpen(false)
      },
      content: (
        <>
          <p className="mb-4">Scan the QR code to sign in</p>

          {!playerId && (
            <>
              <video width={500} height={500} ref={videoRef} />
              <canvas className="hidden" ref={canvasElementRef}></canvas>
            </>
          )}
        </>
      ),
    })
  }

  useEffect(() => {
    if (!modalIsOpen) return

    const captureVideo = async () => {
      const stream = await window.navigator.mediaDevices.getUserMedia({
        video: true,
      })

      const videoElement = videoRef.current

      if (!videoElement) return

      videoElement.srcObject = stream
      videoElement.setAttribute("playsinline", "true") // required to tell iOS safari we don't want fullscreen

      await videoElement.play()

      requestAnimationFrame(verifyPlayerIdFromImageData)
    }

    captureVideo()

    return () => {
      // Stop capturing video if modal is closed
      const videoElement = videoRef.current
      if (!videoElement) return

      videoElement.pause()
      videoElement.srcObject = null
    }
  }, [modalIsOpen, verifyPlayerIdFromImageData])

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={openQrScannerModal}
      className="md:flex-1"
    >
      <AiOutlineQrcode size={24} />
      Scan QR Code
    </Button>
  )
}

export default QrScanner
