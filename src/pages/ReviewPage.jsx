import { ArrowLeft, Star, Camera } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createReview, getRecipeById } from '../shared/api/api-local.js';
import { toast } from 'sonner';

export function ReviewPage({ onNavigate, recipeId, user }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [images, setImages] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Check if user is logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <h3 className="mb-2">로그인이 필요합니다</h3>
        <p className="text-gray-500 text-center mb-6">
          리뷰를 작성하려면<br />로그인해주세요
        </p>
        <button
          onClick={() => onNavigate('auth')}
          className="px-6 py-3 rounded-full text-white"
          style={{ backgroundColor: '#EA512E' }}
        >
          로그인하기
        </button>
      </div>
    );
  }

  // Scroll to top and load recipe when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    if (recipeId) {
      loadRecipe();
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
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!recipeId) {
      toast.error('레시피 정보를 찾을 수 없습니다.');
      return;
    }

    if (rating === 0) {
      toast.error('별점을 선택해주세요.');
      return;
    }

    setSubmitting(true);

    try {
      await createReview(recipeId, {
        rating,
        comment: reviewText,
        images: [],
      });

      toast.success('리뷰가 등록되었습니다!');
      onNavigate('detail', recipeId);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#EA512E] to-[#FF7A59] text-white px-6 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('detail', recipeId || undefined)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white">리뷰 작성</h2>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Recipe Info */}
        {recipe && (
          <div className="bg-accent rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">리뷰 작성 대상</p>
            <h3>{recipe.title}</h3>
          </div>
        )}

        {/* Rating Section */}
        <div className="mb-8">
          <label className="block mb-3">
            <span className="text-gray-700">평점</span>
            <span className="text-primary ml-1">*</span>
          </label>
          <div className="flex gap-2 justify-center py-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-12 h-12 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-primary text-primary'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            {rating === 0
              ? '별점을 선택해주세요'
              : rating === 1
              ? '별로예요'
              : rating === 2
              ? '그저 그래요'
              : rating === 3
              ? '괜찮아요'
              : rating === 4
              ? '좋아요'
              : '최고예요!'}
          </p>
        </div>

        {/* Review Text */}
        <div className="mb-8">
          <label className="block mb-3">
            <span className="text-gray-700">리뷰 내용 (선택)</span>
          </label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="이 레시피는 어떠셨나요? 자세한 후기를 남겨주세요."
            rows={6}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
          <p className="text-sm text-gray-500 mt-2">
            {reviewText.length} / 500자
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 max-w-md mx-auto">
        <button
          onClick={handleSubmit}
          disabled={rating === 0 || submitting}
          className="w-full bg-primary text-white py-4 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {submitting ? '등록 중...' : '리뷰 등록하기'}
        </button>
      </div>
    </div>
  );
}
