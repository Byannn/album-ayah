interface AudioToggleProps {
  diam: boolean;
  onToggle: () => void;
  nada?: "terang" | "gelap";
}

/**
 * Tombol matikan suara. Ikonnya SVG langsung di dalam kode,
 * jadi tidak perlu memuat Material Symbols dari jaringan.
 * Ukurannya 44px supaya nyaman ditekan jempol.
 */
export function AudioToggle({ diam, onToggle, nada = "terang" }: AudioToggleProps) {
  const warna = nada === "terang" ? "text-tinta-lembut" : "text-malam-lembut";

  return (
    <button
      onClick={onToggle}
      aria-label={diam ? "Nyalakan musik" : "Matikan musik"}
      title={diam ? "Nyalakan musik" : "Matikan musik"}
      className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 active:scale-90 ${warna} hover:bg-black/5`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5 6 9H2v6h4l5 4V5z" />
        {diam ? (
          <>
            <line x1="22" y1="9" x2="16" y2="15" />
            <line x1="16" y1="9" x2="22" y2="15" />
          </>
        ) : (
          <>
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </>
        )}
      </svg>
    </button>
  );
}
