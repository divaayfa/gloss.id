async function login() {

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  try {

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    const data = await response.json();

    console.log(data);

    if (data.success) {
      msg.innerHTML = "Login berhasil";
      window.location.href = "dashboard.html";
    } else {
      msg.innerHTML = data.message;
    }

  } catch (error) {
    console.error(error);
    msg.innerHTML = "Server tidak tersambung";
  }
}