import { useState } from 'react';
import { ArrowLeft, Camera, Plus, Minus, X } from 'lucide-react';
import { createRecipe, uploadImage } from '../shared/api/api-local.js';
import { toast } from 'sonner';

export function CreateRecipePage({ onNavigate, onSave, user }) {
  const [title, setTitle] = useState('');
  const [species, setSpecies] = useState('');
  const [category, setCategory] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [difficulty, setDifficulty] = useState('중');
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [ingredients, setIngredients] = useState([
    { name: '', amount: '' },
  ]);
  const [steps, setSteps] = useState([{ text: '', image: null }]);
  const [uploading, setUploading] = useState(false);

  // Check if user is logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <h3 className="mb-2">로그인이 필요합니다</h3>
        <p className="text-gray-500 text-center mb-6">
          레시피를 등록하려면<br />로그인해주세요
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

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '' }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addStep = () => {
    setSteps([...steps, { text: '', image: null }]);
  };

  const removeStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const updateStep = (index, value) => {
    const updated = [...steps];
    updated[index].text = value;
    setSteps(updated);
  };

  const handleSave = async () => {
    if (!title || !species || !category || !imageFile) {
      toast.error('필수 항목을 모두 입력해주세요.');
      return;
    }

    setUploading(true);

    try {
      // Upload main image
      const imageData = await uploadImage(imageFile);
      const uploadedImageUrl = imageData.url;

      // Format ingredients
      const formattedIngredients = ingredients
        .filter(i => i.name)
        .map(i => `${i.name} ${i.amount}`.trim());

      // Format steps
      const formattedSteps = steps
        .filter(s => s.text)
        .map(s => s.text);

      // Create recipe
      await createRecipe({
        title,
        species,
        category,
        ingredients: formattedIngredients,
        steps: formattedSteps,
        cookingTime: cookTime,
        difficulty,
        images: [uploadedImageUrl],
      });

      toast.success('레시피가 등록되었습니다!');
      onSave?.();
    } catch (error) {
      console.error('Failed to create recipe:', error);
      toast.error(error.message || '레시피 등록에 실패했습니다.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#EA512E] to-[#FF7A59] text-white px-6 py-4 flex items-center gap-4">
        <button onClick={() => onNavigate('mypage')}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white">레시피 등록</h2>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block mb-2">대표 사진 *</label>
          {!image ? (
            <label className="block border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-primary/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-500">사진을 업로드해주세요</p>
            </label>
          ) : (
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={image}
                alt="Recipe"
                className="w-full aspect-video object-cover"
              />
              <button
                onClick={() => {
                  setImage(null);
                  setImageFile(null);
                }}
                className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block mb-2">레시피 제목 *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 매콤한 불가사리 볶음 덮밥"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Species */}
        <div>
          <label className="block mb-2">사용된 해양 유해 생물 *</label>
          <select
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
          >
            <option value="">선택해주세요</option>
            <option value="아무르불가사리">아무르불가사리</option>
            <option value="별불가사리">별불가사리</option>
            <option value="고둥">고둥</option>
            <option value="보라성게">보라성게</option>
            <option value="말똥성게">말똥성게</option>
            <option value="군소">군소</option>
            <option value="소라">소라</option>
            <option value="감태">감태</option>
            <option value="모자반">모자반</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2">요리 종류 *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
          >
            <option value="">선택해주세요</option>
            <option value="한식">한식</option>
            <option value="양식">양식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
          </select>
        </div>

        {/* Cook Time & Difficulty */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">조리 시간</label>
            <input
              type="text"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              placeholder="예: 30분"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block mb-2">난이도</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
            >
              <option value="쉬움">쉬움</option>
              <option value="중">중</option>
              <option value="어려움">어려움</option>
            </select>
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label>재료</label>
            <button
              onClick={addIngredient}
              className="flex items-center gap-1 text-primary text-sm"
            >
              <Plus className="w-4 h-4" />
              추가
            </button>
          </div>
          <div className="space-y-3">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) =>
                    updateIngredient(index, 'name', e.target.value)
                  }
                  placeholder="재료명"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <input
                  type="text"
                  value={ingredient.amount}
                  onChange={(e) =>
                    updateIngredient(index, 'amount', e.target.value)
                  }
                  placeholder="양"
                  className="w-24 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {ingredients.length > 1 && (
                  <button
                    onClick={() => removeIngredient(index)}
                    className="w-10 h-10 flex items-center justify-center text-gray-400"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label>조리 방법</label>
            <button
              onClick={addStep}
              className="flex items-center gap-1 text-primary text-sm"
            >
              <Plus className="w-4 h-4" />
              추가
            </button>
          </div>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="space-y-2">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mt-2">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={step.text}
                      onChange={(e) => updateStep(index, e.target.value)}
                      placeholder="조리 과정을 입력하세요"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>
                  {steps.length > 1 && (
                    <button
                      onClick={() => removeStep(index)}
                      className="w-10 h-10 flex items-center justify-center text-gray-400 self-start"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 max-w-md mx-auto">
        <button
          onClick={handleSave}
          className="w-full bg-primary text-white py-4 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!title || !species || !category || !image || uploading}
        >
          {uploading ? '등록 중...' : '레시피 등록하기'}
        </button>
      </div>
    </div>
  );
}
