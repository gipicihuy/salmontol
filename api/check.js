// File: api/check.js 
// Ini berjalan secara aman di server Vercel.

// Dapatkan Environment Variable (Env Var) dari Vercel
// PASTIKAN Anda membuat Env Var ini di dashboard Vercel tanpa prefix seperti NEXT_PUBLIC_
const SECURE_PASSWORD = process.env.MY_SECRET_PASSWORD;

// Default export untuk fungsi serverless Vercel
export default async (req, res) => {
    // Hanya izinkan metode POST untuk keamanan
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    // Cek apakah password Env Var sudah diatur (Error 500 jika belum)
    if (!SECURE_PASSWORD) {
        return res.status(500).json({ success: false, message: 'Server Configuration Error: Password not set' });
    }

    try {
        // Ambil password yang dikirim dari browser
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ success: false, message: 'Missing password' });
        }

        // --- PERBANDINGAN RAHASIA TERJADI DI SERVER ---
        if (password === SECURE_PASSWORD) {
            // Sukses: hanya kirim status True
            return res.status(200).json({ success: true, message: 'Access Granted' });
        } else {
            // Gagal
            return res.status(200).json({ success: false, message: 'Incorrect Password' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
