// script.js
// TIDAK ADA PASSWORD RAHASIA DI FILE INI

// Fungsi untuk mengecek password ke API Serverless
async function checkPassword(password) {
    // Mengirim password ke fungsi serverless Vercel di /api/check
    const response = await fetch('/api/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
    });

    // Menerima balasan (hanya True/False)
    const data = await response.json();
    return data.success;
}

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
    }).then(async (result) => { // Gunakan 'async' di sini
        if (result.isConfirmed) {
            
            // Cek password ke API (ini membutuhkan waktu, makanya kita pakai await)
            const isCorrect = await checkPassword(result.value); 

            if (isCorrect) {
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
