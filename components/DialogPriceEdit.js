import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

function DialogPriceEdit({
  //   handleUpdateAmount,
  index1,
  index2,
  array,
  setMainSection,
  mainSection,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(array[index2].text);

  const handleUpdate = (e) => {
    setValue(e.target.value);
    // handleUpdateAmount(index1, index2, e.target.value);
    const temp = [...mainSection];
    temp[index1].itemValue = e.target.value;
    setMainSection(temp);
    // console.log("main section");
    console.log(temp);
  };

  return (
    <div className="flex">
      <div className="my-5 mr-1">{mainSection[index1].itemValue}</div>
      <button
        className="text-sm"
        // onClick={() => handleUpdateAmount(index1, index2)}
        onClick={() => setIsOpen(true)}
      >
        edit
      </button>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto bg-gray-100 
          bg-opacity-80"
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
              <div className="flex">
                {/* <div className="pr-2">Edit Amount</div> */}
                <div className="flex">
                  {array.map(
                    (item, index, array) =>
                      index < array.length - 1 && (
                        <div key={index} className="pr-2">
                          {item.text}
                        </div>
                      )
                  )}
                </div>
              </div>
            </Dialog.Title>
            {/* <div className="my-2 text-2xl">{array[index2].text}</div> */}
            <input
              type="text"
              value={value}
              onChange={(e) => handleUpdate(e)}
              className="my-4 text-3xl"
            />

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

export default DialogPriceEdit;
