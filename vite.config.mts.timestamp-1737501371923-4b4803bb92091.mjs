// vite.config.mts
import { defineConfig } from "file:///C:/Users/mazen/Documents/codinnnn/vidbinge-clone/vidbinge_electron/VidBinge/node_modules/.pnpm/vitest@1.6.0_@types+node@20.14.13_jsdom@23.2.0_terser@5.31.3/node_modules/vitest/dist/config.js";
import react from "file:///C:/Users/mazen/Documents/codinnnn/vidbinge-clone/vidbinge_electron/VidBinge/node_modules/.pnpm/@vitejs+plugin-react@4.3.1__84a93cead3ad32edc228740644d6ee66/node_modules/@vitejs/plugin-react/dist/index.mjs";
import loadVersion from "file:///C:/Users/mazen/Documents/codinnnn/vidbinge-clone/vidbinge_electron/VidBinge/node_modules/.pnpm/vite-plugin-package-version_78ad269cf310f7e7e93b8e44dd50e5ec/node_modules/vite-plugin-package-version/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/mazen/Documents/codinnnn/vidbinge-clone/vidbinge_electron/VidBinge/node_modules/.pnpm/vite-plugin-pwa@0.17.5_vite_8933132607202dae3f01367cac76f2d6/node_modules/vite-plugin-pwa/dist/index.js";
import checker from "file:///C:/Users/mazen/Documents/codinnnn/vidbinge-clone/vidbinge_electron/VidBinge/node_modules/.pnpm/vite-plugin-checker@0.6.4_e_7a4044d46e576be0a55bcf6bb6433c85/node_modules/vite-plugin-checker/dist/esm/main.js";
import path2 from "path";
import million from "file:///C:/Users/mazen/Documents/codinnnn/vidbinge-clone/vidbinge_electron/VidBinge/node_modules/.pnpm/million@2.6.4/node_modules/million/dist/packages/compiler.mjs";

// plugins/handlebars.ts
import { globSync } from "file:///C:/Users/mazen/Documents/codinnnn/vidbinge-clone/vidbinge_electron/VidBinge/node_modules/.pnpm/glob@10.4.5/node_modules/glob/dist/esm/index.js";
import { viteStaticCopy } from "file:///C:/Users/mazen/Documents/codinnnn/vidbinge-clone/vidbinge_electron/VidBinge/node_modules/.pnpm/vite-plugin-static-copy@1.0_c41da37d9352278547f378e099ab700d/node_modules/vite-plugin-static-copy/dist/index.js";
import Handlebars from "file:///C:/Users/mazen/Documents/codinnnn/vidbinge-clone/vidbinge_electron/VidBinge/node_modules/.pnpm/handlebars@4.7.8/node_modules/handlebars/lib/index.js";
import path from "path";
var handlebars = (options = {}) => {
  const files = globSync("src/assets/**/**.hbs");
  function render(content) {
    const template = Handlebars.compile(content);
    return template(options?.vars ?? {});
  }
  return [
    {
      name: "hbs-templating",
      enforce: "pre",
      transformIndexHtml: {
        order: "pre",
        handler(html) {
          return render(html);
        }
      }
    },
    viteStaticCopy({
      silent: true,
      targets: files.map((file) => ({
        src: file,
        dest: "",
        rename: path.basename(file).slice(0, -4),
        // remove .hbs file extension
        transform: {
          encoding: "utf8",
          handler(content) {
            return render(content);
          }
        }
      }))
    })
  ];
};

// vite.config.mts
import { loadEnv, splitVendorChunkPlugin } from "file:///C:/Users/mazen/Documents/codinnnn/vidbinge-clone/vidbinge_electron/VidBinge/node_modules/.pnpm/vite@5.3.6_@types+node@20.14.13_terser@5.31.3/node_modules/vite/dist/node/index.js";
import { visualizer } from "file:///C:/Users/mazen/Documents/codinnnn/vidbinge-clone/vidbinge_electron/VidBinge/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_@rollup+wasm-node@4.19.1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import tailwind from "file:///C:/Users/mazen/Documents/codinnnn/vidbinge-clone/vidbinge_electron/VidBinge/node_modules/.pnpm/tailwindcss@3.4.7/node_modules/tailwindcss/lib/index.js";
import rtl from "file:///C:/Users/mazen/Documents/codinnnn/vidbinge-clone/vidbinge_electron/VidBinge/node_modules/.pnpm/postcss-rtlcss@4.0.9_postcss@8.4.40/node_modules/postcss-rtlcss/esm/index.js";
var __vite_injected_original_dirname = "C:\\Users\\mazen\\Documents\\codinnnn\\vidbinge-clone\\vidbinge_electron\\VidBinge";
var captioningPackages = [
  "dompurify",
  "htmlparser2",
  "subsrt-ts",
  "parse5",
  "entities",
  "fuse"
];
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_BASE_URL || "/",
    plugins: [
      million.vite({ auto: true, mute: true }),
      handlebars({
        vars: {
          opensearchEnabled: env.VITE_OPENSEARCH_ENABLED === "true",
          routeDomain: env.VITE_APP_DOMAIN + (env.VITE_NORMAL_ROUTER !== "true" ? "/#" : ""),
          domain: env.VITE_APP_DOMAIN,
          env
        }
      }),
      react({
        babel: {
          presets: [
            "@babel/preset-typescript",
            [
              "@babel/preset-env",
              {
                modules: false,
                useBuiltIns: "entry",
                corejs: {
                  version: "3.34"
                }
              }
            ]
          ]
        }
      }),
      VitePWA({
        disable: env.VITE_PWA_ENABLED !== "true",
        registerType: "autoUpdate",
        workbox: {
          maximumFileSizeToCacheInBytes: 4e6,
          // 4mb
          globIgnores: ["**ping.txt**"]
        },
        includeAssets: [
          "OneSignalSDKWorker.js",
          "favicon.ico",
          "apple-touch-icon.png",
          "safari-pinned-tab.svg",
          "opensearch.xml",
          "robots.txt",
          "ping.txt",
          "favicon-32x32.png",
          "favicon-16x16.png",
          "browserconfig.xml",
          "splash_screens/iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_landscape.png",
          "splash_screens/iPhone_15_Pro__iPhone_15__iPhone_14_Pro_landscape.png",
          "splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png",
          "splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png",
          "splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png",
          "splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png",
          "splash_screens/iPhone_11__iPhone_XR_landscape.png",
          "splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png",
          "splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png",
          "splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png",
          "splash_screens/12.9__iPad_Pro_landscape.png",
          "splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png",
          "splash_screens/10.9__iPad_Air_landscape.png",
          "splash_screens/10.5__iPad_Air_landscape.png",
          "splash_screens/10.2__iPad_landscape.png",
          "splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png",
          "splash_screens/8.3__iPad_Mini_landscape.png",
          "splash_screens/iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png",
          "splash_screens/iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png",
          "splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",
          "splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",
          "splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",
          "splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",
          "splash_screens/iPhone_11__iPhone_XR_portrait.png",
          "splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",
          "splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",
          "splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png",
          "splash_screens/12.9__iPad_Pro_portrait.png",
          "splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png",
          "splash_screens/10.9__iPad_Air_portrait.png",
          "splash_screens/10.5__iPad_Air_portrait.png",
          "splash_screens/10.2__iPad_portrait.png",
          "splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png",
          "splash_screens/8.3__iPad_Mini_portrait.png"
        ],
        manifest: {
          id: "https://www.vidbinge.com/",
          name: "Vid Binge",
          short_name: "VidBinge",
          description: "Stream a wide array of movies and TV shows on Vid Binge, completely free. Enjoy unlimited, ad-free viewing with no subscriptions required.",
          theme_color: "#120f1d",
          background_color: "#120f1d",
          display: "standalone",
          start_url: "/",
          icons: [
            {
              src: "android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any"
            },
            {
              src: "android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any"
            },
            {
              src: "android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable"
            },
            {
              src: "android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable"
            }
          ]
        }
      }),
      loadVersion(),
      checker({
        overlay: {
          position: "tr"
        },
        typescript: true,
        // check typescript build errors in dev server
        eslint: {
          // check lint errors in dev server
          lintCommand: "eslint --ext .tsx,.ts src",
          dev: {
            logLevel: ["error"]
          }
        }
      }),
      splitVendorChunkPlugin(),
      visualizer()
    ],
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("@sozialhelden+ietf-language-tags") || id.includes("country-language")) {
              return "language-db";
            }
            if (id.includes("hls.js")) {
              return "hls";
            }
            if (id.includes("node-forge") || id.includes("crypto-js")) {
              return "auth";
            }
            if (id.includes("locales") && !id.includes("en.json")) {
              return "locales";
            }
            if (id.includes("react-dom")) {
              return "react-dom";
            }
            if (id.includes("Icon.tsx")) {
              return "Icons";
            }
            const isCaptioningPackage = captioningPackages.some((packageName) => id.includes(packageName));
            if (isCaptioningPackage) {
              return "caption-parsing";
            }
          }
        }
      }
    },
    css: {
      postcss: {
        plugins: [tailwind(), rtl()]
      }
    },
    resolve: {
      alias: {
        "@": path2.resolve(__vite_injected_original_dirname, "./src"),
        "@sozialhelden/ietf-language-tags": path2.resolve(
          __vite_injected_original_dirname,
          "./node_modules/@sozialhelden/ietf-language-tags/dist/cjs"
        )
      }
    },
    test: {
      environment: "jsdom"
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIiwgInBsdWdpbnMvaGFuZGxlYmFycy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG1hemVuXFxcXERvY3VtZW50c1xcXFxjb2Rpbm5ublxcXFx2aWRiaW5nZS1jbG9uZVxcXFx2aWRiaW5nZV9lbGVjdHJvblxcXFxWaWRCaW5nZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbWF6ZW5cXFxcRG9jdW1lbnRzXFxcXGNvZGlubm5uXFxcXHZpZGJpbmdlLWNsb25lXFxcXHZpZGJpbmdlX2VsZWN0cm9uXFxcXFZpZEJpbmdlXFxcXHZpdGUuY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbWF6ZW4vRG9jdW1lbnRzL2NvZGlubm5uL3ZpZGJpbmdlLWNsb25lL3ZpZGJpbmdlX2VsZWN0cm9uL1ZpZEJpbmdlL3ZpdGUuY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlc3QvY29uZmlnXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgbG9hZFZlcnNpb24gZnJvbSBcInZpdGUtcGx1Z2luLXBhY2thZ2UtdmVyc2lvblwiO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcbmltcG9ydCBjaGVja2VyIGZyb20gXCJ2aXRlLXBsdWdpbi1jaGVja2VyXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IG1pbGxpb24gZnJvbSAnbWlsbGlvbi9jb21waWxlcic7XG5pbXBvcnQgeyBoYW5kbGViYXJzIH0gZnJvbSBcIi4vcGx1Z2lucy9oYW5kbGViYXJzXCI7XG5pbXBvcnQgeyBQbHVnaW5PcHRpb24sIGxvYWRFbnYsIHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4gfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjtcblxuaW1wb3J0IHRhaWx3aW5kIGZyb20gXCJ0YWlsd2luZGNzc1wiO1xuaW1wb3J0IHJ0bCBmcm9tIFwicG9zdGNzcy1ydGxjc3NcIjtcblxuY29uc3QgY2FwdGlvbmluZ1BhY2thZ2VzID0gW1xuICBcImRvbXB1cmlmeVwiLFxuICBcImh0bWxwYXJzZXIyXCIsXG4gIFwic3Vic3J0LXRzXCIsXG4gIFwicGFyc2U1XCIsXG4gIFwiZW50aXRpZXNcIixcbiAgXCJmdXNlXCJcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKTtcbiAgcmV0dXJuIHtcbiAgICBiYXNlOiBlbnYuVklURV9CQVNFX1VSTCB8fCAnLycsXG4gICAgcGx1Z2luczogW1xuICAgICAgbWlsbGlvbi52aXRlKHsgYXV0bzogdHJ1ZSwgbXV0ZTogdHJ1ZSB9KSxcbiAgICAgIGhhbmRsZWJhcnMoe1xuICAgICAgICB2YXJzOiB7XG4gICAgICAgICAgb3BlbnNlYXJjaEVuYWJsZWQ6IGVudi5WSVRFX09QRU5TRUFSQ0hfRU5BQkxFRCA9PT0gXCJ0cnVlXCIsXG4gICAgICAgICAgcm91dGVEb21haW46XG4gICAgICAgICAgICBlbnYuVklURV9BUFBfRE9NQUlOICtcbiAgICAgICAgICAgIChlbnYuVklURV9OT1JNQUxfUk9VVEVSICE9PSBcInRydWVcIiA/IFwiLyNcIiA6IFwiXCIpLFxuICAgICAgICAgIGRvbWFpbjogZW52LlZJVEVfQVBQX0RPTUFJTixcbiAgICAgICAgICBlbnYsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIHJlYWN0KHtcbiAgICAgICAgYmFiZWw6IHtcbiAgICAgICAgICBwcmVzZXRzOiBbXG4gICAgICAgICAgICBcIkBiYWJlbC9wcmVzZXQtdHlwZXNjcmlwdFwiLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBcIkBiYWJlbC9wcmVzZXQtZW52XCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB1c2VCdWlsdEluczogXCJlbnRyeVwiLFxuICAgICAgICAgICAgICAgIGNvcmVqczoge1xuICAgICAgICAgICAgICAgICAgdmVyc2lvbjogXCIzLjM0XCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgVml0ZVBXQSh7XG4gICAgICAgIGRpc2FibGU6IGVudi5WSVRFX1BXQV9FTkFCTEVEICE9PSBcInRydWVcIixcbiAgICAgICAgcmVnaXN0ZXJUeXBlOiBcImF1dG9VcGRhdGVcIixcbiAgICAgICAgd29ya2JveDoge1xuICAgICAgICAgIG1heGltdW1GaWxlU2l6ZVRvQ2FjaGVJbkJ5dGVzOiA0MDAwMDAwLCAvLyA0bWJcbiAgICAgICAgICBnbG9iSWdub3JlczogW1wiKipwaW5nLnR4dCoqXCJdLFxuICAgICAgICB9LFxuICAgICAgICBpbmNsdWRlQXNzZXRzOiBbXG4gICAgICAgICAgXCJPbmVTaWduYWxTREtXb3JrZXIuanNcIixcbiAgICAgICAgICBcImZhdmljb24uaWNvXCIsXG4gICAgICAgICAgXCJhcHBsZS10b3VjaC1pY29uLnBuZ1wiLFxuICAgICAgICAgIFwic2FmYXJpLXBpbm5lZC10YWIuc3ZnXCIsXG4gICAgICAgICAgXCJvcGVuc2VhcmNoLnhtbFwiLFxuICAgICAgICAgIFwicm9ib3RzLnR4dFwiLFxuICAgICAgICAgIFwicGluZy50eHRcIixcbiAgICAgICAgICBcImZhdmljb24tMzJ4MzIucG5nXCIsXG4gICAgICAgICAgXCJmYXZpY29uLTE2eDE2LnBuZ1wiLFxuICAgICAgICAgIFwiYnJvd3NlcmNvbmZpZy54bWxcIixcbiAgICAgICAgICBcInNwbGFzaF9zY3JlZW5zL2lQaG9uZV8xNV9Qcm9fTWF4X19pUGhvbmVfMTVfUGx1c19faVBob25lXzE0X1Byb19NYXhfbGFuZHNjYXBlLnBuZ1wiLFxuICAgICAgICAgIFwic3BsYXNoX3NjcmVlbnMvaVBob25lXzE1X1Byb19faVBob25lXzE1X19pUGhvbmVfMTRfUHJvX2xhbmRzY2FwZS5wbmdcIixcbiAgICAgICAgICBcInNwbGFzaF9zY3JlZW5zL2lQaG9uZV8xNF9QbHVzX19pUGhvbmVfMTNfUHJvX01heF9faVBob25lXzEyX1Byb19NYXhfbGFuZHNjYXBlLnBuZ1wiLFxuICAgICAgICAgIFwic3BsYXNoX3NjcmVlbnMvaVBob25lXzE0X19pUGhvbmVfMTNfUHJvX19pUGhvbmVfMTNfX2lQaG9uZV8xMl9Qcm9fX2lQaG9uZV8xMl9sYW5kc2NhcGUucG5nXCIsXG4gICAgICAgICAgXCJzcGxhc2hfc2NyZWVucy9pUGhvbmVfMTNfbWluaV9faVBob25lXzEyX21pbmlfX2lQaG9uZV8xMV9Qcm9fX2lQaG9uZV9YU19faVBob25lX1hfbGFuZHNjYXBlLnBuZ1wiLFxuICAgICAgICAgIFwic3BsYXNoX3NjcmVlbnMvaVBob25lXzExX1Byb19NYXhfX2lQaG9uZV9YU19NYXhfbGFuZHNjYXBlLnBuZ1wiLFxuICAgICAgICAgIFwic3BsYXNoX3NjcmVlbnMvaVBob25lXzExX19pUGhvbmVfWFJfbGFuZHNjYXBlLnBuZ1wiLFxuICAgICAgICAgIFwic3BsYXNoX3NjcmVlbnMvaVBob25lXzhfUGx1c19faVBob25lXzdfUGx1c19faVBob25lXzZzX1BsdXNfX2lQaG9uZV82X1BsdXNfbGFuZHNjYXBlLnBuZ1wiLFxuICAgICAgICAgIFwic3BsYXNoX3NjcmVlbnMvaVBob25lXzhfX2lQaG9uZV83X19pUGhvbmVfNnNfX2lQaG9uZV82X180LjdfX2lQaG9uZV9TRV9sYW5kc2NhcGUucG5nXCIsXG4gICAgICAgICAgXCJzcGxhc2hfc2NyZWVucy80X19pUGhvbmVfU0VfX2lQb2RfdG91Y2hfNXRoX2dlbmVyYXRpb25fYW5kX2xhdGVyX2xhbmRzY2FwZS5wbmdcIixcbiAgICAgICAgICBcInNwbGFzaF9zY3JlZW5zLzEyLjlfX2lQYWRfUHJvX2xhbmRzY2FwZS5wbmdcIixcbiAgICAgICAgICBcInNwbGFzaF9zY3JlZW5zLzExX19pUGFkX1Byb19fMTAuNV9faVBhZF9Qcm9fbGFuZHNjYXBlLnBuZ1wiLFxuICAgICAgICAgIFwic3BsYXNoX3NjcmVlbnMvMTAuOV9faVBhZF9BaXJfbGFuZHNjYXBlLnBuZ1wiLFxuICAgICAgICAgIFwic3BsYXNoX3NjcmVlbnMvMTAuNV9faVBhZF9BaXJfbGFuZHNjYXBlLnBuZ1wiLFxuICAgICAgICAgIFwic3BsYXNoX3NjcmVlbnMvMTAuMl9faVBhZF9sYW5kc2NhcGUucG5nXCIsXG4gICAgICAgICAgXCJzcGxhc2hfc2NyZWVucy85LjdfX2lQYWRfUHJvX183LjlfX2lQYWRfbWluaV9fOS43X19pUGFkX0Fpcl9fOS43X19pUGFkX2xhbmRzY2FwZS5wbmdcIixcbiAgICAgICAgICBcInNwbGFzaF9zY3JlZW5zLzguM19faVBhZF9NaW5pX2xhbmRzY2FwZS5wbmdcIixcbiAgICAgICAgICBcInNwbGFzaF9zY3JlZW5zL2lQaG9uZV8xNV9Qcm9fTWF4X19pUGhvbmVfMTVfUGx1c19faVBob25lXzE0X1Byb19NYXhfcG9ydHJhaXQucG5nXCIsXG4gICAgICAgICAgXCJzcGxhc2hfc2NyZWVucy9pUGhvbmVfMTVfUHJvX19pUGhvbmVfMTVfX2lQaG9uZV8xNF9Qcm9fcG9ydHJhaXQucG5nXCIsXG4gICAgICAgICAgXCJzcGxhc2hfc2NyZWVucy9pUGhvbmVfMTRfUGx1c19faVBob25lXzEzX1Byb19NYXhfX2lQaG9uZV8xMl9Qcm9fTWF4X3BvcnRyYWl0LnBuZ1wiLFxuICAgICAgICAgIFwic3BsYXNoX3NjcmVlbnMvaVBob25lXzE0X19pUGhvbmVfMTNfUHJvX19pUGhvbmVfMTNfX2lQaG9uZV8xMl9Qcm9fX2lQaG9uZV8xMl9wb3J0cmFpdC5wbmdcIixcbiAgICAgICAgICBcInNwbGFzaF9zY3JlZW5zL2lQaG9uZV8xM19taW5pX19pUGhvbmVfMTJfbWluaV9faVBob25lXzExX1Byb19faVBob25lX1hTX19pUGhvbmVfWF9wb3J0cmFpdC5wbmdcIixcbiAgICAgICAgICBcInNwbGFzaF9zY3JlZW5zL2lQaG9uZV8xMV9Qcm9fTWF4X19pUGhvbmVfWFNfTWF4X3BvcnRyYWl0LnBuZ1wiLFxuICAgICAgICAgIFwic3BsYXNoX3NjcmVlbnMvaVBob25lXzExX19pUGhvbmVfWFJfcG9ydHJhaXQucG5nXCIsXG4gICAgICAgICAgXCJzcGxhc2hfc2NyZWVucy9pUGhvbmVfOF9QbHVzX19pUGhvbmVfN19QbHVzX19pUGhvbmVfNnNfUGx1c19faVBob25lXzZfUGx1c19wb3J0cmFpdC5wbmdcIixcbiAgICAgICAgICBcInNwbGFzaF9zY3JlZW5zL2lQaG9uZV84X19pUGhvbmVfN19faVBob25lXzZzX19pUGhvbmVfNl9fNC43X19pUGhvbmVfU0VfcG9ydHJhaXQucG5nXCIsXG4gICAgICAgICAgXCJzcGxhc2hfc2NyZWVucy80X19pUGhvbmVfU0VfX2lQb2RfdG91Y2hfNXRoX2dlbmVyYXRpb25fYW5kX2xhdGVyX3BvcnRyYWl0LnBuZ1wiLFxuICAgICAgICAgIFwic3BsYXNoX3NjcmVlbnMvMTIuOV9faVBhZF9Qcm9fcG9ydHJhaXQucG5nXCIsXG4gICAgICAgICAgXCJzcGxhc2hfc2NyZWVucy8xMV9faVBhZF9Qcm9fXzEwLjVfX2lQYWRfUHJvX3BvcnRyYWl0LnBuZ1wiLFxuICAgICAgICAgIFwic3BsYXNoX3NjcmVlbnMvMTAuOV9faVBhZF9BaXJfcG9ydHJhaXQucG5nXCIsXG4gICAgICAgICAgXCJzcGxhc2hfc2NyZWVucy8xMC41X19pUGFkX0Fpcl9wb3J0cmFpdC5wbmdcIixcbiAgICAgICAgICBcInNwbGFzaF9zY3JlZW5zLzEwLjJfX2lQYWRfcG9ydHJhaXQucG5nXCIsXG4gICAgICAgICAgXCJzcGxhc2hfc2NyZWVucy85LjdfX2lQYWRfUHJvX183LjlfX2lQYWRfbWluaV9fOS43X19pUGFkX0Fpcl9fOS43X19pUGFkX3BvcnRyYWl0LnBuZ1wiLFxuICAgICAgICAgIFwic3BsYXNoX3NjcmVlbnMvOC4zX19pUGFkX01pbmlfcG9ydHJhaXQucG5nXCJcblxuICAgICAgICBdLFxuICAgICAgICBtYW5pZmVzdDoge1xuICAgICAgICAgIGlkOiBcImh0dHBzOi8vd3d3LnZpZGJpbmdlLmNvbS9cIixcbiAgICAgICAgICBuYW1lOiBcIlZpZCBCaW5nZVwiLFxuICAgICAgICAgIHNob3J0X25hbWU6IFwiVmlkQmluZ2VcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTdHJlYW0gYSB3aWRlIGFycmF5IG9mIG1vdmllcyBhbmQgVFYgc2hvd3Mgb24gVmlkIEJpbmdlLCBjb21wbGV0ZWx5IGZyZWUuIEVuam95IHVubGltaXRlZCwgYWQtZnJlZSB2aWV3aW5nIHdpdGggbm8gc3Vic2NyaXB0aW9ucyByZXF1aXJlZC5cIixcbiAgICAgICAgICB0aGVtZV9jb2xvcjogXCIjMTIwZjFkXCIsXG4gICAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogXCIjMTIwZjFkXCIsXG4gICAgICAgICAgZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgICAgc3RhcnRfdXJsOiBcIi9cIixcbiAgICAgICAgICBpY29uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzcmM6IFwiYW5kcm9pZC1jaHJvbWUtMTkyeDE5Mi5wbmdcIixcbiAgICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgICBwdXJwb3NlOiBcImFueVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3JjOiBcImFuZHJvaWQtY2hyb21lLTUxMng1MTIucG5nXCIsXG4gICAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICAgICAgcHVycG9zZTogXCJhbnlcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNyYzogXCJhbmRyb2lkLWNocm9tZS0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgICAgIHB1cnBvc2U6IFwibWFza2FibGVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNyYzogXCJhbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZ1wiLFxuICAgICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgICAgIHB1cnBvc2U6IFwibWFza2FibGVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgbG9hZFZlcnNpb24oKSxcbiAgICAgIGNoZWNrZXIoe1xuICAgICAgICBvdmVybGF5OiB7XG4gICAgICAgICAgcG9zaXRpb246IFwidHJcIixcbiAgICAgICAgfSxcbiAgICAgICAgdHlwZXNjcmlwdDogdHJ1ZSwgLy8gY2hlY2sgdHlwZXNjcmlwdCBidWlsZCBlcnJvcnMgaW4gZGV2IHNlcnZlclxuICAgICAgICBlc2xpbnQ6IHtcbiAgICAgICAgICAvLyBjaGVjayBsaW50IGVycm9ycyBpbiBkZXYgc2VydmVyXG4gICAgICAgICAgbGludENvbW1hbmQ6IFwiZXNsaW50IC0tZXh0IC50c3gsLnRzIHNyY1wiLFxuICAgICAgICAgIGRldjoge1xuICAgICAgICAgICAgbG9nTGV2ZWw6IFtcImVycm9yXCJdLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4oKSxcbiAgICAgIHZpc3VhbGl6ZXIoKSBhcyBQbHVnaW5PcHRpb25cbiAgICBdLFxuXG4gICAgYnVpbGQ6IHtcbiAgICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgbWFudWFsQ2h1bmtzKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIkBzb3ppYWxoZWxkZW4raWV0Zi1sYW5ndWFnZS10YWdzXCIpIHx8IGlkLmluY2x1ZGVzKFwiY291bnRyeS1sYW5ndWFnZVwiKSkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJsYW5ndWFnZS1kYlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiaGxzLmpzXCIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcImhsc1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwibm9kZS1mb3JnZVwiKSB8fCBpZC5pbmNsdWRlcyhcImNyeXB0by1qc1wiKSkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJhdXRoXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJsb2NhbGVzXCIpICYmICFpZC5pbmNsdWRlcyhcImVuLmpzb25cIikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwibG9jYWxlc1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwicmVhY3QtZG9tXCIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcInJlYWN0LWRvbVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiSWNvbi50c3hcIikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiSWNvbnNcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGlzQ2FwdGlvbmluZ1BhY2thZ2UgPSBjYXB0aW9uaW5nUGFja2FnZXMuc29tZShwYWNrYWdlTmFtZSA9PiBpZC5pbmNsdWRlcyhwYWNrYWdlTmFtZSkpO1xuICAgICAgICAgICAgaWYgKGlzQ2FwdGlvbmluZ1BhY2thZ2UpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiY2FwdGlvbi1wYXJzaW5nXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIHBvc3Rjc3M6IHtcbiAgICAgICAgcGx1Z2luczogW3RhaWx3aW5kKCksIHJ0bCgpXSxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgICAgICBcIkBzb3ppYWxoZWxkZW4vaWV0Zi1sYW5ndWFnZS10YWdzXCI6IHBhdGgucmVzb2x2ZShcbiAgICAgICAgICBfX2Rpcm5hbWUsXG4gICAgICAgICAgXCIuL25vZGVfbW9kdWxlcy9Ac296aWFsaGVsZGVuL2lldGYtbGFuZ3VhZ2UtdGFncy9kaXN0L2Nqc1wiXG4gICAgICAgICksXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICB0ZXN0OiB7XG4gICAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiLFxuICAgIH0sXG4gIH07XG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbWF6ZW5cXFxcRG9jdW1lbnRzXFxcXGNvZGlubm5uXFxcXHZpZGJpbmdlLWNsb25lXFxcXHZpZGJpbmdlX2VsZWN0cm9uXFxcXFZpZEJpbmdlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG1hemVuXFxcXERvY3VtZW50c1xcXFxjb2Rpbm5ublxcXFx2aWRiaW5nZS1jbG9uZVxcXFx2aWRiaW5nZV9lbGVjdHJvblxcXFxWaWRCaW5nZVxcXFxwbHVnaW5zXFxcXGhhbmRsZWJhcnMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL21hemVuL0RvY3VtZW50cy9jb2Rpbm5ubi92aWRiaW5nZS1jbG9uZS92aWRiaW5nZV9lbGVjdHJvbi9WaWRCaW5nZS9wbHVnaW5zL2hhbmRsZWJhcnMudHNcIjtpbXBvcnQgeyBnbG9iU3luYyB9IGZyb20gXCJnbG9iXCI7XG5pbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0YXRpYy1jb3B5J1xuaW1wb3J0IHsgUGx1Z2luT3B0aW9uIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBIYW5kbGViYXJzIGZyb20gXCJoYW5kbGViYXJzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlYmFycyA9IChvcHRpb25zOiB7IHZhcnM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+IH0gPSB7fSk6IFBsdWdpbk9wdGlvbltdID0+IHtcbiAgY29uc3QgZmlsZXMgPSBnbG9iU3luYyhcInNyYy9hc3NldHMvKiovKiouaGJzXCIpO1xuXG4gIGZ1bmN0aW9uIHJlbmRlcihjb250ZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKGNvbnRlbnQpO1xuICAgIHJldHVybiB0ZW1wbGF0ZShvcHRpb25zPy52YXJzID8/IHt9KTtcbiAgfVxuXG4gIHJldHVybiBbXG4gICAge1xuICAgICAgbmFtZTogJ2hicy10ZW1wbGF0aW5nJyxcbiAgICAgIGVuZm9yY2U6IFwicHJlXCIsXG4gICAgICB0cmFuc2Zvcm1JbmRleEh0bWw6IHtcbiAgICAgICAgb3JkZXI6ICdwcmUnLFxuICAgICAgICBoYW5kbGVyKGh0bWwpIHtcbiAgICAgICAgICByZXR1cm4gcmVuZGVyKGh0bWwpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gICAgdml0ZVN0YXRpY0NvcHkoe1xuICAgICAgc2lsZW50OiB0cnVlLFxuICAgICAgdGFyZ2V0czogZmlsZXMubWFwKGZpbGUgPT4gKHtcbiAgICAgICAgc3JjOiBmaWxlLFxuICAgICAgICBkZXN0OiAnJyxcbiAgICAgICAgcmVuYW1lOiBwYXRoLmJhc2VuYW1lKGZpbGUpLnNsaWNlKDAsIC00KSwgLy8gcmVtb3ZlIC5oYnMgZmlsZSBleHRlbnNpb25cbiAgICAgICAgdHJhbnNmb3JtOiB7XG4gICAgICAgICAgZW5jb2Rpbmc6ICd1dGY4JyxcbiAgICAgICAgICBoYW5kbGVyKGNvbnRlbnQ6IHN0cmluZykge1xuICAgICAgICAgICAgcmV0dXJuIHJlbmRlcihjb250ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pKVxuICAgIH0pXG4gIF1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcWEsU0FBUyxvQkFBb0I7QUFDbGMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGFBQWE7QUFDcEIsT0FBT0EsV0FBVTtBQUNqQixPQUFPLGFBQWE7OztBQ051YSxTQUFTLGdCQUFnQjtBQUNwZCxTQUFTLHNCQUFzQjtBQUUvQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFVBQVU7QUFFVixJQUFNLGFBQWEsQ0FBQyxVQUEwQyxDQUFDLE1BQXNCO0FBQzFGLFFBQU0sUUFBUSxTQUFTLHNCQUFzQjtBQUU3QyxXQUFTLE9BQU8sU0FBeUI7QUFDdkMsVUFBTSxXQUFXLFdBQVcsUUFBUSxPQUFPO0FBQzNDLFdBQU8sU0FBUyxTQUFTLFFBQVEsQ0FBQyxDQUFDO0FBQUEsRUFDckM7QUFFQSxTQUFPO0FBQUEsSUFDTDtBQUFBLE1BQ0Us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
