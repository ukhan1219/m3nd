import { useLocation } from 'react-router-dom';

export function JournalPage() {
  const location = useLocation();
  const selectedDate = new Date(location.state?.date);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-lavender max-[820px]:items-center min-h-[calc(100vh-10rem)] sm:py-12 px-6 max-[473px]:px-0 max-sm:pt-20 sm:pt-32">
      <div className="w-full max-w-3xl bg-pearl rounded-3xl max-[473px]:rounded-none border-[3px] max-[473px]:border-none border-darkblue shadow-lg p-6 md:p-12">
        <h1 className="text-3xl font-bold py-3 text-center text-darkblue font-Solway">
          Journal Entry for {selectedDate?.toLocaleDateString()}
        </h1>

        <textarea
          className="w-full h-80 md:h-96 p-4 mt-4 border-[2.5px] border-lightblue rounded-2xl bg-lightlavender text-darkblue font-Sora font-bold text-lg placeholder-midblue placeholder-opacity-60 transition-all"
          placeholder="Write you journal entry here..."
        />

        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            className="bg-midblue hover:bg-darkblue text-pearl font-semibold font-Sora px-8 py-4 rounded-full  max-[473px]:px-6 max-[473px]:py-2 border-2 text-lg border-darkblue transition-all duration-300 shadow-md max-[473px]:text-md"
          >
            Save Entry
          </button>
          <button
            className="bg-pearl hover:bg-lightlavender text-darkblue font-semibold font-Sora px-8 py-4 rounded-full  max-[473px]:px-6 max-[473px]:py-2 text-lg border-2 border-darkblue transition-all duration-300 shadow-md max-[473px]:text-md"
          >
            Analyze Entry
          </button>
        </div>
      </div>
    </div>
  );
}

export default JournalPage;
