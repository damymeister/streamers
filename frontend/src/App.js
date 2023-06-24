import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home"
import Streamer from "./components/Streamer"
export default function App() {
  return (
    <div className="app-main">
     <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/streamer/:id" element={<Streamer />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  )
}