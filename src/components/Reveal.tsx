import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/**
 * Pembungkus animasi muncul-saat-digulir.
 *
 * Ini bagian yang hilang total dari keluaran Stitch. Di sana semua animasi
 * berjalan saat halaman dimuat, jadi cerita di bawah sudah selesai beranimasi
 * sebelum sempat dilihat. Di sini animasi baru jalan ketika elemennya
 * benar-benar masuk layar, dan hanya sekali.
 */
export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  const kurangiGerak = useReducedMotion();

  if (kurangiGerak) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
