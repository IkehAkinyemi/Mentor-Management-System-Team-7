import React, { useState } from "react";
// import './Accordion.css';

interface AccordionProps {
  question: string;
  answer: string;
}

function Accordion({ question, answer }: AccordionProps) {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="accordion  border-[#E6E6E6] rounded-md">
      <div
        className="accordion-header border-b bg-white hover:bg-gray-100 px-4 py-4 flex space-x-[30px] cursor-pointer transition duration-200 ease-in-out"
        onClick={toggleAccordion}
      >
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 7.5V17.5V7.5ZM7 12.5H17H7Z" fill="#058B94" />
          <path
            d="M12 7.5V17.5M7 12.5H17"
            stroke="#058B94"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z"
            stroke="#058B94"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span className="text-mmsBlack2 font-semibold text-base">
          {question}
        </span>
      </div>
      <div
        className={
          isActive
            ? "accordion-content block bg-white p-4"
            : "accordion-content hidden"
        }
      >
        {answer}
      </div>
    </div>
  );
}

export default Accordion;
