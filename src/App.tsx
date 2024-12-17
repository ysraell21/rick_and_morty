import React from 'react'
import CardStacker from "./components/CardStacker";
import bgImage from './assets/bgImage.jpg'
const App: React.FC = () => {
  return (
    <div
      className="h-screen w-screen flex items-center overflow-hidden justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>
      <div className="relative z-10">
        <CardStacker />
      </div>
    </div>
  );
};

export default App;