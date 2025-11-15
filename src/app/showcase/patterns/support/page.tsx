import { ShowcaseDetailLayout } from '../../_components/ShowcaseDetailLayout';

export default function PatternsSupportShowcasePage() {
  return (
    <ShowcaseDetailLayout
      categoryLabel='Patterns · Support Hub'
      title='고객지원 허브 패턴'
      description='셀프서브 문서와 실시간 상담을 하나의 경험으로 묶은 지원 허브 예시입니다.'
      highlights={[
        '문맥 검색 + 추천 문서 UX',
        '티켓 생성 전에 수집하는 필수 정보 설계',
        '상담 후 만족도·후속 액션 안내 흐름',
      ]}
      currentHref='/showcase/patterns/support'
    />
  );
}
