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
    const phoneLink = `https://wa.me/${data.phone.replace(/[^0-9+]/g, '')}?text=p`;
    const galleryHtml = data.gallery.map(url => `<img src="${url}" alt="Img" loading="lazy">`).join('');

    const contentHtml = `
    <div class="peler">PRIVATE ACCESS GRANTED</div>
    
    <details>
      <summary>VIEW PHOTO GALLERY</summary>
      <div class="image-container">${galleryHtml}</div>
    </details>

    <div class="info-grid">
        <div class="list"><span>Full Name</span><div class="text"><i class="fas fa-id-card"></i> ${data.name}</div></div>
        <div class="list"><span>Residence</span><div class="map"><i class="fas fa-map-marker-alt"></i> ${data.residence}</div></div>
        <div class="list"><span>Age / TTL</span><div class="text"><i class="fas fa-birthday-cake"></i> ${age}y (${data.dob})</div></div>
        <div class="list"><span>WhatsApp</span><div class="link"><i class="fab fa-whatsapp"></i> <a href="${phoneLink}" target="_blank">${data.phone}</a></div></div>
        <div class="list"><span>Brain Status</span><div class="text"><i class="fas fa-microchip"></i> ${data.brain}</div></div>
        <div class="list"><span>Family</span><div class="text"><i class="fas fa-users"></i> ${data.father} & ${data.mother}</div></div>
        <div class="list"><span>Skin Type</span><div class="text"><i class="fas fa-palette"></i> ${data.skin}</div></div>
        <div class="list"><span>Attitude</span><div class="text"><i class="fas fa-masks-theater"></i> ${data.attitude}</div></div>
        <div class="list"><span>Ex-Partners</span><div class="text"><i class="fas fa-heart-broken"></i> ${data.ex}</div></div>
    </div>
    `;
    
    document.getElementById('main-content').innerHTML = contentHtml;
}

function showPasswordPrompt() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'none';

    Swal.fire({
        title: 'ENTER ACCESS KEY',
        input: 'password',
        background: '#0f172a',
        color: '#fff',
        confirmButtonText: 'UNLOCK',
        allowOutsideClick: false,
        customClass: { popup: 'swal2-popup', confirmButton: 'swal2-confirm' }
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire({ title: 'Decrypting...', background: '#0f172a', color: '#fff', didOpen: () => { Swal.showLoading(); } });
            const data = await fetchSensitiveData(result.value);
            Swal.close();
            if (data) {
                renderContent(data);
                document.getElementById('main-content').style.display = 'block';
            } else {
                Swal.fire({ icon: 'error', title: 'ACCESS DENIED', background: '#0f172a', color: '#fff' }).then(() => showPasswordPrompt());
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', showPasswordPrompt);
