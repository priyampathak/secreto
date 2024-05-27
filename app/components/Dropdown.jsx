import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

function Dropdown({ title = "Default Title", paragraph = "" }) {
  const [expand1, setExpand1] = useState(0);

  // Split the paragraph into sentences, handle cases where paragraph might be empty or undefined
  const sentences = paragraph ? paragraph.split('.').filter(sentence => sentence.trim().length > 0) : [];

  // Toggle expand1 state between 0 and 1
  const toggleExpand = () => {
    setExpand1(prevExpand1 => (prevExpand1 === 0 ? 1 : 0));
  };

  return (
    <>
      <div className="bg-gray-200 py-4 w-full px-4 my-6" onClick={toggleExpand}>
        <div>
          <div className="flex">
            <h1 className='w-1/2'>{title}</h1>
            <div className="w-1/2 flex justify-end">
              <IoIosArrowDown className={`transform transition-transform duration-300 ${expand1 === 1 ? 'rotate-180' : 'rotate-0'}`} />
            </div>
          </div>
        </div>
        <div>
          <ul className={`list-disc px-4 transition-opacity duration-300 ${expand1 === 0 ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'}`}>
            {sentences.map((sentence, index) => (
              <li key={index}  className="text-gray-600">{sentence.trim()}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Dropdown;
