import React, { useState } from "react";
import { createWorker } from "tesseract.js";

function OCR({ setData }) {
  const [progress, setProgress] = useState("Loading");

  const worker = createWorker({
    logger: (m) => {
      console.log(m);
      setProgress(m.progress);
    },
  });

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
    );
    setData(data);
    console.log(data);
  };
  //   const [ocr, setOcr] = useState("Recognizing...");

  return (
    <div>
      <input
        type="file"
        className="input"
        onChange={(e) => doOCR(e.target.files[0])}
        //   accept=".gif,.jpg,.jpeg,.png,.doc,.docx,.pdf"
      />
      {progress !== "Loading" && <p>{progress}</p>}
    </div>
  );
}

export default OCR;
