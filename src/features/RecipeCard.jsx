import { useState, useEffect } from 'react';
import { Star, Heart } from 'lucide-react';
import { toggleLike, checkLike } from '../shared/api/api-local.js';

export function RecipeCard({ recipe, onClick }) {
  const [isLiked, setIsLiked] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Get image from either image or images array
  const imageUrl = recipe.image || (recipe.images && recipe.images[0]) || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';
  
  // Generate tags if not provided
  const tags = recipe.tags || [recipe.species, recipe.category].filter(Boolean);
  
  // Check like status on mount and when refreshKey changes
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const { isLiked: liked } = await checkLike(recipe.id);
        setIsLiked(liked);
      } catch (error) {
        console.error('Failed to check like status:', error);
      }
    };
    fetchLikeStatus();
  }, [recipe.id, refreshKey]);
  
  // Listen for like changes from other components
  useEffect(() => {
    const handleLikeChange = (event) => {
      if (event.detail.recipeId === recipe.id) {
        setIsLiked(event.detail.isLiked);
      }
    };
    
    // Refresh when navigating back to this page
    const handlePageNavigate = () => {
      setRefreshKey(prev => prev + 1);
    };
    
    window.addEventListener('likeChanged', handleLikeChange);
    window.addEventListener('pageNavigate', handlePageNavigate);
    
    return () => {
      window.removeEventListener('likeChanged', handleLikeChange);
      window.removeEventListener('pageNavigate', handlePageNavigate);
    };
  }, [recipe.id]);
  
  const handleLikeClick = async (e) => {
    e.stopPropagation();
    try {
      const { isLiked: liked } = await toggleLike(recipe.id);
      setIsLiked(liked);
      
      // Dispatch custom event to sync with other components
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
            className={`w-4 h-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
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
