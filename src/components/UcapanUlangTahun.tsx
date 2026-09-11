import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface UcapanUlangTahunProps {
  teks: string;
  /** Dipanggil sekali, saat ucapan benar-benar masuk layar. */
  onMuncul: () => void;
}

interface Percikan {
  x: number;
  y: number;
  ukuran: number;
  delay: number;
  bintang: boolean;
  warna: string;
}

function buatPercikan(jumlah: number): Percikan[] {
  return Array.from({ length: jumlah }, (_, i) => {
    const sudut = (i / jumlah) * Math.PI * 2 + Math.random() * 0.4;
    const jarak = 90 + Math.random() * 90;
    const bintang = i % 3 === 0;
    return {
      x: Math.cos(sudut) * jarak,
      // Sedikit pipih, mengikuti bentuk tulisan yang melebar
      y: Math.sin(sudut) * jarak * 0.6,
      ukuran: bintang ? 8 + Math.random() * 4 : 3 + Math.random() * 3,
      delay: 0.35 + Math.random() * 0.35,
      bintang,
      warna: i % 4 === 1 ? "text-gading" : "text-lampu",
    };
  });
}

/**
 * Puncak halaman. Begitu ucapan masuk layar: cahaya hangat mekar di
 * belakangnya, kata-katanya muncul satu per satu dari buram ke tajam,
 * percikan emas memancar sekali lalu luruh, dan kilau tipis sesekali
 * menyapu tulisannya.
 */
export function UcapanUlangTahun({ teks, onMuncul }: UcapanUlangTahunProps) {
  const ref = useRef<HTMLDivElement>(null);
  const muncul = useInView(ref, { once: true, amount: 0.6 });
  const kurangiGerak = useReducedMotion();
  const [percikan] = useState(() => buatPercikan(26));

  useEffect(() => {
    if (muncul) onMuncul();
  }, [muncul, onMuncul]);

  const judulClass = "relative font-judul text-[34px] leading-[1.25] text-lampu";
  const cahayaTeks = { filter: "drop-shadow(0 0 18px rgba(232,180,74,0.35))" };

  if (kurangiGerak) {
    return (
      <div ref={ref} className="mt-14">
        <h2 className={judulClass} style={cahayaTeks}>
          {teks}
        </h2>
      </div>
    );
  }

  const kata = teks.split(" ");

  return (
    <div ref={ref} className="relative mt-14 flex justify-center">
      {/* Cahaya hangat yang mekar di belakang tulisan */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] rounded-full"
        style={{
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(232,180,74,0.30) 0%, rgba(232,180,74,0.10) 40%, transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={muncul ? { opacity: [0, 1, 0.7], scale: [0.3, 1.15, 1] } : undefined}
        transition={{ duration: 2.4, ease: "easeOut", times: [0, 0.45, 1] }}
      />

      {/* Percikan emas yang memancar sekali */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
        {percikan.map((p, i) => (
          <motion.span
            key={i}
            className={`absolute ${p.warna}`}
            style={{
              width: p.ukuran,
              height: p.ukuran,
              left: -p.ukuran / 2,
              top: -p.ukuran / 2,
            }}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={
              muncul
                ? {
                    opacity: [0, 1, 1, 0],
                    x: [0, p.x, p.x * 1.08],
                    y: [0, p.y, p.y + 50],
                    scale: [0, 1, 0.5],
                  }
                : undefined
            }
            transition={{ duration: 2.6, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
          >
            {p.bintang ? (
              <svg viewBox="0 0 10 10" className="h-full w-full" fill="currentColor">
                <path d="M5 0 6 4 10 5 6 6 5 10 4 6 0 5 4 4Z" />
              </svg>
            ) : (
              <span
                className="block h-full w-full rounded-full bg-current"
                style={{ boxShadow: "0 0 6px rgba(232,180,74,0.8)" }}
              />
            )}
          </motion.span>
        ))}
      </div>

      <h2 className={judulClass} style={cahayaTeks} aria-label={teks}>
        {kata.map((k, i) => (
          <Fragment key={i}>
            <motion.span
              aria-hidden="true"
              className="inline-block"
              initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
              animate={muncul ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className={muncul ? "kilau" : undefined}
                style={{ animationDelay: `${1.3 + i * 0.12}s` }}
              >
                {k}
              </span>
            </motion.span>
            {i < kata.length - 1 && " "}
          </Fragment>
        ))}
      </h2>
    </div>
  );
}

/** Titik-titik cahaya yang pelan naik di latar malam, setelah ucapan muncul. */
export function KunangKunang() {
  const kurangiGerak = useReducedMotion();
  const [titik] = useState(() =>
    Array.from({ length: 18 }, () => ({
      kiri: Math.random() * 100,
      atas: 15 + Math.random() * 80,
      ukuran: 2 + Math.random() * 3,
      durasi: 7 + Math.random() * 6,
      jeda: Math.random() * 5,
      geser: (Math.random() - 0.5) * 50,
    })),
  );

  if (kurangiGerak) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {titik.map((t, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-lampu"
          style={{
            left: `${t.kiri}%`,
            top: `${t.atas}%`,
            width: t.ukuran,
            height: t.ukuran,
            boxShadow: "0 0 10px 2px rgba(232,180,74,0.45)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.75, 0], y: [0, -110], x: [0, t.geser] }}
          transition={{ duration: t.durasi, delay: t.jeda, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
