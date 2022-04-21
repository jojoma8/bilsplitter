import React from "react";
import DialogAddName from "./DialogAddName";
import DialogDeleteName from "./DialogDeleteName";

function ListNames({ names, setNames }) {
  const handleAddName = (name) => {
    console.log("len " + names.length);
    const temp = {};
    temp.value = name;
    switch (names.length) {
      case 0:
        temp.color = "bg-red-500";
        break;
      case 1:
        temp.color = "bg-orange-500";
        break;
      case 2:
        temp.color = "bg-yellow-300";
        break;
      case 3:
        temp.color = "bg-lime-400";
        break;
      case 4:
        temp.color = "bg-green-500";
        break;
      case 5:
        temp.color = "bg-teal-500";
        break;
      case 6:
        temp.color = "bg-cyan-500";
        break;
      case 7:
        temp.color = "bg-sky-500";
        break;
      case 8:
        temp.color = "bg-blue-600";
        break;
      case 9:
        temp.color = "bg-indigo-500";
        break;
      case 10:
        temp.color = "bg-violet-500";
        break;
      case 11:
        temp.color = "bg-purple-600";
        break;
      case 12:
        temp.color = "bg-fuchsia-500";
        break;
      case 13:
        temp.color = "bg-pink-500";
        break;
    }
    temp.percent = 1;
    console.table(temp);
    setNames((oldArray) => [...oldArray, temp]);
  };
  const handleDeleteName = (name) => {
    let newList = names.filter((item) => item.value !== name);
    setNames(newList);
  };
  //   console.log("test " + names[0].value);
  return (
    <div className="flex flex-col items-center justify-center pb-5">
      {/* {names.length === 0 && (
        <button onClick={() => handleAddName("Jojo")}>Add Name</button>
      )} */}
      {names.length > 0 && (
        <div className="flex ">
          {names.map((item, index) => (
            // <div
            //   key={index}
            //   className="bg-red-500 text-white px-3 py-1 m-2 rounded-lg"
            // >
            //   {item}
            // </div>
            <DialogDeleteName
              key={index}
              data={item}
              handleDeleteName={handleDeleteName}
            />
          ))}
        </div>
      )}
      {/* <button onClick={() => handleAddName("Jojo")}>Add Name</button> */}
      <DialogAddName handleAddName={handleAddName} />
    </div>
  );
}

export default ListNames;
