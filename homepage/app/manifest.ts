import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Qiangyu Chen（陈锵宇）",
    short_name: "Qiangyu Chen",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF8",
    theme_color: "#0A0A0B",
    icons: [
      { src: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { src: "/apple-touch-icon.jpg", sizes: "180x180", type: "image/jpeg" },
    ],
  };
}
