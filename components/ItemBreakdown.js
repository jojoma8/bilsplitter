import React, { useState } from "react";
import DialogPrice from "./DialogPrice";
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
    <div className="flex items-center mt-5 ">
      <div className="p-5 max-w-lg bg-red-100 rounded-3xl shadow-lg">
        {/* {topSection.map((item) => (
              <div className="flex justify-center">
                {item.words.map((words) => (
                  <div className="pr-1">{words.text}</div>
                ))}
              </div>
            ))} */}
        <div className="flex flex-col py-10">
          <div className="flex justify-between bg-slate-100 font-semibold">
            {/* item breakdown header */}
            <div
              className="flex flex-nowrap
                  bg-cyan-100"
            >
              Item
            </div>
            <div>
              <div className="flex items-center text-center">
                <div className="bg-yellow-50 w-16 text-right">Amount</div>
                {/* names header */}
                {typeof mainSection[0].names !== "undefined" &&
                  mainSection[0].names &&
                  mainSection[0].names.map((item, index) => (
                    <div key={index} className="bg-green-50 w-14 text-right ">
                      {item}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {mainSection &&
            mainSection.map((item, index1) => (
              <div key={index1} className={`flex justify-between bg-slate-100`}>
                <div
                  className="flex w-full overflow-hidden
                  bg-cyan-100 "
                >
                  {/* non-price mainSection */}
                  {/* {mainSection.length - 1 !== index1 ? (
                    <div key={index1} className="pr-2">
                      {item.text}
                    </div>
                  ) : (
                    <div>hello</div>
                  )} */}

                  {item.words.map((words, index, array) => {
                    if (
                      // if line item ends in a number
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
                    } else {
                      // if line item does not end with a number
                      return (
                        <div key={index} className="pr-1 overflow-x-hidden">
                          {words.text}
                        </div>
                      );
                    }
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
                          // value={words.text}
                          value={item.itemValue}
                          // array={item.words}
                          array={array}
                          names={names}
                          index1={index1}
                          index2={index2}
                          mainSection={mainSection}
                          setNames={setNames}
                          setMainSection={setMainSection}
                          // handleUpdateAmount={handleUpdateAmount}
                        />
                      );
                    }
                  }
                })}
              </div>
            ))}
        </div>
        {/* {bottomSection.map((item) => (
              <div className="flex justify-center">
                {item.words.map((words) => (
                  <div className="pr-1">{words.text}</div>
                ))}
              </div>
            ))} */}
        {typeof mainSection[0].total !== "undefined" && (
          <SummaryTotals mainSection={mainSection} names={names} />
        )}
      </div>
    </div>
  );
}

export default ItemBreakdown;
