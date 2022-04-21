import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

function DialogPrice({ value, array, names, index, data }) {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(Object.values(array));

  const description = array.slice(0, array.length - 1);

  return (
    <div>
      <button className="bg-red-50" onClick={() => setIsOpen(!isOpen)}>
        {value}
      </button>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto bg-gray-100 bg-opacity-80"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Dialog.Overlay className="fixed inset-0" />
          <div
            className="inline-block w-full max-w-md p-6 my-8 
            overflow-hidden text-left align-middle transition-all 
            transform bg-white shadow-xl rounded-2xl"
          >
            <Dialog.Title
              as="h3"
              className="flex text-2xl font-semibold leading-6 text-gray-900"
            >
              {array.map((item, index) => (
                <div key={index} className="pr-2">
                  {item.text}
                </div>
              ))}
            </Dialog.Title>
            {/* <div className="mt-2 flex flex-col">{value}</div> */}
            <div className="my-2">Who had this?</div>
            <div className="grid grid-cols-4 gap-4">
              {names.map((item, index) => (
                <div
                  key={index}
                  className={`p-2 ${item.color} text-white  rounded-full
                text-center`}
                >
                  {item.value}
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-center w-5/12 bg-green-600 border-2 
              border-green-650 rounded-xl text-white font-semibold py-2 
              shadow-lg mt-5"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default DialogPrice;
