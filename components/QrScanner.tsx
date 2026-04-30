import jsQR from "jsqr"
import { useEffect, useRef, useState } from "react"
import { AiOutlineQrcode } from "react-icons/ai"

import useModal from "@/app/stores/modals"
import { usePlayer } from "@/hooks/queries/usePlayer"

import { Button } from "./ui/button"

const QrScanner = () => {
  const { setModal } = useModal()
  const { login } = usePlayer()

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasElementRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [, setPlayerId] = useState<string | null>(null)

  const openQrScannerModal = () => {
    setPlayerId(null)
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

          <video width={500} height={500} ref={videoRef} />
          <canvas className="hidden" ref={canvasElementRef} />
        </>
      ),
    })
  }

  useEffect(() => {
    if (!modalIsOpen) return

    let stream: MediaStream | null = null
    let stopped = false

    const stopCapture = () => {
      stopped = true

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }

      const videoElement = videoRef.current

      if (videoElement) {
        videoElement.pause()
        videoElement.srcObject = null
      }

      stream?.getTracks().forEach((track) => track.stop())
      stream = null
    }

    const drawCanvasAndReadImageData = () => {
      const videoElement = videoRef.current
      const canvasElement = canvasElementRef.current

      if (!videoElement || !canvasElement) {
        return null
      }

      const ctx = canvasElement.getContext("2d")

      if (!ctx) {
        return null
      }

      const width = videoElement.videoWidth || canvasElement.width
      const height = videoElement.videoHeight || canvasElement.height

      canvasElement.width = width
      canvasElement.height = height

      ctx.drawImage(videoElement, 0, 0, width, height)

      return ctx.getImageData(0, 0, width, height)
    }

    function verifyPlayerIdFromImageData() {
      if (stopped) return

      const imageData = drawCanvasAndReadImageData()

      if (!imageData) {
        animationFrameRef.current = requestAnimationFrame(
          verifyPlayerIdFromImageData
        )
        return
      }

      const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      })

      if (qrCode) {
        login(qrCode.data)
        setPlayerId(qrCode.data)
        stopCapture()
        return
      }

      animationFrameRef.current = requestAnimationFrame(
        verifyPlayerIdFromImageData
      )
    }

    const captureVideo = async () => {
      try {
        stream = await window.navigator.mediaDevices.getUserMedia({
          video: true,
        })

        if (stopped) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }

        const videoElement = videoRef.current

        if (!videoElement) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }

        videoElement.srcObject = stream
        videoElement.setAttribute("playsinline", "true")

        await videoElement.play()

        animationFrameRef.current = requestAnimationFrame(
          verifyPlayerIdFromImageData
        )
      } catch (error) {
        console.error("Could not access camera", error)
        stopCapture()
      }
    }

    captureVideo()

    return stopCapture
  }, [login, modalIsOpen])

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
