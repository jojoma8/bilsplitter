import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

function DialogPrice({
  value,
  array,
  // names,
  // setNames,
  index1,
  mainSection,
  setMainSection,
  // countSelected,
}) {
  const [localData, setLocalData] = useState(mainSection);
  const [isOpen, setIsOpen] = useState(false);
  const [countSelectedNames, setCountSelectedNames] = useState(0);
  console.log(mainSection[index1]);

  const handleCount = () => {
    if (typeof localData[index1].selected !== "undefined") {
      const count = localData[index1].selected.filter((x) => x === true);
      setCountSelectedNames(count.length);
    }
  };

  const handleOpenDialog = () => {
    handleCount();
    setIsOpen(!isOpen);
  };
  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleUpdateSelected = (nameIndex) => {
    const namesTemp = [...mainSection];

    namesTemp[index1].selected[nameIndex] =
      !namesTemp[index1].selected[nameIndex];

    const count = localData[index1].selected.filter((x) => {
      return x === true;
    });
    setCountSelectedNames(count.length);

    namesTemp[index1].selected.map((item2, index2) => {
      if (item2 === false) {
        namesTemp[index1].percent[index2] = 0;
        namesTemp[index1].amount[index2] = 0;
      }
      if (item2 === true) {
        namesTemp[index1].percent[index2] = 100 / count.length;
        namesTemp[index1].amount[index2] =
          (array[array.length - 1].text.replace(/^\D+/g, "") *
            (100 / count.length)) /
          100;
      }
      if (count.length === 0) {
        namesTemp[index1].percent[index2] = 0;
        namesTemp[index1].amount[index2] = 0;
      }
    });
    const listOfAmounts = namesTemp.map((a) => a.amount);
    const result = listOfAmounts.reduce((a, b) => a.map((c, i) => c + b[i]));
    // console.log(result);
    namesTemp.map((item) => {
      item.total = result;
    });

    setMainSection(namesTemp);
  };

  useEffect(() => {
    handleCount();
  }, []);
  useEffect(() => {
    setLocalData(mainSection);
  }, [mainSection]);

  return (
    <div className="">
      <div className="flex items-center text-center ">
        <button
          className="bg-yellow-50 w-16 text-right"
          onClick={() => handleOpenDialog()}
        >
          {value}
        </button>
        {/* price breakdown per person */}
        {typeof mainSection[index1].names !== "undefined" &&
          mainSection[index1].names.length > 0 &&
          mainSection[index1].names.map((item, index2) =>
            mainSection.length - 1 !== index1 ? (
              <div className=" bg-green-50 w-14 text-right " key={index2}>
                {mainSection[index1].amount[index2].toFixed(2)}
              </div>
            ) : (
              <div className=" w-14 text-right">
                {mainSection[index1].total[index2].toFixed(2)}
              </div>
            )
          )}
      </div>
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
            <div className="my-2">Who had this?</div>
            <div className="grid grid-cols-4 gap-4">
              {typeof mainSection[index1].names !== "undefined" &&
                mainSection[index1].names &&
                mainSection[index1].names.map((item, nameIndex) => (
                  <div
                    key={nameIndex}
                    className="flex flex-col items-center justify-center"
                  >
                    <button
                      key={nameIndex}
                      className={`px-5 py-3 ${mainSection[index1].color[nameIndex]} text-white  rounded-xl
                        text-center`}
                      onClick={() => handleUpdateSelected(nameIndex)}
                    >
                      {mainSection[index1].names[nameIndex]}
                    </button>

                    <div>
                      <div className="">
                        {mainSection[index1].percent[nameIndex].toFixed(0)}%
                      </div>
                      <div className="">
                        {mainSection[index1].amount[nameIndex].toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <button
              onClick={() => handleCloseDialog()}
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
