import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

function DialogPrice({ value, array, names, setNames, index, data, setData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [countSelectedNames, setCountSelectedNames] = useState(0);
  // console.log(Object.values(array));

  const description = array.slice(0, array.length - 1);

  const handleUpdate = (nameIndex) => {
    if (
      typeof nameIndex !== "undefined" &&
      typeof data[index].names[nameIndex].selected !== "undefined"
    ) {
      const temp = data;
      // console.log("index " + index + " " + nameIndex);
      // console.log(temp[index].names[nameIndex].selected);
      temp[index].names[nameIndex].selected =
        !temp[index].names[nameIndex].selected;

      // console.log(temp[index].names[nameIndex].selected);
      // console.log(data);
      // console.log(temp);
      // setData(temp)
      const count = temp[index].names.filter((x) => {
        return x.selected === true;
      });
      // console.log(count.length);
      setCountSelectedNames(count.length);
      // console.log("array " + array[array.length - 1].text);
      temp[index].names.forEach((item) => {
        if (item.selected === false) {
          item.percent = 0;
          item.amount = 0;
        }
        if (count.length > 0 && item.selected === true) {
          item.percent = 100 / count.length;
          item.amount =
            (array[array.length - 1].text.replace(/^\D+/g, "") *
              Math.round(100 / count.length).toFixed(0)) /
            100;
        }
      });
      // if (temp[index].names[nameIndex].selected === false) {
      //   temp[index].names[nameIndex].percent = 0;
      //   temp[index].names[nameIndex].amount = 0;
      // }
      // if (count.length > 0 && temp[index].names[nameIndex].selected === true) {
      //   temp[index].names[nameIndex].percent = 100 / count.length;
      //   // temp[index].names[nameIndex].amount = 0;
      // }
      // console.log(
      //   temp[index].names[0].value +
      //     " " +
      //     // Math.round(100 / count.length).toFixed(0) +
      //     temp[index].names[0].percent +
      //     " " +
      //     temp[index].names[0].amount +
      //     " " +
      //     temp[index].names[1].value +
      //     " " +
      //     temp[index].names[1].amount +
      //     " " +
      //     // Math.round(100 / count.length).toFixed(0)
      //     temp[index].names[1].percent +
      //     " " +
      //     temp[index].names[2].value +
      //     " " +
      //     temp[index].names[2].amount +
      //     " " +
      //     // Math.round(100 / count.length).toFixed(0)
      //     temp[index].names[2].percent
      // );
      setData(temp);
    }
    // console.log(count.length);
  };

  useEffect(() => {
    // handleUpdate();
  }, []);

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
              {names.map((item, nameIndex) => (
                <div
                  key={nameIndex}
                  className="flex flex-col items-center justify-center"
                >
                  <button
                    key={nameIndex}
                    className={`px-5 py-3 ${item.color} text-white  rounded-xl
                text-center`}
                    onClick={() => handleUpdate(nameIndex)}
                  >
                    {item.value}
                  </button>
                  {item.selected === false ? (
                    <div>
                      <div className="">0%</div>
                      <div className="">0</div>
                    </div>
                  ) : countSelectedNames > 0 ? (
                    <div>
                      <div className="">
                        {Math.round(100 / countSelectedNames).toFixed(0)}%
                      </div>
                      <div className="">
                        {/* {(array[array.length - 1].text.replace(/^\D+/g, "") *
                          Math.round(100 / countSelectedNames).toFixed(0)) /
                          100} */}
                        {data[index].names[nameIndex].amount.toFixed(2)}
                      </div>
                    </div>
                  ) : (
                    <div className="">0%</div>
                  )}
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
