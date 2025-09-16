import { useState } from 'react'
import './App.css'
import { supabase } from './supabaseClient'

function App() {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

  const handleAddStudent = async (e) => {
    e.preventDefault();
    await supabase.from("tasks")
  }

  return (
    <div className='flex flex-col'>
      <h1 className="text-2xl font-bold text-center mt-10">Add Task Details</h1>
      <div className="flex flex-col mt-4 p-4 w-3/4 md:w-1/2 mx-auto">
        <label className="mb-2 font-bold">Task:</label>
        <input type="text" placeholder='Enter task' value={task} onChange={(e) => setTask(e.target.value)} className="border rounded-lg border-gray-400 p-2 mb-4" />

        <label className="mb-2 font-bold">Task Description:</label>
        <input type="text" placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded-lg border-gray-400 p-2 mb-4" />

        <label className="mb-2 font-bold">Client Email:</label>
        <input type="email" placeholder='Enter client email' value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-lg border-gray-400 p-2 mb-4" />

        {/* <label className="mb-2 font-bold">Student Image:</label> */}
        {/* <input onChange={handleImageUpload} type="file" /> */}

        <button onClick={handleAddStudent} className="bg-blue-500 text-white p-2 rounded-lg">Add Student</button>
      </div>

      {}

    </div>

  )
}

export default App
