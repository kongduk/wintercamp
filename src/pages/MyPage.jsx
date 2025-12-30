import { useState, useEffect } from 'react';
import { User, Edit, Edit3, Trash2, Plus, ArrowLeft, ChefHat } from 'lucide-react';
import { getMyRecipes, deleteRecipe } from '../shared/api/api-local.js';
import { toast } from 'sonner';
import { BottomNav } from '../widgets/BottomNav.jsx';

export function MyPage({ onNavigate, onDeleteRecipe, user }) {
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMyRecipes = async () => {
    setLoading(true);
    try {
      const data = await getMyRecipes();
      const recipesWithImages = data.recipes.map((r) => ({
        ...r,
        image: r.images?.[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        tags: r.species ? [r.species, r.category] : [r.category],
      }));
      setMyRecipes(recipesWithImages);
    } catch (error) {
      console.error('Failed to load recipes:', error);
      // Don't show error toast if there are just no recipes
      setMyRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Load recipes on mount (every time page is shown)
  useEffect(() => {
    loadMyRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('정말 이 레시피를 삭제하시겠습니까?')) return;

    try {
      await deleteRecipe(id);
      toast.success('레시피가 삭제되었습니다.');
      loadMyRecipes();
      onDeleteRecipe?.();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const stats = {
    totalRecipes: myRecipes.length,
    totalLikes: myRecipes.reduce((sum, r) => sum + (r.likeCount || 0), 0),
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#EA512E] to-[#FF7A59] text-white px-6 py-4 flex items-center gap-4">
        <button onClick={() => onNavigate('home')} className="flex-shrink-0">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl text-white">마이페이지</h2>
      </div>

      {/* Profile Section */}
      <div className="px-6 py-8 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-[#EA512E] to-[#FF7A59] rounded-full flex items-center justify-center text-white text-2xl">
            {user?.name?.[0] || '오'}
          </div>
          <div>
            <h3 className="mb-1">{user?.name || '오션쿡'}</h3>
            <p className="text-sm text-gray-500">{user?.email || 'demo@ocean.com'}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-accent rounded-2xl p-4 text-center">
            <div className="text-2xl text-primary mb-1">
              {stats.totalRecipes}
            </div>
            <p className="text-sm text-gray-600">내 레시피</p>
          </div>
          <div className="bg-accent rounded-2xl p-4 text-center">
            <div className="text-2xl text-primary mb-1">{stats.totalLikes}</div>
            <p className="text-sm text-gray-600">받은 좋아요</p>
          </div>
        </div>
      </div>

      {/* My Recipes */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h3>내가 만든 레시피</h3>
          <button
            onClick={() => onNavigate('create-recipe')}
            className="flex items-center gap-1 text-primary text-sm"
          >
            <Plus className="w-4 h-4" />
            새 레시피
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">로딩 중...</div>
        ) : myRecipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-10 h-10 text-primary" />
            </div>
            <p className="text-gray-500 mb-4">
              아직 등록한 레시피가 없어요
            </p>
            <button
              onClick={() => onNavigate('create-recipe')}
              className="bg-primary text-white px-6 py-3 rounded-full"
            >
              첫 레시피 만들기
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {myRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
              >
                <div 
                  className="flex gap-4 p-4 cursor-pointer active:bg-gray-50"
                  onClick={() => onNavigate('detail', recipe.id)}
                >
                  <div className="w-24 h-24 rounded-xl flex-shrink-0 overflow-hidden bg-gray-100">
                    {recipe.image ? (
                      <img 
                        src={recipe.image} 
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#EA512E] to-[#FF7A59] flex items-center justify-center">
                        <ChefHat className="w-12 h-12 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="mb-2 line-clamp-2">{recipe.title}</h4>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {recipe.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-accent text-primary rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>❤️ {recipe.likeCount || 0}</span>
                      <span>⭐ {recipe.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 flex">
                  <button 
                    onClick={() => onNavigate('detail', recipe.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="text-sm">상세보기</span>
                  </button>
                  <div className="w-px bg-gray-200" />
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-destructive hover:bg-gray-50 active:bg-gray-100"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">삭제</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="px-6 pb-6">
        <h3 className="mb-4">설정</h3>
        <div className="space-y-2">
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 active:bg-gray-100">
            알림 설정
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 active:bg-gray-100">
            개인정보 처리방침
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 active:bg-gray-100">
            이용약관
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="mypage" onNavigate={onNavigate} />
    </div>
  );
}
