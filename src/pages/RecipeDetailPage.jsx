import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Star, Clock, BookOpen, MessageCircle, User as UserIcon } from 'lucide-react';
import { getRecipeById, toggleLike, checkLike } from '../shared/api/api-local.js';
import { toast } from 'sonner';

export function RecipeDetailPage({ onNavigate, recipeId, user }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (recipeId) {
      loadRecipe();
      loadLikeStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId]);

  const loadRecipe = async () => {
    if (!recipeId) return;
    
    try {
      const data = await getRecipeById(recipeId);
      setRecipe(data.recipe);
    } catch (error) {
      toast.error(error.message);
      onNavigate('home');
    } finally {
      setLoading(false);
    }
  };

  const loadLikeStatus = async () => {
    if (!recipeId || !user) return;
    
    try {
      const data = await checkLike(recipeId);
      setIsLiked(data.isLiked);
    } catch (error) {
      console.error('Failed to load like status:', error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    if (!recipeId) return;

    try {
      const data = await toggleLike(recipeId);
      setIsLiked(data.isLiked);
      
      // Dispatch custom event to sync with RecipeCard
      window.dispatchEvent(new CustomEvent('likeChanged', {
        detail: { recipeId, isLiked: data.isLiked }
      }));
      
      // Update local like count
      if (recipe) {
        setRecipe({
          ...recipe,
          likeCount: (recipe.likeCount || 0) + (data.isLiked ? 1 : -1),
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <h3 className="mb-2">레시피를 찾을 수 없습니다</h3>
        <button
          onClick={() => onNavigate('home')}
          className="mt-4 px-6 py-3 rounded-full text-white"
          style={{ backgroundColor: '#EA512E' }}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  const mainImage = recipe.images?.[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="relative">
        <img
          src={mainImage}
          alt={recipe.title}
          className="w-full aspect-square object-cover"
        />
        <button
          onClick={() => onNavigate('recipes')}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={handleLike}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${
            isLiked 
              ? 'bg-red-500 text-white' 
              : 'bg-white/90 backdrop-blur-sm text-gray-700'
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="px-6 py-6">
        {/* Title & Rating */}
        <div className="mb-6">
          <h2 className="mb-3">{recipe.title}</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-[#FFB800] text-[#FFB800]" />
              <span>{recipe.rating > 0 ? recipe.rating.toFixed(1) : '0.0'}</span>
              <span className="text-sm text-gray-500">
                ({recipe.reviewCount}개 리뷰)
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Heart className="w-4 h-4" />
              <span className="text-sm">{recipe.likeCount || 0}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-sm">{recipe.viewCount || 0}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              <span>{recipe.userName || '익명'}</span>
            </div>
            {recipe.cookingTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{recipe.cookingTime}</span>
              </div>
            )}
            {recipe.difficulty && (
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                  난이도: {recipe.difficulty}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Species Info */}
        <div className="bg-gradient-to-br from-[#EA512E]/10 to-[#FF7A59]/10 rounded-3xl p-6 mb-6 border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="text-primary">해양 유해 생물 정보</h3>
          </div>
          <h4 className="mb-2">{recipe.species}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {recipe.species}는 해양 생태계에 영향을 미치는 유해 생물로, 
            적절한 조리 과정을 거쳐 건강한 식재료로 활용할 수 있습니다.
            단백질과 미네랄이 풍부하며, 환경 보호에도 기여할 수 있는 식재료입니다.
          </p>
        </div>

        {/* Ingredients */}
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4">재료</h3>
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-gray-700">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Steps */}
        {recipe.steps && recipe.steps.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4">조리 방법</h3>
            <div className="space-y-6">
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-gray-700 leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3>리뷰 ({recipe.reviewCount})</h3>
            <button
              onClick={() => onNavigate('review-list', recipeId || undefined)}
              className="text-sm text-primary"
            >
              전체보기
            </button>
          </div>
          
          {recipe.reviewCount === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-2xl">
              <p className="text-gray-500 mb-3">아직 리뷰가 없습니다</p>
              <p className="text-sm text-gray-400">첫 리뷰를 작성해보세요!</p>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('review-list', recipeId || undefined)}
              className="w-full py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              리뷰 보기
            </button>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 max-w-md mx-auto">
        <button
          onClick={() => onNavigate('review', recipeId || undefined)}
          className="w-full bg-primary text-white py-4 rounded-full flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          리뷰 작성하기
        </button>
      </div>
    </div>
  );
}
