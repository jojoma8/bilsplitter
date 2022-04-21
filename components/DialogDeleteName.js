import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

function DialogDeleteName({ data, handleDeleteName }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        className={`${data.color} text-white px-3 py-1 m-2 rounded-lg`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {data.value}
      </button>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto 
        bg-gray-100 bg-opacity-80"
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
          <Dialog.Overlay className="fixed inset-0 " />
          <div
            className="inline-block w-full max-w-md p-6 my-8 
        overflow-hidden text-left align-middle transition-all 
        transform bg-white shadow-xl rounded-2xl"
          >
            <Dialog.Title
              as="h3"
              className="flex text-2xl font-semibold leading-6 text-gray-900
                pb-5"
            >
              Delete {data.value} ?
            </Dialog.Title>
            {/* <div className="mt-2 flex flex-col">{value}</div> */}

            <div className="flex items-center justify-around">
              <button
                onClick={() => handleDeleteName(name)}
                className="text-center w-5/12 bg-green-600 border-2 
          border-green-650 rounded-xl text-white font-semibold py-2 
          shadow-lg"
              >
                Delete
              </button>
              <button
                onClick={() => handleCancel()}
                className="text-center w-5/12 bg-red-600 border-2 
          border-green-650 rounded-xl text-white font-semibold py-2 
          shadow-lg "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default DialogDeleteName;
