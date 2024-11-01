import React from 'react';
import './App.css';
import Weather from './components/weather';
import { News } from './components/news';

function App() {
  return (
    <div className="App bg-blue-900 w-full h-screen">
      <h1 className='text-yellow-500 text-[50px] mb-2'>Dự Báo Thời Tiết</h1>
      <div className='flex items-center gap-[280px]'>
        <div className='news w-[300px] ml-[24px] rounded-lg'>
          <News />
        </div>
      <Weather />
      </div>
    </div>
  );
}

export default App;
