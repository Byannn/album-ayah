import { motion } from "motion/react";
import { SAMPUL } from "../data/content";
import { Polaroid } from "./Polaroid";
import { AudioToggle } from "./AudioToggle";

interface CoverScreenProps {
  onMulai: () => void;
  diam: boolean;
  onToggleAudio: () => void;
  onLihatFoto: (gambar: string, keterangan: string) => void;
}

export function CoverScreen({ onMulai, diam, onToggleAudio, onLihatFoto }: CoverScreenProps) {
  return (
    <main className="relative flex min-h-[100dvh] w-full flex-col items-center overflow-hidden px-6 pb-10 pt-5">
      <div className="flex w-full max-w-sm flex-1 flex-col items-center">
        <div className="z-20 flex w-full justify-end">
          <AudioToggle diam={diam} onToggle={onToggleAudio} nada="terang" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-4 flex flex-col items-center"
        >
          <span className="font-label text-[12px] font-bold uppercase tracking-[0.22em] text-aksen">
            {SAMPUL.kicker}
          </span>
          <div className="mt-3 h-px w-7 bg-garis" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="my-auto py-8"
        >
          <Polaroid
            gambar={SAMPUL.gambar}
            alt={SAMPUL.keteranganGambar}
            catatan={SAMPUL.keteranganGambar}
            miring={-2}
            lebar={264}
            malas={false}
            onClick={() => onLihatFoto(SAMPUL.gambar, SAMPUL.keteranganGambar)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center text-center"
        >
          <h1 className="font-judul text-[34px] leading-[1.2] font-semibold text-tinta">
            {SAMPUL.nama}
          </h1>
          <p className="mt-3 font-label text-[12px] uppercase tracking-[0.16em] text-tinta-lembut">
            {SAMPUL.subjudul}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-auto flex w-full flex-col items-center pt-10"
        >
          <button
            onClick={onMulai}
            className="h-[54px] w-[210px] rounded-full bg-aksen font-isi text-[19px] text-kertas-terang shadow-[0_4px_16px_rgba(65,22,0,0.22)] transition-transform duration-300 active:scale-95"
          >
            {SAMPUL.tombol}
          </button>
          <p className="mt-5 max-w-[260px] text-center font-isi text-[15px] leading-relaxed text-tinta-lembut">
            {SAMPUL.catatanKecil}
          </p>
        </motion.div>
      </div>
    </main>
  );
}
