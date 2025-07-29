import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const cardTemplates = [
  { id: 1, name: "Birthday Balloons", colors: "from-pink-400 to-purple-500", emoji: "🎈" },
  { id: 2, name: "Cake & Candles", colors: "from-yellow-400 to-orange-500", emoji: "🎂" },
  { id: 3, name: "Party Hat", colors: "from-blue-400 to-cyan-500", emoji: "🎉" },
  { id: 4, name: "Gift Box", colors: "from-green-400 to-teal-500", emoji: "🎁" },
  { id: 5, name: "Stars & Sparkles", colors: "from-purple-400 to-pink-500", emoji: "⭐" },
  { id: 6, name: "Flower Garden", colors: "from-rose-400 to-pink-500", emoji: "🌸" },
  { id: 7, name: "Ocean Waves", colors: "from-cyan-400 to-blue-500", emoji: "🌊" },
  { id: 8, name: "Sunset Glow", colors: "from-orange-400 to-red-500", emoji: "🌅" }
];

interface CardData {
  cardId: number;
  recipientName: string;
  senderName: string;
  message: string;
  useAI: boolean;
}

const CardPreviewPage = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [cardState, setCardState] = useState<'closed' | 'opening' | 'open'>('closed');

  useEffect(() => {
    const storedData = localStorage.getItem('cardData');
    if (storedData) {
      setCardData(JSON.parse(storedData));
    }
  }, []);

  const selectedCard = cardTemplates.find(card => card.id === Number(cardId));

  if (!selectedCard || !cardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Card not found</h1>
          <Link to="/select-card" className="btn-primary">Back to Card Selection</Link>
        </div>
      </div>
    );
  }

  const handleSend = () => {
    navigate(`/send/${cardId}`);
  };

  const handleEdit = () => {
    navigate(`/customize/${cardId}`);
  };

  const handleCardClick = () => {
    if (cardState === 'closed') {
      setCardState('opening');
      setTimeout(() => setCardState('open'), 300);
    } else if (cardState === 'open') {
      setCardState('opening');
      setTimeout(() => setCardState('closed'), 300);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link to={`/customize/${cardId}`} className="text-purple-600 hover:text-purple-700 mb-4 inline-block">
            ← Back to Customization
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Preview Your Card</h1>
          <p className="text-xl text-gray-600">This is how your card will look</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Your Birthday Card</h3>
              <p className="text-sm text-gray-600 mb-4">Click the card to open it and see your message</p>

              {/* Mobile Preview */}
              <div className="lg:hidden mb-6 flex justify-center">
                <div
                  className="relative bg-white rounded-xl shadow-2xl overflow-hidden cursor-pointer"
                  style={{
                    height: '22rem'
                  }}
                  onClick={handleCardClick}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      transformStyle: 'preserve-3d',
                      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform:
                        cardState === 'closed'
                          ? 'perspective(1200px) rotateY(0deg)'
                          : cardState === 'opening'
                          ? 'perspective(1200px) rotateY(-15deg)'
                          : 'perspective(1200px) rotateY(-180deg)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col items-center justify-center text-white rounded-xl" style={{ backfaceVisibility: 'hidden' }}>
                      <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full"></div>
                      <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/20 rounded-full"></div>
                      <div className="absolute top-1/2 left-4 w-4 h-4 bg-white/15 rounded-full"></div>
                      <div className="absolute top-1/2 right-4 w-4 h-4 bg-white/15 rounded-full"></div>
                      <div className="absolute bottom-2 right-2 text-white/70 text-xs font-medium bg-black/20 px-2 py-1 rounded-full">Click to open</div>
                      <div className="text-center">
                        <div className="relative mb-6">
                          <div className="w-16 h-20 bg-red-500 rounded-full shadow-lg relative">
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-800"></div>
                          </div>
                        </div>
                        <h2 className="text-2xl font-bold text-center drop-shadow-md">Happy Birthday!</h2>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 rounded-xl" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                      <div className="text-center">
                        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Happy Birthday!</h2>
                        {cardData.recipientName && <p className="text-lg mb-4 text-center font-medium text-gray-700">Dear {cardData.recipientName}</p>}
                        {cardData.message && (
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <p className="text-sm text-center leading-relaxed font-medium text-gray-800">{cardData.message}</p>
                          </div>
                        )}
                        {cardData.senderName && (
                          <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">From {cardData.senderName}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Preview */}
              <div className="hidden lg:block flex justify-center">
                <div
                  className="relative bg-white rounded-xl shadow-2xl overflow-hidden cursor-pointer"
                  style={{ height: '24rem' }}
                  onClick={handleCardClick}
                >
                  <div
                    className="w-full h-full relative"
                    style={{
                      transformStyle: 'preserve-3d',
                      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform:
                        cardState === 'closed'
                          ? 'perspective(1200px) rotateY(0deg)'
                          : cardState === 'opening'
                          ? 'perspective(1200px) rotateY(-15deg)'
                          : 'perspective(1200px) rotateY(-180deg)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-purple-500 flex flex-col items-center justify-center text-white rounded-xl" style={{ backfaceVisibility: 'hidden' }}>
                      <div className="absolute bottom-2 right-2 text-white/70 text-xs font-medium bg-black/20 px-2 py-1 rounded-full">Click to open</div>
                      <div className="text-center">
                        <div className="relative mb-8">
                          <div className="w-20 h-24 bg-red-500 rounded-full shadow-lg relative">
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-gray-800"></div>
                          </div>
                        </div>
                        <h2 className="text-3xl text-white font-bold text-center drop-shadow-md">Happy Birthday!</h2>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 rounded-xl" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                      <div className="text-center">
                        {/* <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Happy Birthday!</h2> */}
                        {cardData.recipientName && <p className="text-xl mb-4 text-center font-medium text-gray-700">Dear {cardData.recipientName}</p>}
                        {cardData.message && (
                          <div className="bg-white rounded-lg p-6 border border-white max-w-md mx-auto">
                            <p className="text-base text-center leading-relaxed font-medium text-gray-800">{cardData.message}</p>
                          </div>
                        )}
                        {cardData.senderName && (
                          <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">From {cardData.senderName}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Card Summary</h3>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Template</h4>
                <div className="flex items-center">
                  <div className={`w-12 h-12 bg-gradient-to-br ${selectedCard.colors} rounded-lg flex items-center justify-center mr-3`}>
                    <span className="text-xl">{selectedCard.emoji}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{selectedCard.name}</p>
                    <p className="text-sm text-gray-600">Birthday Card Template</p>
                  </div>
                </div>
              </div>
              {cardData.recipientName && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Recipient</h4>
                  <p className="text-lg font-medium text-gray-800">{cardData.recipientName}</p>
                </div>
              )}
              {cardData.senderName && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">From</h4>
                  <p className="text-lg font-medium text-gray-800">{cardData.senderName}</p>
                </div>
              )}
              {cardData.message && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Your Message</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800 leading-relaxed">{cardData.message}</p>
                    {cardData.useAI && (
                      <p className="text-xs text-gray-500 mt-2">AI-generated message</p>
                    )}
                  </div>
                </div>
              )}
              <div className="space-y-3">
                <button onClick={handleSend} className="btn-primary w-full">Send Birthday Card</button>
                <button onClick={handleEdit} className="btn-secondary w-full">Edit Card</button>
                <Link to="/select-card" className="block text-center text-purple-600 hover:text-purple-700 font-medium py-2">Choose Different Template</Link>
              </div>
              {/* <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-500 mb-3">Share Options</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">Share on Facebook</button>
                  <button className="bg-blue-400 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors">Share on Twitter</button>
                  <button className="bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">Share on WhatsApp</button>
                  <button className="bg-purple-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors">Copy Link</button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default CardPreviewPage;
