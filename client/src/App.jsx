 import React from 'react';
 import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateTournament from './pages/CreateTournament';
import Tournament from './pages/Tournament';

function App() {
   return (
   <Router>
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/create" element={<CreateTournament />} />
      <Route path="/tournament/:id" element={<Tournament />} />
     </Routes>
    </Router>
  );
 }

export default App;
