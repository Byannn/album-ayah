import { useState, type PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

interface PolaroidProps {
  gambar: string;
  alt: string;
  /** Teks kecil di dagu polaroid. Boleh dikosongkan. */
  catatan?: string;
  /** Derajat kemiringan. Pakai angka kecil saja, -3 sampai 3. */
  miring?: number;
  /** Bagian foto yang ditampilkan (CSS object-position). Default: tengah. */
  posisi?: string;
  lebar?: number;
  /** Foto sampul sebaiknya false supaya dimuat duluan. */
  malas?: boolean;
  selotip?: boolean;
  onClick?: () => void;
}

/** Seberapa jauh polaroid boleh condong mengikuti kursor (derajat). */
const CONDONG_MAKS = 7;
/** Pegas yang lembut, supaya gerakannya terasa seperti kertas, bukan kaca. */
const PEGAS = { stiffness: 180, damping: 18, mass: 0.6 };

export function Polaroid({
  gambar,
  alt,
  catatan,
  miring = -2,
  posisi,
  lebar = 268,
  malas = true,
  selotip = true,
  onClick,
}: PolaroidProps) {
  const kurangiGerak = useReducedMotion();
  const [disentuh, setDisentuh] = useState(false);

  // Posisi kursor di atas foto, dinormalisasi ke -0.5 … 0.5 (0 = tengah).
  const kursorX = useMotionValue(0);
  const kursorY = useMotionValue(0);
  const halusX = useSpring(kursorX, PEGAS);
  const halusY = useSpring(kursorY, PEGAS);

  const condongY = useTransform(halusX, [-0.5, 0.5], [-CONDONG_MAKS, CONDONG_MAKS]);
  const condongX = useTransform(halusY, [-0.5, 0.5], [CONDONG_MAKS, -CONDONG_MAKS]);

  // Foto di dalam bingkai bergeser berlawanan arah → kesan ada kedalaman.
  const geserFotoX = useTransform(halusX, [-0.5, 0.5], [6, -6]);
  const geserFotoY = useTransform(halusY, [-0.5, 0.5], [6, -6]);

  // Kilau cahaya tipis yang mengikuti kursor.
  const kilauX = useTransform(halusX, [-0.5, 0.5], [0, 100]);
  const kilauY = useTransform(halusY, [-0.5, 0.5], [0, 100]);
  const kilau = useMotionTemplate`radial-gradient(circle at ${kilauX}% ${kilauY}%, rgba(255,250,240,0.35), transparent 60%)`;

  const aktif = disentuh && !kurangiGerak;

  function saatBergerak(e: PointerEvent<HTMLDivElement>) {
    // Hanya untuk mouse/pen; di layar sentuh efek ini justru mengganggu.
    if (kurangiGerak || e.pointerType === "touch") return;
    const kotak = e.currentTarget.getBoundingClientRect();
    kursorX.set((e.clientX - kotak.left) / kotak.width - 0.5);
    kursorY.set((e.clientY - kotak.top) / kotak.height - 0.5);
  }

  function saatMasuk(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return;
    setDisentuh(true);
  }

  function saatKeluar() {
    setDisentuh(false);
    kursorX.set(0);
    kursorY.set(0);
  }

  return (
    <div
      className="relative inline-block cursor-pointer [perspective:900px]"
      style={{ width: lebar }}
      onClick={onClick}
      onPointerEnter={saatMasuk}
      onPointerMove={saatBergerak}
      onPointerLeave={saatKeluar}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <motion.div
        className="relative [transform-style:preserve-3d]"
        initial={false}
        animate={{
          rotate: aktif ? miring * 0.35 : miring,
          y: aktif ? -8 : 0,
          scale: aktif ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        style={
          kurangiGerak ? undefined : { rotateX: condongX, rotateY: condongY }
        }
      >
        {selotip && (
          <motion.div
            className="pointer-events-none absolute -top-3 left-1/2 z-20 h-6 w-20 -translate-x-1/2 bg-[#e6dbcb]/80 shadow-sm backdrop-blur-[1px]"
            initial={false}
            animate={{ rotate: aktif ? -4 : -2, y: aktif ? -1 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
          />
        )}

        <motion.div
          className="rounded-[2px] bg-kertas-terang p-3 pb-9"
          initial={false}
          animate={{
            boxShadow: aktif
              ? "0 26px 44px -12px rgba(43,33,25,0.28), 0 8px 16px -6px rgba(43,33,25,0.16)"
              : "0 10px 26px -6px rgba(43,33,25,0.16), 0 3px 8px -2px rgba(43,33,25,0.10)",
          }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative aspect-square w-full overflow-hidden bg-[#e1d9ce]">
            <motion.img
              src={gambar}
              alt={alt}
              loading={malas ? "lazy" : "eager"}
              decoding="async"
              className="h-full w-full object-cover [filter:sepia(0.16)_contrast(1.02)_brightness(0.99)]"
              initial={false}
              animate={{ scale: aktif ? 1.08 : 1 }}
              transition={{ type: "spring", stiffness: 160, damping: 22 }}
              style={{
                ...(posisi ? { objectPosition: posisi } : {}),
                ...(kurangiGerak ? {} : { x: geserFotoX, y: geserFotoY }),
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#140b05]/12 to-transparent" />
            {!kurangiGerak && (
              <motion.div
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                style={{ backgroundImage: kilau }}
                initial={false}
                animate={{ opacity: aktif ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>

          {catatan && (
            <p className="pt-3 text-center font-label text-[11px] uppercase tracking-[0.14em] text-tinta-lembut opacity-80">
              {catatan}
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
