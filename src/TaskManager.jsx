import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

function TaskManager() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [editingId, setEditingId] = useState(null); // ✅ track which task is being edited

    const fetchTasks = async () => {
        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .order("created_at", { ascending: true });

        if (error) {
            console.error("Fetch Error:", error);
            alert("Fetch failed: " + error.message);
            return;
        }
        setTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddStudent = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from("tasks")
            .insert([{ title, description, email }]);

        if (error) {
            console.error("Insert error:", error);
            alert("Insert failed: " + error.message);
            return;
        }
        alert("Task added successfully!");
        console.log(data);

        setTitle("");
        setDescription("");
        setEmail("");
        fetchTasks();
    };

    const handleDelete = async (id) => {
        const { error } = await supabase.from("tasks").delete().eq("id", id);
        if (error) {
            console.error("Delete error:", error);
            alert("Delete failed: " + error.message);
            return;
        }
        alert("Task deleted successfully!");
        fetchTasks();
    };

    const handleEditClick = (task) => {
        setEditingId(task.id);
        setUpdatedTitle(task.title);
        setUpdatedDescription(task.description);
        setUpdatedEmail(task.email);
    };

    const handleEditAndSave = async (id) => {
        const { error } = await supabase
            .from("tasks")
            .update([{ title: updatedTitle, description: updatedDescription, email: updatedEmail }])
            .eq("id", id);

        if (error) {
            console.error("Update error:", error);
            alert("Update failed: " + error.message);
            return;
        }
        alert("Task updated successfully!");
        setEditingId(null);
        setUpdatedTitle("");
        setUpdatedDescription("");
        setUpdatedEmail("");
        fetchTasks();
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        alert("Logged out successfully!");
        navigate('/');
    }

    return (
        <div className='flex flex-col'>
            <div className='flex justify-end p-4'>
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center bg-red-500 text-white h-8 w-20 rounded-lg"
                >
                    LogOut
                </button>
            </div>
            <h1 className="text-2xl font-bold text-center mt-10">Add Task Details</h1>
            <div className="flex flex-col mt-4 p-4 w-3/4 md:w-1/2 mx-auto">
                <label className="mb-2 font-bold">Title:</label>
                <input
                    type="text"
                    placeholder='Enter title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border rounded-lg border-gray-400 p-2 mb-4"
                />

                <label className="mb-2 font-bold">Task Description:</label>
                <input
                    type="text"
                    placeholder='Enter Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border rounded-lg border-gray-400 p-2 mb-4"
                />

                <label className="mb-2 font-bold">Client Email:</label>
                <input
                    type="email"
                    placeholder='Enter client email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded-lg border-gray-400 p-2 mb-4"
                />

                <button
                    onClick={handleAddStudent}
                    className="bg-blue-500 text-white p-2 rounded-lg"
                >
                    Add Student
                </button>
            </div>

            {tasks && tasks.length > 0 ? (
                <div>
                    <h2 className="text-xl font-bold text-center mt-10">Task List</h2>
                    <div>
                        {tasks.map((t) => (
                            <div key={t.id} className='border p-4 m-4 rounded-lg shadow-md'>
                                {editingId === t.id ? (
                                    <div className='flex flex-col mt-4'>
                                        <label className='font-bold mb-2'>Updated Title:</label>
                                        <input
                                            type="text"
                                            placeholder='updated title...'
                                            className='border rounded-lg border-gray-400 p-2 mb-4'
                                            value={updatedTitle}
                                            onChange={(e) => setUpdatedTitle(e.target.value)}
                                        />
                                        <label className='font-bold mb-2'>Updated Description:</label>
                                        <textarea
                                            placeholder='updated description...'
                                            className='border rounded-lg border-gray-400 p-2 mb-4'
                                            value={updatedDescription}
                                            onChange={(e) => setUpdatedDescription(e.target.value)}
                                        />
                                        <label className='font-bold mb-2'>Updated Email:</label>
                                        <input
                                            type="email"
                                            placeholder='updated email...'
                                            className='border rounded-lg border-gray-400 p-2 mb-4'
                                            value={updatedEmail}
                                            onChange={(e) => setUpdatedEmail(e.target.value)}
                                        />
                                        <button
                                            onClick={() => handleEditAndSave(t.id)}
                                            className='border border-green-500 text-green-500 p-2 rounded-lg hover:bg-green-500 hover:text-white'
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className='font-bold'>{t.title}</h3>
                                        <p>{t.description}</p>
                                        <p className='text-gray-600'>{t.email}</p>
                                        <div className='flex flex-row mt-2 gap-2'>
                                            <button
                                                onClick={() => handleDelete(t.id)}
                                                className='border border-red-600 text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white'
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => handleEditClick(t)}
                                                className='border border-yellow-500 text-yellow-500 p-2 rounded-lg hover:bg-yellow-500 hover:text-white'
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="text-xl font-bold text-center mt-10">No Tasks Available</h2>
                </div>
            )}
        </div>
    );

}

export default TaskManager
