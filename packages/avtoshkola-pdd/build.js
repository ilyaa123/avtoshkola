import { copy } from "fs-extra";

async function buildPackage() {
  console.log("📂 Copying static files...");
  await copy("src/data", "dist/data");
  await copy("src/images", "dist/images");

  console.log("✅ Build complete!");
}

buildPackage().catch(() => process.exit(1));
