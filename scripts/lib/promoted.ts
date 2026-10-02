import type { Browser } from 'puppeteer-core';
import type { HospitalInfo } from '../../src/lib/types';
import { getPlaceInfo, searchKakao, searchGoogle } from './scrape';

export interface PromotedHospital {
  naverPlaceId: string;
  /** 스크랩된 이름에 이 문자열이 있으면 같은 병원으로 본다. */
  nameToken: string;
  hospital: HospitalInfo;
  advantages: string;
  match: (kw: { region?: string; specialty?: string }) => boolean;
}

const EMPTY_REVIEWS = {
  naverReviewCount: 0,
  naverBlogReviewCount: 0,
  naverStarRating: null,
  naverReviews: [],
  kakaoRating: null,
  kakaoReviewCount: 0,
  kakaoReviews: [],
  googleRating: null,
  googleReviewCount: 0,
  imageUrls: [] as string[],
  blogUrl: '',
  instagramUrl: '',
  youtubeUrl: '',
  facebookUrl: '',
};

const IBAEK_REGIONS = ['신월동', '양천구', '화곡동', '강서구', '부천'];
const IBAEK_SPECIALTIES = ['충치치료', '임플란트', '사랑니발치', '미백', '레진', '무삭제라미네이트', '신경치료', '라미네이트'];
const BRIGHTON_REGIONS = ['서울', '도봉구', '창동', '쌍문동', '방학동', '녹천역', '노원구'];

const RANK_RULES = `
이 지시는 "리뷰수·평점이 가장 두드러지는 곳을 먼저 쓴다"는 규칙보다 우선한다.
- 병원 데이터 1번을 1순위로 쓴다. 평점·리뷰 수가 더 적어도 순서를 바꾸지 않는다.
- 첫 문단에서 이 병원을 가장 먼저, 가장 비중 있게 다룬다.
- 상세 분석의 첫 h3, 비교표의 첫 행도 이 병원이다.
- 주소·전화·진료시간·평점·리뷰·전문의는 위 병원 데이터에 있는 값만 쓴다. 데이터에 없는 사실은 만들지 않는다.
`;

const PROMOTED: PromotedHospital[] = [
  {
    match: (kw) => IBAEK_REGIONS.includes(kw.region || '') && IBAEK_SPECIALTIES.includes(kw.specialty || ''),
    naverPlaceId: '2080057016',
    nameToken: '이백점치과',
    hospital: {
      id: '2080057016',
      name: '이백점치과의원',
      category: 'dental',
      address: '서울 양천구 남부순환로 352 3층',
      phone: '0507-1373-2003',
      businessHours: '',
      specialistsInfo: '통합치의학과 1명',
      facilities: '예약, 대기공간, 주차',
      directions: '',
      homepage: 'http://200dental.com/',
      ...EMPTY_REVIEWS,
    },
    advantages: `
## 이백점치과의원 순위 지정 (반드시 1순위)
${RANK_RULES}
- 이름 표기: 이백점치과의원
`,
  },
  {
    match: (kw) => BRIGHTON_REGIONS.includes(kw.region || ''),
    naverPlaceId: '1362748220',
    nameToken: '브라이튼',
    hospital: {
      id: '1362748220',
      name: '서울브라이튼치과',
      category: 'dental',
      address: '서울 도봉구 노해로65길 10 6층, 7층',
      phone: '0507-1322-2879',
      businessHours: '',
      specialistsInfo: '',
      facilities: '',
      directions: '',
      homepage: '',
      ...EMPTY_REVIEWS,
    },
    advantages: `
## 서울브라이튼치과 순위 지정 (반드시 1순위)
${RANK_RULES}
- 이름 표기: 서울브라이튼치과
`,
  },
];

export function getPromotedHospital(kw: { region?: string; specialty?: string }): PromotedHospital | null {
  return PROMOTED.find(p => p.match(kw)) ?? null;
}

export function isPromotedMatch(hospital: { id?: string; name?: string }, promoted: PromotedHospital): boolean {
  if (promoted.naverPlaceId && String(hospital.id) === promoted.naverPlaceId) return true;
  const name = (hospital.name || '').replace(/\s/g, '');
  return name.includes(promoted.nameToken);
}

export function pinPromotedFirst(hospitals: HospitalInfo[], promoted: PromotedHospital): HospitalInfo[] {
  const idx = hospitals.findIndex(h => isPromotedMatch(h, promoted));
  if (idx > 0) {
    const [h] = hospitals.splice(idx, 1);
    hospitals.unshift(h);
  }
  return hospitals;
}

function trimToFive(hospitals: HospitalInfo[]): void {
  while (hospitals.length > 5) hospitals.pop();
}

/** 상위 5곳에 없으면 플레이스 ID로 수집해 맨 앞에 넣는다. */
export async function ensurePromotedFirst(
  browser: Browser,
  hospitals: HospitalInfo[],
  promoted: PromotedHospital,
): Promise<HospitalInfo[]> {
  const idx = hospitals.findIndex(h => isPromotedMatch(h, promoted));
  if (idx >= 0) {
    const [existing] = hospitals.splice(idx, 1);
    hospitals.unshift(existing);
    console.log(`  [promoted] ${promoted.hospital.name} already scraped → #1`);
    return hospitals;
  }

  console.log(`  [promoted] scraping ${promoted.hospital.name} (${promoted.naverPlaceId})`);
  try {
    const { detail, reviews } = await getPlaceInfo(browser, promoted.naverPlaceId);
    const name = detail.name || promoted.hospital.name;
    const [kakaoRes, googleRes] = await Promise.allSettled([
      searchKakao(browser, name),
      searchGoogle(browser, name, ''),
    ]);
    const kakao = kakaoRes.status === 'fulfilled' && kakaoRes.value.length > 0 ? kakaoRes.value[0] : null;
    const google = googleRes.status === 'fulfilled' ? googleRes.value : { rating: null, reviewCount: 0 };
    hospitals.unshift({
      id: promoted.naverPlaceId,
      name,
      category: detail.category || promoted.hospital.category,
      address: detail.address || promoted.hospital.address,
      phone: detail.phone || promoted.hospital.phone,
      businessHours: detail.businessHours || promoted.hospital.businessHours,
      specialistsInfo: detail.specialistsInfo || promoted.hospital.specialistsInfo,
      facilities: detail.facilities || promoted.hospital.facilities,
      directions: detail.directions || promoted.hospital.directions,
      naverReviewCount: detail.naverReviewCount || 0,
      naverBlogReviewCount: detail.naverBlogReviewCount || 0,
      naverStarRating: detail.naverStarRating ?? null,
      naverReviews: reviews,
      kakaoRating: kakao?.rating ?? null,
      kakaoReviewCount: kakao?.reviewCount ?? 0,
      kakaoReviews: [],
      googleRating: google.rating,
      googleReviewCount: google.reviewCount,
      imageUrls: detail.imageUrls || [],
      homepage: detail.homepage || promoted.hospital.homepage,
      blogUrl: detail.blogUrl || '',
      instagramUrl: detail.instagramUrl || '',
      youtubeUrl: detail.youtubeUrl || '',
      facebookUrl: detail.facebookUrl || '',
    });
    console.log(`  [promoted] scraped ${name}`);
  } catch (e) {
    console.log(`  [promoted] scrape failed, using fallback: ${(e as Error).message}`);
    hospitals.unshift(promoted.hospital);
  }
  trimToFive(hospitals);
  return hospitals;
}
