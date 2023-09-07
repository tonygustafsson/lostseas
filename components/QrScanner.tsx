import jsQR from "jsqr"
import { useCallback, useEffect, useRef } from "react"
import { AiOutlineQrcode } from "react-icons/ai"

import { usePlayer } from "@/hooks/queries/usePlayer"

import { useModal } from "./ui/Modal/context"

const QrScanner = () => {
  const { setModal } = useModal()
  const { login } = usePlayer()

  const restoreplayerIdVideoRef = useRef<HTMLVideoElement>(null)
  const canvasElement = useRef<HTMLCanvasElement>(null)
  const canvas = canvasElement.current?.getContext("2d")

  const tick = useCallback(() => {
    // Draw the video frame to the canvas
    if (!restoreplayerIdVideoRef.current || !canvasElement.current) {
      return
    }

    canvas?.drawImage(
      restoreplayerIdVideoRef.current,
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
    window.navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (!restoreplayerIdVideoRef.current) return

        restoreplayerIdVideoRef.current.srcObject = stream
        restoreplayerIdVideoRef.current.setAttribute("playsinline", "true") // required to tell iOS safari we don't want fullscreen
        restoreplayerIdVideoRef.current.play()
        requestAnimationFrame(tick)
      })
  }, [restoreplayerIdVideoRef, tick])

  const openQrScannerModal = () => {
    setModal({
      id: "qrScanner",
      title: "Scan QR code",
      content: (
        <>
          <p className="mb-4">Scan the QR code to sign in</p>

          <video width={500} height={500} ref={restoreplayerIdVideoRef} />
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
