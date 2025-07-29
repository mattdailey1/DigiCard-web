import { Link } from 'react-router-dom';

// Mock data for card templates
const cardTemplates = [
  {
    id: 1,
    name: "Birthday Balloons",
    description: "Colorful balloons celebration",
    colors: "from-pink-400 to-purple-500",
    emoji: "🎈"
  },
  {
    id: 2,
    name: "Cake & Candles",
    description: "Classic birthday cake design",
    colors: "from-yellow-400 to-orange-500",
    emoji: "🎂"
  },
  {
    id: 3,
    name: "Party Hat",
    description: "Fun party hat celebration",
    colors: "from-blue-400 to-cyan-500",
    emoji: "🎉"
  },
  {
    id: 4,
    name: "Gift Box",
    description: "Elegant gift presentation",
    colors: "from-green-400 to-teal-500",
    emoji: "🎁"
  },
  {
    id: 5,
    name: "Stars & Sparkles",
    description: "Magical starry night theme",
    colors: "from-purple-400 to-pink-500",
    emoji: "⭐"
  },
  {
    id: 6,
    name: "Flower Garden",
    description: "Beautiful floral birthday",
    colors: "from-rose-400 to-pink-500",
    emoji: "🌸"
  },
  {
    id: 7,
    name: "Ocean Waves",
    description: "Calm ocean birthday theme",
    colors: "from-cyan-400 to-blue-500",
    emoji: "🌊"
  },
  {
    id: 8,
    name: "Sunset Glow",
    description: "Warm sunset celebration",
    colors: "from-orange-400 to-red-500",
    emoji: "🌅"
  }
];

const CardSelectionPage = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="text-purple-600 hover:text-purple-700 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Choose Your Card
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select from our beautiful collection of birthday card templates
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cardTemplates.map((card) => (
            <div key={card.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              {/* Card Preview */}
              <div className={`h-48 bg-gradient-to-br ${card.colors} flex items-center justify-center`}>
                <span className="text-6xl">{card.emoji}</span>
              </div>
              
              {/* Card Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {card.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {card.description}
                </p>
                <Link 
                  to={`/customize/${card.id}`}
                  className="btn-primary w-full text-center"
                >
                  Customize
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSelectionPage; 