import React, { useState } from "react";
import DialogPrice from "./DialogPrice";
import OCR from "./OCR";
import SummaryTotals from "./SummaryTotals";

function ItemBreakdown({
  mainSection,
  setMainSection,
  names,
  setNames,
  // handleUpdateAmount,
}) {
  // const [countSelectedNames, setCountSelectedNames] = useState(0);

  // const countSelectedItems = (index) => {
  //   const count = mainSection[index].names.filter((x) => {
  //     return x.selected === true;
  //   });
  //   console.log("itemBreakdown " + mainSection[0].names[0].selected);
  //   return count.length;
  // };
  // console.log(mainSection);

  return (
    <div className="flex items-center justify-center mt-5 ">
      <div
        className="p-5 bg-red-100 rounded-3xl shadow-lg
        w-full max-w-2xl "
      >
        {/* {topSection.map((item) => (
              <div className="flex justify-center">
                {item.words.map((words) => (
                  <div className="pr-1">{words.text}</div>
                ))}
              </div>
            ))} */}
        <div className="flex flex-col py-5 bg">
          <div className="">
            <div
              className="flex justify-between bg-slate-100 
            font-semibold  "
            >
              {/* item breakdown header */}
              <div
                className="flex w-full
                  bg-cyan-100 overflow-hidden"
              >
                Item
              </div>
              <div className="">
                <div className="flex items-center text-center">
                  <div className="bg-yellow-50 w-16 text-right">Amount</div>
                  {/* names header */}
                  {typeof mainSection[0].names !== "undefined" &&
                    mainSection[0].names &&
                    mainSection[0].names.map((item, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 bg-green-50 w-12 
                          text-right "
                      >
                        {item}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {mainSection &&
              mainSection.map((item, index1) => (
                <div
                  key={index1}
                  className={`flex justify-between bg-slate-100`}
                >
                  <div
                    className="flex w-full 
                    bg-cyan-100 overflow-hidden"
                  >
                    {item.words.map((words, index, array) => {
                      // from OCR, show only lines ending in number
                      if (
                        // check if line item ends in a number
                        item.words[array.length - 1].text.match(
                          /[0-9]+[.,][0-9]{2}/g
                        )
                      ) {
                        if (array.length - 1 !== index) {
                          return (
                            <div key={index} className="pr-1 overflow-x-hidden">
                              {/* item description */}
                              {words.text}
                            </div>
                          );
                        }
                      }
                      // else {
                      // if line item does not end with a number
                      // return (
                      //   <div
                      //     key={index}
                      //     className="pr-1 overflow-x-hidden bg-red-50"
                      //   >
                      //     {words.text}
                      //   </div>
                      // );
                      // }
                    })}
                  </div>
                  {/* price/amount mainSection */}
                  {item.words.map((words, index2, array) => {
                    if (
                      // if line item ends in a number
                      item.words[array.length - 1].text.match(
                        /[0-9]+[.,][0-9]{2}/g
                      )
                    ) {
                      if (array.length - 1 === index2) {
                        return (
                          <DialogPrice
                            key={index2}
                            value={item.itemValue}
                            array={array}
                            names={names}
                            index1={index1}
                            index2={index2}
                            mainSection={mainSection}
                            setNames={setNames}
                            setMainSection={setMainSection}
                          />
                        );
                      }
                    }
                  })}
                </div>
              ))}
          </div>
        </div>

        {typeof mainSection[0].total !== "undefined" && (
          <SummaryTotals mainSection={mainSection} names={names} />
        )}
      </div>
    </div>
  );
}

export default ItemBreakdown;
