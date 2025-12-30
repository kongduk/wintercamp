import { X, MapPin, Ruler, AlertTriangle } from 'lucide-react';

export function SpeciesModal({ species, onClose, onNavigate }) {
  // Parse and clean text
  const cleanText = (text) => {
    return text
      .replace(/&lt;br\/&gt;/g, '\n')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/&amp;/g, '&')
      .trim();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-t-[32px] max-h-[85vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-48">
          <img
            src={species.image}
            alt={species.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-6 py-6">
          {/* Title */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-primary text-white rounded-full text-sm mb-3">
              해양 유해 생물
            </span>
            <h2 className="mb-2">{species.name}</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {cleanText(species.description)}
            </p>
          </div>

          {/* Info Cards */}
          <div className="space-y-3 mb-6">
            <div className="bg-accent rounded-2xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="mb-1">서식지</h4>
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  {cleanText(species.habitat)}
                </p>
              </div>
            </div>

            <div className="bg-accent rounded-2xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Ruler className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="mb-1">크기</h4>
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  {cleanText(species.size)}
                </p>
              </div>
            </div>

            <div className="bg-accent rounded-2xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="mb-1">위험성</h4>
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  {cleanText(species.danger)}
                </p>
              </div>
            </div>
          </div>

          {/* Impact */}
          <div className="bg-gradient-to-br from-[#EA512E]/10 to-[#FF7A59]/10 rounded-2xl p-4 border border-primary/20 mb-6">
            <h4 className="mb-2">환경 영향</h4>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {cleanText(species.impact)}
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              onClose();
              onNavigate('recipes', species.name);
            }}
            className="w-full bg-primary text-white py-4 rounded-full"
          >
            관련 레시피 보기
          </button>
        </div>
      </div>
    </div>
  );
}
