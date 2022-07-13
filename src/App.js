import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import FileUploadPage from './pages/fileUploadPage';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<FileUploadPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
