import React from "react";
import DialogPrice from "./DialogPrice";

function ItemBreakdown({ data }) {
  return (
    <div className="flex items-center justify-center mt-5">
      <div className="p-10 max-w-lg bg-red-100 rounded-3xl shadow-lg">
        {/* {topSection.map((item) => (
              <div className="flex justify-center">
                {item.words.map((words) => (
                  <div className="pr-1">{words.text}</div>
                ))}
              </div>
            ))} */}
        <div className="flex flex-col py-10">
          {data.map((item, index1) => (
            <div key={index1} className={`flex justify-between`}>
              <div className="flex">
                {/* non-price data */}
                {item.words.map((words, index, array) => {
                  if (array.length - 1 !== index) {
                    return (
                      <div key={index} className="pr-2">
                        {words.text}
                      </div>
                    );
                  }
                })}
              </div>
              {/* price data */}
              {item.words.map((words, index, array) => {
                if (array.length - 1 === index) {
                  return (
                    // <button key={index} className="bg-red-50">
                    //   {words.text}
                    // </button>
                    <DialogPrice
                      key={index}
                      value={words.text}
                      array={item.words}
                    />
                  );
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
      </div>
    </div>
  );
}

export default ItemBreakdown;
