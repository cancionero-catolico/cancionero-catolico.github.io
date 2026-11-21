// Cancionero Católico — funciona sin conexión. Generado por make_pwa.py; no editar a mano.
const FILES = {"data.json": "8ae17e36a4", "web.json": "51780867f0", "gpd.json": "40cfa7cffa", "jesed.json": "952f5dbaa6", "rc.json": "dd4f638ef7", "lc.json": "71004d5fa6", "dom.json": "ce225bca09", "ly.json": "5c7fbe1823", "letras.json": "ad110baa48", "cm.json": "9cbf76a9e7", "icon.webp": "0513a8df4e", "pptxgen.bundle.js": "201dd4e5ab", "jspdf.umd.min.js": "e53ce4fac9", "ac00.webp": "b9b8c5e58c", "ac01.webp": "e53a6c61b5", "ac02.webp": "f5e13eb114", "ac03.webp": "db040e004c", "b00.webp": "69170cfdcf", "b01.webp": "90871e4e65", "b02.webp": "2b32963b7b", "b03.webp": "805c9183fa", "b04.webp": "5c523347b5", "b05.webp": "87d4aaabf7", "b06.webp": "1a1c831926", "b07.webp": "d0a711bba8", "b08.webp": "59c4be2dc5", "b09.webp": "3becf50bc5", "b10.webp": "9777fa4088", "b11.webp": "c92da3eba7", "b12.webp": "841c7c2f08", "b13.webp": "5e15e21920", "b14.webp": "2ea04c63ec", "b15.webp": "3fbac013b3", "b16.webp": "b96cc2bda7", "b17.webp": "13a0aa5586", "b18.webp": "aac830fe86", "b19.webp": "f392a3c822", "b20.webp": "2a807606b2", "b21.webp": "61c23f66a5", "b22.webp": "f28b6981c8", "b23.webp": "ec8a9bdb90", "b24.webp": "8b654b6257", "b25.webp": "b7180b52f5", "b26.webp": "f985539274", "b27.webp": "4372f1d1f2", "b28.webp": "31cbb55d70", "b29.webp": "731f62ec03", "b30.webp": "9e6e23de6e", "b31.webp": "90284e3849", "b32.webp": "2ebf64ae4e", "b33.webp": "e7aa824172", "b34.webp": "780bd7b1f2", "b35.webp": "2256ca87b8", "b36.webp": "f638daa6d9", "b37.webp": "01dfd2496c", "b38.webp": "d56f572d32", "b39.webp": "fd3b7e9209", "b40.webp": "189c495692", "b41.webp": "07ac59dee6", "b42.webp": "5a26d2c353", "b43.webp": "77cf779539", "b44.webp": "5d3cc84ae6", "b45.webp": "9fa716852d", "b46.webp": "ecb95b3ab1", "b47.webp": "e0b4f76f3c", "b48.webp": "e33f411059", "b49.webp": "edddf0c260", "b50.webp": "84c6977046", "b51.webp": "396179e683", "b52.webp": "4fa29d53fa", "b53.webp": "e54f3f815c", "b54.webp": "71145e4412", "b55.webp": "8af0af8514", "b56.webp": "1aa39ef860", "bv00.webp": "32da857092", "bv01.webp": "d6bb41f056", "bv02.webp": "ec92572144", "bv03.webp": "f832d05a88", "bv04.webp": "ef0da878cd", "bv05.webp": "ba1f730735", "bv06.webp": "59277c5bfd", "bv07.webp": "3803704c90", "bv08.webp": "9c92892ba7", "bv09.webp": "2d41a3a78f", "bv10.webp": "b9c3011ddd", "pj00.webp": "29c0d82145", "pj01.webp": "6980009a62", "pj02.webp": "2e9a128797", "pj03.webp": "4a7c127a75", "pj04.webp": "0757638844", "pj05.webp": "0b6783e76d", "pj06.webp": "f0deed75ae", "sa00.webp": "c1f45f4430", "sa01.webp": "6646fa5be8", "sa02.webp": "91bbe7d3f9", "sa03.webp": "5d693165a6", "index.html": "50d057a9a7", "manifest.webmanifest": "4285ef89c9", "icon-180.png": "de4a19e064", "icon-192.png": "eaac7b8021", "icon-512.png": "c059eb54e2"};
const DATA = 'cc-data', FONTS = 'cc-fonts';
const key = p => p + '?v=' + FILES[p];
const SHELL = ['index.html', 'manifest.webmanifest', 'data.json', 'web.json', 'gpd.json', 'jesed.json', 'rc.json', 'lc.json', 'dom.json', 'ly.json', 'icon-192.png', 'icon.webp'];

async function grab(c, p) {
  const r = await fetch(p, { cache: 'no-cache' });
  if (r.ok) await c.put(key(p), r.clone());
  return r;
}
self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(DATA);
    for (const p of SHELL) if (FILES[p] && !(await c.match(key(p)))) await grab(c, p);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const c = await caches.open(DATA), keep = new Set(Object.keys(FILES).map(p => new URL(key(p), self.registration.scope).href));
    for (const r of await c.keys()) if (!keep.has(r.url)) await c.delete(r);
    await self.clients.claim();
  })());
});
let busy = false;
async function prefetchAll() {
  if (busy) return; busy = true;
  try {
    const c = await caches.open(DATA);
    for (const p of Object.keys(FILES)) if (!(await c.match(key(p)))) { try { await grab(c, p) } catch (e) { break } }
  } finally { busy = false }
}
self.addEventListener('message', e => { if (e.data === 'prefetch') e.waitUntil(prefetchAll()) });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin === location.origin) {
    let p = u.pathname.slice(new URL(self.registration.scope).pathname.length);
    if (r.mode === 'navigate' || p === '') p = 'index.html';
    if (!FILES[p]) return;
    e.respondWith((async () => {
      const c = await caches.open(DATA), hit = await c.match(key(p));
      if (hit) return hit;
      try { return await grab(c, p) } catch (err) { return (await c.match(key('index.html'))) || Response.error() }
    })());
  } else if (/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) {
    e.respondWith((async () => {
      const c = await caches.open(FONTS), hit = await c.match(r);
      const net = fetch(r).then(x => { if (x.ok || x.type === 'opaque') c.put(r, x.clone()); return x }).catch(() => hit);
      return hit || net;
    })());
  }
});
