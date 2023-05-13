import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Monitor from "./pages/Monitor";
import RealTime from './pages/RealTime/index,';

export default function App() {   
    return (  
    <Router>
        <Routes>
          <Route path="/" element={<Monitor />} />
          <Route path="/realTime"   >
                <Route path=":topic" >
                    <Route path=":id" element={<RealTime />} />
                </Route>
          </Route>
        </Routes>
      </Router>)
}