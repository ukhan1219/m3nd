import React from "react";
import { useState } from "react";

const journalEntry = () => {
    const [entry, setEntry] = useState("");
    const [isEditing, setIsEditing] = useState(true);

    return(
        <div className="flex justify-center items-center">
            <div className="bg-[#F0EDF7] p-6 rounded-2xl shadow-lg w-96 relative">

                {/* CLOSE BUTTON (X) */}
                <button className="absolute top-4 right-4 text-[#3B4E6D] hover:text-gray-700">
                    ✕
                </button>

                {/* TITLE 
                        - need to implement date aspect
                */}
                <h2 className="text-xl font-semibold text-[#3B4E6D] text-center mb-4">
                    Journal Entry for <span className="font-bold"> xx/xx/xxxx </span>
                </h2>

                {/* ENTRY CONTAINER */}
                <div className="bg-[#CBD0E9] p-4 rounded-lg text-[#3B4E6D]">
                    <textarea
                        className="w-full h-32 bg-[#CBD0E9] outline-none resize-none"
                        value={entry}
                        onChange={(e) => setEntry(e.target.value)}
                        disabled={!isEditing}
                        placeholder="Write your journal entry here..."
                    />
                </div>

                <div className="flex justify-center mt-4 space-x-4">
                    {/* EDIT */}
                    <button
                        className="px-6 py-2 bg-[#3B4E6D] text-white rounded-3xl w-24"
                        onClick={() => setIsEditing(true)}>
                            Edit
                    </button>

                    {/* DONE */}
                    <button
                        className="px-6 py-2 border-2 border-[#3B4E6D] text-[#3B4E6D] rounded-3xl w-24"
                        onClick={() => setIsEditing(false)}>
                            Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default journalEntry;