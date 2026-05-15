// ================= NAV =================
function goDashboard(){ window.location.href="dashboard.html"; }
function goData(){ window.location.href="data.html"; }
function goKeuangan(){ window.location.href="keuangan.html"; }
function goTransaksi(){ window.location.href="transaksi.html"; }
function goLaporan(){ window.location.href="laporan.html"; }

// ================= DATA =================
let data = [];

async function loadData(){
    const res = await fetch("http://localhost:3000/transaksi");
    data = await res.json();
    render(data);
}

function render(list){

    let html = "";

    list.forEach(item => {
        html += `
        <tr>
            <td>${item.no}</td>
            <td>${item.tanggal ? item.tanggal.split("T")[0] : ""}</td>
            <td>${item.nama}</td>
            <td>${item.jumlah}</td>
        </tr>
        `;
    });

    document.getElementById("tbody").innerHTML = html;
}

loadData();