const menu = document.querySelectorAll('.menu');

menu.forEach(button => {
    button.addEventListener('click', () => {
        menu.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

/* pindah halaman */
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