import type { SiteConfig } from './site.types';

// 치과 — "Enamel". Porcelain / high-key mint-teal. The only site with a LIGHT hero.
//
// NOTE: this site's specialty list is intentionally IDENTICAL to the owner's older
// dental site — 치과 has no other meaningful procedure categories, so the two compete
// head-on on the same queries (confirmed with the owner).
// The collections are fully namespaced (`keywords_dental2` / `articles_dental2`), so
// there is no risk of overwriting the older site's documents. The real risk is
// near-duplicate BODY TEXT, since both scrape the same top-5 Naver clinics for the
// same query. Mitigations: different model (gpt-5.4-mini vs claude-sonnet-5),
// restructured prompt, and a different publish time (review counts drift).
// `npm run verify -- --dupe-check` measures 5-gram Jaccard against the older site.
export const SITE: SiteConfig = {
  key: 'dental2',

  categoryKo: '치과',
  siteName: '에나멜 치과가이드',
  siteTagline: '리뷰로 검증한 우리 동네 치과',
  siteDescription:
    '전국 치과를 네이버·카카오·구글 리뷰와 건강보험심사평가원 전문의 정보로 교차 분석했습니다. 임플란트, 치아교정, 전체임플란트, 사랑니발치, 충치치료까지 지역별로 정리했습니다.',
  trustBadge: '리뷰 3개 플랫폼 교차검증',
  // 5개 사이트가 같은 키를 쓴다. IndexNow는 키 공유를 허용하며, 각 도메인 루트에
  // <키>.txt만 있으면 된다(public 오버레이로 배치). 다만 제출은 도메인별로 따로
  // 해야 한다 — 요청의 host는 하나이고 urlList가 전부 그 host여야 하기 때문이다.
  indexNowKey: '9153a4ab80a3c5357ff7aeffea4749af',

  specialties: [
    { name: '', slug: '', label: '치과 전체', blurb: '지역 치과를 리뷰·전문의 기준으로 한눈에' },
    { name: '임플란트', slug: 'implant', blurb: '식립 개수·브랜드·보증기간으로 갈리는 비용' },
    { name: '치아교정', slug: 'orthodontics', blurb: '메탈·세라믹·투명교정의 기간과 비용 비교' },
    { name: '전체임플란트', slug: 'full-implant', blurb: '무치악에서 선택하는 올온포·틀니 대안' },
    { name: '사랑니발치', slug: 'wisdom-tooth', blurb: '매복 정도에 따라 달라지는 난이도와 보험' },
    { name: '충치치료', slug: 'cavity', blurb: '레진·인레이·크라운의 적용 기준' },
  ],

  categoryHints: ['치과'],
  clinicNameSuffixes: ['치과', '치과의원', '치과병원'],

  credentialLabel: '치과 전문의 수',

  priceContext: {
    implant:
      '임플란트 시세(2026년 기준): 오스템 80~120만원, 덴티움 90~130만원, 스트라우만 130~180만원, 노벨바이오케어 150~200만원(1개). 만 65세 이상은 건강보험이 평생 2개까지 적용되어 본인부담 약 40~50만원. 뼈이식이 필요하면 30~80만원이 별도로 붙습니다.',
    'full-implant':
      '전체임플란트: 올온포(All-on-4) 한 악 기준 1,200~2,500만원, 올온식스 1,800~3,500만원. 임시치아·최종보철 포함 여부로 견적이 크게 달라지므로 총액과 보증기간을 함께 확인해야 합니다.',
    orthodontics:
      '치아교정 시세(2026년 기준): 메탈 350~600만원, 세라믹 500~800만원, 설측(舌側) 800~1,500만원, 투명교정 400~900만원. 기간은 보통 18~30개월이며 유지장치 비용이 별도인 곳이 많습니다.',
    'wisdom-tooth':
      '사랑니 발치: 단순 발치는 건강보험 급여로 본인부담 1~3만원, 완전매복은 5~10만원 수준입니다. 신경관에 근접한 경우 CT 촬영과 대학병원 의뢰가 필요할 수 있습니다.',
    cavity:
      '충치치료: 아말감·글래스아이오노머는 급여로 1~3만원, 레진은 만 12세 이하 영구치에 한해 급여(약 2~5만원)이며 성인은 비급여로 8~15만원. 인레이 25~50만원, 크라운 35~80만원(재료별).',
  },
};
