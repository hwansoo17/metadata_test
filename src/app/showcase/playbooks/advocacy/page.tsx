import { ShowcaseDetailLayout } from '../../_components/ShowcaseDetailLayout';

export default function PlaybooksAdvocacyShowcasePage() {
  return (
    <ShowcaseDetailLayout
      categoryLabel='Playbooks · Advocacy Program'
      title='옹호자 프로그램 플레이북'
      description='고객 레퍼런스 확보와 커뮤니티 운영 프로세스를 체계화했습니다.'
      highlights={[
        '후보 발굴 기준과 초대 메시지 시퀀스',
        '콘텐츠/웹세미나 참여 인센티브 설계',
        '커뮤니티 온보딩과 온라인 이벤트 운영 팁',
      ]}
      currentHref='/showcase/playbooks/advocacy'
    />
  );
}
