import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import x from "../../assets/x.svg";
import { useAuth } from '../../auth/AuthContext';

/**
 * Displays the AI-generated analysis for a specific journal entry.
 * Fetches the entry by ID and displays the 'analysis' field.
 * Provides navigation back to the dashboard or to edit the entry.
 */
export function AnalyzePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const journalId = location.state?.journalId;
  const selectedDate = location.state?.date ? new Date(location.state.date) : null;

  const [analysisContent, setAnalysisContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches the specific journal entry using the journalId passed in navigation state.
   * Sets the analysis content to be displayed.
   */
  useEffect(() => {
    const currentJournalId = location.state?.journalId;

    if (!currentJournalId || !user) {
        if (!currentJournalId) setError("Error: No journal entry ID provided.");
        if (!user) setError("Error: User not authenticated.");
        setIsLoading(false);
        return;
    }

    const fetchAnalysis = async () => {
      setIsLoading(true);
      setError(null);
      setAnalysisContent(null);

      try {
        const response = await fetch(`http://localhost:3000/journal/${currentJournalId}`, {
          credentials: 'include',
        });

        if (!response.ok) {
             let errorMsg = `HTTP error! status: ${response.status}`;
             try { const errorData = await response.json(); errorMsg = errorData.error || errorMsg; } catch (e) {/* Ignore */}
            throw new Error(errorMsg);
        }

        const data = await response.json();

        if (data && typeof data.analysis === 'string') {
          setAnalysisContent(data.analysis);
        } else if (data && data.analysis === null) {
            setAnalysisContent("This entry has not been analyzed yet.");
        } else {
          console.warn("AnalyzePage: Analysis content missing or not a string:", data?.analysis);
          setAnalysisContent("Analysis data not found or is invalid for this entry.");
        }

      } catch (err: any) {
        console.error('AnalyzePage: Failed to fetch analysis:', err);
        setError(`Failed to load analysis: ${err.message}. Please try again.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [location.state?.journalId, user, navigate]); // Depend on the ID from state

  /**
   * Navigates the user directly back to the dashboard.
   */
  const handleDiscard = () => {
    navigate('/dashboard');
  };

  /**
   * Navigates the user back to the JournalPage for the current entry's date.
   */
  const editEntry = () => {
    if (selectedDate) {
        navigate('/journal', { state: { date: selectedDate } });
    } else {
        setError("Cannot navigate to edit: Date information missing.");
    }
  };

  // Render error if journalId is missing
  if (!journalId) {
     return <div className="p-8 text-center text-red-500">Error: Missing required journal information. Please return to the dashboard.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full bg-lavender max-[820px]:items-center min-h-[calc(100vh-10rem)] sm:py-12 px-6 max-[473px]:px-0 max-sm:pt-20 sm:pt-32 pb-6">
      <div className="relative w-full max-w-3xl bg-pearl max-[473px]:pt-10 rounded-3xl max-[473px]:rounded-none border-[3px] max-[473px]:border-none border-darkblue shadow-lg p-6 md:p-12">
        <button
          className="absolute max-[473px]:top-2 max-[473px]:right-2  top-4 right-4 p-2  text-darkblue text-2xl font-bold cursor-pointer"
          onClick={handleDiscard}
          aria-label="Return to dashboard"
        >
          <img
            src={x}
            alt="x-icon"
            className="max-[473px]:h-4 max-[473px]:w-4 h-5 w-5"
          />
        </button>

        <h1 className="text-3xl font-bold py-3 text-center text-darkblue font-Solway">
          Entry Analysis {selectedDate ? `for ${selectedDate.toLocaleDateString()}` : ''}
        </h1>

        {isLoading && <p className="text-center text-midblue p-4">Loading analysis...</p>}

        {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md my-2">{error}</p>}

        {!isLoading && !error && (
             <div className="w-full min-h-80 md:min-h-96 p-4 mt-4 border-[2.5px] border-lightblue rounded-2xl bg-lightlavender text-darkblue font-Sora font-normal text-left text-lg whitespace-pre-wrap overflow-y-auto">
                {analysisContent || "No analysis available."}
            </div>
        )}

        <div className="flex justify-center items-center gap-4 mt-6">
          <button onClick={editEntry}
            disabled={!selectedDate || isLoading}
            className="bg-pearl hover:bg-lightlavender text-darkblue font-semibold font-Sora px-8 py-4 rounded-full max-[473px]:px-6 max-[473px]:py-2 text-lg border-2 border-darkblue transition-all duration-300 shadow-md max-[473px]:text-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edit Entry
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnalyzePage;
