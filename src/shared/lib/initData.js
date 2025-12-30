// 초기 샘플 데이터
import * as storage from './localStorage.js';

export const initSampleData = () => {
  // 이미 데이터가 있으면 초기화하지 않음
  const recipes = storage.getAllRecipes();
  if (recipes.length > 0) {
    return;
  }

  // 샘플 사용자 생성
  const sampleUser = {
    id: 'sample-user-1',
    email: 'demo@ocean.com',
    name: '오션쿡',
  };
  storage.saveUser(sampleUser);

  // 샘플 레시피 생성
  const sampleRecipes = [
    {
      id: 'recipe-1',
      userId: sampleUser.id,
      userName: sampleUser.name,
      title: '매콤한 군소 볶음',
      species: '군소',
      category: '한식',
      ingredients: ['군소 500g', '고추장 3큰술', '다진 마늘 1큰술', '양파 1개', '대파 1대', '참기름 1큰술'],
      steps: [
        '군소를 깨끗이 손질하여 먹기 좋은 크기로 자릅니다.',
        '양파와 대파를 썰어 준비합니다.',
        '팬에 기름을 두르고 마늘을 볶다가 군소를 넣고 볶습니다.',
        '고추장과 양념을 넣고 볶다가 양파와 대파를 넣습니다.',
        '마지막으로 참기름을 넣고 마무리합니다.',
      ],
      cookingTime: '30분',
      difficulty: '중',
      images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'],
      rating: 4.5,
      reviewCount: 12,
      viewCount: 245,
      likeCount: 34,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'recipe-2',
      userId: sampleUser.id,
      userName: sampleUser.name,
      title: '보라성게 크림 파스타',
      species: '보라성게',
      category: '양식',
      ingredients: ['보라성게 200g', '스파게티 면 200g', '생크림 200ml', '마늘 3쪽', '올리브유 2큰술', '파마산 치즈'],
      steps: [
        '스파게티 면을 삶아줍니다.',
        '팬에 올리브유와 마늘을 넣고 볶습니다.',
        '성게를 넣고 가볍게 볶다가 생크림을 넣습니다.',
        '삶은 면을 넣고 잘 버무립니다.',
        '파마산 치즈를 갈아 올려 완성합니다.',
      ],
      cookingTime: '25분',
      difficulty: '쉬움',
      images: ['https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800'],
      rating: 4.8,
      reviewCount: 23,
      viewCount: 412,
      likeCount: 67,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'recipe-3',
      userId: sampleUser.id,
      userName: sampleUser.name,
      title: '아무르불가사리 찜',
      species: '아무르불가사리',
      category: '한식',
      ingredients: ['아무르불가사리 3마리', '소금', '레몬', '초고추장'],
      steps: [
        '불가사리를 깨끗이 손질합니다.',
        '끓는 물에 소금을 넣고 불가사리를 삶습니다.',
        '3-5분간 삶은 후 건져냅니다.',
        '초고추장과 레몬을 곁들여 냅니다.',
      ],
      cookingTime: '15분',
      difficulty: '쉬움',
      images: ['https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800'],
      rating: 4.2,
      reviewCount: 8,
      viewCount: 156,
      likeCount: 21,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'recipe-4',
      userId: sampleUser.id,
      userName: sampleUser.name,
      title: '소라 미소국',
      species: '소라',
      category: '일식',
      ingredients: ['소라 5개', '미소 3큰술', '다시마', '두부', '파'],
      steps: [
        '다시마로 육수를 우려냅니다.',
        '소라를 손질하여 넣습니다.',
        '미소를 풀어줍니다.',
        '두부와 파를 넣고 끓입니다.',
      ],
      cookingTime: '20분',
      difficulty: '쉬움',
      images: ['https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800'],
      rating: 4.6,
      reviewCount: 15,
      viewCount: 289,
      likeCount: 43,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'recipe-5',
      userId: sampleUser.id,
      userName: sampleUser.name,
      title: '감태 볶음밥',
      species: '감태',
      category: '한식',
      ingredients: ['감태 50g', '밥 2공기', '계란 2개', '양파 반개', '당근', '간장', '참기름'],
      steps: [
        '감태를 물에 불려 준비합니다.',
        '양파와 당근을 잘게 썹니다.',
        '팬에 기름을 두르고 계란을 스크램블합니다.',
        '야채를 볶다가 밥과 감태를 넣습니다.',
        '간장으로 간하고 참기름으로 마무리합니다.',
      ],
      cookingTime: '15분',
      difficulty: '쉬움',
      images: ['https://images.unsplash.com/photo-1512003867696-6d5ce6835040?w=800'],
      rating: 4.4,
      reviewCount: 10,
      viewCount: 198,
      likeCount: 28,
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  sampleRecipes.forEach((recipe) => {
    storage.saveRecipe(recipe);
  });

  // 샘플 리뷰 생성
  const sampleReviews = [
    {
      id: 'review-1',
      recipeId: 'recipe-1',
      userId: 'user-demo-1',
      userName: '바다지킴이',
      rating: 5,
      comment: '정말 맛있었어요! 군소가 이렇게 맛있을 줄 몰랐습니다.',
      images: [],
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'review-2',
      recipeId: 'recipe-1',
      userId: 'user-demo-2',
      userName: '해양요리사',
      rating: 4,
      comment: '매콤하니 밥 도둑이네요 ㅎㅎ',
      images: [],
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'review-3',
      recipeId: 'recipe-2',
      userId: 'user-demo-3',
      userName: '성게러버',
      rating: 5,
      comment: '성게 크림 파스타 최고! 레스토랑 음식 같아요.',
      images: [],
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  sampleReviews.forEach((review) => {
    storage.saveReview(review);
  });

  console.log('✅ 샘플 데이터 초기화 완료!');
};
