import { useState, useEffect } from 'react';
import { HomePage } from '../pages/HomePage.jsx';
import { RecipesPage } from '../pages/RecipesPage.jsx';
import { RecipeDetailPage } from '../pages/RecipeDetailPage.jsx';
import { CreateRecipePage } from '../pages/CreateRecipePage.jsx';
import { ReviewPage } from '../pages/ReviewPage.jsx';
import { ReviewListPage } from '../pages/ReviewListPage.jsx';
import { MyPage } from '../pages/MyPage.jsx';
import { DetectPage } from '../pages/DetectPage.jsx';
import { Toaster } from 'sonner';
import { getRecipes } from '../shared/api/api-local.js';
import { initSampleData } from '../shared/lib/initData.js';
import * as storage from '../shared/lib/localStorage.js';
import '../shared/styles/globals.css';

// Default user constant
const defaultUser = {
  id: 'sample-user-1',
  email: 'demo@ocean.com',
  name: '오션쿡',
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user] = useState(defaultUser);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(undefined);

  const loadRecipes = async () => {
    try {
      const data = await getRecipes({ limit: 50 });
      setRecipes(data.recipes || []);
    } catch (error) {
      console.error('Failed to load recipes:', error);
      // Use mock data as fallback
      setRecipes(mockRecipes);
    }
  };

  // Initialize app - set default user and load data
  useEffect(() => {
    // Save default user to localStorage
    storage.saveCurrentUser(defaultUser);
    // Initialize sample data on first load
    initSampleData();
    loadRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavigate = (page, recipeId) => {
    if (recipeId) {
      // If navigating to recipes page, recipeId could be a species name
      if (page === 'recipes') {
        setSelectedSpecies(recipeId);
      } else {
        setSelectedRecipeId(recipeId);
      }
    } else {
      setSelectedSpecies(undefined);
    }
    setCurrentPage(page);
  };

  const handleRecipeCreated = () => {
    loadRecipes();
    setCurrentPage('mypage');
  };

  const handleRecipeDeleted = () => {
    loadRecipes();
  };

  // Mock data for fallback
  const mockRecipes = [
    {
      id: '1',
      title: '매콤한 불가사리 볶음 덮밥',
      image: 'https://images.unsplash.com/photo-1763627719076-3e71ddff7cb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwZGlzaCUyMGFzaWFufGVufDF8fHx8MTc2NzA1MjQ4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      species: '불가사리',
      tags: ['불가사리', '매콤한'],
      rating: 4.5,
      reviewCount: 128,
      category: '한식',
    },
    {
      id: '2',
      title: '해파리 냉채',
      image: 'https://images.unsplash.com/photo-1761530291482-c3ed81a7fc3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBzZWFmb29kJTIwc3Rld3xlbnwxfHx8fDE3NjcwNTI0ODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      species: '해파리',
      tags: ['해파리', '시원한'],
      rating: 4.2,
      reviewCount: 94,
      category: '한식',
    },
    {
      id: '3',
      title: '성게알 비빔밥',
      image: 'https://images.unsplash.com/photo-1721982318707-14939452a32e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZhc2l2ZSUyMHNwZWNpZXMlMjBmaXNofGVufDF8fHx8MTc2NzA1MjQ4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      species: '성게',
      tags: ['성게', '비빔밥'],
      rating: 4.8,
      reviewCount: 203,
      category: '한식',
    },
    {
      id: '4',
      title: '불가사리 탕수',
      image: 'https://images.unsplash.com/photo-1759337677690-ef7608ce9e5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwcmVjaXBlJTIwY29va2luZ3xlbnwxfHx8fDE3NjcwNTI0ODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      species: '불가사리',
      tags: ['불가사리', '튀김'],
      rating: 4.3,
      reviewCount: 87,
      category: '중식',
    },
  ];

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto relative">
      <Toaster position="top-center" />
      
      {currentPage === 'home' && (
        <HomePage 
          onNavigate={handleNavigate} 
          recipes={recipes.length > 0 ? recipes : mockRecipes}
          user={user}
        />
      )}
      {currentPage === 'detect' && <DetectPage onNavigate={handleNavigate} />}
      {currentPage === 'detail' && (
        <RecipeDetailPage 
          onNavigate={handleNavigate}
          recipeId={selectedRecipeId}
          user={user}
        />
      )}
      {currentPage === 'create-recipe' && (
        <CreateRecipePage
          onNavigate={handleNavigate}
          onSave={handleRecipeCreated}
          user={user}
        />
      )}
      {currentPage === 'mypage' && (
        <MyPage
          onNavigate={handleNavigate}
          onDeleteRecipe={handleRecipeDeleted}
          user={user}
        />
      )}
      {currentPage === 'recipes' && (
        <RecipesPage 
          onNavigate={handleNavigate} 
          recipes={recipes.length > 0 ? recipes : mockRecipes}
          initialSpecies={selectedSpecies}
        />
      )}
      {currentPage === 'review' && (
        <ReviewPage 
          onNavigate={handleNavigate}
          recipeId={selectedRecipeId}
          user={user}
        />
      )}
      {currentPage === 'review-list' && (
        <ReviewListPage 
          onNavigate={handleNavigate}
          recipeId={selectedRecipeId}
        />
      )}
    </div>
  );
}
