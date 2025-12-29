self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('newborn-care-v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './styles.css'
      ]);
    })
  );
});
