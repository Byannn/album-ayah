import { useCallback, useState } from "react";
import { Reveal } from "./Reveal";
import { Polaroid } from "./Polaroid";
import { AudioToggle } from "./AudioToggle";
import { UcapanUlangTahun, KunangKunang } from "./UcapanUlangTahun";
import {
  PEMBUKA,
  KENANGAN,
  KALIMAT_AYAH,
  DI_BALIK_KAMERA,
  PENUTUP,
} from "../data/content";

interface StoryViewProps {
  diam: boolean;
  onToggleAudio: () => void;
  onLihatFoto: (gambar: string, keterangan: string) => void;
  /** Dipanggil sekali saat ucapan ulang tahun masuk layar. */
  onSampaiUcapan: () => void;
}

/** Garis pemisah antar bagian. Kecil, tapi bikin ritme bacanya enak. */
function Pemisah() {
  return (
    <div className="flex justify-center py-14">
      <div className="h-px w-10 bg-garis" />
    </div>
  );
}

function Kicker({ teks, gelap = false }: { teks: string; gelap?: boolean }) {
  return (
    <span
      className={`font-label text-[11px] font-bold uppercase tracking-[0.24em] ${
        gelap ? "text-lampu" : "text-aksen"
      }`}
    >
      {teks}
    </span>
  );
}

export function StoryView({ diam, onToggleAudio, onLihatFoto, onSampaiUcapan }: StoryViewProps) {
  const [rayakan, setRayakan] = useState(false);

  const saatUcapanMuncul = useCallback(() => {
    setRayakan(true);
    onSampaiUcapan();
  }, [onSampaiUcapan]);

  return (
    <div className="relative w-full">
      {/* Tombol suara ikut menempel selama menggulir */}
      <div className="fixed right-3 top-3 z-30">
        <AudioToggle diam={diam} onToggle={onToggleAudio} />
      </div>

      <main className="mx-auto w-full max-w-md px-6 pb-0 pt-20">
        {/* ---------- PEMBUKA ---------- */}
        <Reveal className="text-center">
          <Kicker teks={PEMBUKA.kicker} />
          <h2 className="mt-4 font-judul text-[30px] leading-[1.25] text-tinta">
            {PEMBUKA.judul}
          </h2>
          <p className="mt-5 font-isi text-[18px] leading-[1.75] text-tinta">
            {PEMBUKA.paragraf}
          </p>
        </Reveal>

        <Reveal delay={0.25} className="flex flex-col items-center pt-12">
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-tinta-lembut">
            slide ke bawah
          </span>
          <div className="mt-3 h-10 w-px bg-gradient-to-b from-garis to-transparent" />
        </Reveal>

        <Pemisah />

        {/* ---------- EMPAT KENANGAN ---------- */}
        {KENANGAN.map((k, i) => (
          <section key={k.id}>
            <Reveal className="flex flex-col items-center">
              <p className="mb-6 font-label text-[11px] uppercase tracking-[0.2em] text-tinta-lembut">
                {k.bagian} <span className="text-garis">•</span> {k.tempat}
              </p>

              <Polaroid
                gambar={k.gambar}
                alt={k.keteranganGambar}
                catatan={k.keteranganGambar}
                miring={k.miring}
                posisi={k.posisiGambar}
                lebar={280}
                onClick={() => onLihatFoto(k.gambar, k.keteranganGambar)}
              />
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <h3 className="font-judul text-[26px] leading-[1.3] text-tinta">
                {k.judul}
              </h3>
              <p className="mt-4 font-isi text-[18px] leading-[1.8] text-tinta first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-judul first-letter:text-[54px] first-letter:leading-[0.8] first-letter:text-aksen">
                {k.cerita}
              </p>
            </Reveal>

            {i < KENANGAN.length - 1 && <Pemisah />}
          </section>
        ))}

        <Pemisah />

        {/* ---------- JEDA: KALIMAT KHAS AYAH ---------- */}
        <section className="-mx-6 bg-[#eae0d2] px-6 py-16">
          <Reveal className="text-center">
            <Kicker teks={KALIMAT_AYAH.kicker} />
            <h3 className="mx-auto mt-4 max-w-[300px] font-judul text-[27px] leading-[1.3] text-tinta">
              {KALIMAT_AYAH.judul}
            </h3>
            <p className="mt-3 font-isi text-[16px] italic text-tinta-lembut">
              {KALIMAT_AYAH.pengantar}
            </p>
          </Reveal>

          <ul className="mt-9 space-y-0">
            {KALIMAT_AYAH.daftar.map((kalimat, i) => (
              <Reveal key={kalimat} delay={i * 0.08}>
                <li className="flex items-start gap-3 border-b border-dashed border-[#c9b9a4] py-4 last:border-b-0">
                  <span className="mt-[10px] h-[6px] w-[6px] shrink-0 rounded-full bg-aksen" />
                  <span className="font-isi text-[19px] italic leading-[1.6] text-tinta">
                    &ldquo;{kalimat}&rdquo;
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>

        <Pemisah />

        {/* ---------- DI BALIK KAMERA ---------- */}
        <section>
          <Reveal className="text-center">
            <Kicker teks={DI_BALIK_KAMERA.kicker} />
            <h3 className="mt-4 font-judul text-[30px] leading-[1.25] text-tinta">
              {DI_BALIK_KAMERA.judul}
            </h3>
            <p className="mt-5 font-isi text-[18px] leading-[1.8] text-tinta">
              {DI_BALIK_KAMERA.pengantar}
            </p>
          </Reveal>

          <div className="mt-12 space-y-14">
            {DI_BALIK_KAMERA.daftar.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.05} className="flex flex-col items-center">
                <div className="relative">
                  <Polaroid
                    gambar={item.gambar}
                    alt={item.teks}
                    miring={item.miring}
                    lebar={268}
                    selotip={false}
                    onClick={() => onLihatFoto(item.gambar, item.teks)}
                  />
                  {/* Penanda posisi Ayah saat memotret */}
                  <div
                    className="pointer-events-none absolute bottom-[64px] left-1/2 z-20 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-2 border-dashed border-aksen/85"
                    aria-hidden="true"
                  >
                    <span className="font-label text-[9px] uppercase tracking-wider text-aksen">
                      di sini
                    </span>
                  </div>
                </div>

                <p className="mt-6 font-label text-[11px] uppercase tracking-[0.18em] text-tinta-lembut">
                  {item.meta}
                </p>
                <p className="mt-3 max-w-[320px] text-center font-isi text-[18px] leading-[1.75] text-tinta">
                  {item.teks}
                </p>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      {/* ---------- PENUTUP: GANTI SUASANA JADI MALAM ---------- */}
      <section className="relative mt-24 w-full overflow-hidden bg-malam px-6 py-24">
        {rayakan && <KunangKunang />}

        <div className="relative mx-auto flex w-full max-w-md flex-col items-center text-center">
          <Reveal>
            <Kicker teks={PENUTUP.kicker} gelap />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 h-px w-12 bg-lampu/60" />
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-8 font-isi text-[19px] leading-[1.85] text-gading">
              {PENUTUP.paragraf}
            </p>
          </Reveal>

          <UcapanUlangTahun teks={PENUTUP.ucapan} onMuncul={saatUcapanMuncul} />

          <Reveal delay={1.1}>
            <p className="mt-6 font-isi text-[18px] leading-relaxed text-gading/85">
              {PENUTUP.janji}
            </p>
            <p className="mt-8 font-label text-[11px] uppercase tracking-[0.2em] text-malam-lembut">
              {PENUTUP.tandaTangan}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
