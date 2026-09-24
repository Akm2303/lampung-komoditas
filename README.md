# Lampung Commodity Hub

Platform katalog digital komoditas unggulan Provinsi Lampung.

## Teknologi
- HTML5 + Tailwind CSS (via CDN)
- JavaScript ES Modules
- Firebase (Auth + Firestore)
- Cloudflare Pages (hosting)

## Struktur
Lihat `index.html` sebagai entry point.

## Setup Cepat
1. Buat project Firebase: https://console.firebase.google.com
2. Aktifkan **Authentication → Email/Password**
3. Aktifkan **Firestore Database** (region `asia-southeast2`)
4. Copy konfigurasi Web ke `js/firebase-config.js`
5. Login sebagai superadmin, buka `seed.html` sekali, lalu hapus file tersebut
6. Deploy ke Cloudflare Pages (build: `exit 0`, output: `.`)
7. Tambahkan domain Pages ke **Firebase Auth → Authorized domains**

## Akun Demo
| Email | Password | Role |
|---|---|---|
| superadmin@demo.com | password123 | superadmin |
| admin@demo.com | password123 | admin |
| petani@demo.com | password123 | user / Petani |
| exportir@demo.com | password123 | user / Exportir |
| lahan@demo.com | password123 | user / Pemilik Lahan |

## Security
- Firestore Security Rules: lihat `firestore.rules`
- Authentication production: gunakan HTTPS, Firebase Auth, session aman.

## Lisensi
© 2026 Lampung Commodity Hub. All Rights Reserved.