// 해양 유해 생물 목데이터

export const CREATURES = [
  {
    id: 'amur-starfish',
    name: '아무르불가사리',
    image: 'https://images.unsplash.com/photo-1686672983786-ecba3822b7ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyZmlzaCUyMG9jZWFufGVufDF8fHx8MTc2NzA2MTI4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '북태평양이 원산지인 불가사리로, 양식 굴과 조개를 대량으로 잡아먹어 양식업에 큰 피해를 주는 해양 유해 생물입니다.',
    habitat: '연안 해역, 양식장',
    size: '20-30cm',
    danger: '양식 생물 포식',
    impact: '양식장 피해, 생태계 교란',
  },
  {
    id: 'star-starfish',
    name: '별불가사리',
    image: 'https://images.unsplash.com/photo-1686672983786-ecba3822b7ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyZmlzaCUyMG9jZWFufGVufDF8fHx8MTc2NzA2MTI4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '조개류를 주식으로 하는 불가사리로, 어패류 양식장에 막대한 피해를 주는 유해 생물입니다.',
    habitat: '조간대, 양식장',
    size: '15-25cm',
    danger: '양식 조개 포식',
    impact: '양식업 피해, 생태계 불균형',
  },
  {
    id: 'godung',
    name: '고둥',
    image: 'https://images.unsplash.com/photo-1657774527411-736ff7d8183c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWElMjBzbmFpbCUyMHNoZWxsfGVufDF8fHx8MTc2NzA2MTI4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '해조류와 작은 무척추동물을 먹는 고둥류로, 과다 번식 시 해양 생태계에 영향을 미칩니다.',
    habitat: '암초 지대, 갯벌',
    size: '5-10cm',
    danger: '해조류 과다 섭식',
    impact: '해조류 감소, 생태계 변화',
  },
  {
    id: 'purple-urchin',
    name: '보라성게',
    image: 'https://images.unsplash.com/photo-1657162013469-6b28d9376c95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWElMjB1cmNoaW4lMjBwdXJwbGV8ZW58MXx8fHwxNzY3MDYxMjgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '해조류를 먹는 성게로, 대량 발생 시 해조류 군락을 초토화시켜 갯녹음 현상을 유발합니다.',
    habitat: '암반 지대',
    size: '5-8cm',
    danger: '해조류 과다 섭식',
    impact: '갯녹음 유발, 해양 생태계 파괴',
  },
  {
    id: 'brown-urchin',
    name: '말똥성게',
    image: 'https://images.unsplash.com/photo-1657162013469-6b28d9376c95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWElMjB1cmNoaW4lMjBwdXJwbGV8ZW58MXx8fHwxNzY3MDYxMjgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '다시마와 미역 등 해조류를 먹는 성게로, 과다 번식 시 해조림 파괴의 주범이 됩니다.',
    habitat: '조하대, 암반',
    size: '6-9cm',
    danger: '해조류 대량 섭식',
    impact: '해조림 파괴, 갯녹음',
  },
  {
    id: 'sea-hare',
    name: '군소',
    image: 'https://images.unsplash.com/photo-1623468110954-6c8988745c7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWElMjBzbHVnfGVufDF8fHx8MTc2NzA2MTI4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '해조류를 먹는 연체동물로, 대량 발생 시 양식 미역과 다시마에 큰 피해를 줍니다.',
    habitat: '연안 해역, 해조류 서식지',
    size: '10-20cm',
    danger: '양식 해조류 섭식',
    impact: '해조류 양식장 피해',
  },
  {
    id: 'turban-shell',
    name: '소라',
    image: 'https://images.unsplash.com/photo-1762757110772-657df89aaaa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJiYW4lMjBzaGVsbHxlbnwxfHx8fDE3NjcwNjEyODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '해조류를 먹는 고둥류로, 과다 번식 시 해조류 군락에 영향을 미칩니다.',
    habitat: '암반 지대, 조하대',
    size: '8-12cm',
    danger: '해조류 섭식',
    impact: '해조류 감소',
  },
  {
    id: 'gamtae',
    name: '감태',
    image: 'https://images.unsplash.com/photo-1734254048250-567a22286fd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWF3ZWVkJTIwa2VscHxlbnwxfHx8fDE3NjcwNjEyODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '빠른 성장 속도로 다른 해조류의 서식 공간을 점유하는 갈조류입니다.',
    habitat: '연안 암반',
    size: '50-100cm',
    danger: '서식 공간 경쟁',
    impact: '다른 해조류 생장 방해',
  },
  {
    id: 'mojaban',
    name: '모자반',
    image: 'https://images.unsplash.com/photo-1734254048250-567a22286fd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWF3ZWVkJTIwa2VscHxlbnwxfHx8fDE3NjcwNjEyODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '대량 유입 시 어망을 막고 해안을 뒤덮어 환경 문제를 일으키는 해조류입니다.',
    habitat: '연안 해역',
    size: '30-200cm',
    danger: '대량 유입',
    impact: '어업 방해, 해안 오염',
  },
];

// 랜덤으로 N개의 생물 선택
export const getRandomCreatures = (count) => {
  const shuffled = [...CREATURES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// 이름으로 생물 찾기
export const getCreatureByName = (name) => {
  return CREATURES.find(c => c.name === name);
};
