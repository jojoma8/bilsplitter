import React from "react";

function SummaryTotals({ mainSection, names }) {
  return (
    <div>
      <div className="font-semibold text-2xl">SummaryTotals</div>
      <div className="mt-2">
        {typeof mainSection[0].names !== "undefined" &&
          mainSection[0].names &&
          mainSection[0].names.map((item, index) => (
            <div className="flex text-2xl text-right">
              <div className="">{item[0]}'s Total:</div>
              <div className="pl-4">
                {mainSection[0].amount[index].toFixed(2)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SummaryTotals;
