import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [signUp, setSignUp] = useState(false);
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        const { user, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            console.error("Login Error:", error);
            alert("Login failed: " + error.message);
            return;
        } else {
            console.log(user);
            alert("Login successful!");
            navigate('/tasks');
        }
    }
    return (
        <form onSubmit={handleAuth} className='flex flex-col justify-center items-center h-screen'>
            <div className='flex flex-col p-20 border rounded-lg space-y-4 '>
                <h1 className='text-3xl font-bold mb-4'>User Authentication</h1>
                <input type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border rounded-lg border-gray-400 py-2 mb-4 p-4'
                />
                <input type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border rounded-lg border-gray-400 py-2 mb-4 p-4'
                />
                <div className='flex space-x-4'>
                    <button type='submit' className='border border-green-500 text-black hover:bg-green-500 hover:text-white px-4 py-2 rounded-lg'>Login</button>
                    <button type='button' onClick={() => navigate('/signup')} className='border border-blue-500 text-black hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg'>Sign Up</button>
                </div>
            </div>

        </form>
    )
}

export default Auth;
