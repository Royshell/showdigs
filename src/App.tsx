import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './routers/AppRouter';

export type Property  = {
  address: string;
  cost: string;
  image: string;
  description: string;
} 

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
