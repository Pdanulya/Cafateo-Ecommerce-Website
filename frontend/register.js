document.getElementById("registerForm").addEventListener("submit", async function(e) {
  e.preventDefault(); // stop page refresh

  const firstName = this.firstName.value.trim();
  const lastName = this.lastName.value.trim();
  const email = this.email.value.trim();
  const password = this.password.value.trim();
  const confirmPassword = this.confirm_password.value.trim();

  // ✅ check confirm password
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const res = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,   // your backend likely expects `username`
        lastName,
        email,
        password
      })
    });

    const data = await res.json();
    console.log("Register response:", data);

    if (res.ok) {
      alert("Registration successful! Please login.");
      window.location.href = "login.html";
    } else {
      alert("Registration failed: " + (data.message || "Unknown error"));
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Registration failed due to a server error.");
  }
});
