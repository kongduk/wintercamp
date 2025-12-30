import { ArrowLeft, Search, ChevronDown } from 'lucide-react';
import { RecipeCard } from '../features/RecipeCard.jsx';
import { BottomNav } from '../widgets/BottomNav.jsx';
import { useState, useEffect } from 'react';
import { getRecipes } from '../shared/api/api-local.js';

export function RecipesPage({ onNavigate, recipes: initialRecipes, initialSpecies }) {
  const [selectedCategory, setSelectedCategory] = useState(initialSpecies || '전체');
  const [selectedCuisine, setSelectedCuisine] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState(initialRecipes);
  const [loading, setLoading] = useState(false);
  
  const categories = ['전체', '아무르불가사리', '별불가사리', '고둥', '보라성게', '말똥성게', '군소', '소라', '감태', '모자반'];
  const cuisines = ['전체', '한식', '양식', '중식', '일식'];

  // Set initial category from props
  useEffect(() => {
    if (initialSpecies) {
      setSelectedCategory(initialSpecies);
    }
  }, [initialSpecies]);

  // Load recipes when cuisine filter changes
  useEffect(() => {
    loadRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCuisine]);

  const loadRecipes = async () => {
    setLoading(true);
    try {
      const data = await getRecipes({
        category: selectedCuisine === '전체' ? undefined : selectedCuisine,
        limit: 50,
      });
      const recipesWithImages = data.recipes.map((r) => ({
        ...r,
        image: r.images?.[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      }));
      setRecipes(recipesWithImages);
    } catch (error) {
      console.error('Failed to load recipes:', error);
      setRecipes(initialRecipes);
    } finally {
      setLoading(false);
    }
  };

  // Filter recipes based on selected category and search
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = selectedCategory === '전체' || recipe.species === selectedCategory;
    const matchesSearch = !searchQuery || 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.species.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#EA512E] to-[#FF7A59] text-white px-6 py-4">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => onNavigate('home')} className="flex-shrink-0">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl text-white">레시피 둘러보기</h2>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white rounded-full px-4 py-3 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="레시피 검색하기"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-gray-800 placeholder:text-gray-400 outline-none"
          />
        </div>
      </div>

      {/* Cuisine Type Tabs */}
      <div className="px-6 mt-6">
        <div className="flex gap-6 mb-4 overflow-x-auto scrollbar-hide">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => setSelectedCuisine(cuisine)}
              className="relative pb-2 whitespace-nowrap"
            >
              <p className={selectedCuisine === cuisine ? 'text-primary' : 'text-gray-400'}>
                {cuisine}
              </p>
              {selectedCuisine === cuisine && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-6 mt-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="px-6 mt-6">
        {loading ? (
          <div className="text-center py-12 text-gray-500">로딩 중...</div>
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-2">레시피가 없습니다</p>
            <p className="text-sm text-gray-400">다른 카테고리를 선택해보세요</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 pb-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => onNavigate('detail', recipe.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="recipes" onNavigate={onNavigate} />
    </div>
  );
}
