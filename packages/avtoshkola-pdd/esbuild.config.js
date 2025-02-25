import { build } from "esbuild";
import { copy } from "fs-extra";

async function buildPackage() {
  console.log("⚡ Bundling ESM & CommonJS with esbuild...");

  await build({
    entryPoints: ["src/index.ts"],
    outfile: "dist/index.js",
    bundle: true,
    platform: "node",
    target: "esnext",
    format: "esm",
    sourcemap: false,
    external: ["file-system-db"],
  });

  await build({
    entryPoints: ["src/index.ts"],
    outfile: "dist/index.cjs",
    bundle: true,
    platform: "node",
    target: "esnext",
    format: "cjs",
    sourcemap: false,
    external: ["file-system-db"],
  });

  console.log("📂 Copying static files...");
  await copy("src/data", "dist/data");
  await copy("src/images", "dist/images");

  console.log("✅ Build complete!");
}

buildPackage().catch(() => process.exit(1));
