import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Tesseract from "tesseract.js";

import ItemBreakdown from "../components/ItemBreakdown";
import OCR from "../components/OCR";

export default function Home() {
  const [data, setData] = useState("loading...");
  const [mainSection, setMainSection] = useState();

  useEffect(() => {
    handleUpdate();
  }, [data]);

  // get position of lines with prices
  const list = [];

  const handleUpdate = () => {
    if (data !== "loading...") {
      const objLength = data.lines[9].words.length;
      const searchText = data.lines[9].words[objLength - 1].text;
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
      data.lines.forEach((element, index) => {
        const objLength = element.words.length;
        // if (index < min) {
        //   console.log(element.words[objLength - 1].text);
        // }
      });
      const topSection = data.lines.slice(0, min);
      const mainSection1 = data.lines.slice(9, max + 1);
      setMainSection(mainSection1);
      const bottomSection = data.lines.slice(max + 1);
      console.log(mainSection1);
      // console.log("begin " + list.slice(min));
      // console.log("test " + searchText);
    }
  };

  return (
    <div>
      <Head>
        <title>Bill Splitter</title>
        <meta name="Bill Splitter" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Bill Splitter!</h1>
        <OCR setData={setData} />

        {typeof mainSection !== "undefined" && (
          <ItemBreakdown data={mainSection} />
        )}
      </main>
    </div>
  );
}
