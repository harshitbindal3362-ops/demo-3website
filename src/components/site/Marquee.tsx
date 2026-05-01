const items = [
  "FREE SHIPPING ACROSS INDIA",
  "NEW DROP — CALI SS26",
  "EST. 2018 · RAJPURA, PUNJAB",
  "OVERSIZED FITS · STREETWEAR ESSENTIALS",
  "WHERE COMFORT MEETS CULTURE",
  "19 STORES NATIONWIDE",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="bg-ink text-bone overflow-hidden border-y border-ink/10">
      <div className="flex marquee-track whitespace-nowrap py-2.5">
        {row.map((t, i) => (
          <span key={i} className="font-display text-sm tracking-[0.15em] px-8 flex items-center gap-8">
            {t}
            <span className="text-neon">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
