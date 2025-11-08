// CATATAN: Variabel SECRET_PASSWORD sekarang dimuat dari config.js!

// Calculate age automatically
function calculateAge() {
    const birthDate = new Date('2008-04-05');
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // If birthday hasn't occurred this year yet, subtract 1
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// Fungsi untuk menampilkan pop-up SweetAlert (pesan provokatif)
function showProvocativeAlert() {
    Swal.fire({
        title: 'Woi Gembrot😹',
        text: 'Woi salma tolol gembrot negro yapit, debat sini anjg bawa aja semua temen lu sini😹',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Gas',
        cancelButtonText: 'Gak, Gue Cupu😭'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'https://chat.whatsapp.com/LDPvQRyl4ad40If8FLgunI';
        } else if (result.isDismissed) {
            Swal.fire({
                title: 'Gembrot Cupu😹',
                text: 'sal, lu kok tolol bet dah cupu amat mau debat malah nangis. Mampus lu jadi bahan ejekan. Goblok!😹',
                icon: 'error'
            });
        }
    });
}

// Fungsi untuk meminta password
function showPasswordPrompt() {
    // Pastikan SECRET_PASSWORD tersedia (dari config.js)
    if (typeof SECRET_PASSWORD === 'undefined') {
        alert('FATAL ERROR: Password variable is missing! Cek apakah file config.js sudah dimuat.');
        document.getElementById('loading-overlay').style.display = 'none';
        return; 
    }
    
    Swal.fire({
        title: '🔒 Halaman Terkunci',
        input: 'password',
        inputLabel: 'Masukkan Kata Sandi',
        inputPlaceholder: 'Password...',
        showCancelButton: true,
        confirmButtonText: 'Masuk',
        cancelButtonText: 'Batal',
        allowOutsideClick: false, 
        allowEscapeKey: false,
        inputValidator: (value) => {
            if (!value) {
                return 'Kata sandi tidak boleh kosong!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            if (result.value === SECRET_PASSWORD) {
                // Password Benar: Sembunyikan Overlay & Tampilkan Konten
                document.getElementById('loading-overlay').style.display = 'none';
                document.getElementById('main-content').style.display = 'block';
                showProvocativeAlert();
            } else {
                // Password Salah: Ulangi
                Swal.fire({
                    icon: 'error',
                    title: 'Kata Sandi Salah!',
                    text: 'Silakan coba lagi.',
                    confirmButtonText: 'Coba Lagi'
                }).then(() => {
                    showPasswordPrompt(); // Rekursif: minta lagi
                });
            }
        } else {
            // Jika dibatalkan: Tetap di halaman dan sembunyikan overlay, tapi konten tidak muncul
            document.getElementById('loading-overlay').style.display = 'none'; 
            Swal.fire({
                icon: 'info',
                title: 'Akses Ditolak',
                text: 'Anda harus memasukkan kata sandi untuk melihat halaman ini.'
            });
        }
    });
}

// Jalankan semua logika utama saat semua elemen HTML selesai dimuat
window.addEventListener('load', function() {
    // 1. Set the age
    const ageElement = document.getElementById('age');
    if (ageElement) {
        ageElement.textContent = calculateAge();
    }
    
    // 2. Mulai dengan meminta password
    showPasswordPrompt();
});

// script.js (Tambahkan di bagian paling bawah)

// Safety Fallback: Menyembunyikan loading overlay setelah 3 detik
// Jika ada error JS yang mencegah showPasswordPrompt() berjalan, spinner akan hilang.
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const loadingOverlay = document.getElementById('loading-overlay');
        // Hanya sembunyikan jika main-content belum terlihat (artinya stuck)
        if (loadingOverlay.style.display !== 'none') {
            loadingOverlay.style.display = 'none';
        }
    }, 3000); 
});
