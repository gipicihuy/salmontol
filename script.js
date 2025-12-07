// script.js
// TIDAK ADA KONTEN RAHASIA ATAU PASSWORD RAHASIA DI FILE INI

// Fungsi untuk mengambil data rahasia dari API
async function fetchSensitiveData(password) {
    const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
    });

    const data = await response.json();
    
    if (data.success) {
        return data.data; // Mengembalikan data sensitif (JSON)
    } else {
        return null; // Password salah
    }
}

// Fungsi untuk membuat HTML dari data yang diterima
function renderContent(data) {
    // 1. Hitung Umur
    const calculateAge = () => {
        const birthDate = new Date('2008-04-05');
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };
    
    const age = calculateAge();
    const phoneLink = `https://wa.me/${data.phone.replace(/[^0-9+]/g, '')}?text=sugiarto+anjing+prapti+tolol+salma+yapit`;

    // 2. Buat Galeri Foto HTML
    const galleryHtml = data.gallery.map(url => 
        `<img src="${url}" alt="Foto Salma" loading="lazy">`
    ).join('');

    // 3. VERY IMPORTANT PHOTO Section
    const veryImportantPhotoHtml = data.veryImportantPhoto ? `
    <details class="important-photo-section">
      <summary style="background: rgba(255, 0, 0, 0.2); border-color: #ff0000; color: #ff0000; font-weight: 800; animation: pulse 2s infinite;">
        ⚠️ VERY IMPORTANT PHOTO ⚠️
      </summary>
      <div class="important-photo-container" style="margin-top: 15px; text-align: center;">
        <img src="${data.veryImportantPhoto}" alt="VERY IMPORTANT PHOTO" style="max-width: 100%; border: 3px solid #ff0000; border-radius: 12px; box-shadow: 0 0 30px rgba(255, 0, 0, 0.6);">
      </div>
    </details>
    ` : '';

    // 4. Gabungkan semua HTML
    const contentHtml = `
    <div class="header-box">
        <h2>> Salma Autis <</h2>
        <p>Info Pribadi Salma Cik</p>
    </div>
  
    ${veryImportantPhotoHtml}
  
    <details>
      <summary>Lihat Gallery Foto</summary>
      <div class="image-container">
        ${galleryHtml}
      </div>
    </details>
    
    <h3 class="peler"><i class="fa-solid private fa-lock"></i>Salma Personal Information</h3>
    
    <ul>
        <li class="list"><span>Name :</span> <div class="text"><i class="fa-solid fa-user-tie"></i> ${data.name}</div></li>
        <li class="list"><span>Residence :</span> <div class="map"><i class="fa-solid fa-location-dot"></i><span>${data.residence}</span></div></li>
        <li class="list"><span>Date Of Birth :</span> <div class="text"><i class="fa-solid fa-cake-candles"></i> ${data.dob}</div></li>
        <li class="list"><span>Age :</span> <div class="text"><i class="fa-solid fa-calendar-days"></i> ${age} Tahun</div></li>
        <li class="list"><span>Religion :</span> <div class="text"><i class="fa-solid fa-kaaba agama"></i>${data.religion}</div></li>
        <li class="list"><span>Phone number :</span> <div class="link"><i class="fab fa-whatsapp"></i> <a href="${phoneLink}">${data.phone}</a></div></li>
        <li class="list"><span>Father's name :</span> <div class="text"><i class="fa-solid fa-person"></i> ${data.father}</div></li>
        <li class="list"><span>Mother's name :</span> <div class="text"><i class="fa-solid fa-person-dress"></i> ${data.mother}</div></li>
        <li class="list"><span>Skin :</span> <div class="text"><i class="fa-solid fa-user black"></i> ${data.skin}</div></li>
        <li class="list"><span>Brain :</span> <div class="text"><i class="fa-solid fa-brain"></i> ${data.brain}</div></li>
        <li class="list"><span>Attitude :</span><div class="text"><i class="fa-solid fa-mask sikap"></i>${data.attitude}</div></li>
        <li class="list"><span>Unknown vocabulary :</span> <div class="text"><i class="fa-solid fa-book kosakata"></i>${data.vocab}</div></li>
        <li class="list"><span>Ex :</span> <div class="text"><i class="fa-solid fa-heart-crack"></i> ${data.ex}</div></li>
    </ul>
    `;
    
    // 5. Masukkan HTML ke dalam wadah (container)
    document.getElementById('main-content').innerHTML = contentHtml;
}


// Fungsi SweetAlert dan Logika Akses
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
    }).then(async (result) => {
        if (result.isConfirmed) {
            
            // 1. Tampilkan loading SweetAlert saat menunggu API
            Swal.fire({
                title: 'Mengecek Akses...',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // 2. Ambil data dari server
            const sensitiveData = await fetchSensitiveData(result.value); 

            Swal.close(); // Tutup loading

            if (sensitiveData) {
                // Password Benar: Render dan Tampilkan Konten
                renderContent(sensitiveData);
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
                    showPasswordPrompt();
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
    // Mulai dengan meminta password
    showPasswordPrompt();
});
