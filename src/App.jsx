import "./App.css";
import AddTodo from "./components/AddTodo";
import AppName from "./components/AppName";
import Lists_Todo_Con from "./components/Lists_Todo_Con";

import TodoItemProvider from "./store/TodoItems_context";


function App() {
  return (
    <TodoItemProvider>
      <AppName/>
      <AddTodo/>
      <Lists_Todo_Con />
    </TodoItemProvider>
  );
}
export default App;