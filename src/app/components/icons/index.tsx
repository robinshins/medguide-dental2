// Enamel icon grammar: 24 viewBox, 1.75 stroke, round caps, 단순한 치아 글리프.
import type { SVGProps } from 'react';

type Icon = (p: SVGProps<SVGSVGElement>) => React.ReactElement;

const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

const TOOTH_PATH =
  'M12 6.6C10.9 5.5 9.7 5 8.5 5C6.1 5 4.5 6.8 4.5 9.3C4.5 10.9 5.1 12.2 5.6 13.4C6.2 14.9 6.6 17 7 18.6C7.2 19.6 8.5 19.7 8.8 18.7C9.2 17.4 9.5 15.6 10.1 14.5C10.6 13.6 11.3 13.2 12 13.2C12.7 13.2 13.4 13.6 13.9 14.5C14.5 15.6 14.8 17.4 15.2 18.7C15.5 19.7 16.8 19.6 17 18.6C17.4 17 17.8 14.9 18.4 13.4C18.9 12.2 19.5 10.9 19.5 9.3C19.5 6.8 17.9 5 15.5 5C14.3 5 13.1 5.5 12 6.6Z';

// 치과 전체 — 건강한 치아
const Tooth: Icon = p => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d={TOOTH_PATH} {...base} />
  </svg>
);

// 임플란트 — 크라운 + 나사산 픽스처
const Implant: Icon = p => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M8.2 4.2h7.6c.5 0 .9.5.8 1l-.5 2.6c-.1.5-.5.8-1 .8H8.9c-.5 0-.9-.3-1-.8l-.5-2.6c-.1-.5.3-1 .8-1Z" {...base} />
    <path d="M9.7 8.6h4.6l-.7 8.9c-.2 1.7-1 3-1.6 3s-1.4-1.3-1.6-3Z" {...base} />
    <path d="M9.9 11h4.2M10.1 13.4h3.8M10.4 15.8h3.1" {...base} />
  </svg>
);

// 치아교정 — 치아 위 브라켓과 와이어
const Braces: Icon = p => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <rect x="5" y="5.2" width="14" height="13.6" rx="4.4" {...base} />
    <path d="M2.4 12h6.4M15.2 12h6.4" {...base} />
    <rect x="8.8" y="9.4" width="6.4" height="5.2" rx="1.3" {...base} />
  </svg>
);

// 전체임플란트 — 전악 아치(4분할)
const FullArch: Icon = p => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M4.6 19.2v-5.8c0-4.4 3.3-7.6 7.4-7.6s7.4 3.2 7.4 7.6v5.8" {...base} />
    <path d="M8.2 19.2v-5c0-2.2 1.7-3.9 3.8-3.9s3.8 1.7 3.8 3.9v5" {...base} />
    <path d="M12 5.8v4.5M6.8 8.2l2.5 2.5M17.2 8.2l-2.5 2.5" {...base} />
  </svg>
);

// 사랑니발치 — 옆 치아 벽에 기울어 매복한 치아
const WisdomTooth: Icon = p => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M3.6 8v6.5" {...base} />
    <g transform="rotate(20 12 12.5)">
      <path d={TOOTH_PATH} {...base} />
    </g>
  </svg>
);

// 충치치료 — 크라운에 생긴 우식점
const Cavity: Icon = p => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d={TOOTH_PATH} {...base} />
    <circle cx="15.1" cy="9.4" r="1.6" fill="currentColor" stroke="none" />
  </svg>
);

const REGISTRY: Record<string, Icon> = {
  general: Tooth,
  implant: Implant,
  orthodontics: Braces,
  'full-implant': FullArch,
  'wisdom-tooth': WisdomTooth,
  cavity: Cavity,
};

export function SpecialtyIcon({ slug, className }: { slug: string; className?: string }) {
  const C = REGISTRY[slug] ?? Tooth;
  return <C className={className} focusable="false" />;
}
