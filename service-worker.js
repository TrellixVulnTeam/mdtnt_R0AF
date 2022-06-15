const build = [
  "/_app/immutable/start-9068ed1e.js",
  "/_app/immutable/pages/__layout.svelte-b3d8f4c5.js",
  "/_app/immutable/assets/pages/__layout.svelte-2af513a0.css",
  "/_app/immutable/pages/__error.svelte-45c02da1.js",
  "/_app/immutable/assets/pages/__error.svelte-153d5994.css",
  "/_app/immutable/pages/docs.svelte-71dfe9a1.js",
  "/_app/immutable/pages/full.svelte-1664a43a.js",
  "/_app/immutable/pages/index.svelte-db8202aa.js",
  "/_app/immutable/pages/repl.svelte-e4c820d1.js",
  "/_app/immutable/pages/usage.svelte-aecf5f87.js",
  "/_app/immutable/chunks/index-ca2f52f9.js",
  "/_app/immutable/chunks/index-6059fd7e.js",
  "/_app/immutable/chunks/singletons-d1fb5791.js",
  "/_app/immutable/chunks/preload-helper-60cab3ee.js",
  "/_app/immutable/chunks/ga-cc1189ff.js",
  "/_app/immutable/chunks/toast-5d1f15b7.js",
  "/_app/immutable/chunks/markmap-64b5c6f2.js",
  "/_app/immutable/chunks/footer-a03930b9.js",
  "/_app/immutable/chunks/loader-fd86b968.js",
  "/_app/immutable/assets/loader-ff97eb6d.css",
  "/_app/immutable/chunks/buttons.esm-85c25ef8.js",
  "/_app/immutable/chunks/codemirror-36a9deb4.js",
  "/_app/immutable/assets/codemirror-ba3b7b73.css"
];
const files = [
  "/.nojekyll",
  "/demos/auto-loader.html",
  "/favicon.png",
  "/logo-192.png",
  "/logo-512.png",
  "/manifest.json"
];
const version = "1655045586626";
const ASSETS = `cache${version}`;
const to_cache = build.concat(files);
const cached = new Set(to_cache);
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(ASSETS).then((cache) => cache.addAll(to_cache)).then(() => {
    self.skipWaiting();
  }));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then(async (keys) => {
    for (const key of keys) {
      if (key !== ASSETS)
        await caches.delete(key);
    }
    self.clients.claim();
  }));
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || event.request.headers.has("range"))
    return;
  const url = new URL(event.request.url);
  if (!url.protocol.startsWith("http"))
    return;
  if (url.hostname === self.location.hostname && url.port !== self.location.port)
    return;
  if (url.host === self.location.host && cached.has(url.pathname)) {
    event.respondWith(caches.match(event.request, { ignoreSearch: true }));
    return;
  }
  if (event.request.cache === "only-if-cached")
    return;
  event.respondWith(caches.open(`offline${version}`).then(async (cache) => {
    try {
      const response = await fetch(event.request);
      cache.put(event.request, response.clone());
      return response;
    } catch (err) {
      const response = await cache.match(event.request);
      if (response)
        return response;
      throw err;
    }
  }));
});
