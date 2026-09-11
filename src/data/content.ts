/* ============================================================
   SATU-SATUNYA FILE YANG PERLU KAMU EDIT

   Semua teks, nama, tanggal, dan nama file foto ada di sini.
   Kamu tidak perlu menyentuh file lain kecuali ingin ubah warna.

   Foto disimpan di folder: public/foto/
   Cukup timpa file yang sudah ada dengan foto aslimu,
   pakai nama yang sama persis, lalu simpan.
   ============================================================ */

/** Helper supaya jalur foto tetap benar waktu di-hosting di GitHub Pages. */
export const foto = (nama: string) => `${import.meta.env.BASE_URL}foto/${nama}`;

/* ------------------------------------------------------------
   1. HALAMAN SAMPUL
   ------------------------------------------------------------ */
export const SAMPUL = {
  kicker: "UNTUK AYAH",
  gambar: foto("sampul.webp"),
  keteranganGambar: "Potret Ayah",
  nama: "Rohmad",              // GANTI: panggilan yang biasa kamu pakai
  subjudul: "12 SEPTEMBER 1976 — 50 TAHUN",
  tombol: "Mulai",
  catatanKecil: "Nyalain suaranya ya, Yah. Pelan-pelan aja bacanya.",
};

/* ------------------------------------------------------------
   2. KALIMAT PEMBUKA SEBELUM KENANGAN PERTAMA
   ------------------------------------------------------------ */
export const PEMBUKA = {
  kicker: "PEMBUKA",
  judul: "Sebelum Mulai",
  paragraf:
    "Mas Byan nggak bisa kasih Ayah hadiah yang besar tahun ini. Jadi Mas Byan kumpulin aja hal-hal kecil yang selama ini kesimpen di kepala Mas Byan. Sebagian mungkin Ayah udah lupa. Mas Byan belum.",
};

/* ------------------------------------------------------------
   3. EMPAT KENANGAN
   Formula yang dipakai: satu benda atau kebiasaan yang konkret,
   lalu satu kalimat yang sering Ayah ucapkan,
   lalu satu kesadaran yang baru muncul sekarang.

   Bagian di dalam tanda kurung siku WAJIB kamu ganti,
   karena di situlah detail keluargamu sendiri masuk.
   ------------------------------------------------------------ */
export interface Kenangan {
  id: string;
  bagian: string;
  tempat: string;
  gambar: string;
  keteranganGambar: string;
  /** Opsional. Bagian foto yang ditampilkan di bingkai, mis. "left", "right", "center top". */
  posisiGambar?: string;
  miring: number;
  judul: string;
  cerita: string;
}

export const KENANGAN: Kenangan[] = [
  {
    id: "mobil",
    bagian: "SATU",
    tempat: "MOBIL",
    gambar: foto("kenangan-1.webp"),
    keteranganGambar: "Perjalanan di Mobil",
    posisiGambar: "30% center",     // 0% = mentok kiri, 100% = mentok kanan
    miring: -2.2,
    judul: "Kebiasaan yang tak pernah pudar",
    cerita:
      "Ayah selalu duduk di kursi yang sama. Terkadang gantian sama bunda di samping kalau ngantuk, tapi ga jarang juga nahan ngantuk sepanjang perjalanan sampe habisin semua snack di mobil hahaha. Sabar ya yah, mas byan coba beraniin lagi bawa mobil dan nanti mas byan yang anterin ayah ke mana-mana.",
  },
  {
    id: "weekend",
    bagian: "DUA",
    tempat: "WEEKEND",
    gambar: foto("kenangan-2.webp"),
    keteranganGambar: "Weekend di Rumah",
    miring: 1.8,
    judul: "Gebrakan silih berganti",
    cerita:
      "Setiap weekend pasti ada gebrakan dari Ayah. Bongkar ini bongkar itu, ganti ini ganti itu, tambah ini tambah itu. Mas byan sih seringnya kabur-kaburan ya sampe bergema teriakan Bunda hahaha. Cuman mas byan belajar banyak juga dari Ayah. Dipikir-pikir capek juga ya jadi Ayah, makasi ya yah.",
  },
  {
    id: "kerang",
    bagian: "TIGA",
    tempat: "KERANG",
    gambar: foto("kenangan-3.webp"),
    keteranganGambar: "Kerang Aris Seafood",
    miring: -1.5,
    judul: "Dua Porsi Kerang Dara",
    cerita:
      "Harus dua porsi kerang dara baru bisa akur. Ayah sama bunda cuman ngeliatin aja karena kolestrol tapi Ayah selalu tiba-tiba makan beberapa entah itu punya Mas Byan atau punya Dedek hahaha. Tetep jaga kesehatan ya yah.",
  },
  {
    id: "liburan",
    bagian: "EMPAT",
    tempat: "LIBURAN",
    gambar: foto("kenangan-4.webp"),
    keteranganGambar: "Liburan di Pantai",
    miring: 2.1,
    judul: "Pantai untuk Kesekian Kalinya",
    cerita:
      "Kita nggak pernah libur yang mewah banget, karena yang mewah itu kebersamaannya. Cakep. Kalo liburan pasti pilihannya antara camping atau pantai. Ayah bunda sukanya camping, tapi anak-anaknya sukanya pantai. Jadi ya ganti-gantian deh hehehe. Tapi 2 destinasi itu ga jarang tantangannya di jalannya, ga kebayang Ayah lewatin semua itu berkali-kali. Kalo kita mah bangun-bangun udah nyampe aja hehehe.",
  },
];

/* ------------------------------------------------------------
   4. KALIMAT KHAS AYAH
   Bagian jeda. Boleh lucu, memang harus terasa ringan.
   ------------------------------------------------------------ */
export const KALIMAT_AYAH = {
  kicker: "JEDA SEBENTAR",
  judul: "Yang Ayah Ucapkan Empat Ribu Kali",
  pengantar: "Nggak dihitung sebenernya. Tapi rasanya segitu.",
  daftar: [
    "Kamu dimana?",
    "Udah makan belum?",
    "Yaudah, hati-hati di jalan",
    "Nanti Ayah transfer",
    "Jangan malem malem",
    "Semangat ya",
  ],
};

/* ------------------------------------------------------------
   5. DI BALIK KAMERA
   Pakai foto keluarga yang di dalamnya justru Ayah nggak ada,
   karena Ayah yang motret.
   ------------------------------------------------------------ */
export const DI_BALIK_KAMERA = {
  kicker: "BAGIAN TERAKHIR",
  judul: "Di Balik Kamera",
  pengantar:
    "Mas Byan buka album, dan ada beberapa foto dimana Ayah nggak ada di dalamnya. Bukan karena Ayah nggak ikut. Tapi karena Ayah yang megang kameranya. Hari ini Mas Byan pindahin Ayah ke depan lensa.",
  daftar: [
    {
      id: "bk-1",
      gambar: foto("kamera-1.webp"),
      meta: "5 Agustus 2024",
      teks: "Di foto ini Ayah berdiri kira-kira tiga langkah dari Mas Byan, sambil liatin Mas Byan pesen subway buat sarapan",
      miring: -1.8,
    },
    {
      id: "bk-2",
      gambar: foto("kamera-2.webp"),
      meta: "31 Oktober 2009",
      teks: "Yang motret Ayah. Yang ngatur momen Ayah. Yang nggak masuk frame juga Ayah. Ini pasti fotonya sambil nyengir juga kan ngeliat ketawa 100% Fiza yang sekarang kebanyakan cemberut",
      miring: 2.0,
    },
  ],
};

/* ------------------------------------------------------------
   6. PENUTUP
   Sengaja tidak puitis. Ditutup dengan hal yang konkret.
   ------------------------------------------------------------ */
export const PENUTUP = {
  kicker: "PENUTUP",
  paragraf:
    "Nggak ada kado yang cukup buat bayar semua ini. Yang ini juga nggak. Tapi setidaknya sekarang Ayah tahu satu hal. Semua yang Ayah kira nggak ada yang lihat, ternyata ada yang lihat.",
  ucapan: "Selamat Ulang Tahun, Yah",
  tandaTangan: "Dari anak pertama Ayah, Mas Byan",
  janji: "Semoga sehat selalu dan apa yang disemogakan segera tersemogakan",
};

/* ------------------------------------------------------------
   7. LAGU PENUTUP (opsional)
   Taruh file mp3 di folder public/, lalu tulis namanya di sini.
   Lagu diputar otomatis (tanpa pemutar) begitu ucapan
   "Selamat Ulang Tahun" muncul, dan musik latar berhenti.
   Kalau aktif = false, musik latar tetap jalan sampai akhir.
   Contoh: file = "lagu-penutup.mp3"
   ------------------------------------------------------------ */
export const LAGU_PENUTUP = {
  aktif: true,
  file: "lagu-penutup.mp3",
  judul: "Lagu Ayah",           // hanya catatan, tidak ditampilkan
};
