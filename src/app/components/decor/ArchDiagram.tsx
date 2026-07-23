// 교합면에서 내려다본 치아 아치 — Enamel 사이트 시그니처. 16개 치아를 개별
// 라운드 패스로 아치에 배열한다.
//   mode="hero" — 건강한 배열 + 샌드 액센트 치아 하나
//   mode="map"  — 상태 표현: 빠진 자리(점선), 충치점, 삐뚤한 앞니, 기운 사랑니.
//                 홈에서 이 위에 절대배치 핫스팟 링크를 얹는다.
import type { SVGProps } from 'react';
import { accent, brand, surface } from '@/design/tokens';

const CX = 160;
const CY = 158;
const RX = 120;
const RY = 124;
const N = 16;

// index 0 = 왼쪽 맨 뒤(사랑니) → 15 = 오른쪽 맨 뒤. [width, height]
const SIZE: ReadonlyArray<readonly [number, number]> = [
  [30, 35], [28, 33], [26, 32], [24, 31], [22, 29], [20, 28], [19, 28], [19, 29],
  [19, 29], [19, 28], [20, 28], [22, 29], [24, 31], [26, 32], [28, 33], [30, 35],
];

function seat(i: number, push = 0) {
  const deg = 197 - (i * 214) / (N - 1);
  const rad = (deg * Math.PI) / 180;
  return {
    x: CX + (RX + push) * Math.cos(rad),
    y: CY - (RY + push) * Math.sin(rad),
    rot: 90 - deg,
  };
}

type ArchProps = { mode?: 'hero' | 'map' } & SVGProps<SVGSVGElement>;

export function ArchDiagram({ mode = 'hero', ...props }: ArchProps) {
  const map = mode === 'map';
  return (
    <svg viewBox="0 0 320 240" fill="none" aria-hidden="true" {...props}>
      {/* 잇몸 라인 가이드 (안쪽 점선 아치) */}
      <path
        d="M60 193A100 112 0 1 1 260 193"
        stroke={brand[200]}
        strokeWidth="1.5"
        strokeDasharray="3 7"
        strokeLinecap="round"
      />
      {Array.from({ length: N }, (_, i) => {
        const missing = map && i === 12;
        const cavity = map && i === 3;
        const rogue = map && i === 6;
        const wisdom = map && (i === 0 || i === 15);
        const spotlight = !map && i === 10;
        const { x, y, rot } = seat(i, rogue ? 8 : 0);
        const tilt = wisdom ? (i === 0 ? -18 : 18) : rogue ? 14 : 0;
        const [w, h] = SIZE[i];
        const rx = Math.min(w, h) * 0.42;
        return (
          <g key={i} transform={`rotate(${(rot + tilt).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})`}>
            <rect
              x={(x - w / 2).toFixed(1)}
              y={(y - h / 2).toFixed(1)}
              width={w}
              height={h}
              rx={rx.toFixed(1)}
              fill={missing ? 'none' : spotlight ? accent[300] : surface.card}
              stroke={missing ? brand[400] : spotlight ? accent[600] : brand[300]}
              strokeWidth="1.6"
              strokeDasharray={missing ? '4 4' : undefined}
            />
            {cavity ? (
              <circle
                cx={(x + w * 0.16).toFixed(1)}
                cy={(y - h * 0.12).toFixed(1)}
                r="3.4"
                fill={brand[900]}
              />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
