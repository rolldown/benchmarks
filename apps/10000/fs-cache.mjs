import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import base from "./rolldown-preview.config.mjs";

// Turns on the fs cache of rolldown/rolldown#11234. The binding reads these env vars when the build starts. Unix only.
export function withFsCache(tool, { cold = false } = {}) {
  const dir = join(import.meta.dirname, "node_modules/.cache/rolldown-fs");
  const content = join(dir, `${tool}-content.bin`);
  const dirs = join(dir, `${tool}-dirs.bin`);
  if (cold) {
    rmSync(content, { force: true });
    rmSync(dirs, { force: true });
  }
  mkdirSync(dir, { recursive: true });
  Object.assign(process.env, {
    ROLLDOWN_FS_CONTENT_CACHE: content,
    ROLLDOWN_FS_DIRCACHE: "3",
    ROLLDOWN_FS_DIRCACHE_PERSIST: dirs,
    ROLLDOWN_FS_WARM_EARLY: "1",
  });
  return { ...base, output: { ...base.output, dir: `dist-${tool}` } };
}
