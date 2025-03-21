import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, getDaysInMonth, getDay } from "date-fns";
import notebook from "../../assets/notebook.png";

export function Dashboard() {

const [selected, setSelected] = useState<Date | null>(new Date());
const [currentDate, setCurrentDate] = useState(new Date());
const handleSelect = (date: Date) => {
  if (selected && selected.getTime() === date.getTime()) {
    setSelected(null);
  } else {
    setSelected(date);
  }
};
const navigate = useNavigate();
const handleJournalClick = () => {
  if (selected) {
    navigate('/journal', { state: { date: selected } });
  }
};
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [year, month] = event.target.value.split('-').map(Number);
    setCurrentDate(new Date(year, month, 1));
  };
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfWeek = getDay(startOfMonth(currentDate));
  const handleTodayClick = () => {
    const today = new Date();
    setCurrentDate(today); 
    setSelected(today);
  };
  
  

  return (
    <div className="flex flex-col md:flex-row bg-lavender max-[473px]:bg-midblue justify-center max-[820px]:items-center min-h-[calc(100vh-10rem)] max-[473px]:p-0 p-6 md:p-12 shadow-lg max-sm:pt-24 sm:pt-32 md:pt-28 max-[473px]:pt-20 max-[400px]:pt-20">
      <div className="flex flex-col md:flex-row w-auto max-[473px]:bg-pearl rounded-xl border-[3px] max-[473px]:border-none max-[473px]:rounded-none border-darkblue overflow-hidden shadow-md md:max-h-[40rem] max-md:max-h-[44rem]">
        <div className="bg-midblue text-pearl text-left p-6 md:w-4/12 lg:w-1/3">
          <div>
            <h1 className="text-3xl font-bold font-Solway max-md:text-center ">MendBoard</h1>
            <div className="max-md:hidden">
              <hr className="my-4 border-pearl border-2" />
              <h2 className="text-md font-semibold font-Sora mb-4">Recent Journals:</h2>
              <ul className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <li key={i} className="flex items-center gap-2 text-pearl">
                    <img
                      src={notebook}
                      alt="notebook-icon"
                      className="h-8 hover:opacity-80 transition-all duration-300 ease-in-out"
                    />
                    <p className="font-Sora">Entry xx/xx/xxxx</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 max-[473px]:pl-4 max-[375px]:pl-2 sm:p-12 bg-pearl">
          <h2 className="text-darkblue font-Sora text-2xl font-bold mb-4">Select a date</h2>

          <div className="flex items-center justify-between mb-4">
            <select
              className="bg-pearl text-darkblue text-lg font-semibold font-Sora p-0 rounded-md"
              value={`${currentDate.getFullYear()}-${currentDate.getMonth()}`}
              onChange={handleMonthChange}
            >
              {Array.from({ length: 20 }, (_, i) => i + 2020).map((year) =>
                Array.from({ length: 12 }, (_, month) => (
                  <option key={`${year}-${month}`} value={`${year}-${month}`}>
                    {format(new Date(year, month, 1), "MMMM yyyy")}
                  </option>
                ))
              )}
            </select>

            <div className="flex items-center gap-2">
                <button
                  onClick={handleTodayClick}

                  className="px-4 py-1 bg-lightblue bg-opacity-10 hover:bg-opacity-30 text-darkblue border-2 border-midblue font-semibold rounded-md duration-300"
                >
                  Today
                </button>

                <button
                  onClick={() =>
                    setCurrentDate(
                      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
                    )
                  }
                  className="text-midblue hover:text-darkblue transition-all duration-200"
                >
                  <ChevronLeft size={24} />
                </button>

              <button
                onClick={() =>
                  setCurrentDate(
                    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
                  )
                }
                className="text-midblue hover:text-darkblue transition-all duration-200"
              >
                <ChevronRight size={24} />
              </button>
            </div>

          </div>

          <div className="grid grid-cols-7 max-[473px]:gap-x-6 gap-4 font-Sora max-[473px]:pl-0 max-sm:text-sm text-center text-darkblue">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <span key={day} className="font-semibold max-[473px]:pl-1">
                {day}
              </span>
            ))}

            {Array.from({ length: firstDayOfWeek }, (_, i) => (
              <span key={`empty-${i}`} className="invisible">
                0
              </span>
            ))}

            {Array.from({ length: daysInMonth }, (_, i) => (
              <button
                key={i}
                onClick={() =>
                  handleSelect(new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1))
                }
                className={`w-10 h-10 flex items-center justify-center mx-auto rounded-full transition-all
                ${
                  selected?.getDate() === i + 1 &&
                  selected?.getMonth() === currentDate.getMonth()
                    ? "bg-darkblue text-pearl border-2 border-lightblue font-bold"
                    : "bg-lightblue/30 hover:bg-midblue hover:text-pearl font-semibold"
                }`}

              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="max-[473px]:hidden flex justify-center font-Sora text-md pb-8 pt-6 mt-6">
          <button
            onClick={handleJournalClick}
            className={`px-6 py-2 bg-midblue hover:bg-darkblue hover:text-pearl text-pearl border-2 border-midblue font-semibold rounded-full duration-300 ${
              selected ? '' : 'opacity-50 pointer-events-none'
            }`}
          >
            Journal!
          </button>
          

          </div>
        </div>
        <div className="min-[473px]:hidden flex bg-pearl justify-center font-Sora text-md pb-8 pt-4">
          <button
            onClick={handleJournalClick}
            className={`px-6 py-2 bg-midblue hover:bg-darkblue hover:text-pearl text-pearl border-2 border-midblue font-semibold rounded-full duration-300 ${
              selected ? '' : 'opacity-50 pointer-events-none'
            }`}
          >
            Journal!
          </button>
          

          </div>
      </div>
    </div>
  );
}

export default Dashboard