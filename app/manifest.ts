import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fitness Duel",
    short_name: "FitnessDuel",
    description: "Le tableau de bord social fitness ultime pour défier ses amis au quotidien",
    start_url: "/",
    display: "standalone",
    background_color: "#050911",
    theme_color: "#050911",
    icons: [
      {
        src: "/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        src: "/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
  };
}
