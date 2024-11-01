import React, { useState, useEffect, useContext } from 'react';
import { RiDeleteBack2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { MdSaveAs } from "react-icons/md";
import { useTodosfun } from '../store/TodoItems_context';

function ListTodo({ text, dueDate, id}) {


  const { deleteTodo , editTodo} = useTodosfun()

  const [updatedText, setUpdatedText] = useState(text);
  const [updatedDueDate, setUpdatedDueDate] = useState(dueDate);
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");

  // Function to calculate the remaining time
  const calculateRemainingTime = () => {
    const now = new Date();
    const due = new Date(updatedDueDate);

    // Calculate the difference in milliseconds
    const diff = due - now;

    if (diff <= 0) {
      setRemainingTime("Past Due");
      return;
    }

    // Convert milliseconds to days, hours, minutes, and seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setRemainingTime(`${days} days ${hours} hours ${minutes} min ${seconds} sec`);
  };

  // Set up interval to update remaining time every second
  useEffect(() => {
    calculateRemainingTime(); // Initial calculation
    const intervalId = setInterval(calculateRemainingTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [updatedDueDate]);

  // Toggle Checkbox
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Delete Todo
  const handleDeleteTodo = () => {
    deleteTodo(id);
  };

  // Save Edited Todo
  const handleSaveTodo = () => {
    editTodo(id, updatedText, updatedDueDate);
    setIsEditing(false);
  };

  return (
    <div className={`flex justify-between items-center max-w-3xl text-white p-2 rounded-lg gap-2 mb-2 border-b border-gray-300 ${isChecked ? "bg-green-900" : "bg-gray-700"}`}>
      <div>
        <div className="flex gap-3">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
             className="cursor-pointer w-6 h-6 text-green-600 border-gray-300 rounded focus:ring focus:ring-green-500 focus:ring-opacity-50"
          />
          {isEditing ? (
            <input
              type="text"
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
              className={`bg-transparent outline-none border-2 p-2 rounded-lg border-slate-400 ${isChecked ? "line-through" : ""}`}
            />
          ) : (
            <p className={isChecked ? "line-through text-left w-[90%] " : " w-[90%] text-left"}>{text}</p>
          )}
        </div>
       
      </div>
      
      <div className="flex gap-2">

      <div className="text-left">
          {isEditing ? (
            <input
              type="date"
              value={updatedDueDate}
              onChange={(e) => setUpdatedDueDate(e.target.value)}
              className="text-sm text-left bg-transparent p-2 rounded-lg outline-none border-2 border-slate-400"
            />
          ) : (
            <>
            <div className='flex flex-col flex-wrap align-middle justify-center text-center' >
              <p className="text-sm text-left">Date : {dueDate}</p> 
              <span className="text-sm font-bold text-yellow-500 ">{remainingTime}</span>
            </div>
            </>
          )}
        </div>

        {isEditing ? (
          <button onClick={handleSaveTodo} className="bg-blue-600 text-white py-3 px-6 rounded">
            <MdSaveAs />
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className={`bg-yellow-600 text-white py-3 px-6 rounded ${isChecked ? "hidden" : ""}`}>
            <FaEdit />
          </button>
        )}
        <button onClick={handleDeleteTodo} className="bg-red-600 text-white py-3 px-6 rounded">
          <RiDeleteBack2Fill />
        </button>
      </div>
    </div>
  );
}

export default ListTodo;
