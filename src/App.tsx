import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { DashboardPage } from './pages';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Container fluid="sm md lg xl" style={{ padding: '20px' }}>
        <Routes>
            <Route path="/" element={<DashboardPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
