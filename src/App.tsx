import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardPage } from './pages';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
