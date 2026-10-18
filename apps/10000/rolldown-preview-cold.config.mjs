import { withFsCache } from "./fs-cache.mjs";

// Deletes the cache files first, so every run starts with no cache and saves a new one.
export default withFsCache("rolldown-preview-cold", { cold: true });
