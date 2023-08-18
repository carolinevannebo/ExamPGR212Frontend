import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { DashboardPage, StatisticsPage, SensorChartsPage, Header, HistoryPage } from './pages';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Container fluid="sm md lg xl" style={{ padding: '20px'}}>
        <Header />
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/statistics/:sensorId" element={<SensorChartsPage />} />
            <Route path='/history' element={<HistoryPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
