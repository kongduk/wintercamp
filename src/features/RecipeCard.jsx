import { useState, useEffect } from 'react';
import { Star, Heart } from 'lucide-react';
import { toggleLike, checkLike } from '../shared/api/api-local.js';

export function RecipeCard({ recipe, onClick }) {
  const [isLiked, setIsLiked] = useState(false);
  
  // Get image from either image or images array
  const imageUrl = recipe.image || (recipe.images && recipe.images[0]) || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';
  
  // Generate tags if not provided
  const tags = recipe.tags || [recipe.species, recipe.category].filter(Boolean);
  
  // Check like status on mount
  useEffect(() => {
    let isMounted = true;
    console.log(`[RecipeCard] useEffect 실행 - recipe.id: ${recipe.id}, recipe.title: ${recipe.title}`);
    
    const fetchLikeStatus = async () => {
      try {
        console.log(`[RecipeCard] checkLike 호출 - recipe.id: ${recipe.id}`);
        const { isLiked: liked } = await checkLike(recipe.id);
        console.log(`[RecipeCard] checkLike 결과 - recipe.id: ${recipe.id}, isLiked: ${liked}`);
        if (isMounted) {
          setIsLiked(liked);
          console.log(`[RecipeCard] setIsLiked 호출 - recipe.id: ${recipe.id}, liked: ${liked}`);
        }
      } catch (error) {
        console.error('Failed to check like status:', error);
      }
    };
    
    fetchLikeStatus();
    
    // Listen for like changes from other components
    const handleLikeChange = (event) => {
      console.log(`[RecipeCard] likeChanged 이벤트 수신 - event.detail:`, event.detail, `recipe.id: ${recipe.id}`);
      if (event.detail.recipeId === recipe.id && isMounted) {
        setIsLiked(event.detail.isLiked);
        console.log(`[RecipeCard] 이벤트로 setIsLiked 호출 - recipe.id: ${recipe.id}, isLiked: ${event.detail.isLiked}`);
      }
    };
    
    window.addEventListener('likeChanged', handleLikeChange);
    console.log(`[RecipeCard] likeChanged 리스너 등록 - recipe.id: ${recipe.id}`);
    
    return () => {
      isMounted = false;
      window.removeEventListener('likeChanged', handleLikeChange);
      console.log(`[RecipeCard] cleanup - recipe.id: ${recipe.id}`);
    };
  }, [recipe.id]);
  
  const handleLikeClick = async (e) => {
    e.stopPropagation();
    try {
      console.log(`[RecipeCard] 좋아요 클릭 - recipe.id: ${recipe.id}`);
      const { isLiked: liked } = await toggleLike(recipe.id);
      console.log(`[RecipeCard] toggleLike 결과 - recipe.id: ${recipe.id}, isLiked: ${liked}`);
      setIsLiked(liked);
      
      // Dispatch custom event to sync with other components
      console.log(`[RecipeCard] likeChanged 이벤트 발송 - recipe.id: ${recipe.id}, isLiked: ${liked}`);
      window.dispatchEvent(new CustomEvent('likeChanged', {
        detail: { recipeId: recipe.id, isLiked: liked }
      }));
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };
  
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 active:scale-95 transition-transform cursor-pointer"
    >
      <div className="relative aspect-square">
        <img
          src={imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div 
          onClick={handleLikeClick}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer"
        >
          <Heart 
            className="w-4 h-4 transition-colors"
            style={{
              fill: isLiked ? '#ef4444' : 'none',
              color: isLiked ? '#ef4444' : '#374151'
            }}
          />
        </div>
      </div>
      <div className="p-3">
        <h4 className="mb-2 line-clamp-2">{recipe.title}</h4>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="px-2 py-1 bg-accent text-primary rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
          <span className="text-sm">{recipe.rating || 0}</span>
          <span className="text-xs text-gray-400">({recipe.reviewCount || 0})</span>
        </div>
      </div>
    </div>
  );
}
