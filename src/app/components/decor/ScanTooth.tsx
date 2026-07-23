// 분석 프로세스 섹션의 스티키 일러스트 — 치아 하나를 스캔 링과 크로스헤어,
// 데이터 포인트가 둘러싼 형태. currentColor 모노톤 지오메트리.
import type { SVGProps } from 'react';

export function ScanTooth(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 240 240" fill="none" aria-hidden="true" {...props}>
      {/* 치아 */}
      <path
        d="M120 66c-10-10-22-15-33-15-22 0-37 16-37 39 0 15 5 27 10 39 6 14 9 33 13 48 2 9 14 10 17 1 4-13 6-30 12-40 4-8 11-12 18-12s14 4 18 12c6 10 8 27 12 40 3 9 15 8 17-1 4-15 7-34 13-48 5-12 10-24 10-39 0-23-15-39-37-39-11 0-23 5-33 15Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* 스캔 링 */}
      <circle cx="120" cy="106" r="72" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 8" opacity="0.55" />
      <circle cx="120" cy="106" r="95" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      {/* 크로스헤어 틱 */}
      <path d="M120 4v11M120 197v11M17 106h11M212 106h11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" opacity="0.6" />
      {/* 데이터 포인트 (3개 플랫폼) */}
      <circle cx="56" cy="53" r="5" fill="currentColor" />
      <circle cx="189" cy="70" r="5" fill="currentColor" opacity="0.7" />
      <circle cx="177" cy="164" r="5" fill="currentColor" opacity="0.45" />
    </svg>
  );
}
