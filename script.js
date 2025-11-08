// CATATAN: Variabel SECRET_PASSWORD harus dimuat dari config.js!

// Calculate age automatically
function calculateAge() {
    const birthDate = new Date('2008-04-05');
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
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
    
    // Safety check for SECRET_PASSWORD
    if (typeof SECRET_PASSWORD === 'undefined') {
        Swal.fire({
            icon: 'error',
            title: 'Konfigurasi Error',
            text: 'File config.js tidak ditemukan atau tidak memuat variabel SECRET_PASSWORD. Harap periksa konsol browser.'
        });
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
                // Password Benar: Tampilkan Konten
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
            // Jika dibatalkan
            Swal.fire({
                icon: 'info',
                title: 'Akses Ditolak',
                text: 'Anda harus memasukkan kata sandi untuk melihat halaman ini.'
            });
        }
    });
}

// Jalankan semua logika utama saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // 1. Set the age
    const ageElement = document.getElementById('age');
    if (ageElement) {
        ageElement.textContent = calculateAge();
    }
    
    // 2. Mulai dengan meminta password
    showPasswordPrompt();
});
