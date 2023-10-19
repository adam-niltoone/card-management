import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPageContent from './components/MainPageContent';
import DragDropDemo from './components/DragDropDemo';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPageContent />} />
                <Route path="/demo-drag-drop" element={<DragDropDemo />} />
                {/* Add other routes as necessary */}
            </Routes>
        </Router>
    );
}

export default App;
