import React from "react";
import temp from "../assets/temp.png";
import { FaGithub, FaLinkedin, FaEnvelope} from "react-icons/fa";

interface crewCardProps {
    name: string;
    role: string;
    description: string;
}

const crewCard: React.FC<crewCardProps> = ({name, role, description}) => {
    return(
        <div className="bg-white rounded-xl shadow-lg p-6 w-48 flex flex-col items-center border border-gray-300">
            {/* PLACEHOLDER FOR IMAGE */}
            <img src={temp} alt="profile" className="w-full h-32 object-cover rounded-t-lg" />

            {/* NAME AND ROLE */}
            <div className="w-full px-4 py-3">
                <h3 className="font-bold text-[#262f50] text-left">{name}</h3>
                <p className="text-sm text-[#262f50] text-left">{role}</p>
            </div>

            {/* DESCRIPTION */}
            <p className="text-xs text-[#262f50] text-left px-3 mb-3">{description}</p>

            {/* DIVIDER LINES */}
            <div className="flex space-x-4 text-gray-600 mt-3">
                <FaGithub className="cursor-pointer hover:text-gray-800" size={20} />
                <FaLinkedin className="cursor-pointer hover:text-gray-800" size={20} />
                <FaEnvelope className="cursor-pointer hover:text-gray-800" size={20} />
            </div>
        </div>
    );
};

export default crewCard;