
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
const API_URL = "https://glossid.up.railway.app";

async function loadBarang(){
    try {
        const res = await fetch(API_URL + "/barang");
        const data = await res.json();
        render(data);
    } catch (error) {
        console.log(error);
    }
}

// ================= RENDER TABLE =================
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

            <!-- EDIT -->
            <td>
                <button class="icon-btn"
                onclick="editBarang(${item.id}, '${item.nama}', ${item.harga}, ${item.stok})">

                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75L19.81 7.94l-3.75-3.75L3 17.25z" fill="black"/>
                        <path d="M20.71 6.04a1 1 0 0 0 0-1.41L18.37 2.29a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="black"/>
                    </svg>

                </button>
            </td>

            <!-- DELETE -->
            <td>
                <button class="icon-btn"
                onclick="hapusBarang(${item.id})">

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

// ================= SIMPAN (CREATE / UPDATE) =================
async function simpanBarang(){

    const nama = document.getElementById("namaBarang").value;
    const harga = document.getElementById("hargaBarang").value;
    const stok = document.getElementById("stokBarang").value;

    try {

        if(mode === "tambah"){

            await fetch(API_URL + "/barang", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nama, harga, stok })
            });

        } else {

            await fetch(API_URL + "/barang/" + editId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nama, harga, stok })
            });

            mode = "tambah";
            editId = null;
        }

        tutupPopup();
        loadBarang();

    } catch (error) {
        console.log(error);
    }
}

// ================= DELETE =================
async function hapusBarang(id){

    try {

        await fetch(API_URL + "/barang/" + id, {
            method: "DELETE"
        });

        loadBarang();

    } catch (error) {
        console.log(error);
    }
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

    try {

        const res = await fetch(API_URL + "/barang");
        const data = await res.json();

        const hasil = data.filter(item =>
            item.nama.toLowerCase().includes(key)
        );

        render(hasil);

    } catch (error) {
        console.log(error);
    }
}

// ================= INIT =================
loadBarang();