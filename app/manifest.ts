import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Lost Seas",
    short_name: "Lost Seas",
    description: "Sail, trade and fight your way across the Lost Seas.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0a0d0f",
    theme_color: "#0a0d0f",
    categories: ["games"],
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
