import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import testReceipt from "../public/IMG_1014.jpg";

function OCR({ setData }) {
  const [progress, setProgress] = useState("Loading");

  const worker = createWorker({
    logger: (m) => {
      console.log(m);
      setProgress(m.progress);
    },
  });

  // const doOCR = async () => {
  const doOCR = async (file) => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      // data: { text },
      data,
    } = await worker.recognize(
      file
      // "https://tesseract.projectnaptha.com/img/eng_bw.png"
      // testReceipt
    );
    setData(data);
    console.log(data);
  };
  //   const [ocr, setOcr] = useState("Recognizing...");
  // useEffect(() => {
  //   doOCR();
  // }, []);

  return (
    <div className="flex items-center justify-center ">
      <input
        type="file"
        className="input"
        onChange={(e) => doOCR(e.target.files[0])}
        //   accept=".gif,.jpg,.jpeg,.png,.doc,.docx,.pdf "
      />
      {progress !== "Loading" && progress !== 1 && (
        <p>{Math.round(progress * 100).toFixed(0)}%</p>
      )}
    </div>
  );
}

export default OCR;
