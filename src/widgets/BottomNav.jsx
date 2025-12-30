import { Home, Camera, ChefHat, User } from 'lucide-react';

export function BottomNav({ currentPage, onNavigate }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#dde1e6] h-[72px] max-w-md mx-auto">
      <div className="flex items-center justify-around h-full px-4">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center justify-center w-14 h-14 rounded-full transition-all"
        >
          <Home 
            className={`w-7 h-7 ${
              currentPage === 'home' ? 'text-primary' : 'text-gray-600'
            }`}
            fill={currentPage === 'home' ? '#EA512E' : 'none'}
          />
        </button>
        <button
          onClick={() => onNavigate('detect')}
          className="flex items-center justify-center w-14 h-14 rounded-full transition-all"
        >
          <Camera 
            className={`w-7 h-7 ${
              currentPage === 'detect' ? 'text-primary' : 'text-gray-600'
            }`}
            fill={currentPage === 'detect' ? '#EA512E' : 'none'}
          />
        </button>
        <button
          onClick={() => onNavigate('recipes')}
          className="flex items-center justify-center w-14 h-14 rounded-full transition-all"
        >
          <ChefHat 
            className={`w-7 h-7 ${
              currentPage === 'recipes' ? 'text-primary' : 'text-gray-600'
            }`}
            fill={currentPage === 'recipes' ? '#EA512E' : 'none'}
          />
        </button>
        <button
          onClick={() => onNavigate('mypage')}
          className="flex items-center justify-center w-14 h-14 rounded-full transition-all"
        >
          <User 
            className={`w-7 h-7 ${
              currentPage === 'mypage' ? 'text-primary' : 'text-gray-600'
            }`}
            fill={currentPage === 'mypage' ? '#EA512E' : 'none'}
          />
        </button>
      </div>
    </nav>
  );
}
