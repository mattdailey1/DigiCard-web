import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface CardData {
  cardId: number;
  recipientName: string;
  senderName: string;
  message: string;
  useAI: boolean;
}

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

const CardRecipientPage = () => {
  const { cardId } = useParams();
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [cardState, setCardState] = useState<'closed' | 'opening' | 'open'>('closed');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const storedData = localStorage.getItem(`card_${cardId}`);
      if (storedData) {
        setCardData(JSON.parse(storedData));
      }
      setIsLoading(false);
    }, 1000);
  }, [cardId]);

  const selectedCard = cardData ? cardTemplates.find(card => card.id === cardData.cardId) : null;

  const handleCardClick = () => {
    if (cardState === 'closed') {
      setCardState('opening');
      setTimeout(() => setCardState('open'), 300);
    } else if (cardState === 'open') {
      setCardState('opening');
      setTimeout(() => setCardState('closed'), 300);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your birthday card...</p>
        </div>
      </div>
    );
  }

  if (!selectedCard || !cardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Card not found</h1>
          <p className="text-gray-600">This birthday card may have expired or doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">You Have a Birthday Card!</h1>
          <p className="text-xl text-gray-600">Click the card below to open it and see your special message</p>
        </div>

        {/* Centered card container */}
        <div className="flex justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Your Birthday Card</h3>
              <p className="text-sm text-gray-600">From: {cardData.senderName}</p>
            </div>

            <div className="flex justify-center mb-6">
              <div
                className="relative bg-white rounded-xl shadow-2xl overflow-hidden cursor-pointer"
                style={{ height: '24rem', width: '100%', maxWidth: '20rem' }}
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

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                {cardState === 'closed'
                  ? "Click the card above to open it and read your birthday message!"
                  : cardState === 'open'
                    ? "Click the card again to close it"
                    : "Opening your card..."}
              </p>
            </div>
          </div>
        </div>

        {/* Download section */}
        <div className="mt-8 flex justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-center">
            <h3 className="text-lg font-semibold mb-4">Share the Joy!</h3>
            <p className="text-sm text-gray-600 mb-4">Loved your birthday card? Download it and keep it forever!</p>
            <button
              className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
              onClick={() => {}}
            >
              Download Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRecipientPage;
