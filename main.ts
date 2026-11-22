import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// news-image-20261122 entry: copy entry.png to /output/entry.png
const src = fileURLToPath(new URL('./entry.png', import.meta.url));
const destDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const dest = join(destDir, 'entry.png');

mkdirSync(dirname(dest), { recursive: true });
copyFileSync(src, dest);

const outStat = statSync(dest);
if (!outStat.isFile() || outStat.size === 0) {
  throw new Error(`Failed to copy entry image or image is empty: ${dest}`);
}

