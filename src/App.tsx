import { useState, useRef } from "react";

// ── SVG 아이콘 ──
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    home: <><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></>,
    list: <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
    wallet: <><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M16 14a1 1 0 100-2 1 1 0 000 2z" fill={color}/><path d="M22 10H2"/><path d="M6 2l-4 4h20L18 2"/></>,
    book: <><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5" fill={color}/><polyline points="21 15 16 10 5 21"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    chevronDown: <><polyline points="6 9 12 15 18 9"/></>,
    chevronRight: <><polyline points="9 18 15 12 9 6"/></>,
    lightbulb: <><path d="M9 21h6M12 3a6 6 0 016 6c0 2.22-1.21 4.16-3 5.2V17a1 1 0 01-1 1H10a1 1 0 01-1-1v-2.8C7.21 13.16 6 11.22 6 9a6 6 0 016-6z"/></>,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    camera: <><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></>,
    heart: <><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></>,
    chat: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    fire: <><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/></>,
    tool: <><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></>,
    snow: <><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5l-5 5-5-5M17 19l-5-5-5 5"/><path d="M2 12l5-5 5 5-5 5zM22 12l-5-5-5 5 5 5z"/></>,
    shower: <><path d="M4 12H2a10 10 0 0020 0h-2"/><path d="M12 2v4"/><path d="M4.93 4.93l2.83 2.83M17.07 4.93l-2.83 2.83"/><path d="M8 16v2M12 16v4M16 16v2"/></>,
    kitchen: <><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></>,
    floor: <><rect x="2" y="14" width="20" height="8" rx="1"/><path d="M6 14V4a2 2 0 012-2h8a2 2 0 012 2v10"/><path d="M6 8h12"/></>,
    paint: <><path d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/><path d="M7 7h10M7 12h5M7 17h3"/></>,
    zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    door: <><path d="M3 21h18"/><rect x="7" y="3" width="10" height="18" rx="1"/><circle cx="14" cy="12" r="1" fill={color}/></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    prepare: <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></>,
    balcony: <><path d="M3 21h18M3 7v14M21 7v14M3 7a9 9 0 0118 0"/><path d="M9 21V11h6v10"/></>,
    elevator: <><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 10l3-3 3 3M9 14l3 3 3-3"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

// ── 데이터 ──
const PHASES = [
  {
    id: 1, iconName: "prepare", name: "사전 준비", duration: "2~3주",
    tasks: [
      { id: "1-1", name: "평면도 확보 (관리사무소 요청)", tip: "무료로 받을 수 있어요." },
      { id: "1-2", name: "인테리어 스타일 결정", tip: "Pinterest, 오늘의집에서 사진 10장 저장 후 공통점 찾기." },
      { id: "1-3", name: "공사 범위 결정 및 예산 설정", tip: "예비비 10%는 반드시 확보하세요!" },
      { id: "1-4", name: "관리사무소 공사 신청 및 승인", tip: "공사 가능 시간, 층간소음 규정, 폐기물 처리 방법 꼭 확인." },
      { id: "1-5", name: "엘리베이터 보양 신청", tip: "미신청 시 손상 비용 배상 책임이 생길 수 있어요. 관리사무소에 꼭 신청하세요." },
      { id: "1-6", name: "이웃 동의서 징구 (위·아래·옆 세대)", tip: "법적 의무는 아니나 분쟁 예방 필수! 동·호수, 공사기간, 연락처를 적은 동의서를 직접 받아두세요." },
      { id: "1-7", name: "발코니 확장 여부 결정 및 구청 신고", tip: "확장 시 단열·방염 자재 사용 의무가 있어요." },
      { id: "1-8", name: "소방 시설 변경 신고 (해당 시)", tip: "임의 변경은 불법. 화재 시 보험 미적용 될 수 있어요." },
      { id: "1-9", name: "이사 일정 조율", tip: "공사는 보통 1~2주 더 걸려요. 여유 있게 잡으세요." },
    ],
    points: ["공사 가능 요일/시간 확인 (보통 평일 9~17시)", "엘리베이터 보양 신청 완료 여부", "이웃 동의서 수령 완료 여부", "발코니 확장 시 구청 신고 여부"],
  },
  {
    id: 2, iconName: "balcony", name: "발코니 확장 & 소방", duration: "1~2일",
    tasks: [
      { id: "2-1", name: "발코니 샷시 철거 또는 교체", tip: "단열 샷시로 교체. 이중창 이상 권장." },
      { id: "2-2", name: "발코니 단열재 시공", tip: "단열재 두께 최소 50mm 이상. 미시공 시 결로·곰팡이 원인." },
      { id: "2-3", name: "방염 자재 확인 및 시공", tip: "방염 성능 시험 합격 제품인지 반드시 확인하세요." },
      { id: "2-4", name: "화재 감지기 위치 확인·이설", tip: "확장 후 감지기 위치 재조정 필요. 소방시설 업체에 문의." },
      { id: "2-5", name: "스프링클러 헤드 이설 (해당 시)", tip: "소방시설 등록업체만 작업 가능해요." },
      { id: "2-6", name: "완강기·피난 설비 재설치", tip: "확장 후에도 사용 가능 위치에 재설치 필수!" },
      { id: "2-7", name: "소방 완료 검사 (해당 시)", tip: "검사 전 가구 반입하지 마세요." },
    ],
    points: ["방염 자재 사용 여부 (방염 성능 시험 합격품)", "감지기·스프링클러 이설 시 소방서 신고", "완강기·피난 설비 접근 가능 여부", "단열재 두께 50mm 이상"],
  },
  {
    id: 3, iconName: "tool", name: "철거", duration: "1~2일",
    tasks: [
      { id: "3-1", name: "철거 전 전체 사진 촬영", tip: "분쟁 방지를 위해 모든 면 촬영." },
      { id: "3-2", name: "기존 바닥재·벽지 제거", tip: "타일 철거 시 소음이 크므로 이웃에 미리 알리세요." },
      { id: "3-3", name: "몰딩·걸레받이 제거", tip: "재사용 가능한 몰딩은 분리 보관하면 절약." },
      { id: "3-4", name: "철거 폐기물 처리", tip: "폐기물 스티커는 구청 또는 편의점에서 구매." },
    ],
    points: ["콘크리트 균열 확인", "누수·곰팡이 흔적 확인", "바닥 레벨 차이 측정"],
  },
  {
    id: 4, iconName: "zap", name: "설비 (전기·배관)", duration: "2~3일",
    tasks: [
      { id: "4-1", name: "전기 분전함 점검 및 업그레이드", tip: "자격증 보유자만 작업 가능!" },
      { id: "4-2", name: "콘센트·스위치 위치 변경/추가", tip: "침대 양옆, TV 뒤, 주방 위치 미리 계획." },
      { id: "4-3", name: "조명 배선 계획 및 작업", tip: "도면에 위치 표시 후 작업하세요." },
      { id: "4-4", name: "난방 분배기 점검", tip: "각 방 밸브 열고 닫히는지 확인." },
      { id: "4-5", name: "인터넷·TV 배선 계획", tip: "숨긴 배선은 이 단계에서만 가능!" },
    ],
    points: ["에어컨 전용 콘센트(220V 20A) 위치 확인", "누수 없는지 가압 테스트", "전기 용량 확인"],
  },
  {
    id: 5, iconName: "snow", name: "에어컨", duration: "1일",
    tasks: [
      { id: "5-1", name: "에어컨 종류·위치 결정", tip: "도배·바닥 전에 반드시 먼저 설치!" },
      { id: "5-2", name: "실외기 위치 확인 (관리사무소 규정)", tip: "아파트마다 설치 가능 위치가 정해져 있어요." },
      { id: "5-3", name: "배관 홀 작업 (벽 천공)", tip: "철거 직후에 하면 깔끔하게 작업 가능." },
      { id: "5-4", name: "에어컨 본체·실외기 설치", tip: "천장 매립형은 도배 전에 완료해야 해요." },
      { id: "5-5", name: "배관·배선 연결 및 시운전", tip: "설치 후 바로 냉난방 테스트 필수!" },
      { id: "5-6", name: "배관 마감 처리", tip: "노출 배관은 에어컨 배관 커버로 마감." },
    ],
    points: ["전용 콘센트 여부 (멀티탭 금지)", "배수 경사 확인", "실외기 환기 공간 최소 30cm"],
  },
  {
    id: 6, iconName: "shower", name: "욕실", duration: "3~5일",
    tasks: [
      { id: "6-1", name: "욕실 철거 (수도 밸브 먼저 잠금)", tip: "철거 전 수도 밸브 잠그는 것 필수!" },
      { id: "6-2", name: "방수 작업 (2회 이상 도포)", tip: "방수는 절대 서두르지 마세요." },
      { id: "6-3", name: "타일 시공 (바닥·벽)", tip: "줄눈 색상이 전체 분위기를 좌우해요." },
      { id: "6-4", name: "변기·세면대·수전 설치", tip: "수전 높이는 사용자 키에 맞게 결정." },
      { id: "6-5", name: "조명·환풍기 설치", tip: "욕실 조명은 방수등급(IP44 이상) 확인 필수!" },
      { id: "6-6", name: "누수 테스트 (24시간)", tip: "물 채워 24시간 후 아래층 확인." },
    ],
    points: ["방수 테스트 필수", "하수구 경사 확인", "타일 공동음 확인 (두드려보기)"],
  },
  {
    id: 7, iconName: "kitchen", name: "주방 & 가구 주문", duration: "2~4일",
    tasks: [
      { id: "7-1", name: "싱크대·주방가구 디자인 결정 (3곳 이상 견적)", tip: "상판 종류(세라믹/스테인리스/인조대리석)가 가격 차이의 핵심이에요." },
      { id: "7-2", name: "붙박이장 위치·사이즈 측정 및 주문", tip: "제작 기간 3~4주! 철거 직후 바로 주문해야 공정 지연이 없어요. 도배 전 설치가 원칙." },
      { id: "7-3", name: "신발장 위치·사이즈 측정 및 주문", tip: "맞춤 제작 시 도배 전에 주문 필수. 기성품은 도배 후 반입 가능." },
      { id: "7-4", name: "드레스룸·팬트리 수납장 주문 (해당 시)", tip: "바닥재 시공 후 설치하는 경우가 많아요. 업체에 설치 순서 미리 확인하세요." },
      { id: "7-5", name: "가구 업체 실측 방문 일정 잡기", tip: "실측은 반드시 현장에서! 도면만으로 주문하면 오차가 생겨요." },
      { id: "7-6", name: "주방 타일 시공", tip: "기름 때 관리 쉬운 광택 타일 추천." },
      { id: "7-7", name: "싱크대·주방가구 설치", tip: "설치 전 수도·배수·전기 위치 최종 확인!" },
      { id: "7-8", name: "후드·가스레인지/인덕션 설치", tip: "인덕션은 전용 콘센트(220V 30A) 필요." },
    ],
    points: [
      "붙박이장·신발장 제작 기간(3~4주) 고려해 일찍 주문",
      "냉장고 공간 치수 정확히 확인",
      "후드 배기 방향 (외벽으로)",
      "싱크대 배수 누수 테스트",
      "가구 설치 순서 업체와 사전 협의",
    ],
  },
  {
    id: 8, iconName: "floor", name: "바닥 시공", duration: "1~2일",
    tasks: [
      { id: "8-1", name: "바닥 레벨링 (미장/셀프레벨링)", tip: "5mm 이상 단차는 평탄화 필수. 건조 24시간 이상!" },
      { id: "8-2", name: "바닥재 선택 및 입고 (48시간 순응)", tip: "시공 48시간 전 현장에 펼쳐두어야 뒤틀림 방지." },
      { id: "8-3", name: "바닥재 시공", tip: "문틀 밑 언더컷 필수. 안 하면 문이 안 닫혀요." },
      { id: "8-4", name: "걸레받이 시공", tip: "바닥재 색과 어울리는 걸레받이 선택." },
    ],
    points: ["바닥 수분 함량 확인 (8% 이하)", "문 개폐 여부 확인", "이음매 들뜸 없는지 확인"],
  },
  {
    id: 9, iconName: "paint", name: "도배 & 페인트", duration: "1~2일",
    tasks: [
      { id: "9-1", name: "바닥 보양 (비닐·골판지)", tip: "도배 풀이 바닥에 묻으면 얼룩 생겨요." },
      { id: "9-2", name: "초배지·퍼티 작업", tip: "울퉁불퉁한 곳은 퍼티로 메우고 초배지로 마감." },
      { id: "9-3", name: "벽지 시공", tip: "밝은 색 벽지가 공간을 넓어 보이게 해요." },
      { id: "9-4", name: "포인트 벽·천장 도배/페인트", tip: "페인트는 DIY 가능! 마스킹 테이프가 핵심." },
      { id: "9-5", name: "24시간 이상 환기", tip: "숯이나 커피 찌꺼기 활용하면 냄새 제거에 도움." },
    ],
    points: ["벽지 이음매 들뜸 없는지", "기포 없는지 전체 확인", "창문·콘센트 주변 마감 상태"],
  },
  {
    id: "9b", iconName: "door", name: "붙박이장 & 신발장 설치", duration: "1~2일",
    tasks: [
      { id: "9b-1", name: "붙박이장 입고 및 설치 (도배 후)", tip: "도배 완료 후 설치해야 벽지가 눌리지 않아요. 업체에 일정 미리 맞춰두세요." },
      { id: "9b-2", name: "신발장 설치 (현관)", tip: "현관 바닥 마감재 시공 후 설치가 원칙. 수평 확인 필수!" },
      { id: "9b-3", name: "드레스룸 수납장 설치 (해당 시)", tip: "드레스룸은 가장 마지막에 설치해도 무방해요. 바닥재 위에 올리면 돼요." },
      { id: "9b-4", name: "팬트리·다용도실 수납장 설치 (해당 시)", tip: "주방과 연결되는 팬트리는 싱크대와 같은 마감재로 맞추면 통일감이 있어요." },
      { id: "9b-5", name: "가구 문짝·레일 작동 확인", tip: "서랍·미닫이 레일이 부드럽게 작동하는지 전부 확인하세요." },
      { id: "9b-6", name: "가구 내부 실리콘 마감", tip: "가구와 벽 사이 틈새 실리콘 마감하면 먼지 쌓임 방지." },
    ],
    points: [
      "도배 완전 건조 후 설치 (최소 48시간)",
      "수평·수직 확인 (가구가 기울면 문이 안 닫힘)",
      "벽 고정 앵커 볼트 체결 여부 (안전)",
      "문짝·서랍 레일 전부 작동 확인",
      "현관 신발장 높이가 도어 개폐에 방해 없는지",
    ],
  },
  {
    id: 10, iconName: "zap", name: "조명 & 전기 마감", duration: "1일",
    tasks: [
      { id: "10-1", name: "조명 기구 선택·구매", tip: "거실 3000K 추천. 숫자 낮을수록 따뜻한 빛." },
      { id: "10-2", name: "다운라이트·간접조명 설치", tip: "간격 1~1.2m, 대칭 배치하면 깔끔해요." },
      { id: "10-3", name: "메인 조명·펜던트 설치", tip: "식탁 위 펜던트는 식탁 면에서 70~80cm." },
      { id: "10-4", name: "스위치·콘센트 커버 교체", tip: "화이트/블랙으로 바꾸면 분위기 확 달라져요!" },
    ],
    points: ["누전차단기 정상 작동", "모든 콘센트 전압 확인", "욕실 조명 방수 등급 확인"],
  },
  {
    id: 11, iconName: "door", name: "문 & 창호", duration: "1일",
    tasks: [
      { id: "11-1", name: "방문 교체 or 필름 부착", tip: "도어 필름으로 비용 70% 절약 가능!" },
      { id: "11-2", name: "문손잡이 교체", tip: "레버형으로 교체 시 DIY 가능!" },
      { id: "11-3", name: "창문 단열 필름 시공", tip: "DIY 가능. 냉난방비 절약 효과." },
      { id: "11-4", name: "방충망·현관 실링재 교체", tip: "현관 틈새 실링이 단열에 큰 역할." },
    ],
    points: ["문 삐걱 소리 없는지", "창문 잠금장치 작동 확인"],
  },
  {
    id: 12, iconName: "star", name: "최종 마감", duration: "1~2일",
    tasks: [
      { id: "12-1", name: "실리콘 마감 (욕실·주방·창호)", tip: "마스킹 테이프로 라인 잡고 일자로 당기면 깔끔!" },
      { id: "12-2", name: "전체 청소 (천장→벽→바닥 순)", tip: "먼지가 아래로 떨어지니 순서 지키세요." },
      { id: "12-3", name: "스크래치·흠집 보수", tip: "바닥 스크래치는 전용 마커로 처리." },
      { id: "12-4", name: "소방 감지기·완강기 최종 확인", tip: "공사 중 이동한 소방 시설 정상 위치 확인. 커버 씌운 채로 두면 화재 감지 안 돼요!" },
      { id: "12-5", name: "엘리베이터 보양재 반납 및 원상복구", tip: "담당자와 함께 훼손 여부 확인 후 반납하세요." },
      { id: "12-6", name: "가전·가구 반입", tip: "대형가전은 엘리베이터 재예약 필요할 수 있어요." },
      { id: "12-7", name: "완공 사진 촬영 및 하자 목록 작성", tip: "업체 AS 연락처와 함께 정리해 두세요." },
    ],
    points: ["하자보수 요청 목록 작성", "각 업체 AS 연락처 정리", "보증서·영수증 보관", "소방 시설 정상 복구 여부", "엘리베이터 보양재 반납 완료"],
  },
];

const BUDGET = [
  { id: "b1", name: "철거·폐기물", iconName: "tool", amount: 500000 },
  { id: "b2", name: "발코니 확장·소방", iconName: "fire", amount: 1500000 },
  { id: "b3", name: "설비(전기·배관)", iconName: "zap", amount: 800000 },
  { id: "b4", name: "에어컨", iconName: "snow", amount: 1500000 },
  { id: "b5", name: "욕실", iconName: "shower", amount: 2000000 },
  { id: "b6", name: "주방·싱크대", iconName: "kitchen", amount: 1500000 },
  { id: "b7", name: "붙박이장·신발장", iconName: "door", amount: 1800000 },
  { id: "b8", name: "바닥재", iconName: "floor", amount: 1200000 },
  { id: "b9", name: "도배·페인트", iconName: "paint", amount: 700000 },
  { id: "b10", name: "조명·전기마감", iconName: "zap", amount: 600000 },
  { id: "b11", name: "문·창호", iconName: "door", amount: 400000 },
  { id: "b12", name: "예비비", iconName: "alert", amount: 1000000 },
];

const SAMPLE_POSTS = [
  { id: 1, user: "김지현", space: "거실", phase: "완공", desc: "강마루 + 화이트 도배 조합이에요. 생각보다 따뜻한 느낌이 나서 만족!", likes: 24, comments: [{ user: "박민준", text: "강마루 어디 거 쓰셨나요? 저도 비슷한 스타일 원해서요!" }, { user: "이소연", text: "정말 깔끔하네요 👍" }], bg: "#E8E4DF" },
  { id: 2, user: "박민준", space: "욕실", phase: "시공중", desc: "포세린 타일로 시공했어요. 줄눈 색은 밝은 회색 선택. 생각보다 작업이 오래 걸렸어요.", likes: 17, comments: [{ user: "김지현", text: "타일 브랜드가 어디인가요?" }], bg: "#DDE4E8" },
  { id: 3, user: "이소연", space: "주방", phase: "완공", desc: "상판은 세라믹으로 했어요. 열에 강하고 관리가 편해요. 비용이 좀 들어도 후회 없어요!", likes: 31, comments: [], bg: "#E4E8DD" },
];

// ── 메인 앱 ──
export default function App() {
  const [tab, setTab] = useState("home");
  const [done, setDone] = useState({});
  const [open, setOpen] = useState(null);
  const [activeTip, setActiveTip] = useState(null);
  const [paid, setPaid] = useState({});
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [newComment, setNewComment] = useState({});
  const [liked, setLiked] = useState({});
  const [openPost, setOpenPost] = useState(null);

  const totalTasks = PHASES.flatMap(p => p.tasks).length;
  const doneCount = Object.values(done).filter(Boolean).length;
  const pct = Math.round((doneCount / totalTasks) * 100);
  const curPhaseIdx = PHASES.findIndex(p => p.tasks.some(t => !done[t.id]));
  const curPhase = PHASES[Math.max(curPhaseIdx, 0)];

  const phaseProgress = (phase) => {
    const d = phase.tasks.filter(t => done[t.id]).length;
    return Math.round((d / phase.tasks.length) * 100);
  };

  const totalAmt = BUDGET.reduce((s, b) => s + b.amount, 0);
  const paidAmt = BUDGET.filter(b => paid[b.id]).reduce((s, b) => s + b.amount, 0);

  const addComment = (postId) => {
    const text = newComment[postId];
    if (!text?.trim()) return;
    setPosts(prev => prev.map(p => p.id === postId
      ? { ...p, comments: [...p.comments, { user: "나", text }] }
      : p
    ));
    setNewComment(prev => ({ ...prev, [postId]: "" }));
  };

  const toggleLike = (postId) => {
    setLiked(prev => ({ ...prev, [postId]: !prev[postId] }));
    setPosts(prev => prev.map(p => p.id === postId
      ? { ...p, likes: p.likes + (liked[postId] ? -1 : 1) }
      : p
    ));
  };

  // ── 스타일 상수 ──
  const C = {
    bg: "#F6F5F3",
    surface: "#FFFFFF",
    border: "#EBEBEB",
    text: "#1A1A1A",
    sub: "#888888",
    muted: "#BBBBBB",
    accent: "#1A1A1A",
    header: "#FFFFFF",
  };

  const navItems = [
    { key: "home", icon: "home", label: "홈" },
    { key: "process", icon: "list", label: "공정" },
    { key: "budget", icon: "wallet", label: "비용" },
    { key: "myhome", icon: "image", label: "마이홈" },
    { key: "docs", icon: "book", label: "자료실" },
    { key: "guide", icon: "star", label: "가이드" },
  ];

  return (
    <div style={{ fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 390, margin: "0 auto", paddingBottom: 80 }}>

      {/* ── HOME ── */}
      {tab === "home" && (
        <div>
          {/* 헤더 */}
          <div style={{ background: C.surface, padding: "56px 24px 28px", borderBottom: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 11, letterSpacing: 4, color: C.muted, margin: "0 0 6px", fontWeight: 600 }}>INTERIOR GUIDE</p>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: "0 0 4px", letterSpacing: -0.5 }}>반셀프 인테리어</h1>
            <p style={{ fontSize: 13, color: C.sub, margin: 0 }}>아파트 셀프 시공 가이드</p>
          </div>

          {/* 진행률 카드 */}
          <div style={{ margin: "16px 16px 0", background: C.text, borderRadius: 20, padding: "24px", color: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", margin: "0 0 4px", letterSpacing: 2 }}>OVERALL PROGRESS</p>
                <p style={{ fontSize: 48, fontWeight: 900, margin: 0, lineHeight: 1, letterSpacing: -2 }}>{pct}<span style={{ fontSize: 20, fontWeight: 400 }}>%</span></p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: "0 0 6px" }}>현재 공정</p>
                <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon name={curPhase.iconName} size={14} color="rgba(255,255,255,0.8)" />
                  <p style={{ fontSize: 12, fontWeight: 600, margin: 0, color: "rgba(255,255,255,0.9)" }}>{curPhase.name}</p>
                </div>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 99, height: 4, overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: "#fff", borderRadius: 99, transition: "width 0.6s" }} />
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: "10px 0 0" }}>{doneCount} / {totalTasks} 항목 완료 · {PHASES.length}개 공정</p>
          </div>

          {/* 공정 스크롤 */}
          <div style={{ padding: "20px 16px 0" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 2, margin: "0 0 12px" }}>전체 공정</p>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
              {PHASES.map(phase => {
                const p = phaseProgress(phase);
                const isDone = p === 100;
                const isActive = phase.id === curPhase.id;
                return (
                  <div key={phase.id} onClick={() => { setOpen(phase.id); setTab("process"); }}
                    style={{ flexShrink: 0, background: isActive ? C.text : C.surface, borderRadius: 14, padding: "14px 12px", minWidth: 76, textAlign: "center", border: `1px solid ${isActive ? C.text : C.border}`, cursor: "pointer", opacity: !isDone && !isActive && p === 0 ? 0.5 : 1 }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 8, color: isActive ? "#fff" : isDone ? C.text : C.muted }}>
                      <Icon name={phase.iconName} size={20} color={isActive ? "#fff" : isDone ? C.text : C.muted} />
                    </div>
                    <p style={{ fontSize: 9, fontWeight: 700, color: isActive ? "rgba(255,255,255,0.8)" : C.sub, margin: "0 0 6px", lineHeight: 1.3 }}>{phase.name}</p>
                    <p style={{ fontSize: 12, fontWeight: 800, color: isActive ? "#fff" : isDone ? C.text : C.muted, margin: 0 }}>{isDone ? "✓" : `${p}%`}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 주의사항 */}
          <div style={{ margin: "16px", background: C.surface, borderRadius: 16, padding: 20, border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <Icon name="alert" size={16} color={C.text} />
              <p style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: 0 }}>초보자 필수 주의사항</p>
            </div>
            {["에어컨은 도배·바닥 전에 먼저 설치", "욕실 방수는 절대 서두르지 마세요", "전기 작업은 반드시 자격증 보유자", "예비비 10%는 꼭 확보하세요", "이웃 동의서 & 엘리베이터 보양 사전 신청", "발코니 확장 시 방염 자재 사용 의무"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.bg, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: C.sub, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                <p style={{ margin: 0, fontSize: 13, color: C.text, lineHeight: 1.5 }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PROCESS ── */}
      {tab === "process" && (
        <div>
          <div style={{ background: C.surface, padding: "56px 24px 20px", borderBottom: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 11, letterSpacing: 4, color: C.muted, margin: "0 0 4px", fontWeight: 600 }}>PROCESS</p>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 2px", letterSpacing: -0.5 }}>공정 관리</h2>
            <p style={{ fontSize: 13, color: C.sub, margin: 0 }}>{doneCount}/{totalTasks} 항목 완료</p>
          </div>
          <div style={{ padding: 14 }}>
            {PHASES.map((phase, idx) => {
              const isOpen = open === phase.id;
              const p = phaseProgress(phase);
              const isDone = p === 100;
              return (
                <div key={phase.id} style={{ marginBottom: 8 }}>
                  <div onClick={() => setOpen(isOpen ? null : phase.id)}
                    style={{ background: C.surface, borderRadius: isOpen ? "14px 14px 0 0" : 14, padding: "16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, border: `1px solid ${isOpen ? C.text : C.border}`, borderBottom: isOpen ? `1px solid ${C.border}` : undefined }}>
                    <div style={{ width: 40, height: 40, borderRadius: 11, background: isDone ? C.text : C.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={phase.iconName} size={18} color={isDone ? "#fff" : C.sub} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: C.text }}>{phase.name}</p>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: isDone ? C.text : p > 0 ? "#F0F0F0" : C.bg, color: isDone ? "#fff" : p > 0 ? C.text : C.muted }}>
                          {isDone ? "완료" : p > 0 ? "진행중" : "대기"}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ flex: 1, background: C.bg, borderRadius: 99, height: 3 }}>
                          <div style={{ width: `${p}%`, height: "100%", background: C.text, borderRadius: 99, transition: "width 0.4s" }} />
                        </div>
                        <p style={{ margin: 0, fontSize: 10, color: C.muted, flexShrink: 0 }}>{phase.duration}</p>
                      </div>
                    </div>
                    <div style={{ color: C.muted, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                      <Icon name="chevronDown" size={16} color={C.muted} />
                    </div>
                  </div>

                  {isOpen && (
                    <div style={{ background: C.surface, borderRadius: "0 0 14px 14px", border: `1px solid ${C.text}`, borderTop: "none", padding: "4px 16px 16px" }}>
                      {phase.tasks.map(task => (
                        <div key={task.id}>
                          <div onClick={() => setDone(prev => ({ ...prev, [task.id]: !prev[task.id] }))}
                            style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: `1px solid ${C.bg}`, cursor: "pointer", alignItems: "flex-start" }}>
                            <div style={{ width: 20, height: 20, borderRadius: 6, border: done[task.id] ? "none" : `1.5px solid ${C.muted}`, background: done[task.id] ? C.text : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, transition: "all 0.2s" }}>
                              {done[task.id] && <Icon name="check" size={12} color="#fff" />}
                            </div>
                            <p style={{ margin: 0, fontSize: 13, color: done[task.id] ? C.muted : C.text, textDecoration: done[task.id] ? "line-through" : "none", flex: 1, lineHeight: 1.6 }}>{task.name}</p>
                            <button onClick={e => { e.stopPropagation(); setActiveTip(activeTip === task.id ? null : task.id); }}
                              style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: C.muted, display: "flex" }}>
                              <Icon name="lightbulb" size={15} color={activeTip === task.id ? C.text : C.muted} />
                            </button>
                          </div>
                          {activeTip === task.id && (
                            <div style={{ background: C.bg, borderRadius: 10, padding: "10px 12px", margin: "4px 0 8px", fontSize: 12, color: C.sub, lineHeight: 1.7, borderLeft: `2px solid ${C.muted}` }}>
                              {task.tip}
                            </div>
                          )}
                        </div>
                      ))}
                      <div style={{ marginTop: 14, background: C.bg, borderRadius: 12, padding: "12px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                          <Icon name="alert" size={13} color={C.sub} />
                          <p style={{ fontSize: 11, fontWeight: 700, color: C.sub, margin: 0, letterSpacing: 1 }}>체크포인트</p>
                        </div>
                        {phase.points.map((cp, i) => (
                          <p key={i} style={{ margin: "0 0 5px", fontSize: 12, color: C.sub, lineHeight: 1.6 }}>· {cp}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── BUDGET ── */}
      {tab === "budget" && (
        <div>
          <div style={{ background: C.surface, padding: "56px 24px 20px", borderBottom: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 11, letterSpacing: 4, color: C.muted, margin: "0 0 4px", fontWeight: 600 }}>BUDGET</p>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 16px", letterSpacing: -0.5 }}>비용 관리</h2>
            <div style={{ background: C.text, borderRadius: 16, padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: 0, letterSpacing: 1 }}>총 예상</p>
                  <p style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "4px 0 0", letterSpacing: -0.5 }}>{totalAmt.toLocaleString()}<span style={{ fontSize: 12, fontWeight: 400 }}>원</span></p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: 0, letterSpacing: 1 }}>지급 완료</p>
                  <p style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "4px 0 0", letterSpacing: -0.5 }}>{paidAmt.toLocaleString()}<span style={{ fontSize: 12, fontWeight: 400 }}>원</span></p>
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 99, height: 4 }}>
                <div style={{ width: `${Math.round((paidAmt / totalAmt) * 100)}%`, height: "100%", background: "#fff", borderRadius: 99 }} />
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, margin: "10px 0 0" }}>잔여 {(totalAmt - paidAmt).toLocaleString()}원</p>
            </div>
          </div>
          <div style={{ padding: 14 }}>
            {BUDGET.map(b => (
              <div key={b.id} style={{ background: C.surface, borderRadius: 14, padding: "14px 16px", marginBottom: 8, display: "flex", alignItems: "center", gap: 14, border: `1px solid ${C.border}` }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={b.iconName} size={17} color={C.sub} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: C.text }}>{b.name}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 13, color: C.sub }}>{b.amount.toLocaleString()}원</p>
                </div>
                <button onClick={() => setPaid(p => ({ ...p, [b.id]: !p[b.id] }))}
                  style={{ background: paid[b.id] ? C.text : C.bg, border: `1px solid ${paid[b.id] ? C.text : C.border}`, borderRadius: 10, padding: "6px 14px", fontSize: 12, fontWeight: 600, color: paid[b.id] ? "#fff" : C.muted, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
                  {paid[b.id] ? "지급완료" : "대기"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MYHOME (갤러리) ── */}
      {tab === "myhome" && (
        <div>
          <div style={{ background: C.surface, padding: "56px 24px 20px", borderBottom: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 11, letterSpacing: 4, color: C.muted, margin: "0 0 4px", fontWeight: 600 }}>MY HOME</p>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 2px", letterSpacing: -0.5 }}>우리집 기록</h2>
            <p style={{ fontSize: 13, color: C.sub, margin: 0 }}>시공 사진을 공유하고 정보를 나눠요</p>
          </div>

          {/* 사진 업로드 버튼 */}
          <div style={{ padding: "16px 16px 0" }}>
            <div style={{ background: C.surface, border: `1.5px dashed ${C.border}`, borderRadius: 16, padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="camera" size={20} color={C.muted} />
              </div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: C.sub }}>시공 사진 업로드</p>
              <p style={{ margin: 0, fontSize: 11, color: C.muted }}>공간 이름과 공정 단계를 함께 기록하세요</p>
            </div>
          </div>

          {/* 포스트 목록 */}
          <div style={{ padding: "14px 16px" }}>
            {posts.map(post => (
              <div key={post.id} style={{ background: C.surface, borderRadius: 18, marginBottom: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                {/* 사진 영역 */}
                <div style={{ background: post.bg, height: 220, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{ textAlign: "center" }}>
                    <Icon name="image" size={36} color="rgba(0,0,0,0.15)" />
                    <p style={{ margin: "8px 0 0", fontSize: 12, color: "rgba(0,0,0,0.3)" }}>시공 사진</p>
                  </div>
                  <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.55)", borderRadius: 8, padding: "4px 10px" }}>
                    <p style={{ margin: 0, fontSize: 10, fontWeight: 600, color: "#fff" }}>{post.phase}</p>
                  </div>
                </div>

                {/* 내용 */}
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon name="home" size={14} color={C.sub} />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.text }}>{post.user}</p>
                        <p style={{ margin: 0, fontSize: 10, color: C.muted }}>{post.space}</p>
                      </div>
                    </div>
                    <button onClick={() => toggleLike(post.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: "4px 0" }}>
                      <Icon name="heart" size={16} color={liked[post.id] ? "#E8633A" : C.muted} />
                      <span style={{ fontSize: 12, color: C.muted, fontFamily: "inherit" }}>{post.likes}</span>
                    </button>
                  </div>
                  <p style={{ margin: "0 0 12px", fontSize: 13, color: C.text, lineHeight: 1.6 }}>{post.desc}</p>

                  {/* 댓글 */}
                  {post.comments.length > 0 && (
                    <div style={{ background: C.bg, borderRadius: 10, padding: "10px 12px", marginBottom: 10 }}>
                      {post.comments.map((c, i) => (
                        <div key={i} style={{ marginBottom: i < post.comments.length - 1 ? 8 : 0 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{c.user} </span>
                          <span style={{ fontSize: 12, color: C.sub }}>{c.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 댓글 입력 */}
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                      value={newComment[post.id] || ""}
                      onChange={e => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                      onKeyDown={e => e.key === "Enter" && addComment(post.id)}
                      placeholder="댓글 달기..."
                      style={{ flex: 1, background: C.bg, border: "none", borderRadius: 10, padding: "9px 12px", fontSize: 12, color: C.text, fontFamily: "inherit", outline: "none" }}
                    />
                    <button onClick={() => addComment(post.id)}
                      style={{ background: C.text, border: "none", borderRadius: 10, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <Icon name="chat" size={14} color="#fff" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── DOCS (자료실) ── */}
      {tab === "docs" && (
        <div>
          <div style={{ background: C.surface, padding: "56px 24px 20px", borderBottom: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 11, letterSpacing: 4, color: C.muted, margin: "0 0 4px", fontWeight: 600 }}>DOCUMENTS</p>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px", letterSpacing: -0.5 }}>자료실</h2>
            <p style={{ fontSize: 13, color: C.sub, margin: 0 }}>공식 표준계약서 및 참고 서식 모음</p>
          </div>

          <div style={{ padding: "14px 16px" }}>

            {/* 안내 배너 */}
            <div style={{ background: C.text, borderRadius: 16, padding: "16px 18px", marginBottom: 20, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0, marginTop: 2 }}>
                <Icon name="alert" size={16} color="rgba(255,255,255,0.6)" />
              </div>
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 700, color: "#fff" }}>공식 출처 링크 안내</p>
                <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>아래 버튼을 누르면 국토교통부·공정거래위원회 등 공식 사이트로 이동해요. 반드시 공식 서식을 사용하세요.</p>
              </div>
            </div>

            {/* 표준계약서 */}
            <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 2, margin: "0 0 10px" }}>표준계약서</p>
            {[
              {
                title: "실내건축 표준도급계약서",
                org: "공정거래위원회",
                desc: "인테리어·도배·바닥 등 실내 공사 시 가장 많이 쓰이는 표준계약서예요. 공사 전 반드시 이 양식으로 계약하세요.",
                badge: "필수",
                url: "https://www.ftc.go.kr/www/selectStdContrView.do?key=224",
              },
              {
                title: "건설공사 표준도급계약서",
                org: "국토교통부",
                desc: "철거·설비 등 규모 있는 공사에 적용되는 표준계약서예요. 전문 시공업체와 계약 시 참고하세요.",
                badge: "참고",
                url: "https://www.molit.go.kr/USR/BORD0201/m_34873/DTL.jsp",
              },
              {
                title: "소비자분쟁해결기준 (실내건축)",
                org: "한국소비자원",
                desc: "하자 발생 시 어떤 기준으로 보상받을 수 있는지 확인할 수 있어요. 업체와 분쟁 생겼을 때 참고하세요.",
                badge: "분쟁",
                url: "https://www.kca.go.kr/home/sub.do?menukey=4072",
              },
            ].map(doc => (
              <div key={doc.title} style={{ background: C.surface, borderRadius: 14, padding: "16px", marginBottom: 10, border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ flex: 1, paddingRight: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: C.text }}>{doc.title}</p>
                      <span style={{ fontSize: 10, fontWeight: 700, background: C.text, color: "#fff", borderRadius: 6, padding: "2px 7px", flexShrink: 0 }}>{doc.badge}</span>
                    </div>
                    <p style={{ margin: "0 0 8px", fontSize: 11, color: C.muted, fontWeight: 600 }}>{doc.org}</p>
                    <p style={{ margin: 0, fontSize: 12, color: C.sub, lineHeight: 1.6 }}>{doc.desc}</p>
                  </div>
                </div>
                <a href={doc.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px", marginTop: 12, textDecoration: "none" }}>
                  <Icon name="book" size={14} color={C.text} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>공식 사이트에서 다운로드</span>
                  <Icon name="chevronRight" size={14} color={C.muted} />
                </a>
              </div>
            ))}

            {/* 참고 서식 */}
            <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 2, margin: "20px 0 10px" }}>참고 서식 & 신고 안내</p>
            {[
              {
                title: "발코니 확장 신고 안내",
                org: "정부24",
                desc: "발코니 확장 공사 전 구청에 건축물 용도변경 신고가 필요해요. 정부24에서 온라인 신고 가능해요.",
                url: "https://www.gov.kr/portal/service/serviceInfo/PTR000051018",
              },
              {
                title: "소방시설 변경 신고",
                org: "소방청",
                desc: "스프링클러·감지기 위치 변경 시 소방서에 공사계획 신고 필요. 무신고 시 과태료 대상이에요.",
                url: "https://www.nfa.go.kr",
              },
              {
                title: "건설업 면허 조회",
                org: "건설산업지식정보시스템",
                desc: "시공 업체가 합법적으로 등록된 업체인지 확인할 수 있어요. 계약 전 반드시 조회하세요.",
                url: "https://www.kiscon.net",
              },
              {
                title: "인테리어 분쟁 상담 신청",
                org: "한국소비자원",
                desc: "시공 하자·계약 분쟁 발생 시 소비자원에 무료 상담 신청이 가능해요.",
                url: "https://www.kca.go.kr",
              },
            ].map(doc => (
              <div key={doc.title} style={{ background: C.surface, borderRadius: 14, padding: "16px", marginBottom: 10, border: `1px solid ${C.border}` }}>
                <p style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 700, color: C.text }}>{doc.title}</p>
                <p style={{ margin: "0 0 8px", fontSize: 11, color: C.muted, fontWeight: 600 }}>{doc.org}</p>
                <p style={{ margin: 0, fontSize: 12, color: C.sub, lineHeight: 1.6 }}>{doc.desc}</p>
                <a href={doc.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px", marginTop: 12, textDecoration: "none" }}>
                  <Icon name="chevronRight" size={14} color={C.muted} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>바로가기</span>
                </a>
              </div>
            ))}

            {/* 계약 시 체크리스트 */}
            <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 2, margin: "20px 0 10px" }}>계약 전 체크리스트</p>
            <div style={{ background: C.surface, borderRadius: 14, padding: "16px", border: `1px solid ${C.border}` }}>
              {[
                "업체 건설업 면허 조회 완료",
                "표준계약서 양식으로 계약서 작성",
                "공사 시작일·완료일 명시",
                "자재 브랜드·모델명·규격 기재",
                "하자보수 기간 최소 1년 명시",
                "추가 공사비 발생 시 서면 협의 조항",
                "선금 30% 이내, 중도금·잔금 나눠 지급",
                "공사 완료 후 검수 사인 전 꼼꼼히 확인",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", paddingBottom: 10, marginBottom: 10, borderBottom: i < 7 ? `1px solid ${C.bg}` : "none" }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: C.bg, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.muted }}>{i + 1}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: C.text, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ── GUIDE ── */}
      {tab === "guide" && (
        <div>
          <div style={{ background: C.surface, padding: "56px 24px 20px", borderBottom: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 11, letterSpacing: 4, color: C.muted, margin: "0 0 4px", fontWeight: 600 }}>GUIDE</p>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: 0, letterSpacing: -0.5 }}>업체 선정 가이드</h2>
          </div>
          <div style={{ padding: 14 }}>
            {[
              { iconName: "list", title: "업체 찾는 법", items: ["오늘의집 시공사례 → 지역 필터", "당근마켓 지역 커뮤니티", "아파트 맘카페 추천", "지인 소개 (가장 신뢰도 높음)"] },
              { iconName: "book", title: "견적 받는 법", items: ["최소 3곳 이상 견적 받기", "견적서는 반드시 서면으로!", "자재 브랜드·규격 명시 요청", "철거비·자재비·인건비 분리 확인"] },
              { iconName: "alert", title: "이런 업체 조심!", items: ["선금 50% 이상 요구 → 위험!", "계약서 없이 구두 계약 → NO", "지나치게 싼 견적 → 추가금 함정", "무자격 전기·가스 작업 → 불법"] },
              { iconName: "check", title: "계약서 필수 항목", items: ["공사 시작/완료 날짜 명시", "자재 브랜드·모델명 기재", "하자보수 기간 (최소 1년)", "추가 공사비 협의 조항"] },
              { iconName: "elevator", title: "엘리베이터 보양 & 동의서", items: ["공사 시작 1주 전 관리사무소 신청", "보양재 훼손 시 비용 배상 주의", "이웃 동의서: 위·아래·옆 세대 방문", "동의서에 공사기간·연락처 필수 기재"] },
              { iconName: "fire", title: "발코니 확장 & 소방", items: ["방염 자재 사용 의무 (시험 합격품)", "감지기·스프링클러 이설은 전문업체", "완강기 위치 변경 금지 (무단 시 불법)", "소방서 완료 검사 후 가구 반입"] },
              { iconName: "door", title: "붙박이장·신발장 제작 팁", items: ["철거 직후 바로 주문 (제작 3~4주 소요)", "실측은 반드시 현장에서 진행", "도배 완료 후 48시간 이후에 설치", "수납 용량보다 문 개폐 공간 먼저 확인", "싱크대와 같은 업체에 맡기면 할인 가능"] },
              { iconName: "snow", title: "에어컨 업체 주의사항", items: ["공식 설치기사 권장 (삼성·LG)", "배관 길이 미리 측정 후 견적", "실외기 위치 관리사무소 확인 후", "설치 후 냉난방 테스트 필수"] },
            ].map(s => (
              <div key={s.title} style={{ background: C.surface, borderRadius: 14, padding: "16px", marginBottom: 10, border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={s.iconName} size={16} color={C.text} />
                  </div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: C.text }}>{s.title}</p>
                </div>
                {s.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.muted, flexShrink: 0, marginTop: 8 }} />
                    <p style={{ margin: 0, fontSize: 13, color: C.sub, lineHeight: 1.6 }}>{item}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── BOTTOM NAV ── */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 390, background: C.surface, borderTop: `1px solid ${C.border}`, padding: "10px 4px 20px", display: "flex", justifyContent: "space-around", zIndex: 100 }}>
        {navItems.map(item => {
          const isActive = tab === item.key;
          return (
            <button key={item.key} onClick={() => setTab(item.key)}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "4px 6px", fontFamily: "inherit" }}>
              <Icon name={item.icon} size={20} color={isActive ? C.text : C.muted} />
              <span style={{ fontSize: 9, fontWeight: isActive ? 700 : 500, color: isActive ? C.text : C.muted }}>{item.label}</span>
              {isActive && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.text }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
