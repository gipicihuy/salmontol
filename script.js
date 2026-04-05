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
        return data.data;
    } else {
        return null;
    }
}

function renderContent(data) {
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

    const galleryHtml = data.gallery.map(url => 
        `<img src="${url}" alt="Foto Salma" loading="lazy">`
    ).join('');

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

    const contentHtml = `
    <div class="moving-text-container">
        <h1 class="moving-text">SALMA PRIBADI INFORMATION</h1>
    </div>
  
    ${veryImportantPhotoHtml}
  
    <details>
      <summary>LIHAT GALLERY FOTO</summary>
      <div class="image-container">
        ${galleryHtml}
      </div>
    </details>
    
    <div class="peler">
        <span class="material-symbols-outlined private">lock</span>
        PRIVATE INFORMATION
    </div>
    
    <ul>
        <li class="list"><i class="fa-solid fa-user-tie"></i> Name : <span class="text">${data.name}</span></li>
        <li class="list"><i class="fa-solid fa-location-dot"></i> Residence : <span class="map">${data.residence}</span></li>
        <li class="list"><i class="fa-solid fa-cake-candles"></i> TTL : <span class="text">${data.dob}</span></li>
        <li class="list"><i class="fa-solid fa-calendar-days"></i> Age : <span class="text">${age} Tahun</span></li>
        <li class="list"><i class="fa-solid fa-kaaba agama"></i> Religion : <span class="text">${data.religion}</span></li>
        <li class="list"><i class="fab fa-whatsapp"></i> Phone : <span class="link"><a href="${phoneLink}" target="_blank">${data.phone}</a></span></li>
        <li class="list"><i class="fa-solid fa-person"></i> Father : <span class="text">${data.father}</span></li>
        <li class="list"><i class="fa-solid fa-person-dress"></i> Mother : <span class="text">${data.mother}</span></li>
        <li class="list"><i class="fa-solid fa-user black"></i> Skin : <span class="text">${data.skin}</span></li>
        <li class="list"><i class="fa-solid fa-brain"></i> Brain : <span class="text">${data.brain}</span></li>
        <li class="list"><i class="fa-solid fa-mask sikap"></i> Attitude : <span class="text">${data.attitude}</span></li>
        <li class="list"><i class="fa-solid fa-book kosakata"></i> Vocab : <span class="text">${data.vocab}</span></li>
        <li class="list"><i class="fa-solid fa-heart-crack"></i> Ex : <span class="text">${data.ex}</span></li>
    </ul>
    `;
    
    document.getElementById('main-content').innerHTML = contentHtml;
}

function showProvocativeAlert() {
    Swal.fire({
        title: 'Woi Gembrot😹',
        text: 'Woi salma tolol gembrot negro yapit, debat sini anjg bawa aja semua temen lu sini😹',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Gas',
        cancelButtonText: 'Gak, Gue Cupu😭',
        customClass: {
            popup: 'swal2-popup',
            title: 'swal2-title',
            confirmButton: 'swal2-confirm',
            cancelButton: 'swal2-cancel'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'https://chat.whatsapp.com/LDPvQRyl4ad40If8FLgunI';
        } else if (result.isDismissed) {
            Swal.fire({
                title: 'Gembrot Cupu😹',
                text: 'sal, lu kok tolol bet dah cupu amat mau debat malah nangis. Goblok!😹',
                icon: 'error',
                customClass: { popup: 'swal2-popup', title: 'swal2-title' }
            });
        }
    });
}

function showPasswordPrompt() {
    Swal.fire({
        title: '🔒 Halaman Terkunci',
        input: 'password',
        inputPlaceholder: 'Password...',
        showCancelButton: false,
        confirmButtonText: 'Masuk',
        allowOutsideClick: false, 
        allowEscapeKey: false,
        customClass: {
            popup: 'swal2-popup',
            title: 'swal2-title',
            confirmButton: 'swal2-confirm'
        },
        inputValidator: (value) => {
            if (!value) return 'Kata sandi tidak boleh kosong!';
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Mengecek Akses...',
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => { Swal.showLoading(); }
            });

            const sensitiveData = await fetchSensitiveData(result.value); 
            Swal.close();

            if (sensitiveData) {
                renderContent(sensitiveData);
                document.getElementById('main-content').style.display = 'block';
                
                const overlay = document.getElementById('loading-overlay');
                if (overlay) overlay.style.display = 'none';

                showProvocativeAlert();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Kata Sandi Salah!',
                    confirmButtonText: 'Coba Lagi'
                }).then(() => {
                    showPasswordPrompt();
                });
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    showPasswordPrompt();
});
