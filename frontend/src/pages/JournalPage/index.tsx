import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import x from "../../assets/x.svg";

type PopupProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

function Popup({ onConfirm, onCancel }: PopupProps) {
  return (
    <div className="fixed inset-0 bg-darkblue bg-opacity-50 flex items-center justify-center">
      <div className="bg-pearl p-10 rounded-xl shadow-lg w-96 h-52 text-center border-[3px] border-darkblue">
        <p className="text-darkblue font-Solway text-xl mb-6">
          Are you <span className="font-bold underline">SURE</span> you want to discard changes?
        </p>
        <div className="flex justify-center gap-4">
          <button 
            className="bg-darkblue hover:bg-[#A30000] hover:border-[#610000] text-pearl px-5 py-1 rounded-full border-2 border-darkblue font-Dongle text-2xl transition-all duration-300"
            onClick={onConfirm}
          >
            Discard
          </button>
          <button 
            className="bg-pearl hover:bg-lightlavender text-darkblue px-5 py-1 rounded-full border-2 border-darkblue font-Dongle text-2xl transition-all duration-300"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function JournalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedDate = new Date(location.state?.date);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 

  const entries = [
    new Date(2025, 2, 18).toDateString(),
  ];

  const hasEntry = entries.some((entry) => 
    new Date(entry).toDateString() === selectedDate.toDateString()
  );

  const handleDiscard = () => {
    setShowPopup(true);
  };

  const confirmDiscard = () => {
    navigate('/dashboard');
  };

  const confirmSave = () => {
    setIsEditing(false); // Return to default mode
    navigate('/dashboard');
  };

  const editEntry = () => {
    setIsEditing(true); // Switch to Edit Mode
  };

  const analyzeEntry = () => {
    navigate('/analyze', { state: { date: selectedDate } });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full bg-lavender max-[820px]:items-center min-h-[calc(100vh-10rem)] sm:py-12 px-6 max-[473px]:px-0 max-sm:pt-20 sm:pt-32 pb-6">
      <div className="relative w-full max-w-3xl bg-pearl max-[473px]:pt-10 rounded-3xl max-[473px]:rounded-none border-[3px] max-[473px]:border-none border-darkblue shadow-lg p-6 md:p-12">
        <button
          className="absolute max-[473px]:top-2 max-[473px]:right-2 top-4 right-4 p-2 text-darkblue text-2xl font-bold cursor-pointer"
          onClick={handleDiscard}
        >
          <img
            src={x}
            alt="x-icon"
            className="max-[473px]:h-4 max-[473px]:w-4 h-5 w-5"
          />
        </button>

        <h1 className="max-sm:text-2xl text-3xl font-bold py-3 text-center text-darkblue font-Solway">
          Journal Entry for {selectedDate?.toLocaleDateString()}
        </h1>

        <textarea
          className="w-full h-80 md:h-96 p-4 mt-4 border-[2.5px] border-lightblue rounded-2xl bg-lightlavender text-darkblue font-Sora font-bold text-lg placeholder-midblue placeholder-opacity-60 transition-all"
          placeholder="Write your journal entry here..."
        />

        <div className="flex justify-center items-center gap-4 mt-6">
          {hasEntry && !isEditing ? (
            <>
              <button
                onClick={editEntry} // Switches to Save/Analyze Mode
                className="bg-midblue hover:bg-darkblue text-pearl font-semibold font-Sora px-8 py-4 rounded-full max-[473px]:px-6 max-[473px]:py-2 border-2 text-lg border-darkblue transition-all duration-300 shadow-md max-[473px]:text-md"
              >
                Edit Entry
              </button>
              <button
                onClick={analyzeEntry}
                className="bg-pearl hover:bg-lightlavender text-darkblue font-semibold font-Sora px-8 py-4 rounded-full max-[473px]:px-6 max-[473px]:py-2 text-lg border-2 border-darkblue transition-all duration-300 shadow-md max-[473px]:text-md"
              >
                View Analysis
              </button>
            </>
          ) : (
            <>
              <button
                onClick={confirmSave}
                className="bg-midblue hover:bg-darkblue text-pearl font-semibold font-Sora px-8 py-4 rounded-full max-[473px]:px-6 max-[473px]:py-2 border-2 text-lg border-darkblue transition-all duration-300 shadow-md max-[473px]:text-md"
              >
                Save Entry
              </button>
              <button
                onClick={analyzeEntry}
                className="bg-pearl hover:bg-lightlavender text-darkblue font-semibold font-Sora px-8 py-4 rounded-full max-[473px]:px-6 max-[473px]:py-2 text-lg border-2 border-darkblue transition-all duration-300 shadow-md max-[473px]:text-md"
              >
                Analyze Entry
              </button>
            </>
          )}
        </div>
      </div>

      {showPopup && <Popup onConfirm={confirmDiscard} onCancel={() => setShowPopup(false)} />}
    </div>
  );
}

export default JournalPage;
