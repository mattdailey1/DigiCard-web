import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-9xl font-bold pb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
            DigiCard
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 mb-8 font-medium">
            Send unique cards instantly
          </p>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Create personalized digital birthday cards with stunning designs. 
            Choose from our collection of templates and add your personal touch.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Beautiful Templates</h3>
            <p className="text-gray-600">Choose from our curated collection of birthday card designs</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✏️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalize</h3>
            <p className="text-gray-600">Add custom messages and recipient names to make it special</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Send Instantly</h3>
            <p className="text-gray-600">Share your card immediately with just a few clicks</p>
          </div>
        </div>

        {/* Get Started Button */}
        <Link to="/select-card" className="btn-primary text-xl px-8 py-4 inline-block">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HomePage; 