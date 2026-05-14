import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://btav.dev",
  integrations: [
    expressiveCode({
      themes: ["github-light", "github-dark-dimmed"],
      themeCssSelector: (theme) =>
        theme.type === "dark" ? ".dark" : ":root:not(.dark)",
      styleOverrides: {
        borderRadius: "4px",
        codeFontSize: "0.875rem",
      },
    }),
    icon(),
    mdx(),
    sitemap(),
  ],
});
