import { defineConfig } from "vite";

export default defineConfig(() => {
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const isUserPages = repo?.endsWith(".github.io");

  return {
    base: repo && !isUserPages ? `/${repo}/` : "/",
    server: { port: 5173, open: true },
  };
});
