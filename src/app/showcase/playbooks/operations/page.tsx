import { ShowcaseDetailLayout } from '../../_components/ShowcaseDetailLayout';

export default function PlaybooksOperationsShowcasePage() {
  return (
    <ShowcaseDetailLayout
      categoryLabel='Playbooks · Ops Modernization'
      title='운영 현대화 플레이북'
      description='운영팀이 데이터를 기반으로 일하고 리스크를 줄이는 방법을 정리했습니다.'
      highlights={[
        '서비스 헬스 모니터링 및 경보 룰',
        '인시던트 대응·소통 스크립트',
        '지속적인 개선을 위한 회고 루프',
      ]}
      currentHref='/showcase/playbooks/operations'
    />
  );
}
