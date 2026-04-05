async function fetchSensitiveData(password) {
    const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
    });
    const data = await response.json();
    return data.success ? data.data : null;
}

function renderContent(data) {
    const calculateAge = () => {
        const birthDate = new Date('2008-04-05');
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
        return age;
    };
    
    const age = calculateAge();
    const phoneLink = `https://wa.me/${data.phone.replace(/[^0-9+]/g, '')}?text=sugiarto+anjing+prapti+tolol+salma+yapit`;
    const galleryHtml = data.gallery.map(url => `<img src="${url}" alt="Foto" loading="lazy">`).join('');

    const contentHtml = `
    <div class="peler"><i class="fa-solid fa-lock"></i> SALMA PRIVATE INFO</div>
    
    <details>
      <summary>LIHAT GALLERY FOTO</summary>
      <div class="image-container">${galleryHtml}</div>
    </details>

    <div class="list"><span>Name :</span> <div class="text"><i class="fa-solid fa-user"></i> ${data.name}</div></div>
    <div class="list"><span>Residence :</span> <div class="map"><i class="fa-solid fa-location-dot"></i> ${data.residence}</div></div>
    <div class="list"><span>Age :</span> <div class="text"><i class="fa-solid fa-calendar"></i> ${age} Tahun</div></div>
    <div class="list"><span>Phone :</span> <div class="link"><i class="fab fa-whatsapp"></i> <a href="${phoneLink}" target="_blank">${data.phone}</a></div></div>
    <div class="list"><span>Brain :</span> <div class="text"><i class="fa-solid fa-brain"></i> ${data.brain}</div></div>
    <div class="list"><span>Ex :</span> <div class="text"><i class="fa-solid fa-heart-crack"></i> ${data.ex}</div></div>
    `;
    
    document.getElementById('main-content').innerHTML = contentHtml;
}

function showPasswordPrompt() {
    // Matikan loading saat prompt password muncul agar user bisa ngetik
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'none';

    Swal.fire({
        title: '🔒 Password Verify',
        input: 'password',
        inputPlaceholder: 'Masukkan Password...',
        allowOutsideClick: false,
        confirmButtonText: 'Login',
        customClass: { popup: 'swal2-popup', title: 'swal2-title', confirmButton: 'swal2-confirm' }
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire({ title: 'Checking...', didOpen: () => { Swal.showLoading(); } });
            
            const data = await fetchSensitiveData(result.value);
            Swal.close();

            if (data) {
                renderContent(data);
                document.getElementById('main-content').style.display = 'block';
            } else {
                Swal.fire({ icon: 'error', title: 'Salah Goblok!' }).then(() => showPasswordPrompt());
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', showPasswordPrompt);
