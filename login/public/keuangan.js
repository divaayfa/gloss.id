
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
}

// ================= LOAD DATA =================
async function loadKeuangan(){

    const res = await fetch(API_URL + "/keuangan");
    const data = await res.json();

    render(data);
}

// ================= RENDER =================
function render(data){

    let html = "";

    data.forEach(item => {

        html += `
        <tr>
            <td>${item.nama}</td>
            <td>${item.jumlah}</td>
            <td>Rp. ${item.harga}</td>
            <td>Rp. ${item.total}</td>
        </tr>
        `;
    });

    document.getElementById("tbody").innerHTML = html;
}

// ================= SIMPAN =================
async function simpanData(){

    const nama = document.getElementById("namaBarang").value;
    const jumlah = document.getElementById("jumlahBarang").value;
    const harga = document.getElementById("hargaBarang").value;

    await fetch(API_URL + "/keuangan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nama,
            jumlah,
            harga
        })
    });

    tutupPopup();
    loadKeuangan();

    document.getElementById("namaBarang").value = "";
    document.getElementById("jumlahBarang").value = "";
    document.getElementById("hargaBarang").value = "";
}

// ================= INIT =================
loadKeuangan();