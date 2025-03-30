import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState<number>(0);
  return (
    <div className="App">
     
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      
    </div>
  );
}

export default App;
