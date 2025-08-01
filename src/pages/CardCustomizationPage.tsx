import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// Mock data for card templates (same as CardSelectionPage)
const cardTemplates = [
  {
    id: 1,
    name: "Birthday Balloons",
    colors: "from-pink-400 to-purple-500",
    emoji: "🎈"
  },
  {
    id: 2,
    name: "Cake & Candles",
    colors: "from-yellow-400 to-orange-500",
    emoji: "🎂"
  },
  {
    id: 3,
    name: "Party Hat",
    colors: "from-blue-400 to-cyan-500",
    emoji: "🎉"
  },
  {
    id: 4,
    name: "Gift Box",
    colors: "from-green-400 to-teal-500",
    emoji: "🎁"
  },
  {
    id: 5,
    name: "Stars & Sparkles",
    colors: "from-purple-400 to-pink-500",
    emoji: "⭐"
  },
  {
    id: 6,
    name: "Flower Garden",
    colors: "from-rose-400 to-pink-500",
    emoji: "🌸"
  },
  {
    id: 7,
    name: "Ocean Waves",
    colors: "from-cyan-400 to-blue-500",
    emoji: "🌊"
  },
  {
    id: 8,
    name: "Sunset Glow",
    colors: "from-orange-400 to-red-500",
    emoji: "🌅"
  }
];

const CardCustomizationPage = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [useAI, setUseAI] = useState(false);
  const [aiMessage, setAiMessage] = useState('');

  // Load existing data when component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('cardData');
    if (storedData) {
      const data = JSON.parse(storedData);
      if (data.cardId === Number(cardId)) {
        setRecipientName(data.recipientName || '');
        setSenderName(data.senderName || '');
        setCustomMessage(data.message || '');
        setUseAI(data.useAI || false);
        setAiMessage(data.message || '');
        
      }
    }
  }, [cardId]);

  // Find the selected card template
  const selectedCard = cardTemplates.find(card => card.id === Number(cardId));

  if (!selectedCard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Card not found</h1>
          <Link to="/select-card" className="btn-primary">Back to Card Selection</Link>
        </div>
      </div>
    );
  }

  const handlePreview = () => {
    // Store card data in localStorage for preview page
    const cardData = {
      cardId: selectedCard.id,
      recipientName,
      senderName,
      message: useAI ? aiMessage : customMessage,
      useAI
    };
    localStorage.setItem('cardData', JSON.stringify(cardData));
    navigate(`/preview/${cardId}`);
  };


  const generateAIMessage = () => {
    // Simulate AI message generation
    const messages = [
      "Wishing you a day filled with joy, laughter, and all the things that make you smile! Happy Birthday! 🎉",
      "May your birthday be as wonderful and special as you are! Here's to another amazing year ahead! 🎂",
      "Sending you the biggest birthday wishes! May your day be filled with love, happiness, and everything your heart desires! ✨",
      "Happy Birthday! May this year bring you endless opportunities, beautiful moments, and dreams come true! 🌟",
      "On your special day, I hope you feel surrounded by love and joy. Happy Birthday! 🎈"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setAiMessage(randomMessage);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/select-card" className="text-purple-600 hover:text-purple-700 mb-4 inline-block">
            ← Back to Card Selection
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Customize Your Card
          </h1>
          <p className="text-xl text-gray-600">
            Personalize your {selectedCard.name} birthday card
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Customization Form */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Personalize Your Message</h3>
              
              {/* Recipient Name */}
              <div className="mb-6">
                <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Name
                </label>
                <input
                  type="text"
                  id="recipientName"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Enter recipient's name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Sender Name */}
              <div className="mb-6">
                <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="senderName"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* AI Message Toggle */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={useAI}
                      onChange={(e) => setUseAI(e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      Use AI-generated message
                    </span>
                  </label>
                  {useAI && (
                    <button
                      onClick={generateAIMessage}
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Generate New
                    </button>
                  )}
                </div>
              </div>

              {/* Message Input */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {useAI ? 'AI-Generated Message' : 'Custom Message'}
                </label>
                {useAI ? (
                  <textarea
                    id="message"
                    value={aiMessage}
                    onChange={(e) => setAiMessage(e.target.value)}
                    placeholder="Click 'Generate New' to create an AI message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                  />
                ) : (
                  <textarea
                    id="message"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Write your personal birthday message..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePreview}
                  className="btn-primary flex-1"
                >
                  Create Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCustomizationPage; 