import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Custom domain (0vas.com) serves from root; keep base "/".
export default defineConfig({
  plugins: [react()],
  base: "/",
});
