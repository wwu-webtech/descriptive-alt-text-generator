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
  }
});
