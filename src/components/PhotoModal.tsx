import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

interface PhotoModalProps {
  terbuka: boolean;
  gambar: string;
  keterangan: string;
  onTutup: () => void;
}

export function PhotoModal({ terbuka, gambar, keterangan, onTutup }: PhotoModalProps) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onTutup();
    };
    if (terbuka) {
      document.addEventListener("keydown", esc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [terbuka, onTutup]);

  return (
    <AnimatePresence>
      {terbuka && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#140b05]/88 px-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onTutup}
        >
          <motion.img
            src={gambar}
            alt={keterangan}
            className="max-h-[70vh] w-auto max-w-full rounded-[2px] border-8 border-kertas-terang object-contain"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          />
          <p className="mt-5 max-w-xs text-center font-label text-[11px] uppercase tracking-[0.16em] text-[#c9bcae]">
            {keterangan}
          </p>
          <button
            onClick={onTutup}
            className="mt-6 rounded-full border border-[#c9bcae]/40 px-6 py-2 font-isi text-[15px] text-[#ede7de] transition-colors hover:bg-white/10"
          >
            Tutup
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
