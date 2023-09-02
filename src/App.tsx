import React from 'react';
import SearchMovie from './SearchMovie';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <h1 className='page-title'>Pencarian Film</h1>
      <SearchMovie />
    </div>
  );
};

export default App;
