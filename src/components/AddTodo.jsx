import React, { useState, useRef, useContext } from 'react';
import { IoCreate } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { useTodosfun } from '../store/TodoItems_context';

function AddTodo() {

  const {addTodo} = useTodosfun();
  // const {addTodo} = useContext(TodoItemContext)
  
  

  const textInputElement = useRef();
  const dueDateInputElement = useRef();
 
  const handleSubmitTodo = (e) => {
    e.preventDefault();
   const text = textInputElement.current.value;
   const dueDate = dueDateInputElement.current.value;

    if (text && dueDate) {
      addTodo(text, dueDate);
    }

    dueDateInputElement.current.value = "";
    textInputElement.current.value = "";
  };


  return (
    <div className="p-5 text-xl">
      <form onSubmit={handleSubmitTodo} className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            ref={textInputElement}
            placeholder="Enter your task"
            className="p-3 rounded-lg w-full sm:w-auto border dark:bg-gray-800 dark:text-white focus:outline-none"
          />
          <div className="flex items-center p-2 border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-600">
            <FaCalendarAlt className="text-gray-500 dark:text-gray-400 mr-2" />
            <input
              type="date"
              ref={dueDateInputElement}
              className="p-2 w-full rounded-lg text-gray-900 dark:text-white bg-transparent focus:outline-none"
            />
          </div>
          <button className="flex items-center justify-center p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <IoCreate className="mr-1" />
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;

// const deletedTodo = todos.filter((todo)=>todo.id !== id)
    // setTodos(deletedTodo)