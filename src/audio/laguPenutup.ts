import { LAGU_PENUTUP } from "../data/content";

/**
 * Lagu penutup (file mp3 di folder public/).
 *
 * Diputar otomatis begitu ucapan ulang tahun masuk layar, tanpa pemutar.
 * Browser, terutama Safari di iPhone, menolak audio yang diputar sendiri
 * tanpa sentuhan. Karena itu elemen audionya "dibuka kuncinya" dulu saat
 * tombol Mulai ditekan: diputar lalu langsung dijeda, tanpa sempat bersuara.
 */
class LaguPenutupPlayer {
  private audio: HTMLAudioElement | null = null;
  private diputar = false;
  private diam = false;

  private elemen(): HTMLAudioElement {
    if (!this.audio) {
      this.audio = new Audio(`${import.meta.env.BASE_URL}${LAGU_PENUTUP.file}`);
      this.audio.preload = "auto";
    }
    return this.audio;
  }

  /** Panggil di dalam handler tombol Mulai, supaya nanti boleh diputar sendiri. */
  public siapkan() {
    if (!LAGU_PENUTUP.aktif || this.audio) return;
    const audio = this.elemen();
    audio.play().catch(() => {});
    audio.pause();
  }

  public putar(diam: boolean) {
    if (!LAGU_PENUTUP.aktif || this.diputar) return;
    this.diputar = true;
    this.diam = diam;

    const audio = this.elemen();
    audio.currentTime = 0;
    audio.muted = diam;
    audio.volume = 0;
    audio
      .play()
      .then(() => this.naikkanVolume())
      .catch(() => this.tungguSentuhan());
  }

  /** Volume naik pelan-pelan supaya lagunya masuk dengan halus. */
  private naikkanVolume(durasi = 2500) {
    const audio = this.audio;
    if (!audio) return;
    const awal = performance.now();
    const langkah = (sekarang: number) => {
      const p = Math.min(Math.max((sekarang - awal) / durasi, 0), 1);
      audio.volume = p;
      if (p < 1) requestAnimationFrame(langkah);
    };
    requestAnimationFrame(langkah);
  }

  /** Kalau browser tetap menolak, lagu diputar pada sentuhan berikutnya. */
  private tungguSentuhan() {
    const peristiwa = ["click", "touchend", "keydown"] as const;
    const coba = () => {
      peristiwa.forEach((p) => window.removeEventListener(p, coba));
      this.audio
        ?.play()
        .then(() => this.naikkanVolume())
        .catch(() => {});
    };
    peristiwa.forEach((p) => window.addEventListener(p, coba));
  }

  public toggleMute(): boolean {
    this.diam = !this.diam;
    if (this.audio) this.audio.muted = this.diam;
    return this.diam;
  }

  public sudahMulai(): boolean {
    return this.diputar;
  }
}

export const laguPenutup = new LaguPenutupPlayer();
