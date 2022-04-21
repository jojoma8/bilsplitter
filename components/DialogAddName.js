import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

function DialogAddName({ handleAddName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const onChange = (e) => {
    // console.log(e.target.value);
    setValue(e.target.value);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setValue("");
  };

  const handleUpdate = () => {
    handleAddName(value);
    setValue("");
    // console.log("add " + value);
  };

  return (
    <div>
      <button className="" onClick={() => setIsOpen(!isOpen)}>
        Add Name
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
              className="flex text-2xl font-semibold leading-6 text-gray-900"
            >
              Add Name
            </Dialog.Title>
            {/* <div className="mt-2 flex flex-col">{value}</div> */}
            <input
              className="my-2 border-2 p-3 text-xl"
              type="text"
              onChange={(e) => onChange(e)}
              value={value}
            />
            <div className="flex items-center justify-around">
              <button
                onClick={() => handleUpdate()}
                className="text-center w-5/12 bg-green-600 border-2 
              border-green-650 rounded-xl text-white font-semibold py-2 
              shadow-lg"
              >
                Add
              </button>
              <button
                onClick={() => handleCancel()}
                className="text-center w-5/12 bg-red-600 border-2 
              border-green-650 rounded-xl text-white font-semibold py-2 
              shadow-lg "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default DialogAddName;
