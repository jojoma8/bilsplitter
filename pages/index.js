import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Tesseract from "tesseract.js";

import ItemBreakdown from "../components/ItemBreakdown";
import ListNames from "../components/ListNames";
import OCR from "../components/OCR";

export default function Home() {
  const [data, setData] = useState("loading...");
  const [mainSection, setMainSection] = useState([]);
  const [names, setNames] = useState([]);

  useEffect(() => {
    handleUpdate();
  }, [data]);

  const handleUpdate = () => {
    // get position of lines with prices
    const list = [];

    if (data !== "loading...") {
      // const objLength = data.lines[9].words.length;
      // const searchText = data.lines[9].words[objLength - 1].text;
      data.lines.forEach((element, index) => {
        const objLength = element.words.length;
        // console.log("length: " + objLength);
        // console.log(element.words[objLength - 1].text);
        if (element.words[objLength - 1].text.match(/[0-9]+[.,][0-9]{2}/g)) {
          list.push(index);
        }
        // console.log(list);
      });
      const min = Math.min(...list);
      const max = Math.max(...list);
      // console.log("min " + min);
      // console.log("max " + max);
      // data.lines.forEach((element, index) => {
      // const objLength = element.words.length;
      // if (index < min) {
      //   console.log(element.words[objLength - 1].text);
      // }
      // });
      const topSection = data.lines.slice(0, min);
      const mainSection1 = data.lines.slice(min, max + 1);
      mainSection1.map((item, index) => {
        mainSection1[index]["itemValue"] =
          mainSection1[index].words[mainSection1[index].words.length - 1].text;
      });
      setMainSection(mainSection1);
      const bottomSection = data.lines.slice(max + 1);
      console.log(mainSection1);
      // console.log("begin " + list.slice(min));
      // console.log("test " + searchText);
      handleUpdateNamesList(names, mainSection1);
    }
  };

  const handleUpdateNamesList = (newList, mainSection1) => {
    if (typeof mainSection !== "undefined" && mainSection.length > 0) {
      const dataCopy = mainSection;
      const listSelected = (field) => {
        return newList.map((x) => x[field]);
      };
      dataCopy.map((item, index) => {
        dataCopy[index]["names"] = listSelected("value");
        dataCopy[index]["color"] = listSelected("color");
        dataCopy[index]["id"] = index;
        dataCopy[index]["selected"] = listSelected("selected");
        dataCopy[index]["amount"] = listSelected("amount");
        dataCopy[index]["percent"] = listSelected("percent");
        dataCopy[index]["total"] = listSelected("total");
      });
      setMainSection(dataCopy);
      // console.log(dataCopy);
    }
    if (
      typeof mainSection === "undefined" &&
      typeof mainSection1 !== "undefined" &&
      mainSection1.length > 0
    ) {
      const dataCopy = mainSection1;
      const listSelected = (field) => {
        return newList.map((x) => x[field]);
      };
      dataCopy.map((item, index) => {
        dataCopy[index]["names"] = newList;
        dataCopy[index]["id"] = index;
        dataCopy[index]["selected"] = listSelected("selected");
        dataCopy[index]["amount"] = listSelected("amount");
        dataCopy[index]["percent"] = listSelected("percent");
      });
      setMainSection(dataCopy);
      // console.log(dataCopy);
    }
  };

  const handleRemoveName = (newList, indexSource) => {
    const listSelected = (field) => {
      return newList.map((x) => x[field]);
    };
    const dataCopy = mainSection;
    dataCopy.map((item, index) => {
      // remove name from list
      dataCopy[index]["names"] = listSelected("value");
      // remove slected based on index provided from diaolg
      dataCopy[index]["selected"] = item.selected.filter(
        (v, i) => i !== indexSource
      );
      // calculate split of cost
      const count = dataCopy[index].selected.filter((x) => {
        return x === true;
      });
      dataCopy[index].selected.map((item2, index3) => {
        if (item2 === false) {
          dataCopy[index].percent[index3] = 0;
          dataCopy[index].amount[index3] = 0;
        }
        if (item2 === true) {
          dataCopy[index].percent[index3] = 100 / count.length;
          dataCopy[index].amount[index3] =
            // (array[array.length - 1].text.replace(/^\D+/g, "") *
            (mainSection[index].itemValue.replace(/^\D+/g, "") *
              (100 / count.length)) /
            100;
        }
        if (count.length === 0) {
          dataCopy[index].percent[index3] = 0;
          dataCopy[index].amount[index3] = 0;
        }
      });
      const listOfAmounts = dataCopy.map((a) => a.amount);
      const result = listOfAmounts.reduce((a, b) => a.map((c, i) => c + b[i]));
      // console.log(result);
      dataCopy.map((item) => {
        item.total = result;
      });
    });
    console.log("dataCopy");
    console.log(dataCopy);
    setMainSection(dataCopy);
  };

  return (
    <div>
      <Head>
        <title>Bill Splitter</title>
        <meta name="Bill Splitter" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col">
        <h1 className="my-5 text-center text-xl ">Welcome to Bill Splitter!</h1>

        <OCR setData={setData} />
        <ListNames
          setNames={setNames}
          names={names}
          handleUpdateNamesList={handleUpdateNamesList}
          mainSection={mainSection}
          setMainSection={setMainSection}
          handleRemoveName={handleRemoveName}
        />
        {typeof mainSection !== "undefined" && mainSection.length > 0 && (
          <div>
            <ItemBreakdown
              mainSection={mainSection}
              setMainSection={setMainSection}
              names={names}
              setNames={setNames}
              // handleUpdateAmount={handleUpdateAmount}
            />
          </div>
        )}
      </main>
    </div>
  );
}
