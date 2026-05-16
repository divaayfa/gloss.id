async function login() {

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  try {

    const response = await fetch("https://YOUR-BACKEND.up.railway.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      msg.innerHTML = "Login berhasil";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);

    } else {
      msg.innerHTML = data.message;
    }

  } catch (error) {
    console.log(error);
    msg.innerHTML = "Server tidak tersambung";
  }
}