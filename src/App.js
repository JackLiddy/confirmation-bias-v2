import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import GuessingPhase from './components/GuessingPhase';
import FeedbackPhase from './components/FeedbackPhase';
import ComparisonPhase from './components/ComparisonPhase';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<GuessingPhase />} />
          <Route path="/feedback" element={<FeedbackPhase />} />
          <Route path="/comparison" element={<ComparisonPhase />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;

