// Enamel — 민트 라운드 스퀘어 타일 + 흰 치아 실루엣 + 민트 도트 하이라이트.
import type { SVGProps } from 'react';

export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="9" fill="#0A8A83" />
      <path
        d="M16 9C14.6 7.6 12.9 6.9 11.3 6.9C8.2 6.9 6.1 9.2 6.1 12.4C6.1 14.4 6.8 16 7.5 17.7C8.3 19.6 8.8 22.3 9.3 24.3C9.6 25.5 11.2 25.6 11.6 24.4C12.2 22.6 12.5 20.2 13.3 18.8C13.9 17.7 14.9 17.1 16 17.1C17.1 17.1 18.1 17.7 18.7 18.8C19.5 20.2 19.8 22.6 20.4 24.4C20.8 25.6 22.4 25.5 22.7 24.3C23.2 22.3 23.7 19.6 24.5 17.7C25.2 16 25.9 14.4 25.9 12.4C25.9 9.2 23.8 6.9 20.7 6.9C19.1 6.9 17.4 7.6 16 9Z"
        fill="#FFFFFF"
      />
      <circle cx="20.6" cy="11.2" r="1.7" fill="#A6EEE4" />
    </svg>
  );
}

export function Wordmark(props: SVGProps<SVGSVGElement>) {
  // 브라우저 렌더 전용(래스터라이즈 없음)이라 <text> 안전.
  return (
    <svg viewBox="0 0 128 20" aria-hidden="true" {...props}>
      <text x="0" y="15.5" fontFamily="inherit" fontSize="15.5" fontWeight="800"
            letterSpacing="-0.02em" fill="currentColor">
        에나멜<tspan fontWeight="600" opacity="0.55"> 치과가이드</tspan>
      </text>
    </svg>
  );
}
