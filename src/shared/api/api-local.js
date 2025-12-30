// LocalStorage 기반 API (백엔드 서버 불필요)

import * as storage from '../lib/localStorage.js';

// ============================================
// AUTH API
// ============================================

export const signUp = async (email, password, name) => {
  // Check if user already exists
  const existingUser = storage.findUserByEmail(email);
  if (existingUser) {
    throw new Error('이미 존재하는 이메일입니다.');
  }
  
  // Create new user
  const user = {
    id: crypto.randomUUID(),
    email,
    name,
  };
  
  storage.saveUser(user);
  storage.saveCurrentUser(user);
  
  return { user };
};

export const signIn = async (email, password) => {
  const user = storage.findUserByEmail(email);
  
  if (!user) {
    throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
  }
  
  storage.saveCurrentUser(user);
  
  return { user };
};

export const signOut = async () => {
  storage.clearCurrentUser();
};

export const getCurrentUser = async () => {
  return storage.getCurrentUser();
};

// ============================================
// RECIPE API
// ============================================

export const getRecipes = async (filters) => {
  return storage.getFilteredRecipes(filters || {});
};

export const getRecipeById = async (id) => {
  const recipe = storage.getRecipeById(id);
  
  if (!recipe) {
    throw new Error('레시피를 찾을 수 없습니다.');
  }
  
  // Increment view count
  recipe.viewCount = (recipe.viewCount || 0) + 1;
  storage.saveRecipe(recipe);
  
  return { recipe };
};

export const createRecipe = async (recipeData) => {
  const user = storage.getCurrentUser();
  
  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }
  
  const recipe = {
    id: crypto.randomUUID(),
    userId: user.id,
    userName: user.name,
    ...recipeData,
    rating: 0,
    reviewCount: 0,
    viewCount: 0,
    likeCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  storage.saveRecipe(recipe);
  
  return { recipe };
};

export const updateRecipe = async (id, updates) => {
  const user = storage.getCurrentUser();
  
  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }
  
  const recipe = storage.getRecipeById(id);
  
  if (!recipe) {
    throw new Error('레시피를 찾을 수 없습니다.');
  }
  
  if (recipe.userId !== user.id) {
    throw new Error('권한이 없습니다.');
  }
  
  const updatedRecipe = {
    ...recipe,
    ...updates,
    id, // Keep original ID
    userId: recipe.userId, // Keep original user
    updatedAt: new Date().toISOString(),
  };
  
  storage.saveRecipe(updatedRecipe);
  
  return { recipe: updatedRecipe };
};

export const deleteRecipe = async (id) => {
  const user = storage.getCurrentUser();
  
  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }
  
  const recipe = storage.getRecipeById(id);
  
  if (!recipe) {
    throw new Error('레시피를 찾을 수 없습니다.');
  }
  
  if (recipe.userId !== user.id) {
    throw new Error('권한이 없습니다.');
  }
  
  storage.deleteRecipe(id);
  
  return { success: true };
};

export const getMyRecipes = async () => {
  const user = storage.getCurrentUser();
  
  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }
  
  const recipes = storage.getUserRecipes(user.id);
  
  return { recipes };
};

// ============================================
// REVIEW API
// ============================================

export const getRecipeReviews = async (recipeId) => {
  const reviews = storage.getRecipeReviews(recipeId);
  return { reviews };
};

export const createReview = async (recipeId, reviewData) => {
  const user = storage.getCurrentUser();
  
  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }
  
  if (!reviewData.rating || reviewData.rating < 1 || reviewData.rating > 5) {
    throw new Error('올바른 평점을 입력해주세요.');
  }
  
  const review = {
    id: crypto.randomUUID(),
    recipeId,
    userId: user.id,
    userName: user.name,
    rating: reviewData.rating,
    comment: reviewData.comment || '',
    images: reviewData.images || [],
    createdAt: new Date().toISOString(),
  };
  
  storage.saveReview(review);
  
  return { review };
};

// ============================================
// LIKE API
// ============================================

export const toggleLike = async (recipeId) => {
  const user = storage.getCurrentUser();
  
  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }
  
  const isLiked = storage.toggleLike(user.id, recipeId);
  
  return { isLiked };
};

export const checkLike = async (recipeId) => {
  const user = storage.getCurrentUser();
  
  if (!user) {
    return { isLiked: false };
  }
  
  const isLiked = storage.isRecipeLiked(user.id, recipeId);
  
  return { isLiked };
};

// ============================================
// IMAGE UPLOAD API
// ============================================

export const uploadImage = async (file) => {
  const user = storage.getCurrentUser();
  
  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }
  
  // Convert to base64
  const url = await storage.saveImage(file);
  
  return { url };
};
