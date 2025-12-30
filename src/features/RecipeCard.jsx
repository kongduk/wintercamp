import { Star, Bookmark } from 'lucide-react';

export function RecipeCard({ recipe, onClick }) {
  // Get image from either image or images array
  const imageUrl = recipe.image || (recipe.images && recipe.images[0]) || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';
  
  // Generate tags if not provided
  const tags = recipe.tags || [recipe.species, recipe.category].filter(Boolean);
  
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
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <Bookmark className="w-4 h-4 text-gray-700" />
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
