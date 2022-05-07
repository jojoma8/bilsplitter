import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

function SummaryTotals({ mainSection, names }) {
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [serviceCharge, setServiceCharge] = useState(0);

  useEffect(() => {
    if (typeof mainSection[0].total !== "undefined") {
      setTotal(mainSection[0].total.reduce((a, b) => a + b, 0).toFixed(2));
    }
  }, [mainSection]);

  const handleUpdate = (e) => {
    setServiceCharge(e.target.value);
    // console.log(e.target.value);
  };

  return (
    <div>
      <div className="flex">
        <div className="font-semibold text-2xl">Summary</div>
        <button className="pl-20 text-blue-600" onClick={() => setIsOpen(true)}>
          service charge {serviceCharge}%
        </button>
      </div>
      <div className="mt-2">
        {typeof mainSection[0].names !== "undefined" &&
          mainSection[0].names &&
          mainSection[0].names.map((item, index) => (
            <div key={index} className="flex text-2xl my-5">
              <div className="">{item[0]}&apos;s Total:</div>
              <div className="pl-4">
                {mainSection[0].total[index].toFixed(2)}
              </div>
              {serviceCharge > 0 && (
                <div className="pl-1 text-blue-600">
                  +{" "}
                  {(
                    (mainSection[0].total[index] * serviceCharge) /
                    100
                  ).toFixed(2)}{" "}
                  ={" "}
                  {(
                    mainSection[0].total[index] *
                    (1 + serviceCharge / 100)
                  ).toFixed(2)}
                </div>
              )}
            </div>
          ))}
      </div>
      {serviceCharge > 0 ? (
        <div className="font-semibold text-2xl mt-2">
          Grand Total: {(total * (serviceCharge / 100 + 1)).toFixed(2)}
        </div>
      ) : (
        <div className="font-semibold text-2xl mt-2">Grand Total: {total}</div>
      )}
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
              className="flex flex-col text-2xl font-semibold leading-6 
                text-gray-900"
            >
              <div className="flex">Service Charge (%)</div>
            </Dialog.Title>
            <input
              type="number"
              value={serviceCharge}
              onChange={(e) => handleUpdate(e)}
              className="mt-5 text-3xl"
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

export default SummaryTotals;
