// 치과 "Enamel" 홈 — 다섯 사이트 중 유일한 라이트 히어로. 스플릿 히어로(좌 카피 /
// 우 치아 아치 다이어그램), 같은 아치 SVG 위에 상태별 핫스팟 링크를 얹은
// "치아 상태로 찾기" 내비, 임플란트 가격 미리보기 표, 좌 번호 리스트 + 우 스티키
// 일러스트의 분석 프로세스, 카드가 아닌 2열 디바이더 리스트 최신 글.
// 타일 그리드·다크 히어로·방사형 메뉴 없음 — 레이아웃 구조 자체가 다르다.
import Link from 'next/link';
import { getBaseUrl } from '@/lib/site-url';
import { SITE } from '@/lib/site.config';
import { getLatestArticles } from '@/lib/articles';
import { ArchDiagram } from '@/app/components/decor/ArchDiagram';
import { ScanTooth } from '@/app/components/decor/ScanTooth';
import { SpecialtyIcon } from '@/app/components/icons';

export const revalidate = 21600;

const baseUrl = getBaseUrl();

// "치아 상태로 찾기" — 아치 SVG(320x240) 기준 % 좌표 핫스팟
const HOTSPOTS = [
  { slug: 'cavity', state: '검게 패인 자리', left: '16%', top: '43%' },
  { slug: 'orthodontics', state: '삐뚤한 배열', left: '50%', top: '9%' },
  { slug: 'implant', state: '빠진 자리', left: '84%', top: '43%' },
  { slug: 'wisdom-tooth', state: '맨 뒤 통증', left: '83%', top: '84%' },
  { slug: 'full-implant', state: '잇몸 전체', left: '50%', top: '95%' },
] as const;

const IMPLANT_ROWS = [
  { brand: '오스템', origin: '국산', price: '80~120만원' },
  { brand: '덴티움', origin: '국산', price: '90~130만원' },
  { brand: '스트라우만', origin: '스위스', price: '130~180만원' },
  { brand: '노벨바이오케어', origin: '스웨덴', price: '150~200만원' },
];

const PROCESS = [
  { title: '리뷰 수집', body: '네이버 플레이스 방문자 리뷰와 카카오맵·구글맵 평점을 지역 단위로 모읍니다.' },
  { title: '교차 검증', body: '같은 치과를 세 플랫폼에서 찾아 평점과 리뷰 수를 나란히 놓고 비교합니다.' },
  { title: '공식 정보 확인', body: '건강보험심사평가원에 등록된 치과 전문의 수와 진료과목을 확인합니다.' },
  { title: '정리', body: '수집한 데이터만으로 씁니다. 데이터에 없는 경력이나 수상 이력은 쓰지 않습니다.' },
];

export default async function HomePage() {
  let latest: Awaited<ReturnType<typeof getLatestArticles>> = [];
  try { latest = await getLatestArticles(8); } catch { /* not seeded yet */ }

  const generalBlurb = SITE.specialties.find(s => !s.slug)?.blurb;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.siteName,
      url: baseUrl,
      description: SITE.siteDescription,
      inLanguage: 'ko',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.siteName,
      url: baseUrl,
      logo: { '@type': 'ImageObject', url: `${baseUrl}/logo-512.png` },
    },
  ];

  return (
    <div>
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── 라이트 스플릿 히어로: 좌 카피, 우 치아 아치 다이어그램 ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 62% 58% at 76% 30%, rgba(18,171,161,0.13), rgba(18,171,161,0) 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-4 pt-14 pb-16 lg:pt-24 lg:pb-24 grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-surface-card shadow-card px-4 py-1.5 text-xs font-bold text-brand-700 mb-7">
              <span className="w-2 h-2 rounded-[3px] bg-brand-500" />
              {SITE.trustBadge}
            </p>
            <h1 className="text-display-1 font-extrabold tracking-tight text-ink">
              광고 대신 리뷰로 고른
              <br />
              <span className="text-brand-600">우리 동네 치과</span>
            </h1>
            <p className="mt-6 text-ink-muted max-w-lg leading-relaxed">{SITE.siteDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/s/general"
                className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700 transition-colors"
              >
                지역별 치과 보기
              </Link>
              <Link
                href="/pricing"
                className="rounded-full bg-surface-card shadow-card px-6 py-3 text-sm font-bold text-brand-700 hover:shadow-lift transition-shadow"
              >
                임플란트 비용 확인
              </Link>
            </div>
          </div>
          <div className="relative w-full max-w-md mx-auto lg:max-w-none">
            <ArchDiagram mode="hero" className="w-full h-auto" />
            <p className="absolute left-[4%] top-[3%] rounded-full bg-surface-card shadow-card px-3.5 py-2 text-xs font-bold text-ink">
              <span className="text-brand-600">3개 플랫폼</span> 리뷰 교차검증
            </p>
            <p className="absolute right-[2%] bottom-[6%] rounded-full bg-surface-card shadow-card px-3.5 py-2 text-xs font-bold text-ink">
              심평원 <span className="text-brand-600">전문의 정보</span> 확인
            </p>
          </div>
        </div>
      </section>

      {/* ── 치아 상태로 찾기: 같은 아치 SVG + 절대배치 핫스팟 내비 ── */}
      <section className="bg-surface-card py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-display-2 font-extrabold tracking-tight text-ink text-center flex items-center justify-center gap-3">
            <span className="w-2.5 h-2.5 rounded-[4px] bg-brand-500" aria-hidden />
            치아 상태로 찾기
          </h2>
          <p className="text-center text-ink-soft mt-3 max-w-xl mx-auto">
            지금 신경 쓰이는 자리를 누르면 해당 진료를 지역별로 볼 수 있습니다.
          </p>

          <div className="mx-auto mt-10 max-w-xl rounded-xl bg-surface-sunk px-3 py-7 sm:px-8 sm:py-10">
            <div className="relative">
              <ArchDiagram mode="map" className="w-full h-auto" />
              {HOTSPOTS.map(h => {
                const def = SITE.specialties.find(s => s.slug === h.slug);
                if (!def) return null;
                return (
                  <Link
                    key={h.slug}
                    href={`/s/${h.slug}`}
                    style={{ left: h.left, top: h.top }}
                    aria-label={`${def.name} — ${h.state}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full bg-surface-card shadow-card px-2.5 py-2 sm:px-3.5 text-ink hover:shadow-lift hover:text-brand-700 transition-all"
                  >
                    <SpecialtyIcon slug={h.slug} className="w-4 h-4 text-brand-600 flex-none" />
                    <span className="hidden sm:inline text-xs font-bold whitespace-nowrap">
                      <span className="text-ink-soft font-semibold">{h.state}</span> · {def.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 핫스팟 범례 겸 진료항목 내비 */}
          <div className="mx-auto mt-8 max-w-3xl grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SITE.specialties.filter(s => s.slug).map(s => (
              <Link
                key={s.slug}
                href={`/s/${s.slug}`}
                className="group flex items-start gap-3 rounded-md bg-surface-page p-4 hover:bg-brand-50 transition-colors"
              >
                <SpecialtyIcon slug={s.slug} className="w-5 h-5 text-brand-600 flex-none mt-0.5" />
                <span>
                  <span className="block text-sm font-bold text-ink group-hover:text-brand-700">{s.name}</span>
                  {s.blurb ? <span className="block text-xs text-ink-soft mt-0.5 leading-relaxed">{s.blurb}</span> : null}
                </span>
              </Link>
            ))}
            <Link
              href="/s/general"
              className="flex items-start gap-3 rounded-md bg-brand-600 p-4 hover:bg-brand-700 transition-colors"
            >
              <SpecialtyIcon slug="general" className="w-5 h-5 text-white flex-none mt-0.5" />
              <span>
                <span className="block text-sm font-bold text-white">치과 전체</span>
                {generalBlurb ? <span className="block text-xs text-brand-100 mt-0.5 leading-relaxed">{generalBlurb}</span> : null}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 임플란트 가격 미리보기 ── */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-accent-100 px-3.5 py-1.5 text-xs font-bold text-accent-700 mb-5">
              2026년 시세 기준
            </p>
            <h2 className="text-display-2 font-extrabold tracking-tight text-ink">
              임플란트, 브랜드에 따라
              <br className="hidden sm:block" />
              가격대가 갈립니다
            </h2>
            <p className="mt-4 text-ink-muted leading-relaxed max-w-lg">
              1개 기준 시세는 픽스처 브랜드로 크게 나뉩니다. 뼈이식이 필요하면 30~80만원이 별도로
              붙고, 만 65세 이상은 건강보험이 평생 2개까지 적용됩니다.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-ink-muted">
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-[3px] bg-accent-500 flex-none" />
                만 65세 이상 보험 적용 시 본인부담 약 40~50만원
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-[3px] bg-accent-500 flex-none" />
                뼈이식·상악동거상술은 별도 견적으로 확인
              </li>
            </ul>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 mt-7 rounded-full bg-surface-card shadow-card px-5 py-2.5 text-sm font-bold text-brand-700 hover:shadow-lift transition-shadow"
            >
              치과 비용 가이드 전체 보기 →
            </Link>
          </div>
          <div className="rounded-xl bg-surface-card shadow-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-700 text-white">
                  <th className="text-left px-5 py-3.5 text-xs font-bold">픽스처 브랜드</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold">제조</th>
                  <th className="text-right px-5 py-3.5 text-xs font-bold">1개 기준</th>
                </tr>
              </thead>
              <tbody>
                {IMPLANT_ROWS.map((r, i) => (
                  <tr key={r.brand} className={i % 2 ? 'bg-brand-50' : undefined}>
                    <td className="px-5 py-3.5 font-bold text-ink">{r.brand}</td>
                    <td className="px-5 py-3.5 text-ink-soft">{r.origin}</td>
                    <td className="px-5 py-3.5 text-right font-semibold text-ink tabular-nums whitespace-nowrap">{r.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-5 py-3.5 bg-surface-sunk text-xs text-ink-soft leading-relaxed">
              시장 일반 시세의 참고 범위입니다. 식립 부위·뼈 상태·보철 재료에 따라 달라지며, 정확한
              비용은 상담으로 확인하세요.
            </p>
          </div>
        </div>
      </section>

      {/* ── 분석 프로세스: 좌 번호 리스트 + 우 스티키 일러스트 ── */}
      <section className="bg-surface-sunk py-20">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="text-display-2 font-extrabold tracking-tight text-ink">이렇게 분석합니다</h2>
            <p className="mt-3 text-ink-soft max-w-lg">모든 글은 같은 절차를 거칩니다. 순서대로 확인해 보세요.</p>
            <ol className="relative mt-10 space-y-9">
              <span className="absolute left-4 top-2 bottom-2 w-px bg-line-strong" aria-hidden />
              {PROCESS.map((step, i) => (
                <li key={step.title} className="relative pl-14">
                  <span className="absolute left-0 top-0 w-8 h-8 rounded-full bg-brand-600 text-white text-sm font-black grid place-items-center">
                    {i + 1}
                  </span>
                  <h3 className="font-bold text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-muted leading-relaxed max-w-md">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-24 rounded-xl bg-surface-card shadow-card p-10">
              <ScanTooth className="w-full h-auto text-brand-500" />
              <p className="mt-6 text-sm text-ink-muted leading-relaxed text-center">
                리뷰·평점·전문의 정보를 한자리에서 교차 확인합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 최신 글: 카드가 아닌 2열 디바이더 리스트 ── */}
      {latest.length > 0 ? (
        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-display-2 font-extrabold tracking-tight text-ink flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-[4px] bg-brand-500" aria-hidden />
              최신 분석 글
            </h2>
            <Link href="/s/general" className="text-sm font-bold text-brand-700 hover:text-brand-900">
              전체 보기 →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 md:gap-x-14 border-t border-line">
            {latest.map(a => (
              <Link key={a.slug} href={`/${a.slug}`} className="group flex items-center gap-4 border-b border-line py-4">
                <time dateTime={a.publishedAt} className="flex-none w-[4.6rem] text-xs text-ink-soft tabular-nums">
                  {new Date(a.publishedAt).toLocaleDateString('ko')}
                </time>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-bold text-brand-600">
                    {a.region} · {a.specialty}
                  </span>
                  <span className="block truncate font-bold text-ink group-hover:text-brand-700 transition-colors">
                    {a.title}
                  </span>
                </span>
                <span className="flex-none text-brand-300 group-hover:text-brand-600 transition-colors" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
