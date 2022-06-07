import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.js';
import { StateProvider } from './utils/StateProvider';
import { initialState } from './utils/reducer';
import reducer from './utils/reducer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <StateProvider initialState={initialState} reducer = {reducer}>
      <BrowserRouter>
     {/*  <Routes>
              <Route path="/home" element={<WebMusic/>} />
              
      </Routes>
      */}
      <App />
      </BrowserRouter>
    </StateProvider>
  </React.StrictMode>
);

