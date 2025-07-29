import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CardSelectionPage from './pages/CardSelectionPage';
import CardCustomizationPage from './pages/CardCustomizationPage';
import CardPreviewPage from './pages/CardPreviewPage';
import CardSendPage from './pages/CardSendPage';
import CardConfirmPage from './pages/CardConfirmPage';
import CardRecipientPage from './pages/CardRecipientPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/select-card" element={<CardSelectionPage />} />
          <Route path="/customize/:cardId" element={<CardCustomizationPage />} />
          <Route path="/preview/:cardId" element={<CardPreviewPage />} />
          <Route path="/send/:cardId" element={<CardSendPage />} />
          <Route path="/confirm" element={<CardConfirmPage />} />
          <Route path="/card/:cardId" element={<CardRecipientPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
