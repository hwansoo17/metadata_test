import { ShowcaseDetailLayout } from '../../_components/ShowcaseDetailLayout';

export default function PlaybooksLaunchShowcasePage() {
  return (
    <ShowcaseDetailLayout
      categoryLabel='Playbooks · Launch Accelerator'
      title='런치 가속화 플레이북'
      description='신규 기능/서비스 론칭을 빠르게 검증하기 위한 메시지와 채널 전략입니다.'
      highlights={[
        '프리런치 얼리액세스 모집 흐름',
        '런치 주간 캠페인 캘린더',
        '실시간 피드백 수집 보드와 대응 룰',
      ]}
      currentHref='/showcase/playbooks/launch'
    />
  );
}
