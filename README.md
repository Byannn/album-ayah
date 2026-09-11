# Album Kenangan Ayah

Website satu halaman berisi kenangan untuk hari ulang tahun Ayah.
Dibuat dengan React 19, Vite 6, TypeScript, Tailwind 4, dan Motion.

---

## 1. Menjalankan di laptop

Butuh Node.js versi 20 atau lebih baru. Cek dulu dengan `node -v`.

```bash
npm install
npm run dev
```

Buka alamat yang muncul di terminal, biasanya `http://localhost:5173/album-ayah/`.
Perhatikan bagian `/album-ayah/` di belakang, itu wajib ikut.

Perintah lain yang tersedia:

```bash
npm run lint      # cek error TypeScript
npm run build     # bikin folder dist siap unggah
npm run preview   # lihat hasil build seperti aslinya
```

---

## 2. Mengganti isi

### Teks

Semua teks ada di satu file: **`src/data/content.ts`**.
Nama, tanggal, enam cerita, daftar kalimat khas Ayah, dan penutup.
Bagian yang ditulis di dalam `[tanda kurung siku]` wajib diganti,
karena di situlah detail keluargamu sendiri masuk.

Tidak perlu menyentuh file lain.

### Foto

Ada di folder **`public/foto/`**. Sekarang isinya gambar placeholder.
Timpa saja dengan foto aslimu, pakai nama file yang sama persis:

| File | Dipakai untuk |
|---|---|
| `sampul.webp` | Potret Ayah di halaman pembuka |
| `kenangan-1.webp` sampai `kenangan-4.webp` | Empat kenangan |
| `kamera-1.webp` dan `kamera-2.webp` | Bagian Di Balik Kamera |

Kompres dulu di [squoosh.app](https://squoosh.app), pilih format WebP,
targetkan di bawah 200 KB per foto. Foto langsung dari HP biasanya
3 sampai 5 MB dan akan bikin website berat di ponsel Ayah.

Kalau mau tetap pakai JPG, silakan, tinggal sesuaikan nama file
di `src/data/content.ts`.

### Warna dan font

Ada di **`src/index.css`** pada blok `@theme`. Ubah satu nilai,
seluruh halaman ikut berubah.

### Lagu penutup

Taruh file mp3 di folder `public/`, lalu di `src/data/content.ts`
ubah `LAGU_PENUTUP.aktif` menjadi `true` dan sesuaikan nama filenya.
Lagu diputar otomatis (tanpa pemutar) begitu ucapan ulang tahun muncul,
dan musik latar memudar lalu berhenti.

---

## 3. Unggah ke GitHub Pages

**Langkah 1.** Buka `vite.config.ts`, ganti nilai `base` sesuai
nama repositori yang akan kamu buat. Garis miring depan dan belakang wajib ada.

```ts
base: '/album-ayah/',
```

**Langkah 2.** Buat repositori **publik** di GitHub dengan nama yang sama.

**Langkah 3.** Unggah proyeknya.

```bash
git init
git add .
git commit -m "album kenangan untuk Ayah"
git branch -M main
git remote add origin https://github.com/NAMA-KAMU/album-ayah.git
git push -u origin main
```

**Langkah 4.** Di repositori GitHub, masuk **Settings**, lalu menu **Pages**,
lalu pada **Source** pilih **GitHub Actions**. Jangan pilih Deploy from a branch.

**Langkah 5.** Tunggu dua sampai tiga menit. Cek progresnya di tab **Actions**.
Setelah centang hijau, situsnya hidup di:

```
https://NAMA-KAMU.github.io/album-ayah/
```

Setiap kali kamu `git push` berikutnya, situsnya diperbarui otomatis.

### Kalau halamannya putih

Sembilan dari sepuluh kasus penyebabnya sama: nilai `base` di `vite.config.ts`
tidak cocok dengan nama repositori. Cek lagi huruf besar kecilnya.

### Pakai domain sendiri

Ubah `base` menjadi `'/'`, lalu masukkan nama domainmu di kolom
Custom domain pada menu Pages, dan centang Enforce HTTPS.
Untuk daftar alamat IP yang harus dipasang di DNS, salin dari
dokumentasi resmi GitHub Pages karena nilainya pernah berubah.

---

## 4. Catatan desain

Beberapa keputusan sengaja dibuat dan sebaiknya tidak diubah.

- **Zoom cubit jari dibiarkan aktif.** Pembacanya berkacamata baca.
- **Ukuran teks isi 18 sampai 19 piksel.** Bukan 16.
- **Musik tidak jalan otomatis.** Baru menyala setelah tombol Mulai ditekan,
  dan tombol matikan suara selalu terlihat.
- **Tidak ada scroll-jacking.** Animasi hanya merespons gulir, tidak membajaknya.
- **`prefers-reduced-motion` dihormati.** Kalau sistem Ayah mengaktifkan
  pengaturan kurangi gerak, semua animasi otomatis mati.
- **Musik latar dibangkitkan oleh Web Audio**, bukan file lagu, jadi nol aset
  dan nol urusan lisensi. Lagu asli hanya dipakai di bagian penutup.
