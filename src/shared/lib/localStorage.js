// LocalStorage 기반 데이터 관리

// ============================================
// USER MANAGEMENT
// ============================================

export const saveCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
};

export const getAllUsers = () => {
  const usersStr = localStorage.getItem('users');
  return usersStr ? JSON.parse(usersStr) : [];
};

export const saveUser = (user) => {
  const users = getAllUsers();
  const existingIndex = users.findIndex(u => u.email === user.email);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem('users', JSON.stringify(users));
};

export const findUserByEmail = (email) => {
  const users = getAllUsers();
  return users.find(u => u.email === email) || null;
};

// ============================================
// RECIPE MANAGEMENT
// ============================================

export const getAllRecipes = () => {
  const recipesStr = localStorage.getItem('recipes');
  return recipesStr ? JSON.parse(recipesStr) : [];
};

export const saveRecipe = (recipe) => {
  const recipes = getAllRecipes();
  const existingIndex = recipes.findIndex(r => r.id === recipe.id);
  
  if (existingIndex >= 0) {
    recipes[existingIndex] = recipe;
  } else {
    recipes.push(recipe);
  }
  
  localStorage.setItem('recipes', JSON.stringify(recipes));
};

export const getRecipeById = (id) => {
  const recipes = getAllRecipes();
  return recipes.find(r => r.id === id) || null;
};

export const deleteRecipe = (id) => {
  const recipes = getAllRecipes();
  const filtered = recipes.filter(r => r.id !== id);
  localStorage.setItem('recipes', JSON.stringify(filtered));
  
  // Also delete related reviews
  const reviews = getAllReviews();
  const filteredReviews = reviews.filter(r => r.recipeId !== id);
  localStorage.setItem('reviews', JSON.stringify(filteredReviews));
};

export const getUserRecipes = (userId) => {
  const recipes = getAllRecipes();
  return recipes.filter(r => r.userId === userId);
};

export const getFilteredRecipes = (filters) => {
  let recipes = getAllRecipes();
  
  // Apply filters
  if (filters.category && filters.category !== '전체') {
    recipes = recipes.filter(r => r.category === filters.category);
  }
  if (filters.species) {
    recipes = recipes.filter(r => r.species === filters.species);
  }
  
  // Sort by created date (newest first)
  recipes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  const total = recipes.length;
  const offset = filters.offset || 0;
  const limit = filters.limit || 20;
  
  return {
    recipes: recipes.slice(offset, offset + limit),
    total,
  };
};

// ============================================
// REVIEW MANAGEMENT
// ============================================

export const getAllReviews = () => {
  const reviewsStr = localStorage.getItem('reviews');
  return reviewsStr ? JSON.parse(reviewsStr) : [];
};

export const saveReview = (review) => {
  const reviews = getAllReviews();
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  
  // Update recipe rating
  const recipe = getRecipeById(review.recipeId);
  if (recipe) {
    const recipeReviews = getRecipeReviews(review.recipeId);
    const totalRating = recipeReviews.reduce((sum, r) => sum + r.rating, 0);
    recipe.rating = totalRating / recipeReviews.length;
    recipe.reviewCount = recipeReviews.length;
    saveRecipe(recipe);
  }
};

export const getRecipeReviews = (recipeId) => {
  const reviews = getAllReviews();
  return reviews
    .filter(r => r.recipeId === recipeId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// ============================================
// LIKE MANAGEMENT
// ============================================

export const toggleLike = (userId, recipeId) => {
  const likes = getLikes();
  const key = `${userId}:${recipeId}`;
  const isLiked = !likes.includes(key);
  
  if (isLiked) {
    likes.push(key);
  } else {
    const index = likes.indexOf(key);
    likes.splice(index, 1);
  }
  
  localStorage.setItem('likes', JSON.stringify(likes));
  
  // Update recipe like count
  const recipe = getRecipeById(recipeId);
  if (recipe) {
    recipe.likeCount = (recipe.likeCount || 0) + (isLiked ? 1 : -1);
    recipe.likeCount = Math.max(0, recipe.likeCount);
    saveRecipe(recipe);
  }
  
  return isLiked;
};

export const isRecipeLiked = (userId, recipeId) => {
  const likes = getLikes();
  return likes.includes(`${userId}:${recipeId}`);
};

const getLikes = () => {
  const likesStr = localStorage.getItem('likes');
  return likesStr ? JSON.parse(likesStr) : [];
};

// ============================================
// IMAGE MANAGEMENT (Base64)
// ============================================

export const saveImage = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
