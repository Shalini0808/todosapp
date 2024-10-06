import axios from 'axios';
import TodoCard from './components/TodoCard';
import Loader from './components/Loader';
import React, { useEffect, useRef, useState } from 'react'
const firebaseUrl="https://tasks-fcfac-default-rtdb.asia-southeast1.firebasedatabase.app/"

function App() {
  let taskInput=useRef(null);
  let[todos,setTodos]=useState([])
  let [formStatus,setFormStatus]=useState(false)
  function handleSubmit(){
    setFormStatus(true)
    let task=taskInput.current.value;
    axios.post(`${firebaseUrl}todos.json`,{
      title:task
    }).then(()=>{
      setFormStatus(false)
      fetchtodos();
    })
    taskInput.current.value=""
  }
  function fetchtodos(){
    axios.get(`${firebaseUrl}todos.json`).then((todos)=>{
      let tempTodos=[];
      for(let key in todos.data){
        let todo={
          id:key,
          ...todos.data[key]
        }
        tempTodos.push(todo)
      }
      setTodos(tempTodos)
     })
  }
  function handleDelete(id){
    axios.delete(`${firebaseUrl}todos/${id}.json`).then(()=>{
      fetchtodos()
    })
  }
  useEffect(()=>{
    fetchtodos()
  },[])
  return (
    <div>
       <div className="w-[400px] mx-auto mt-12">
           <h1 className='text-2xl font-bold '>Manage your tasks <span className='text-neutral-400'>@Shalini</span></h1>
           <p className='text-md'>Take control of your tasks with our intuitive Todo App! Effortlessly create, update, and delete tasks to keep your life organized and productive. .</p>
           <input ref={taskInput} type="text" className='mt-2 border rounded-xl p-3 w-full focus:outline-none ' placeholder='Add task i.e. Learn Javascript' />
           <button onClick={handleSubmit} className='bg-black text-white flex justify-center items-center gap-4 py-2 mt-2 w-full rounded-xl'>Create Todos{formStatus?<Loader/>:""}</button>
       </div>
       {todos.map(todo=><TodoCard id={todo.id} handleDelete={handleDelete} title={todo.title} key={todo.id} />)}
    </div>
   
  
  )
 
}

export default App;
