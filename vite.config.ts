import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: "src/main.ts",
      userscript: {
        match: ["https://xyy.huijiwiki.com/*", "http://xyy.huijiwiki.com/*"],
        "run-at": "document-start",
      },
      build: {
        systemjs: "inline",
        fileName: "main.user.js",
      },
    }),
  ],
});
