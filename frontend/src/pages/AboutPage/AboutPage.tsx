import React, { useState } from 'react';
import './styles.css';

const AboutPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < 2) { // only want to see three crew cards at a time
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* about section */}
      <div className="w-full bg-[#F0EDF7] py-10">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10 max-w-screen-xl mx-auto">
          {/* left side*/}
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-[#303C64]">What is Mend?</h2>
            <p className="font-semibold text-[#000000]">blah blah blah</p>
          </div>
          <div className="w-40 h-40 bg-gray-300 rounded-lg"></div>
          <div className="w-40 h-40 bg-gray-300 rounded-lg"></div>
          {/* right side */}
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-[#303C64]">
              Why did we make Mend?
            </h2>
            <p className="font-semibold text-[#000000]">blah blah blah</p>
          </div>
        </section>
      </div>

      {/* crew cards carousel*/}
      <section className="w-full bg-[#B6BDE7] p-10 text-center">
        <h2 className="text-xl font-bold text-[#303C64]">Meet the crew</h2>
        <div className="flex justify-center items-center gap-6 mt-6">
          <button
            className="w-8 h-8 flex items-center justify-center border-2 bg-white border-black rounded-full text-3xl text-black"
            onClick={handlePrev}
          >
            ←
          </button>

          <div className="overflow-hidden w-3/4">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="bg-[#F0EDF7] rounded-lg p-4 text-center w-60 mx-2 shadow-lg border-2 border-black"
                >
                  <div className="w-full h-24 bg-[#F0EDF7] rounded-lg"></div>
                  <div className="flex flex-col items-start mt-2">
                    <h3 className="font-bold text-[#3B4E6D]">Name</h3>
                    <p className="text-sm text-[#3B4E6D]">Role</p>
                    <p className="text-xs text-[#000000] mt-2">Bio</p>
                    <div className="flex justify-center gap-2 mt-2 text-lg text-[#000000]">
                      <span>github</span>
                      <span>linkedin</span>
                      <span>email</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-8 h-8 flex items-center justify-center border-2 bg-white border-black rounded-full text-3xl text-black"
            onClick={handleNext}>
            →
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;