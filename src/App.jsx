import { useState,useEffect } from 'react'
import './App.css'
import { TodoProvider } from './context';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {

  const [todos,setTodos]=useState([]);

  const addTodo=(todo)=>{
    setTodos((prev)=>[{id:Date.now(),...todo},...prev])
  }

  const updateTodo=(id,todo)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id?todo:prevTodo)))
  }

  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=>todo.id!==id))
  }

  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id ? {...prevTodo, completed:!prevTodo.completed}  : prevTodo))
  }

  useEffect(() => {
    const todos=JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length>0)
    {
        setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos])
  

  return (
    <TodoProvider value={{todos, addTodo, updateTodo,deleteTodo,toggleComplete}}>
      {/* <div className="bg-[#172842] min-h-screen py-8"> */}
      <div className=' mix-blend-screen flex flex-col justify-start h-full min-h-screen items-center p-20 bg-black'>

      {/* chnaged */}
      <div aria-hidden="true" className=" pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
      <div style={{clipPath:"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}} className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6b1bff] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"/> 
      </div>
      {/* changed */}

                <div className="w-full max-w-2xl mx-auto border-solid border-1 shadow-2xl bg-[#ffffff31] rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Prioritize</h1>
                    <div className="mb-4">
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {todos.map((todo)=>(<div key={todo.id} className='w-full'>
                        <TodoItem todo={todo}/>
                        </div>))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App;
