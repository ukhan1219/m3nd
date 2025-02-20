import React from "react";
import { useState } from "react";

interface AccordionItemProps {
    title: string;
    content: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({title, content}) => {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="border-black">
            <button className="w-[500px] p-3 text-left bg-[#262f50] text-[#d5ddfa] rounded-none border-black" onClick={() => setIsOpen(!isOpen)}>
                <span className="text-lg mr-2">{isOpen ? "━" : "▼"}</span>
                <span>{title}</span>
            </button>
            {isOpen && <div className="p-3 border-t bg-[#d5ddfa] text-[#262f50] text-left">{content}</div>}
        </div>
    );
};

const Accordion = () => {
    const items = [
        { title: "Q1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
        { title: "Q2", content: "A2"},
        { title: "Q3", content: "A3"},
        { title: "Q4", content: "A4"}
    ];

    {/* 
        need to fix border
        - fix the width so there is no overflow
        - fix the black border
        - keep it rounded
    */}

    return(
        <div className="max-w-md mx-auto rounded-3xl overflow-hidden border-black ">
            {items.map((item, index) => (
                <AccordionItem key={index} {...item} />
            ))}
        </div>
    );
};

export default Accordion;