function checkPassword() {
  const input = document.getElementById('passwordInput').value;
  const correctPassword = "J-ismine212"; // local + GitHub test

  if (input === correctPassword) {
    // ✅ mark user as authenticated
    sessionStorage.setItem("authenticated", "true");

    // redirect
    window.location.href = "nav.html";
  } else {
    document.getElementById('error-msg').innerHTML = `
      <p style="color:#ff69b4; font-weight:bold;">Access Denied 🚫<br>
      (cuz "Jasmine is not mine"...Jasmine, not J-is-mine, get it? :P)<br>
      Please ask Uncle for the password 💕
      </p>
      <img src="images/denied.png" style="width:200px;margin-top:10px;">
    `;
  }
}



