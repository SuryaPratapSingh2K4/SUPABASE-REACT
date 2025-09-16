import { useEffect, useState } from 'react'
import './App.css'
// import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from './supabase-client';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select("*").order("created_at", { ascending: true });
    if (error) {
      console.error("Fetch Error:", error);
      alert("Fetch failed: " + error.message);
      return;
    }
    console.log(data);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("tasks").insert([{ title, description, email }]);

    if (error) {
      console.error("Insert error:", error);
      alert("Insert failed: " + error.message);
      return;
    }
    console.log("Insert successful:", data);
    alert("Task added successfully!");

    setTitle("");
    setDescription("");
    setEmail("");

  }

  return (
    <div className='flex flex-col'>
      <h1 className="text-2xl font-bold text-center mt-10">Add Task Details</h1>
      <div className="flex flex-col mt-4 p-4 w-3/4 md:w-1/2 mx-auto">
        <label className="mb-2 font-bold">Title:</label>
        <input type="text" placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded-lg border-gray-400 p-2 mb-4" />

        <label className="mb-2 font-bold">Task Description:</label>
        <input type="text" placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded-lg border-gray-400 p-2 mb-4" />

        <label className="mb-2 font-bold">Client Email:</label>
        <input type="email" placeholder='Enter client email' value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-lg border-gray-400 p-2 mb-4" />

        {/* <label className="mb-2 font-bold">Student Image:</label> */}
        {/* <input onChange={handleImageUpload} type="file" /> */}

        <button onClick={handleAddStudent} className="bg-blue-500 text-white p-2 rounded-lg">Add Student</button>
      </div>

      {tasks && tasks.length > 0 ?
        <div>
          <h2 className="text-xl font-bold text-center mt-10">Task List</h2>
          <div>
            {
              tasks.map((t) => (
                <div key={t.id} className='border p-4 m-4 rounded-lg shadow-md'>
                  <h3 className='font-bold'>{t.title}</h3>
                  <p>{t.description}</p>
                  <p className='text-gray-600'>{t.email}</p>
                </div>
              ))
            }
          </div>
        </div> : <div>
          <h2 className="text-xl font-bold text-center mt-10">No Tasks Available</h2>
        </div>
      }

    </div>

  )
}

export default App
