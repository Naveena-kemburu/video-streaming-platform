import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from './components/common/Header';
import LoadingSpinner from './components/common/LoadingSpinner';

const VideoLibrary = lazy(() => import('./pages/VideoLibrary'));
const VideoDetail = lazy(() => import('./pages/VideoDetail'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950">
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<VideoLibrary />} />
            <Route path="/video/:id" element={<VideoDetail />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
