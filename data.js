// File: api/data.js
// Ini berjalan secara aman di server Vercel dan menyimpan konten rahasia.

const SECURE_PASSWORD = process.env.MY_SECRET_PASSWORD;

// --- DATA RAHASIA DISIMPAN DI SINI ---
const SENSITIVE_DATA = {
    // Info Pribadi
    name: 'Salma apriliyani salsabilanjing',
    residence: 'Sidobasuki, rt/rw 25/12. kel. bumiagung. kec tegineneng. kab. pesawaran, lampung',
    dob: '5 April 2008',
    religion: 'Islam',
    phone: '+62 882-8627-2458',
    father: 'Sugiarto Anjing',
    mother: 'Prapti Peler',
    skin: 'Negro, Suki',
    brain: 'Autism, goblok, tolol, dongo',
    attitude: 'Egois, Playing Victim, Sok Keras',
    vocab: 'Only, Batu Nisan, Angpao',
    ex: 'Devan, Rey, Husein, Arya, Adit, Tino, Kevin, Iky, Charless',
    // Gallery
    gallery: [
        'https://b.top4top.io/p_3031g7hp40.jpg',
        'https://i.ibb.co.com/DQpWdp3/IMG-20240929-183005.jpg',
        'https://raw.githubusercontent.com/sedulurkoncolawas/salmontol/refs/heads/main/IMG-20240929-WA0132.jpg',
        'https://raw.githubusercontent.com/sedulurkoncolawas/salmontol/refs/heads/main/IMG-20240929-WA0130.jpg',
        'https://raw.githubusercontent.com/sedulurkoncolawas/salmontol/refs/heads/main/IMG-20240929-WA0128.jpg',
        'https://raw.githubusercontent.com/sedulurkoncolawas/salmontol/refs/heads/main/IMG-20240929-WA0125.jpg',
        'https://raw.githubusercontent.com/sedulurkoncolawas/salmontol/refs/heads/main/IMG-20240929-WA0127.jpg',
        'https://raw.githubusercontent.com/sedulurkoncolawas/salmontol/refs/heads/main/IMG-20240929-WA0124.jpg',
        'https://raw.githubusercontent.com/sedulurkoncolawas/salmontol/refs/heads/main/IMG-20240929-WA0123.jpg',
        'https://raw.githubusercontent.com/sedulurkoncolawas/salmontol/refs/heads/main/IMG-20240929-WA0122.jpg',
        'https://raw.githubusercontent.com/sedulurkoncolawas/salmontol/refs/heads/main/IMG-20240929-WA0119.jpg',
        'https://raw.githubusercontent.com/sedulurkoncolawas/salmontol/refs/heads/main/IMG-20240929-WA0117.jpg',
        'https://raw.githubusercontent.com/sedulurkoncolawas/salmontol/refs/heads/main/IMG-20240929-WA0113.jpg',
        'https://raw.githubusercontent.com/sedulurkoncolawas/salmontol/refs/heads/main/IMG-20240929-WA0112.jpg',
        'https://raw.githubusercontent.com/sedulurkoncolawas/salmontol/refs/heads/main/IMG-20240929-WA0111.jpg',
        'https://raw.githubusercontent.com/sedulurkoncolawas/salmontol/refs/heads/main/IMG-20240929-WA0110.jpg',
    ]
};
// --- DATA RAHASIA BERAKHIR DI SINI ---


export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    if (!SECURE_PASSWORD) {
        return res.status(500).json({ success: false, message: 'Server Configuration Error: Password Env Var not set' });
    }

    try {
        const { password } = req.body;

        // Cek password. Jika benar, kirimkan SENSITIVE_DATA
        if (password === SECURE_PASSWORD) {
            return res.status(200).json({ success: true, data: SENSITIVE_DATA });
        } else {
            // Gagal, kirim balasan kosong
            return res.status(200).json({ success: false, message: 'Incorrect Password' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
