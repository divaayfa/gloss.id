const API_URL = "https://glossid.up.railway.app";

// ================= NAVIGATION =================
function goDashboard(){
    window.location.href = "dashboard.html";
}

function goData(){
    window.location.href = "data.html";
}

function goKeuangan(){
    window.location.href = "keuangan.html";
}

function goTransaksi(){
    window.location.href = "transaksi.html";
}

function goLaporan(){
    window.location.href = "laporan.html";
}

// ================= STATE =================
let mode = "tambah";
let editId = null;

// ================= LOAD DATA =================
async function loadBarang(){
    try {
        const res = await fetch(API_URL + "/barang");
        const data = await res.json();
        render(data);
    } catch (error) {
        console.log(error);
    }
}

// ================= RENDER =================
function render(data){
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    data.forEach((item)=>{
        tbody.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.nama}</td>
            <td>Rp. ${item.harga}</td>
            <td>${item.stok}</td>

            <td>
                <button onclick="editBarang(${item.id}, '${item.nama}', ${item.harga}, ${item.stok})">Edit</button>
            </td>

            <td>
                <button onclick="hapusBarang(${item.id})">Delete</button>
            </td>
        </tr>
        `;
    });
}

// ================= POPUP =================
function bukaPopup(){
    document.getElementById("popup").style.display = "flex";
}

function tutupPopup(){
    document.getElementById("popup").style.display = "none";
    document.getElementById("namaBarang").value = "";
    document.getElementById("hargaBarang").value = "";
    document.getElementById("stokBarang").value = "";

    mode = "tambah";
    editId = null;
}

// ================= SIMPAN =================
async function simpanBarang(){

    const nama = document.getElementById("namaBarang").value;
    const harga = document.getElementById("hargaBarang").value;
    const stok = document.getElementById("stokBarang").value;

    if(mode === "tambah"){
        await fetch(API_URL + "/barang", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nama, harga, stok })
        });
    } else {
        await fetch(API_URL + "/barang/" + editId, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nama, harga, stok })
        });

        mode = "tambah";
        editId = null;
    }

    tutupPopup();
    loadBarang();
}

// ================= DELETE =================
async function hapusBarang(id){
    await fetch(API_URL + "/barang/" + id, {
        method: "DELETE"
    });

    loadBarang();
}

// ================= EDIT =================
function editBarang(id, nama, harga, stok){
    mode = "edit";
    editId = id;

    document.getElementById("namaBarang").value = nama;
    document.getElementById("hargaBarang").value = harga;
    document.getElementById("stokBarang").value = stok;

    bukaPopup();
}

// ================= SEARCH =================
async function searchBarang(){

    const key = document.getElementById("search").value.toLowerCase();

    const res = await fetch(API_URL + "/barang");
    const data = await res.json();

    const hasil = data.filter(item =>
        item.nama.toLowerCase().includes(key)
    );

    render(hasil);
}

// ================= INIT =================
loadBarang();