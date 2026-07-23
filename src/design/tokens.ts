// 치과 — "Enamel". Porcelain / high-key mint. 다섯 사이트 중 유일한 라이트 히어로.
// 도자기처럼 밝은 면, 보더 없는 카드(그림자로 분리), 알약형 칩·버튼, 웜 샌드 액센트.
//
// Literal hexes, NOT `rgb(var(--x) / <alpha-value>)`. Each site has exactly one fixed
// theme, so runtime indirection buys nothing — and sharp/satori cannot resolve CSS
// variables, which would break SVG and OG generation.

export const brand = {
  50: '#EDFCFA', 100: '#D2F7F1', 200: '#A6EEE4', 300: '#6DDFD2', 400: '#33C8BC',
  500: '#12ABA1', 600: '#0A8A83', 700: '#0C6E6A', 800: '#0F5754', 900: '#114846', 950: '#04292A',
} as const;

export const accent = {
  50: '#FCF7EF', 100: '#F9ECD9', 200: '#F5DBB4', 300: '#F0BE7E', 400: '#E7A560',
  500: '#DB8C46', 600: '#B96F31', 700: '#955626', 800: '#7A4520', 900: '#64381C',
} as const;

export const surface = {
  page: '#F6FAFA', card: '#FFFFFF', sunk: '#EDF4F3', inverse: '#0B2B29',
} as const;

export const line = {
  DEFAULT: '#E3EDEC', strong: '#CFE0DE', inverse: 'rgba(255,255,255,0.12)',
} as const;

export const ink = {
  DEFAULT: '#0B1F1E', muted: '#3F5453', soft: '#7A8E8D', onDark: '#EAF7F5',
} as const;

// Platform chips are semantic, never re-themed per site.
export const platform = {
  naverBg: '#E9F7EE', naverFg: '#127A3C',
  kakaoBg: '#FEF6DC', kakaoFg: '#8A6A00',
  googleBg: '#EAF1FE', googleFg: '#1A56C4',
} as const;

export const radius = { sm: '12px', md: '20px', lg: '24px', xl: '28px' } as const;

export const shadow = {
  card: '0 1px 2px rgba(11,43,41,.05), 0 18px 40px -22px rgba(11,43,41,.22)',
  lift: '0 2px 8px rgba(11,43,41,.07), 0 30px 60px -26px rgba(11,43,41,.30)',
} as const;

export const typeTokens = {
  sans: ['var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'Apple SD Gothic Neo',
         'Pretendard', 'Malgun Gothic', 'sans-serif'],
  display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
  mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
  articleMeasure: '66ch',
  articleLeading: '1.85',
  articleSize: '1.0625rem',
} as const;

export function toCssVars(): Record<string, string> {
  const out: Record<string, string> = {};
  const put = (prefix: string, obj: Record<string, string>) => {
    for (const [k, v] of Object.entries(obj)) {
      out[`--${prefix}-${k === 'DEFAULT' ? 'base' : k}`] = v;
    }
  };
  put('brand', brand as unknown as Record<string, string>);
  put('accent', accent as unknown as Record<string, string>);
  put('surface', surface as unknown as Record<string, string>);
  put('line', line as unknown as Record<string, string>);
  put('ink', ink as unknown as Record<string, string>);
  put('platform', platform as unknown as Record<string, string>);
  put('radius', radius as unknown as Record<string, string>);
  out['--article-measure'] = typeTokens.articleMeasure;
  out['--article-leading'] = typeTokens.articleLeading;
  out['--article-size'] = typeTokens.articleSize;
  return out;
}
