// vite.config.ts
import { defineConfig } from "file:///home/bigsam/dro-qwik/node_modules/vite/dist/node/index.js";
import { qwikVite } from "file:///home/bigsam/dro-qwik/node_modules/@builder.io/qwik/dist/optimizer.mjs";
import { qwikCity } from "file:///home/bigsam/dro-qwik/node_modules/@builder.io/qwik-city/lib/vite/index.mjs";
import tsconfigPaths from "file:///home/bigsam/dro-qwik/node_modules/vite-tsconfig-paths/dist/index.mjs";

// package.json
var package_default = {
  name: "my-qwik-empty-starter",
  description: "Blank project with routing included",
  engines: {
    node: "^18.17.0 || ^20.3.0 || >=21.0.0"
  },
  "engines-annotation": "Mostly required by sharp which needs a Node-API v9 compatible runtime",
  private: true,
  trustedDependencies: [
    "sharp"
  ],
  "trustedDependencies-annotation": "Needed for bun to allow running install scripts",
  type: "module",
  scripts: {
    build: "qwik build",
    "build.client": "vite build",
    "build.preview": "vite build --ssr src/entry.preview.tsx",
    "build.types": "tsc --incremental --noEmit",
    deploy: `echo 'Run "npm run qwik add" to install a server adapter'`,
    dev: "vite --mode ssr",
    "dev.debug": "node --inspect-brk ./node_modules/vite/bin/vite.js --mode ssr --force",
    fmt: "prettier --write .",
    "fmt.check": "prettier --check .",
    lint: 'eslint "src/**/*.ts*"',
    preview: "qwik build preview && vite preview --open",
    start: "vite --open --mode ssr",
    qwik: "qwik",
    storybook: "storybook dev -p 6006",
    "build-storybook": "storybook build",
    chromatic: "npx chromatic --project-token=chpt_5e9e560e6c0f6ee",
    "dev:server": "ts-node src/server.ts"
  },
  devDependencies: {
    "@builder.io/qwik": "^1.8.0",
    "@builder.io/qwik-city": "^1.8.0",
    "@builder.io/qwik-react": "^0.5.5",
    "@chromatic-com/storybook": "^1.8.0",
    "@faker-js/faker": "^9.0.0",
    "@qwik-ui/core": "^0.0.3",
    "@qwik-ui/headless": "^0.5.2",
    "@qwik-ui/styled": "^0.1.0",
    "@qwik-ui/utils": "^0.3.1",
    "@qwikest/icons": "^0.0.13",
    "@storefront-ui/tailwind-config": "^2.5.1",
    "@storybook/addon-a11y": "^8.2.9",
    "@storybook/addon-essentials": "^8.2.9",
    "@storybook/addon-interactions": "^8.2.9",
    "@storybook/addon-links": "^8.2.9",
    "@storybook/blocks": "^8.2.9",
    "@storybook/testing-library": "^0.2.2",
    "@types/cors": "^2.8.17",
    "@types/eslint": "8.56.10",
    "@types/express": "^4.17.21",
    "@types/node": "20.14.11",
    "@typescript-eslint/eslint-plugin": "7.16.1",
    "@typescript-eslint/parser": "7.16.1",
    autoprefixer: "^10.4.20",
    chromatic: "^11.7.1",
    "class-variance-authority": "^0.7.0",
    cors: "^2.8.5",
    eslint: "8.57.0",
    "eslint-plugin-qwik": "^1.8.0",
    "eslint-plugin-storybook": "^0.8.0",
    nx: "^19.6.4",
    postcss: "^8.4.41",
    prettier: "3.3.3",
    "qwik-storefront-ui": "^0.0.8",
    "qwik-ui": "^0.1.3",
    storybook: "^8.2.9",
    "storybook-framework-qwik": "^0.4.0",
    tailwindcss: "^3.4.10",
    "tailwindcss-animate": "^1.0.7",
    "ts-node": "^10.9.2",
    typescript: "5.4.5",
    undici: "*",
    vite: "5.3.5",
    "vite-tsconfig-paths": "^4.2.1"
  },
  nx: {},
  dependencies: {
    "@trpc/client": "^11.0.0-rc.498",
    "@trpc/server": "^11.0.0-rc.498",
    "@ts-rest/core": "^3.51.0",
    "@ts-rest/express": "^3.51.0",
    esm: "^3.2.25",
    express: "^4.20.0",
    "react-icons": "^5.3.0",
    zod: "^3.23.8"
  },
  version: ""
};

// src/lib/ts-rest/mockServer.ts
import express from "file:///home/bigsam/dro-qwik/node_modules/express/index.js";
import cors from "file:///home/bigsam/dro-qwik/node_modules/cors/lib/index.js";
import { createExpressEndpoints, initServer } from "file:///home/bigsam/dro-qwik/node_modules/@ts-rest/express/index.esm.mjs";

// src/lib/ts-rest/contract.ts
import { initContract } from "file:///home/bigsam/dro-qwik/node_modules/@ts-rest/core/index.esm.mjs";
import { z } from "file:///home/bigsam/dro-qwik/node_modules/zod/lib/index.mjs";
var c = initContract();
var ItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  createdAt: z.date()
});
var contract = c.router({
  getItems: {
    method: "GET",
    path: "/items",
    responses: {
      200: z.array(ItemSchema)
    }
  },
  addItem: {
    method: "POST",
    path: "/items",
    body: ItemSchema.omit({ id: true, createdAt: true }),
    responses: {
      201: ItemSchema
    }
  }
});

// src/lib/ts-rest/mockServer.ts
import { faker } from "file:///home/bigsam/dro-qwik/node_modules/@faker-js/faker/dist/index.js";
var s = initServer();
var items = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  createdAt: faker.date.past()
}));
var router = s.router(contract, {
  getItems: async () => {
    return {
      status: 200,
      body: items
    };
  },
  addItem: async ({ body }) => {
    const newItem = {
      id: items.length + 1,
      ...body,
      createdAt: /* @__PURE__ */ new Date()
    };
    items.push(newItem);
    return {
      status: 201,
      body: newItem
    };
  }
});
var app = express();
app.use(cors());
app.use(express.json());
createExpressEndpoints(contract, router, app);
var port = 3e3;
app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});

// vite.config.ts
import express2 from "file:///home/bigsam/dro-qwik/node_modules/express/index.js";
var { dependencies = {}, devDependencies = {} } = package_default;
errorOnDuplicatesPkgDeps(devDependencies, dependencies);
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths(), {
      name: "mock-api",
      configureServer(server) {
        const app2 = express2();
        app2.use("/api", void 0);
        server.middlewares.use(app2);
      },
      worker: {
        format: "es"
      }
    }],
    // This tells Vite which dependencies to pre-build in dev mode.
    optimizeDeps: {
      // Put problematic deps that break bundling here, mostly those with binaries.
      // For example ['better-sqlite3'] if you use that in server functions.
      exclude: []
    },
    /**
     * This is an advanced setting. It improves the bundling of your server code. To use it, make sure you understand when your consumed packages are dependencies or dev dependencies. (otherwise things will break in production)
     */
    // ssr:
    //   command === "build" && mode === "production"
    //     ? {
    //         // All dev dependencies should be bundled in the server build
    //         noExternal: Object.keys(devDependencies),
    //         // Anything marked as a dependency will not be bundled
    //         // These should only be production binary deps (including deps of deps), CLI deps, and their module graph
    //         // If a dep-of-dep needs to be external, add it here
    //         // For example, if something uses `bcrypt` but you don't have it as a dep, you can write
    //         // external: [...Object.keys(dependencies), 'bcrypt']
    //         external: Object.keys(dependencies),
    //       }
    //     : undefined,
    server: {
      headers: {
        // Don't cache the server response in dev mode
        "Cache-Control": "public, max-age=0"
      }
    },
    preview: {
      headers: {
        // Do cache the server response in preview (non-adapter production build)
        "Cache-Control": "public, max-age=600"
      }
    }
  };
});
function errorOnDuplicatesPkgDeps(devDependencies2, dependencies2) {
  let msg = "";
  const duplicateDeps = Object.keys(devDependencies2).filter(
    (dep) => dependencies2[dep]
  );
  const qwikPkg = Object.keys(dependencies2).filter(
    (value) => /qwik/i.test(value)
  );
  msg = `Move qwik packages ${qwikPkg.join(", ")} to devDependencies`;
  if (qwikPkg.length > 0) {
    throw new Error(msg);
  }
  msg = `
    Warning: The dependency "${duplicateDeps.join(", ")}" is listed in both "devDependencies" and "dependencies".
    Please move the duplicated dependencies to "devDependencies" only and remove it from "dependencies"
  `;
  if (duplicateDeps.length > 0) {
    throw new Error(msg);
  }
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIiwgInNyYy9saWIvdHMtcmVzdC9tb2NrU2VydmVyLnRzIiwgInNyYy9saWIvdHMtcmVzdC9jb250cmFjdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2JpZ3NhbS9kcm8tcXdpa1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvYmlnc2FtL2Ryby1xd2lrL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2JpZ3NhbS9kcm8tcXdpay92aXRlLmNvbmZpZy50c1wiOy8qKlxuICogVGhpcyBpcyB0aGUgYmFzZSBjb25maWcgZm9yIHZpdGUuXG4gKiBXaGVuIGJ1aWxkaW5nLCB0aGUgYWRhcHRlciBjb25maWcgaXMgdXNlZCB3aGljaCBsb2FkcyB0aGlzIGZpbGUgYW5kIGV4dGVuZHMgaXQuXG4gKi9cbmltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBVc2VyQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IHF3aWtWaXRlIH0gZnJvbSBcIkBidWlsZGVyLmlvL3F3aWsvb3B0aW1pemVyXCI7XG5pbXBvcnQgeyBxd2lrQ2l0eSB9IGZyb20gXCJAYnVpbGRlci5pby9xd2lrLWNpdHkvdml0ZVwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcbmltcG9ydCBwa2cgZnJvbSBcIi4vcGFja2FnZS5qc29uXCI7XG5pbXBvcnQgeyBzIH0gZnJvbSAnLi9zcmMvbGliL3RzLXJlc3QvbW9ja1NlcnZlcic7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcblxudHlwZSBQa2dEZXAgPSBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuY29uc3QgeyBkZXBlbmRlbmNpZXMgPSB7fSwgZGV2RGVwZW5kZW5jaWVzID0ge30gfSA9IHBrZyBhcyBhbnkgYXMge1xuICBkZXBlbmRlbmNpZXM6IFBrZ0RlcDtcbiAgZGV2RGVwZW5kZW5jaWVzOiBQa2dEZXA7XG4gIFtrZXk6IHN0cmluZ106IHVua25vd247XG59O1xuZXJyb3JPbkR1cGxpY2F0ZXNQa2dEZXBzKGRldkRlcGVuZGVuY2llcywgZGVwZW5kZW5jaWVzKTtcblxuLyoqXG4gKiBOb3RlIHRoYXQgVml0ZSBub3JtYWxseSBzdGFydHMgZnJvbSBgaW5kZXguaHRtbGAgYnV0IHRoZSBxd2lrQ2l0eSBwbHVnaW4gbWFrZXMgc3RhcnQgYXQgYHNyYy9lbnRyeS5zc3IudHN4YCBpbnN0ZWFkLlxuICovXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KTogVXNlckNvbmZpZyA9PiB7XG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW3F3aWtDaXR5KCksIHF3aWtWaXRlKCksIHRzY29uZmlnUGF0aHMoKSx7XG4gICAgICBuYW1lOiAnbW9jay1hcGknLFxuICAgICAgY29uZmlndXJlU2VydmVyKHNlcnZlcikge1xuICAgICAgICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG4gICAgICAgIGFwcC51c2UoJy9hcGknLCBzKTtcbiAgICAgICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZShhcHApO1xuICAgICAgfSxcbiAgICAgIHdvcmtlcjoge1xuICAgICAgZm9ybWF0OiAnZXMnLFxuICAgIH0sXG4gICAgfSxdLFxuICAgIC8vIFRoaXMgdGVsbHMgVml0ZSB3aGljaCBkZXBlbmRlbmNpZXMgdG8gcHJlLWJ1aWxkIGluIGRldiBtb2RlLlxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgLy8gUHV0IHByb2JsZW1hdGljIGRlcHMgdGhhdCBicmVhayBidW5kbGluZyBoZXJlLCBtb3N0bHkgdGhvc2Ugd2l0aCBiaW5hcmllcy5cbiAgICAgIC8vIEZvciBleGFtcGxlIFsnYmV0dGVyLXNxbGl0ZTMnXSBpZiB5b3UgdXNlIHRoYXQgaW4gc2VydmVyIGZ1bmN0aW9ucy5cbiAgICAgIGV4Y2x1ZGU6IFtdLFxuICAgIH0sXG4gICAgIFxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBhbiBhZHZhbmNlZCBzZXR0aW5nLiBJdCBpbXByb3ZlcyB0aGUgYnVuZGxpbmcgb2YgeW91ciBzZXJ2ZXIgY29kZS4gVG8gdXNlIGl0LCBtYWtlIHN1cmUgeW91IHVuZGVyc3RhbmQgd2hlbiB5b3VyIGNvbnN1bWVkIHBhY2thZ2VzIGFyZSBkZXBlbmRlbmNpZXMgb3IgZGV2IGRlcGVuZGVuY2llcy4gKG90aGVyd2lzZSB0aGluZ3Mgd2lsbCBicmVhayBpbiBwcm9kdWN0aW9uKVxuICAgICAqL1xuICAgIC8vIHNzcjpcbiAgICAvLyAgIGNvbW1hbmQgPT09IFwiYnVpbGRcIiAmJiBtb2RlID09PSBcInByb2R1Y3Rpb25cIlxuICAgIC8vICAgICA/IHtcbiAgICAvLyAgICAgICAgIC8vIEFsbCBkZXYgZGVwZW5kZW5jaWVzIHNob3VsZCBiZSBidW5kbGVkIGluIHRoZSBzZXJ2ZXIgYnVpbGRcbiAgICAvLyAgICAgICAgIG5vRXh0ZXJuYWw6IE9iamVjdC5rZXlzKGRldkRlcGVuZGVuY2llcyksXG4gICAgLy8gICAgICAgICAvLyBBbnl0aGluZyBtYXJrZWQgYXMgYSBkZXBlbmRlbmN5IHdpbGwgbm90IGJlIGJ1bmRsZWRcbiAgICAvLyAgICAgICAgIC8vIFRoZXNlIHNob3VsZCBvbmx5IGJlIHByb2R1Y3Rpb24gYmluYXJ5IGRlcHMgKGluY2x1ZGluZyBkZXBzIG9mIGRlcHMpLCBDTEkgZGVwcywgYW5kIHRoZWlyIG1vZHVsZSBncmFwaFxuICAgIC8vICAgICAgICAgLy8gSWYgYSBkZXAtb2YtZGVwIG5lZWRzIHRvIGJlIGV4dGVybmFsLCBhZGQgaXQgaGVyZVxuICAgIC8vICAgICAgICAgLy8gRm9yIGV4YW1wbGUsIGlmIHNvbWV0aGluZyB1c2VzIGBiY3J5cHRgIGJ1dCB5b3UgZG9uJ3QgaGF2ZSBpdCBhcyBhIGRlcCwgeW91IGNhbiB3cml0ZVxuICAgIC8vICAgICAgICAgLy8gZXh0ZXJuYWw6IFsuLi5PYmplY3Qua2V5cyhkZXBlbmRlbmNpZXMpLCAnYmNyeXB0J11cbiAgICAvLyAgICAgICAgIGV4dGVybmFsOiBPYmplY3Qua2V5cyhkZXBlbmRlbmNpZXMpLFxuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgOiB1bmRlZmluZWQsXG5cbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgLy8gRG9uJ3QgY2FjaGUgdGhlIHNlcnZlciByZXNwb25zZSBpbiBkZXYgbW9kZVxuICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJwdWJsaWMsIG1heC1hZ2U9MFwiLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHByZXZpZXc6IHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgLy8gRG8gY2FjaGUgdGhlIHNlcnZlciByZXNwb25zZSBpbiBwcmV2aWV3IChub24tYWRhcHRlciBwcm9kdWN0aW9uIGJ1aWxkKVxuICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJwdWJsaWMsIG1heC1hZ2U9NjAwXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59KTtcblxuLy8gKioqIHV0aWxzICoqKlxuXG4vKipcbiAqIEZ1bmN0aW9uIHRvIGlkZW50aWZ5IGR1cGxpY2F0ZSBkZXBlbmRlbmNpZXMgYW5kIHRocm93IGFuIGVycm9yXG4gKiBAcGFyYW0ge09iamVjdH0gZGV2RGVwZW5kZW5jaWVzIC0gTGlzdCBvZiBkZXZlbG9wbWVudCBkZXBlbmRlbmNpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXBlbmRlbmNpZXMgLSBMaXN0IG9mIHByb2R1Y3Rpb24gZGVwZW5kZW5jaWVzXG4gKi9cbmZ1bmN0aW9uIGVycm9yT25EdXBsaWNhdGVzUGtnRGVwcyhcbiAgZGV2RGVwZW5kZW5jaWVzOiBQa2dEZXAsXG4gIGRlcGVuZGVuY2llczogUGtnRGVwLFxuKSB7XG4gIGxldCBtc2cgPSBcIlwiO1xuICAvLyBDcmVhdGUgYW4gYXJyYXkgJ2R1cGxpY2F0ZURlcHMnIGJ5IGZpbHRlcmluZyBkZXZEZXBlbmRlbmNpZXMuXG4gIC8vIElmIGEgZGVwZW5kZW5jeSBhbHNvIGV4aXN0cyBpbiBkZXBlbmRlbmNpZXMsIGl0IGlzIGNvbnNpZGVyZWQgYSBkdXBsaWNhdGUuXG4gIGNvbnN0IGR1cGxpY2F0ZURlcHMgPSBPYmplY3Qua2V5cyhkZXZEZXBlbmRlbmNpZXMpLmZpbHRlcihcbiAgICAoZGVwKSA9PiBkZXBlbmRlbmNpZXNbZGVwXSxcbiAgKTtcblxuICAvLyBpbmNsdWRlIGFueSBrbm93biBxd2lrIHBhY2thZ2VzXG4gIGNvbnN0IHF3aWtQa2cgPSBPYmplY3Qua2V5cyhkZXBlbmRlbmNpZXMpLmZpbHRlcigodmFsdWUpID0+XG4gICAgL3F3aWsvaS50ZXN0KHZhbHVlKSxcbiAgKTtcblxuICAvLyBhbnkgZXJyb3JzIGZvciBtaXNzaW5nIFwicXdpay1jaXR5LXBsYW5cIlxuICAvLyBbUExVR0lOX0VSUk9SXTogSW52YWxpZCBtb2R1bGUgXCJAcXdpay1jaXR5LXBsYW5cIiBpcyBub3QgYSB2YWxpZCBwYWNrYWdlXG4gIG1zZyA9IGBNb3ZlIHF3aWsgcGFja2FnZXMgJHtxd2lrUGtnLmpvaW4oXCIsIFwiKX0gdG8gZGV2RGVwZW5kZW5jaWVzYDtcblxuICBpZiAocXdpa1BrZy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gIH1cblxuICAvLyBGb3JtYXQgdGhlIGVycm9yIG1lc3NhZ2Ugd2l0aCB0aGUgZHVwbGljYXRlcyBsaXN0LlxuICAvLyBUaGUgYGpvaW5gIGZ1bmN0aW9uIGlzIHVzZWQgdG8gcmVwcmVzZW50IHRoZSBlbGVtZW50cyBvZiB0aGUgJ2R1cGxpY2F0ZURlcHMnIGFycmF5IGFzIGEgY29tbWEtc2VwYXJhdGVkIHN0cmluZy5cbiAgbXNnID0gYFxuICAgIFdhcm5pbmc6IFRoZSBkZXBlbmRlbmN5IFwiJHtkdXBsaWNhdGVEZXBzLmpvaW4oXCIsIFwiKX1cIiBpcyBsaXN0ZWQgaW4gYm90aCBcImRldkRlcGVuZGVuY2llc1wiIGFuZCBcImRlcGVuZGVuY2llc1wiLlxuICAgIFBsZWFzZSBtb3ZlIHRoZSBkdXBsaWNhdGVkIGRlcGVuZGVuY2llcyB0byBcImRldkRlcGVuZGVuY2llc1wiIG9ubHkgYW5kIHJlbW92ZSBpdCBmcm9tIFwiZGVwZW5kZW5jaWVzXCJcbiAgYDtcblxuICAvLyBUaHJvdyBhbiBlcnJvciB3aXRoIHRoZSBjb25zdHJ1Y3RlZCBtZXNzYWdlLlxuICBpZiAoZHVwbGljYXRlRGVwcy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gIH1cbn1cbiIsICJ7XG4gIFwibmFtZVwiOiBcIm15LXF3aWstZW1wdHktc3RhcnRlclwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiQmxhbmsgcHJvamVjdCB3aXRoIHJvdXRpbmcgaW5jbHVkZWRcIixcbiAgXCJlbmdpbmVzXCI6IHtcbiAgICBcIm5vZGVcIjogXCJeMTguMTcuMCB8fCBeMjAuMy4wIHx8ID49MjEuMC4wXCJcbiAgfSxcbiAgXCJlbmdpbmVzLWFubm90YXRpb25cIjogXCJNb3N0bHkgcmVxdWlyZWQgYnkgc2hhcnAgd2hpY2ggbmVlZHMgYSBOb2RlLUFQSSB2OSBjb21wYXRpYmxlIHJ1bnRpbWVcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwidHJ1c3RlZERlcGVuZGVuY2llc1wiOiBbXG4gICAgXCJzaGFycFwiXG4gIF0sXG4gIFwidHJ1c3RlZERlcGVuZGVuY2llcy1hbm5vdGF0aW9uXCI6IFwiTmVlZGVkIGZvciBidW4gdG8gYWxsb3cgcnVubmluZyBpbnN0YWxsIHNjcmlwdHNcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJidWlsZFwiOiBcInF3aWsgYnVpbGRcIixcbiAgICBcImJ1aWxkLmNsaWVudFwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcImJ1aWxkLnByZXZpZXdcIjogXCJ2aXRlIGJ1aWxkIC0tc3NyIHNyYy9lbnRyeS5wcmV2aWV3LnRzeFwiLFxuICAgIFwiYnVpbGQudHlwZXNcIjogXCJ0c2MgLS1pbmNyZW1lbnRhbCAtLW5vRW1pdFwiLFxuICAgIFwiZGVwbG95XCI6IFwiZWNobyAnUnVuIFxcXCJucG0gcnVuIHF3aWsgYWRkXFxcIiB0byBpbnN0YWxsIGEgc2VydmVyIGFkYXB0ZXInXCIsXG4gICAgXCJkZXZcIjogXCJ2aXRlIC0tbW9kZSBzc3JcIixcbiAgICBcImRldi5kZWJ1Z1wiOiBcIm5vZGUgLS1pbnNwZWN0LWJyayAuL25vZGVfbW9kdWxlcy92aXRlL2Jpbi92aXRlLmpzIC0tbW9kZSBzc3IgLS1mb3JjZVwiLFxuICAgIFwiZm10XCI6IFwicHJldHRpZXIgLS13cml0ZSAuXCIsXG4gICAgXCJmbXQuY2hlY2tcIjogXCJwcmV0dGllciAtLWNoZWNrIC5cIixcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgXFxcInNyYy8qKi8qLnRzKlxcXCJcIixcbiAgICBcInByZXZpZXdcIjogXCJxd2lrIGJ1aWxkIHByZXZpZXcgJiYgdml0ZSBwcmV2aWV3IC0tb3BlblwiLFxuICAgIFwic3RhcnRcIjogXCJ2aXRlIC0tb3BlbiAtLW1vZGUgc3NyXCIsXG4gICAgXCJxd2lrXCI6IFwicXdpa1wiLFxuICAgIFwic3Rvcnlib29rXCI6IFwic3Rvcnlib29rIGRldiAtcCA2MDA2XCIsXG4gICAgXCJidWlsZC1zdG9yeWJvb2tcIjogXCJzdG9yeWJvb2sgYnVpbGRcIixcbiAgICBcImNocm9tYXRpY1wiOiBcIm5weCBjaHJvbWF0aWMgLS1wcm9qZWN0LXRva2VuPWNocHRfNWU5ZTU2MGU2YzBmNmVlXCIsXG4gICAgXCJkZXY6c2VydmVyXCI6IFwidHMtbm9kZSBzcmMvc2VydmVyLnRzXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGJ1aWxkZXIuaW8vcXdpa1wiOiBcIl4xLjguMFwiLFxuICAgIFwiQGJ1aWxkZXIuaW8vcXdpay1jaXR5XCI6IFwiXjEuOC4wXCIsXG4gICAgXCJAYnVpbGRlci5pby9xd2lrLXJlYWN0XCI6IFwiXjAuNS41XCIsXG4gICAgXCJAY2hyb21hdGljLWNvbS9zdG9yeWJvb2tcIjogXCJeMS44LjBcIixcbiAgICBcIkBmYWtlci1qcy9mYWtlclwiOiBcIl45LjAuMFwiLFxuICAgIFwiQHF3aWstdWkvY29yZVwiOiBcIl4wLjAuM1wiLFxuICAgIFwiQHF3aWstdWkvaGVhZGxlc3NcIjogXCJeMC41LjJcIixcbiAgICBcIkBxd2lrLXVpL3N0eWxlZFwiOiBcIl4wLjEuMFwiLFxuICAgIFwiQHF3aWstdWkvdXRpbHNcIjogXCJeMC4zLjFcIixcbiAgICBcIkBxd2lrZXN0L2ljb25zXCI6IFwiXjAuMC4xM1wiLFxuICAgIFwiQHN0b3JlZnJvbnQtdWkvdGFpbHdpbmQtY29uZmlnXCI6IFwiXjIuNS4xXCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWExMXlcIjogXCJeOC4yLjlcIixcbiAgICBcIkBzdG9yeWJvb2svYWRkb24tZXNzZW50aWFsc1wiOiBcIl44LjIuOVwiLFxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1pbnRlcmFjdGlvbnNcIjogXCJeOC4yLjlcIixcbiAgICBcIkBzdG9yeWJvb2svYWRkb24tbGlua3NcIjogXCJeOC4yLjlcIixcbiAgICBcIkBzdG9yeWJvb2svYmxvY2tzXCI6IFwiXjguMi45XCIsXG4gICAgXCJAc3Rvcnlib29rL3Rlc3RpbmctbGlicmFyeVwiOiBcIl4wLjIuMlwiLFxuICAgIFwiQHR5cGVzL2NvcnNcIjogXCJeMi44LjE3XCIsXG4gICAgXCJAdHlwZXMvZXNsaW50XCI6IFwiOC41Ni4xMFwiLFxuICAgIFwiQHR5cGVzL2V4cHJlc3NcIjogXCJeNC4xNy4yMVwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCIyMC4xNC4xMVwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCI3LjE2LjFcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCI3LjE2LjFcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjIwXCIsXG4gICAgXCJjaHJvbWF0aWNcIjogXCJeMTEuNy4xXCIsXG4gICAgXCJjbGFzcy12YXJpYW5jZS1hdXRob3JpdHlcIjogXCJeMC43LjBcIixcbiAgICBcImNvcnNcIjogXCJeMi44LjVcIixcbiAgICBcImVzbGludFwiOiBcIjguNTcuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1xd2lrXCI6IFwiXjEuOC4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXN0b3J5Ym9va1wiOiBcIl4wLjguMFwiLFxuICAgIFwibnhcIjogXCJeMTkuNi40XCIsXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC40MVwiLFxuICAgIFwicHJldHRpZXJcIjogXCIzLjMuM1wiLFxuICAgIFwicXdpay1zdG9yZWZyb250LXVpXCI6IFwiXjAuMC44XCIsXG4gICAgXCJxd2lrLXVpXCI6IFwiXjAuMS4zXCIsXG4gICAgXCJzdG9yeWJvb2tcIjogXCJeOC4yLjlcIixcbiAgICBcInN0b3J5Ym9vay1mcmFtZXdvcmstcXdpa1wiOiBcIl4wLjQuMFwiLFxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy40LjEwXCIsXG4gICAgXCJ0YWlsd2luZGNzcy1hbmltYXRlXCI6IFwiXjEuMC43XCIsXG4gICAgXCJ0cy1ub2RlXCI6IFwiXjEwLjkuMlwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIjUuNC41XCIsXG4gICAgXCJ1bmRpY2lcIjogXCIqXCIsXG4gICAgXCJ2aXRlXCI6IFwiNS4zLjVcIixcbiAgICBcInZpdGUtdHNjb25maWctcGF0aHNcIjogXCJeNC4yLjFcIlxuICB9LFxuICBcIm54XCI6IHt9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAdHJwYy9jbGllbnRcIjogXCJeMTEuMC4wLXJjLjQ5OFwiLFxuICAgIFwiQHRycGMvc2VydmVyXCI6IFwiXjExLjAuMC1yYy40OThcIixcbiAgICBcIkB0cy1yZXN0L2NvcmVcIjogXCJeMy41MS4wXCIsXG4gICAgXCJAdHMtcmVzdC9leHByZXNzXCI6IFwiXjMuNTEuMFwiLFxuICAgIFwiZXNtXCI6IFwiXjMuMi4yNVwiLFxuICAgIFwiZXhwcmVzc1wiOiBcIl40LjIwLjBcIixcbiAgICBcInJlYWN0LWljb25zXCI6IFwiXjUuMy4wXCIsXG4gICAgXCJ6b2RcIjogXCJeMy4yMy44XCJcbiAgfSxcbiAgXCJ2ZXJzaW9uXCI6IFwiXCJcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvYmlnc2FtL2Ryby1xd2lrL3NyYy9saWIvdHMtcmVzdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvYmlnc2FtL2Ryby1xd2lrL3NyYy9saWIvdHMtcmVzdC9tb2NrU2VydmVyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2JpZ3NhbS9kcm8tcXdpay9zcmMvbGliL3RzLXJlc3QvbW9ja1NlcnZlci50c1wiOy8vIHNyYy9saWIvYXBpL21vY2tTZXJ2ZXIudHNcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XG5pbXBvcnQgeyBjcmVhdGVFeHByZXNzRW5kcG9pbnRzLCBpbml0U2VydmVyIH0gZnJvbSAnQHRzLXJlc3QvZXhwcmVzcyc7XG5pbXBvcnQgeyBjb250cmFjdCwgSXRlbSB9IGZyb20gJy4vY29udHJhY3QudHMnO1xuaW1wb3J0IHsgZmFrZXIgfSBmcm9tICdAZmFrZXItanMvZmFrZXInO1xuXG5jb25zdCBzID0gaW5pdFNlcnZlcigpO1xuXG5sZXQgaXRlbXM6IEl0ZW1bXSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIChfLCBpKSA9PiAoe1xuICBpZDogaSArIDEsXG4gIG5hbWU6IGZha2VyLmNvbW1lcmNlLnByb2R1Y3ROYW1lKCksXG4gIGRlc2NyaXB0aW9uOiBmYWtlci5jb21tZXJjZS5wcm9kdWN0RGVzY3JpcHRpb24oKSxcbiAgY3JlYXRlZEF0OiBmYWtlci5kYXRlLnBhc3QoKVxufSkpO1xuXG5jb25zdCByb3V0ZXIgPSBzLnJvdXRlcihjb250cmFjdCwge1xuICBnZXRJdGVtczogYXN5bmMgKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IDIwMCxcbiAgICAgIGJvZHk6IGl0ZW1zLFxuICAgIH07XG4gIH0sXG4gIGFkZEl0ZW06IGFzeW5jICh7IGJvZHkgfSkgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW06IEl0ZW0gPSB7XG4gICAgICBpZDogaXRlbXMubGVuZ3RoICsgMSxcbiAgICAgIC4uLmJvZHksXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKClcbiAgICB9O1xuICAgIGl0ZW1zLnB1c2gobmV3SXRlbSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogMjAxLFxuICAgICAgYm9keTogbmV3SXRlbVxuICAgIH07XG4gIH1cbn0pO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5hcHAudXNlKGNvcnMoKSk7XG5hcHAudXNlKGV4cHJlc3MuanNvbigpKTtcblxuY3JlYXRlRXhwcmVzc0VuZHBvaW50cyhjb250cmFjdCwgcm91dGVyLCBhcHApO1xuXG5jb25zdCBwb3J0ID0gMzAwMDtcbmFwcC5saXN0ZW4ocG9ydCwgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhgTW9jayBzZXJ2ZXIgcnVubmluZyBhdCBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH1gKTtcbn0pOyIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvYmlnc2FtL2Ryby1xd2lrL3NyYy9saWIvdHMtcmVzdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvYmlnc2FtL2Ryby1xd2lrL3NyYy9saWIvdHMtcmVzdC9jb250cmFjdC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9iaWdzYW0vZHJvLXF3aWsvc3JjL2xpYi90cy1yZXN0L2NvbnRyYWN0LnRzXCI7Ly8gc3JjL2xpYi9hcGkvY29udHJhY3QudHNcbmltcG9ydCB7IGluaXRDb250cmFjdCB9IGZyb20gJ0B0cy1yZXN0L2NvcmUnO1xuaW1wb3J0IHsgeiB9IGZyb20gJ3pvZCc7XG5cbmNvbnN0IGMgPSBpbml0Q29udHJhY3QoKTtcblxuY29uc3QgSXRlbVNjaGVtYSA9IHoub2JqZWN0KHtcbiAgaWQ6IHoubnVtYmVyKCksXG4gIG5hbWU6IHouc3RyaW5nKCksXG4gIGRlc2NyaXB0aW9uOiB6LnN0cmluZygpLFxuICBjcmVhdGVkQXQ6IHouZGF0ZSgpXG59KTtcblxuZXhwb3J0IHR5cGUgSXRlbSA9IHouaW5mZXI8dHlwZW9mIEl0ZW1TY2hlbWE+O1xuXG5leHBvcnQgY29uc3QgY29udHJhY3QgPSBjLnJvdXRlcih7XG4gIGdldEl0ZW1zOiB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBwYXRoOiAnL2l0ZW1zJyxcbiAgICByZXNwb25zZXM6IHtcbiAgICAgIDIwMDogei5hcnJheShJdGVtU2NoZW1hKVxuICAgIH1cbiAgfSxcbiAgYWRkSXRlbToge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHBhdGg6ICcvaXRlbXMnLFxuICAgIGJvZHk6IEl0ZW1TY2hlbWEub21pdCh7IGlkOiB0cnVlLCBjcmVhdGVkQXQ6IHRydWUgfSksXG4gICAgcmVzcG9uc2VzOiB7XG4gICAgICAyMDE6IEl0ZW1TY2hlbWFcbiAgICB9XG4gIH1cbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFJQSxTQUFTLG9CQUFxQztBQUM5QyxTQUFTLGdCQUFnQjtBQUN6QixTQUFTLGdCQUFnQjtBQUN6QixPQUFPLG1CQUFtQjs7O0FDUDFCO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixhQUFlO0FBQUEsRUFDZixTQUFXO0FBQUEsSUFDVCxNQUFRO0FBQUEsRUFD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LEVBQUUsZUFBZSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsRUFBRSxJQUFJO0FBS3BELHlCQUF5QixpQkFBaUIsWUFBWTtBQUt0RCxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUFrQjtBQUM3RCxTQUFPO0FBQUEsSUFDTCxTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsR0FBRyxjQUFjLEdBQUU7QUFBQSxNQUNoRCxNQUFNO0FBQUEsTUFDTixnQkFBZ0IsUUFBUTtBQUN0QixjQUFNQyxPQUFNQyxTQUFRO0FBQ3BCLFFBQUFELEtBQUksSUFBSSxRQUFRLE1BQUM7QUFDakIsZUFBTyxZQUFZLElBQUlBLElBQUc7QUFBQSxNQUM1QjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ1IsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxJQUNBLENBQUU7QUFBQTtBQUFBLElBRUYsY0FBYztBQUFBO0FBQUE7QUFBQSxNQUdaLFNBQVMsQ0FBQztBQUFBLElBQ1o7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBb0JBLFFBQVE7QUFBQSxNQUNOLFNBQVM7QUFBQTtBQUFBLFFBRVAsaUJBQWlCO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUE7QUFBQSxRQUVQLGlCQUFpQjtBQUFBLE1BQ25CO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDO0FBU0QsU0FBUyx5QkFDUEUsa0JBQ0FDLGVBQ0E7QUFDQSxNQUFJLE1BQU07QUFHVixRQUFNLGdCQUFnQixPQUFPLEtBQUtELGdCQUFlLEVBQUU7QUFBQSxJQUNqRCxDQUFDLFFBQVFDLGNBQWEsR0FBRztBQUFBLEVBQzNCO0FBR0EsUUFBTSxVQUFVLE9BQU8sS0FBS0EsYUFBWSxFQUFFO0FBQUEsSUFBTyxDQUFDLFVBQ2hELFFBQVEsS0FBSyxLQUFLO0FBQUEsRUFDcEI7QUFJQSxRQUFNLHNCQUFzQixRQUFRLEtBQUssSUFBSSxDQUFDO0FBRTlDLE1BQUksUUFBUSxTQUFTLEdBQUc7QUFDdEIsVUFBTSxJQUFJLE1BQU0sR0FBRztBQUFBLEVBQ3JCO0FBSUEsUUFBTTtBQUFBLCtCQUN1QixjQUFjLEtBQUssSUFBSSxDQUFDO0FBQUE7QUFBQTtBQUtyRCxNQUFJLGNBQWMsU0FBUyxHQUFHO0FBQzVCLFVBQU0sSUFBSSxNQUFNLEdBQUc7QUFBQSxFQUNyQjtBQUNGOyIsCiAgIm5hbWVzIjogWyJleHByZXNzIiwgImFwcCIsICJleHByZXNzIiwgImRldkRlcGVuZGVuY2llcyIsICJkZXBlbmRlbmNpZXMiXQp9Cg==
