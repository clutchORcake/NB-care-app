function checkPassword() {
  const input = document.getElementById('passwordInput').value;
  const correctPassword = "J-ismine212"; // hard-coded for local testing

  if(input === correctPassword) {
    // Redirect to main navigation page
    window.location.href = "nav.html";
  } else {
    document.getElementById('error-msg').innerHTML = `
      <p style="color:#ff69b4; font-weight:bold;">Access Denied 🚫 cuz "Jasmine is not mine" xD</p>
      <img src="images/denied.png" alt="Access Denied" style="width:200px; margin-top:10px;">
    `;
  }
}

// PWA: register service worker (will only fully work on HTTP/HTTPS)
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker Registered'))
    .catch(err => console.log('SW registration failed:', err));
}


// async function checkPassword() {
//   const input = document.getElementById('passwordInput').value;
//   const res = await fetch('auth.json');
//   const data = await res.json();

//   if(input === data.password) {
//     window.location.href = "nav.html";
//   } else {
//     document.getElementById('error-msg').innerHTML = `
//       <p style="color:#ff69b4;">Access Denied 🚫</p>
//       <img src="images/denied.png" alt="Access Denied" style="width:200px; margin-top:10px;">
//     `;
//   }
// }

// // PWA: register service worker
// if('serviceWorker' in navigator){
//   navigator.serviceWorker.register('service-worker.js')
//     .then(() => console.log('Service Worker Registered'))
//     .catch(err => console.log('SW registration failed:', err));
// }



