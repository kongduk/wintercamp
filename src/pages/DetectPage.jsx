import { useState } from 'react';
import { ArrowLeft, Camera, Upload, Loader2, Check, Menu } from 'lucide-react';
import svgPaths from '../shared/assets/svg-y8mv9s8pbk.js';
import { BottomNav } from '../widgets/BottomNav.jsx';
import { SpeciesModal } from '../features/SpeciesModal.jsx';
import { CREATURES, getCreatureByName } from '../entities/creatures.js';

export function DetectPage({ onNavigate }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [result, setResult] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        analyzeImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (file) => {
    setIsAnalyzing(true);
    setResult(null);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 임시 목업 데이터
      const mockApiResponse = {
        creature_name: '군소'
      };
      
      const creatureName = mockApiResponse.creature_name;
      const creature = getCreatureByName(creatureName);
      
      if (creature) {
        setResult({
          isHarmful: true,
          species: creature.name,
          confidence: 94.5,
          description: creature.description,
        });
        setSelectedSpecies(creature);
      } else {
        setResult({
          isHarmful: false,
          species: '알 수 없음',
          confidence: 0,
          description: '해당 생물을 데이터베이스에서 찾을 수 없습니다.',
        });
      }
    } catch (error) {
      console.error('Detection error:', error);
      setResult({
        isHarmful: false,
        species: '오류',
        confidence: 0,
        description: '이미지 분석 중 오류가 발생했습니다.',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Page Title & Tabs */}
      <div className="px-6 pt-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => onNavigate('home')} className="flex-shrink-0">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h2 className="text-xl">유해생물 판별기</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-12 mb-8">
          <button
            onClick={() => setActiveTab('upload')}
            className="relative pb-1"
          >
            <p
              className={`text-[15px] ${
                activeTab === 'upload' ? 'text-primary' : 'text-[#b2b2b2]'
              }`}
            >
              사진 등록하기
            </p>
            {activeTab === 'upload' && (
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className="relative pb-1"
          >
            <p
              className={`text-[15px] ${
                activeTab === 'info' ? 'text-primary' : 'text-[#b2b2b2]'
              }`}
            >
              유해생물 정보
            </p>
            {activeTab === 'info' && (
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'upload' && (
        <div className="px-6">
          <div className="mb-10">
            <h1 className="text-[25px] leading-[1.2] mb-1">
              <span className="text-primary">유해생물</span>을
            </h1>
            <h1 className="text-[25px] leading-[1.2]">구별하고 대처하자</h1>
          </div>

          {/* Upload Area */}
          {!uploadedImage ? (
            <div className="mb-9">
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <div className="border border-[#a8a8a9] rounded-[15px] h-[154px] flex flex-col items-center justify-center">
                  <div className="w-[46px] h-[46px] mb-4">
                    <svg
                      className="block size-full"
                      fill="none"
                      viewBox="0 0 46 46"
                    >
                      <path
                        d={svgPaths.p39bf3900}
                        stroke="#A8A8A9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  <p className="text-[15px] text-[#a8a8a9]">사진 업로드하기</p>
                </div>
              </label>
            </div>
          ) : (
            <div className="mb-9">
              <div className="rounded-[15px] overflow-hidden mb-6">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-full aspect-square object-cover"
                />
              </div>

              {isAnalyzing && (
                <div className="bg-accent rounded-3xl p-8 text-center mb-6">
                  <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                  <p className="text-gray-700">이미지를 분석하고 있습니다...</p>
                </div>
              )}
            </div>
          )}

          {/* Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => {
                if (uploadedImage) {
                  setUploadedImage(null);
                  setResult(null);
                }
              }}
              className="bg-primary text-white px-[17.4px] py-[7px] rounded-full text-[13.9px]"
            >
              {uploadedImage ? '다시 촬영하기' : '검색하기'}
            </button>
          </div>

          {/* Detection Result */}
          {result && (
            <div>
              <h3 className="mb-4">판별 결과</h3>
              <div
                className={`rounded-3xl p-6 mb-6 ${
                  result.isHarmful
                    ? 'bg-gradient-to-br from-[#EA512E]/10 to-[#FF7A59]/10 border-2 border-primary'
                    : 'bg-gray-50 border-2 border-gray-300'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      result.isHarmful ? 'bg-primary' : 'bg-green-500'
                    }`}
                  >
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {result.isHarmful ? (
                        <span className="px-3 py-1 bg-primary text-white rounded-full text-sm">
                          유해 생물
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">
                          일반 생물
                        </span>
                      )}
                      <span className="text-sm text-gray-600">
                        {result.confidence}% 확신
                      </span>
                    </div>
                    <h3 className="mb-2">{result.species}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {result.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {result.isHarmful && (
                <div className="space-y-3">
                  <button
                    onClick={() => onNavigate('create-recipe')}
                    className="w-full bg-primary text-white py-4 rounded-full"
                  >
                    이 재료로 레시피 만들기
                  </button>
                  <button
                    onClick={() => onNavigate('recipes')}
                    className="w-full bg-white text-primary border-2 border-primary py-4 rounded-full"
                  >
                    관련 레시피 보기
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Info Tab - Marine Species List */}
      {activeTab === 'info' && (
        <div className="px-6">
          <h3 className="mb-4">주요 해양 유해 생물</h3>
          <div className="grid grid-cols-2 gap-4">
            {CREATURES.map((species) => (
              species.image ? (
                <button
                  key={species.id}
                  onClick={() => setSelectedSpecies(species)}
                  className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 active:scale-95 transition-all hover:shadow-lg"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={species.image}
                      alt={species.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <span className="text-sm font-medium text-white drop-shadow-lg block text-left leading-tight">
                        {species.name}
                      </span>
                    </div>
                  </div>
                </button>
              ) : (
                <button
                  key={species.id}
                  onClick={() => setSelectedSpecies(species)}
                  className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 active:scale-95 transition-all hover:shadow-lg p-4 flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">🐟</div>
                    <span className="text-sm block text-left leading-tight text-gray-700">
                      {species.name}
                    </span>
                  </div>
                </button>
              )
            ))}
          </div>
        </div>
      )}

      {/* Species Modal */}
      {selectedSpecies && (
        <SpeciesModal
          species={selectedSpecies}
          onClose={() => setSelectedSpecies(null)}
          onNavigate={onNavigate}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav currentPage="detect" onNavigate={onNavigate} />
    </div>
  );
}
