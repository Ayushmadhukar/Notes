import React, { useEffect, useState } from "react";
import { X } from 'lucide-react';

function App() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [task, setTask] = useState([]);
  useEffect(()=>{
    const saveNotes = JSON.parse(localStorage.getItem("task"))
    if(saveNotes){
      setTask(saveNotes)
    }
  },[])
  useEffect(()=>{
    localStorage.setItem("task",JSON.stringify(task))
  },[task])

  const submitHandler = (e) => {
    e.preventDefault();

    const copyTask = [...task];

    copyTask.push({ title, details });

    setTask(copyTask);

    setTitle("");
    setDetails("");
  };
   const deleteNote = (idx)=>{
     const copyTask = [...task];
       
      copyTask.splice(idx,1  )
      setTask(copyTask)
   }

  return (
    <div className="h-screen lg:flex text-white bg-linear-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* ---- Left Form Section ---- */}
      <form
        onSubmit={(e)=>{
           if(title && details){
            submitHandler(e);
           }else{
            e.preventDefault()
           }
        }}
        className="flex flex-col items-start lg:w-1/2 p-10 gap-6 bg-gray-900/40 backdrop-blur-md border-r border-gray-800 shadow-lg"
      >
        <h1 className="text-4xl font-bold text-blue-400 mb-2 w-full text-center">
          Add Note
        </h1>

        <input
          type="text"
          placeholder="Enter Notes Heading"
          className="px-5 py-3 w-full font-medium border border-gray-700 bg-gray-800/60 text-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-gray-800/90 transition-all duration-300"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <textarea
          placeholder="Enter Details"
          id="para"
          className="px-5 py-3 w-full h-32 font-medium border border-gray-700 bg-gray-800/60 text-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-gray-800/90 transition-all duration-300 resize-none"
          value={details}
          onChange={(e) => {
            setDetails(e.target.value);
          }}
        />

        <button
          type="submit"
          className="px-5 py-3 w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-blue-900/30 transition-all duration-300 active:scale-95 active:bg-blue-500 "
        >
          Add Note
        </button>
      </form>

      {/* ---- Right Notes Section ---- */}
      <div className="lg:w-1/2 p-10 bg-gray-950/60 backdrop-blur-md">
        <h1 className="text-3xl text-center bg-gray-800/70 py-5 rounded-3xl font-bold mb-6 text-blue-300 shadow-md">
          Recent Notes
        </h1>

        <div
          id="para"
          className="flex gap-6 flex-wrap justify-center m-5 h-[calc(100%-6rem)] overflow-auto"
        >
          {task.map(function (elem, idx) {
            return (
              <div
                key={idx}
                className="h-56 w-44 rounded-2xl bg-white/10 backdrop-blur-sm border border-gray-700 shadow-lg hover:shadow-blue-500/20   transition-all duration-300 text-blue-400 p-4 flex flex-col  "
              >
                <h3 onClick= {()=>{
                  deleteNote(idx)
                }}  className="absolute top-2 right-2 bggray-600 p-1  cursor-pointer rounded-full text-xs"><X size={16} color="#c7c7bf" absoluteStrokeWidth /></h3>
                <h3 className="text-xl font-bold leading-tight mb-2  py-1 truncate">
                  {elem.title}
                </h3>
                <div id="para" className="flex flex-col overflow-y-scroll ">
                  <p
                    className="text-sm text-gray-300 break-words"
                  >
                    {elem.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
