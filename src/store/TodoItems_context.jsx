import React, { useReducer, createContext, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// Create the context
export const TodoItemContext = createContext({
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
  editTodo: () => {},
});

// Reducer to handle different actions
function todoitemsReducer(currtodoitem, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...currtodoitem, action.payload];
    case "DELETE_TODO":
      return currtodoitem.filter((todo) => todo.id !== action.payload.id);
    case "EDIT_TODO":
      return currtodoitem.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text, dueDate: action.payload.dueDate }
          : todo
      );
    case "SET_TODOS":
      return action.payload;
    default:
      return currtodoitem;
  }
}

// Provider component to wrap the app
const TodoItemProvider = ({ children }) => {
  const [todos, dispatchTodos] = useReducer(todoitemsReducer, []);

  // Function to load todos from localStorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos && storedTodos.length > 0) {
      dispatchTodos({
        type: "SET_TODOS",
        payload: storedTodos,
      });
    }
  }, []);

  // Save todos to localStorage whenever the state changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (text, dueDate) => {
    dispatchTodos({
      type: "ADD_TODO",
      payload: {
        id: uuidv4(),
        text: text,
        dueDate: dueDate,
      },
    });
  };

  const deleteTodo = (id) => {
    dispatchTodos({
      type: "DELETE_TODO",
      payload: { id },
    });
  };

  const editTodo = (id, updatedtext, updatedDueDate) => {
    dispatchTodos({
      type: "EDIT_TODO",
      payload: {
        id: id,
        text: updatedtext,
        dueDate: updatedDueDate,
      },
    });
  };

  return (
    <TodoItemContext.Provider value={{ todos, addTodo, deleteTodo, editTodo }}>
      {children}
    </TodoItemContext.Provider>
  );
};

export default TodoItemProvider;

// Hook to access the context
export const useTodosfun = () => {
  return useContext(TodoItemContext);
};
