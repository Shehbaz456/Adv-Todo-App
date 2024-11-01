import React, { useContext } from 'react'
import ListTodo from './ListTodo'
import { useTodosfun } from '../store/TodoItems_context';

function Lists_Todo_Con() {
  const {todos} = useTodosfun();
  console.log(todos);
  

  return (
    <>
    <h3 className='font-bold text-left text-xl pb-3'>Todo Items</h3>
    {
      todos.length === 0 && <p>No Todo Items</p>
    }
    
    {
      todos.map((todo)=>(
        <ListTodo key={todo.id} id={todo.id} text={todo.text} dueDate={todo.dueDate}/>
      ))
    }
    
    </>
  )
}

export default Lists_Todo_Con
