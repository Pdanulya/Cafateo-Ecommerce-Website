// signup.js
const form = document.getElementById('signupForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstname = form.firstname.value.trim();
  const lastname = form.lastname.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value.trim();
  const confirmPassword = form.confirm_password.value.trim();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const data = { name: firstname + " " + lastname, email, password };

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      window.location.href = "login.html";
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again later.");
  }
});
