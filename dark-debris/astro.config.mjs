// astro.config.js
import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), db()],
  build: {
    format: 'file'
  },
  images: {
    extensions: ['jpg', 'jpeg', 'png', 'gif']
  },
	output: "static"
});
