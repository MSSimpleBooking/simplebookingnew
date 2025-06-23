// Login- und Registrierungslogik
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");

showRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
});

showLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;
  users.push({ email, password });
  alert("Registrierung erfolgreich!");
  registerForm.reset();
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    alert("Login erfolgreich!");
    window.location.href = "booking.html";
  } else {
    alert("Falsche E-Mail oder Passwort!");
  }
});

// Buchungslogik
const bookingForm = document.getElementById("booking-form");

bookingForm?.addEventListener("submit", function (e) {
  e.preventDefault();

  const selectedMonths = Array.from(
    document.querySelectorAll(".month-selector input:checked")
  ).map((input) => input.value);

  if (selectedMonths.length === 0) {
    alert("Bitte wähle mindestens einen Monat aus!");
    return;
  }

  const totalCost = selectedMonths.length * 500;
  const invoice = `
      MS SimpleBooking - Rechnung
      ---------------------------
      Gebuchte Monate: ${selectedMonths.join(", ")}
      Gesamtbetrag: ${totalCost} EUR
  `;

  const blob = new Blob([invoice], { type: "text/plain" });
  const invoiceUrl = URL.createObjectURL(blob);
  document.getElementById("invoice-section").classList.remove("hidden");
  const downloadButton = document.getElementById("download-invoice");
  downloadButton.onclick = () => {
    const a = document.createElement("a");
    a.href = invoiceUrl;
    a.download = "Rechnung.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
});
