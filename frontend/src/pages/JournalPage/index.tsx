import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import x from "../../assets/x.svg";
import { useAuth } from '../../auth/AuthContext';

type PopupProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

function Popup({ onConfirm, onCancel }: PopupProps) {
  return (
    <div className="fixed inset-0 bg-darkblue bg-opacity-50 flex items-center justify-center">
      <div className="bg-pearl p-10 rounded-xl shadow-lg w-96 h-52 text-center border-[3px] border-darkblue">
        <p className="text-darkblue font-Solway text-xl mb-6">Are you <span className="font-bold underline">SURE</span> you want to discard changes?</p>
        <div className="flex justify-center gap-4">
          
          <button 
            className="bg-darkblue hover:bg-[#A30000] hover:border-[#610000] text-pearl px-5 py-1 rounded-full border-2 border-darkblue font-Dongle text-2xl transition-all duration-300"
            onClick={onConfirm}
          >
            Discard
          </button>
          <button 
            className="bg-pearl hover:bg-lightlavender text-darkblue  px-5 py-1 rounded-full border-2 border-darkblue font-Dongle text-2xl transition-all duration-300"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Displays a page for creating or editing a journal entry for a specific date.
 * Fetches existing entries, handles saving/updating, and provides navigation
 * to analyze the entry.
 */
export function JournalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const rawDateFromState = location.state?.date;

  // Memoize derived date values for stability in effects and dependencies
  const selectedDate = useMemo(() => {
    return rawDateFromState ? new Date(rawDateFromState) : null;
  }, [rawDateFromState]);

  const selectedDateString = useMemo(() => {
      return selectedDate ? selectedDate.toISOString().split('T')[0] : null;
  }, [selectedDate]);

  const [entryContent, setEntryContent] = useState('');
  const [originalContent, setOriginalContent] = useState(''); // Tracks content on load to check for unsaved changes
  const [journalId, setJournalId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDiscardPopup, setShowDiscardPopup] = useState(false);

  /**
   * Fetches the journal entry for the selected date upon component mount or date change.
   * Sets the entry content, original content, and journal ID states.
   */
  useEffect(() => {
    if (!selectedDate || !user) {
        setIsLoading(false);
        return;
    }

    const dateString = selectedDate.toISOString().split('T')[0];

    const fetchEntry = async () => {
      setIsLoading(true);
      setEntryContent('');
      setOriginalContent('');
      setJournalId(null);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3000/journal/date/${dateString}`, {
          credentials: 'include',
        });

        if (response.status === 404) {
             setEntryContent('');
             setOriginalContent('');
             setJournalId(null);
             return;
        }
        if (!response.ok) {
             let errorMsg = `HTTP error! status: ${response.status}`;
             try { const errorData = await response.json(); errorMsg = errorData.error || errorMsg; } catch (e) { /*Ignore*/ }
             throw new Error(errorMsg);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            const entry = data[0];
             if (entry && typeof entry.content === 'string' && typeof entry.journalId === 'string') {
                  setEntryContent(entry.content);
                  setOriginalContent(entry.content);
                  setJournalId(entry.journalId);
             } else {
                  console.warn("JournalPage: Received entry object missing correct types.", entry);
                  setError("Received invalid entry data from server.");
                  setEntryContent('');
                  setOriginalContent('');
                  setJournalId(null);
             }
        } else {
             setEntryContent('');
             setOriginalContent('');
             setJournalId(null);
        }

      } catch (err: any) {
        console.error('JournalPage: Failed to fetch entry:', err);
        setError(`Failed to load entry: ${err.message}. Please try again.`);
         setOriginalContent('');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntry();
  }, [selectedDate, user, navigate]); // Use stable dependencies

  /**
   * Updates the entry content state as the user types in the textarea.
   * @param event - The change event from the textarea element.
   */
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEntryContent(event.target.value);
  };

  /**
   * Handles the click on the close ('X') button.
   * Navigates directly to the dashboard if no changes were made,
   * otherwise shows the discard confirmation popup.
   */
  const handleDiscard = () => {
    if (entryContent === originalContent) {
      navigate('/dashboard');
    } else {
      setShowDiscardPopup(true);
    }
  };

  /**
   * Closes the discard confirmation popup.
   */
  const cancelDiscard = () => {
      setShowDiscardPopup(false);
  }

  /**
   * Navigates to the dashboard after confirming discard.
   */
  const confirmDiscard = () => {
    navigate('/dashboard');
  };

  /**
   * Saves the current journal entry content to the backend.
   * Uses POST for new entries and PUT for existing ones.
   * Updates originalContent state upon successful save.
   */
  const handleSave = async () => {
     if (!selectedDate) {
        setError("Cannot save without a selected date.");
        return;
    }
    setIsSaving(true);
    setError(null);
    const url = journalId ? `http://localhost:3000/journal/${journalId}` : 'http://localhost:3000/journal';
    const method = journalId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          date: selectedDate.toISOString(),
          content: entryContent,
        }),
      });

       if (!response.ok) {
         let errorMsg = `HTTP error! status: ${response.status}`;
         try { const errorData = await response.json(); errorMsg = errorData.error || errorMsg; } catch (parseError) { /* Ignore */}
         throw new Error(errorMsg);
       }

      const result = await response.json();

      const savedContent = result.journalEntry?.content ?? entryContent;
      const savedJournalId = result.journalEntry?.journalId ?? journalId;

      setEntryContent(savedContent);
      setOriginalContent(savedContent);
      if (savedJournalId) {
          setJournalId(savedJournalId);
      }
      // Optionally add success feedback here
      // navigate('/dashboard'); // Removed navigation on save

    } catch (err: any) {
      console.error('Failed to save journal entry:', err);
      setError(`Failed to save: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Triggers the backend analysis for the current journal entry (if saved).
   * Navigates to the AnalyzePage upon successful analysis.
   */
  const handleAnalyze = async () => {
    if (!journalId || !selectedDate) {
        setError('Please save the entry before analyzing.');
        return;
    }
    setIsAnalyzing(true);
    setError(null);

    try {
        const response = await fetch(`http://localhost:3000/journal/${journalId}/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (!response.ok) {
             let errorMsg = `Analysis failed: status ${response.status}`;
             try { const errorData = await response.json(); errorMsg = errorData.error || errorMsg; } catch (parseError) { /* Ignore */}
            throw new Error(errorMsg);
        }

        await response.json(); // Consume response body

        navigate('/analyze', { state: { journalId: journalId, date: selectedDate } });

    } catch (err: any) {
        console.error('Failed to analyze journal entry:', err);
        setError(`Analysis failed: ${err.message}`);
    } finally {
        setIsAnalyzing(false);
    }
  };

  // Render error or main content
  if (!selectedDate) {
      return <div className="p-8 text-center text-red-500">Error: No date selected. Please return to the dashboard.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full bg-lavender max-[820px]:items-center min-h-[calc(100vh-10rem)] sm:py-12 px-6 max-[473px]:px-0 max-sm:pt-20 sm:pt-32 pb-6">
      <div className="relative w-full max-w-3xl bg-pearl max-[473px]:pt-10 rounded-3xl max-[473px]:rounded-none border-[3px] max-[473px]:border-none border-darkblue shadow-lg p-6 md:p-12">
        <button
          className="absolute max-[473px]:top-2 max-[473px]:right-2  top-4 right-4 p-2  text-darkblue text-2xl font-bold cursor-pointer"
          onClick={handleDiscard}
          aria-label="Discard changes and close"
        >
          <img
            src={x}
            alt="x-icon"
            className="max-[473px]:h-4 max-[473px]:w-4 h-5 w-5"
          />
        </button>

        <h1 className="text-3xl font-bold py-3 text-center text-darkblue font-Solway">
          Journal Entry for {selectedDate?.toLocaleDateString()}
        </h1>

        {isLoading && <p className="text-center text-midblue p-4">Loading entry...</p>}

        {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md my-2">{error}</p>}

        {!isLoading && (
            <textarea
            className="w-full h-80 md:h-96 p-4 mt-4 border-[2.5px] border-lightblue rounded-2xl bg-lightlavender text-darkblue font-Sora font-bold text-lg placeholder-midblue placeholder-opacity-60 transition-all focus:outline-none focus:ring-2 focus:ring-midblue disabled:opacity-50"
            placeholder="Write your journal entry here..."
            value={entryContent}
            onChange={handleContentChange}
            disabled={isSaving || isAnalyzing}
            />
        )}

        {!isLoading && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
              <button
                  onClick={handleSave}
                  disabled={isSaving || isAnalyzing}
                  className="px-6 py-2 bg-lightblue hover:bg-midblue text-white font-semibold rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                  {isSaving ? 'Saving...' : (journalId ? 'Update Entry' : 'Save Entry')}
              </button>
              <button
                  onClick={handleAnalyze}
                  disabled={!journalId || isSaving || isAnalyzing}
                  className="px-6 py-2 bg-purple-400 hover:bg-purple-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Entry'}
              </button>
            </div>
        )}

        {showDiscardPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-pearl p-6 rounded-lg shadow-xl text-center">
                    <h2 className="text-xl font-bold text-darkblue mb-4">Discard Changes?</h2>
                    <p className="text-midblue mb-6">Are you sure you want to discard your unsaved changes?</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={cancelDiscard}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDiscard}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                        >
                            Discard
                        </button>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
}
