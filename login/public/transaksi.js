// ================= NAV =================
function goDashboard(){ window.location.href="dashboard.html"; }
function goData(){ window.location.href="data.html"; }
function goKeuangan(){ window.location.href="keuangan.html"; }
function goTransaksi(){ window.location.href="transaksi.html"; }
function goLaporan(){ window.location.href="laporan.html"; }

// ================= POPUP =================
function bukaPopup(){
    document.getElementById("popup").style.display = "flex";
}

function tutupPopup(){
    document.getElementById("popup").style.display = "none";

    document.getElementById("no").value = "";
    document.getElementById("tanggal").value = "";
    document.getElementById("nama").value = "";
    document.getElementById("jumlah").value = "";
}

// ================= LOAD =================
async function loadTransaksi(){
    const res = await fetch("http://localhost:3000/transaksi");
    const data = await res.json();
    render(data);
}

// ================= RENDER =================
function render(data){

    let html = "";

    data.forEach((item, index) => {

        html += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.tanggal ? item.tanggal.split("T")[0] : ""}</td>
            <td>${item.nama}</td>
            <td>${item.jumlah}</td>

            <td>
                <button class="icon-btn"
                onclick="editData(${item.id}, ${item.no}, '${item.tanggal}', '${item.nama}', ${item.jumlah})">

                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75L19.81 7.94l-3.75-3.75L3 17.25z" fill="black"/>
                        <path d="M20.71 6.04a1 1 0 0 0 0-1.41L18.37 2.29a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="black"/>
                    </svg>

                </button>
            </td>

            <td>
                <button class="icon-btn"
                onclick="hapusData(${item.id})">

                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d="M3 6h18" stroke="black" stroke-width="2"/>
                        <path d="M8 6V4h8v2" stroke="black" stroke-width="2"/>
                        <path d="M19 6l-1 14H6L5 6" stroke="black" stroke-width="2"/>
                        <path d="M10 11v6M14 11v6" stroke="black" stroke-width="2"/>
                    </svg>

                </button>
            </td>
        </tr>
        `;
    });

    document.getElementById("tbody").innerHTML = html;
}

// ================= SIMPAN =================
async function simpanData(){

    const no = Number(document.getElementById("no").value);
    const tanggal = document.getElementById("tanggal").value;
    const nama = document.getElementById("nama").value;
    const jumlah = Number(document.getElementById("jumlah").value);

    await fetch("http://localhost:3000/transaksi", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ no, tanggal, nama, jumlah })
    });

    tutupPopup();
    loadTransaksi();
}

// ================= DELETE =================
async function hapusData(id){

    await fetch("http://localhost:3000/transaksi/" + id, {
        method: "DELETE"
    });

    loadTransaksi();
}

// ================= EDIT (FIX) =================
async function editData(id, no, tanggal, nama, jumlah){

    const newNo = prompt("No", no);
    const newTanggal = prompt("Tanggal", tanggal);
    const newNama = prompt("Nama", nama);
    const newJumlah = prompt("Jumlah", jumlah);

    await fetch("http://localhost:3000/transaksi/" + id, {
        method: "PUT", // 🔥 FIX DI SINI
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            no: Number(newNo),
            tanggal: newTanggal,
            nama: newNama,
            jumlah: Number(newJumlah)
        })
    });

    loadTransaksi();
}

loadTransaksi();