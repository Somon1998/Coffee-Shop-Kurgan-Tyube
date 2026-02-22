import { defineConfig } from "vite";

export default defineConfig({
  // If you deploy to GitHub Pages, set base to '/REPO_NAME/'
  base: "/coffee-shop/",
  server: { port: 5173, open: true },
});
