import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AlgorithmPage from './pages/AlgorithmPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/algorithm/:id" element={<AlgorithmPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
