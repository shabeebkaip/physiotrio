import fs from "fs";
import path from "path";

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const VIDEO_EXTS = new Set([".mp4", ".mov", ".webm"]);

export interface InstagramAsset {
  type: "image" | "video";
  /** URL-safe path for use in <Image src> or <video src> */
  src: string;
}

/**
 * Reads /public/instagram at request time and returns every image/video found.
 * Files are deduplicated (e.g. "name (1).jpg" is dropped when "name.jpg" exists).
 * Call this only from Server Components — it uses the Node fs module.
 */
export function getInstagramAssets(): InstagramAsset[] {
  const dir = path.join(process.cwd(), "public", "instagram");

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => !f.startsWith("."));

  // Deduplicate: skip files whose name minus a trailing " (N)" already exists
  const fileSet = new Set(files);
  const unique = files.filter((f) => {
    const withoutSuffix = f.replace(/\s*\(\d+\)(\.[^.]+)$/, "$1");
    if (withoutSuffix !== f && fileSet.has(withoutSuffix)) {
      return false; // original exists → skip this duplicate
    }
    return true;
  });

  return unique
    .map((f): InstagramAsset | null => {
      const ext = path.extname(f).toLowerCase();
      const type = VIDEO_EXTS.has(ext)
        ? "video"
        : IMAGE_EXTS.has(ext)
        ? "image"
        : null;

      if (!type) return null;

      // Encode the filename so spaces / parens are safe in <img src>
      const encoded = f
        .split("")
        .map((c) => (/[A-Za-z0-9._~-]/.test(c) ? c : encodeURIComponent(c)))
        .join("");

      return { type, src: `/instagram/${encoded}` };
    })
    .filter((x): x is InstagramAsset => x !== null);
}
