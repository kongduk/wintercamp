import { ArrowLeft, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getRecipeReviews, getRecipeById } from '../shared/api/api-local.js';
import { toast } from 'sonner';

export function ReviewListPage({ onNavigate, recipeId }) {
  const [reviews, setReviews] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('최신순');

  const filterOptions = ['최신순', '평점 높은순', '평점 낮은순'];

  useEffect(() => {
    if (recipeId) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId]);

  const loadData = async () => {
    if (!recipeId) return;

    try {
      const [reviewData, recipeData] = await Promise.all([
        getRecipeReviews(recipeId),
        getRecipeById(recipeId),
      ]);
      
      setReviews(reviewData.reviews || []);
      setRecipe(recipeData.recipe);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredReviews = () => {
    let filtered = [...reviews];
    
    if (filter === '평점 높은순') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filter === '평점 낮은순') {
      filtered.sort((a, b) => a.rating - b.rating);
    }
    
    return filtered;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return '오늘';
    if (diffInDays === 1) return '어제';
    if (diffInDays < 7) return `${diffInDays}일 전`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}주 전`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}개월 전`;
    return `${Math.floor(diffInDays / 365)}년 전`;
  };

  return (
    <div className="min-h-screen bg-white pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#EA512E] to-[#FF7A59] text-white px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => onNavigate('detail', recipeId || undefined)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h2 className="text-white">리뷰</h2>
            {recipe && (
              <p className="text-white/80 text-sm mt-1">{recipe.title}</p>
            )}
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                filter === option
                  ? 'bg-white text-primary'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        {loading ? (
          <div className="text-center py-12 text-gray-500">로딩 중...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-2">아직 리뷰가 없습니다</p>
            <p className="text-sm text-gray-400">첫 리뷰를 작성해보세요!</p>
            <button
              onClick={() => onNavigate('review', recipeId || undefined)}
              className="mt-6 px-6 py-3 rounded-full text-white"
              style={{ backgroundColor: '#EA512E' }}
            >
              리뷰 작성하기
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {getFilteredReviews().map((review) => (
              <div
                key={review.id}
                className="bg-white border border-gray-200 rounded-2xl p-5"
              >
                {/* User Info & Rating */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#EA512E] to-[#FF7A59] rounded-full flex items-center justify-center text-white">
                      {review.userName?.[0] || 'U'}
                    </div>
                    <div>
                      <p className="font-medium">{review.userName || '익명'}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                    <span className="font-medium">{review.rating}</span>
                  </div>
                </div>

                {/* Review Content */}
                {review.comment && (
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {review.comment}
                  </p>
                )}

                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Review ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-xl"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
