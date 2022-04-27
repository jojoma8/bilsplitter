import React, { useEffect, useState } from "react";

function SummaryTotals({ mainSection, names }) {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (typeof mainSection[0].total !== "undefined") {
      setTotal(mainSection[0].total.reduce((a, b) => a + b, 0).toFixed(2));
    }
  }, [mainSection]);

  return (
    <div>
      <div className="font-semibold text-2xl">Summary</div>
      <div className="mt-2">
        {typeof mainSection[0].names !== "undefined" &&
          mainSection[0].names &&
          mainSection[0].names.map((item, index) => (
            <div key={index} className="flex text-2xl text-right">
              <div className="">{item[0]}&apos;s Total:</div>
              <div className="pl-4">
                {mainSection[0].total[index].toFixed(2)}
              </div>
            </div>
          ))}
      </div>
      <div className="font-semibold text-2xl mt-2">Grand Total: {total}</div>
    </div>
  );
}

export default SummaryTotals;
