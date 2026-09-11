import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CoverScreen } from "./components/CoverScreen";
import { StoryView } from "./components/StoryView";
import { PhotoModal } from "./components/PhotoModal";
import { Grain } from "./components/Grain";
import { ambientAudio } from "./audio/ambientAudio";
import { laguPenutup } from "./audio/laguPenutup";
import { LAGU_PENUTUP } from "./data/content";

export default function App() {
  const [tampilan, setTampilan] = useState<"sampul" | "cerita">("sampul");
  const [diam, setDiam] = useState(false);
  const [modal, setModal] = useState({ terbuka: false, gambar: "", keterangan: "" });

  // Setelah lagu penutup mulai, tombol suara mengatur lagu itu, bukan musik latar.
  const toggleAudio = () =>
    setDiam(laguPenutup.sudahMulai() ? laguPenutup.toggleMute() : ambientAudio.toggleMute());

  const mulai = () => {
    // Musik baru dinyalakan setelah tombol ditekan.
    // Browser modern memang melarang audio berjalan sendiri, dan
    // memang sebaiknya begitu.
    ambientAudio.start();
    ambientAudio.playChime();
    laguPenutup.siapkan();
    setTampilan("cerita");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // Saat ucapan ulang tahun muncul: musik latar memudar, lagu penutup masuk.
  const sampaiUcapan = useCallback(() => {
    if (!LAGU_PENUTUP.aktif || laguPenutup.sudahMulai()) return;
    const sedangDiam = ambientAudio.getMutedStatus();
    ambientAudio.fadeOutAndStop();
    laguPenutup.putar(sedangDiam);
  }, []);

  return (
    <div className="min-h-[100dvh] w-full bg-kertas text-tinta">
      <Grain />

      <AnimatePresence mode="wait">
        {tampilan === "sampul" ? (
          <motion.div
            key="sampul"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CoverScreen
              onMulai={mulai}
              diam={diam}
              onToggleAudio={toggleAudio}
              onLihatFoto={(gambar, keterangan) => setModal({ terbuka: true, gambar, keterangan })}
            />
          </motion.div>
        ) : (
          <motion.div
            key="cerita"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <StoryView
              diam={diam}
              onToggleAudio={toggleAudio}
              onLihatFoto={(gambar, keterangan) => setModal({ terbuka: true, gambar, keterangan })}
              onSampaiUcapan={sampaiUcapan}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <PhotoModal
        terbuka={modal.terbuka}
        gambar={modal.gambar}
        keterangan={modal.keterangan}
        onTutup={() => setModal((m) => ({ ...m, terbuka: false }))}
      />
    </div>
  );
}
