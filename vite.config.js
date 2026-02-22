import { defineConfig } from "vite";

export default defineConfig(() => {
  // В GitHub Actions есть переменная: "owner/repo"
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];

  // Если это User Pages репо (username.github.io) → base должен быть "/"
  const isUserPages = repo?.endsWith(".github.io");

  return {
    base: repo && !isUserPages ? `/${repo}/` : "/",
    server: { port: 5173, open: true },
  };
});
