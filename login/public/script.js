function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    fetch("https://glossid.up.railway.app/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {

        if (data.success) {
            msg.innerHTML = "Login berhasil";
            window.location.href = "dashboard.html";
        } else {
            msg.innerHTML = data.message || "Login gagal";
        }

    })
    .catch(err => {
        console.log(err);
        msg.innerHTML = "Server error";
    });
}