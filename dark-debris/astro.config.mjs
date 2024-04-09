// astro.config.js
import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  build: {
    format: 'file'
  },
  images: {
    extensions: ['jpg', 'jpeg', 'png', 'gif'],
  },
  server: {
    open: "/index.html"
  },
  site: "https://purple-sea-023abc91e.4.azurestaticapps.net/index.html"
});
